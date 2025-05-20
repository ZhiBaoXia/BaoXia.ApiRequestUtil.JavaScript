import { DateTime, JsonUtil, PathUtil, StringUtil } from '@baoxia/utils.javascript';
import { UriPathDelimiter } from '@baoxia/utils.javascript/lib/constant/uriPathDelimiter.js';
import axios, { Axios, AxiosError, AxiosHeaders, AxiosInstance, AxiosRequestHeaders, AxiosResponseHeaders, CreateAxiosDefaults, RawAxiosRequestHeaders } from 'axios';
// node环境下需要使用“form-data”。
// import FormData from 'form-data';
import { ApiRequestContentType } from './apiRequestContentType.js';
import { ApiRequestMethod } from './apiRequestMethod.js';
import { ApiResponseInfo } from './apiResponseInfo.js';
import { ApiResponseThenable } from './apiResponseThenable.js';

export abstract class ApiService
{
	////////////////////////////////////////////////
	// @自身属性
	////////////////////////////////////////////////

	// #region

	protected abstract readonly apiUrlRootPath: string | null;

	protected abstract readonly apiDirectoryPath: string;

	protected apiServiceUrlRoot: string | null = null;

	protected isCredentialsEnable: boolean = true;

	protected timeoutSeconds: number = 0;

	protected isBaoXiaJsonSerializerEnable: boolean = true;

	protected toCreateAxios: ((
		apiDirectoryPath: string,
		timeoutSeconds: number,
		isCredentialsEnable: boolean) => AxiosInstance) | null = null;

	protected axios: AxiosInstance | null = null;

	// #endregion


	////////////////////////////////////////////////
	// @自身实现
	////////////////////////////////////////////////

	// #region

	protected getAxios(): AxiosInstance
	{
		if (this.axios != null)
		{
			return this.axios;
		}

		let apiServiceUrlRoot: string;
		{
			let apiUrlRootPath = this.apiUrlRootPath;
			if (StringUtil.isEmpty(apiUrlRootPath))
			{
				apiUrlRootPath = this.didGetApiRootPath();
			}
			apiUrlRootPath
				= PathUtil.toDirectoryPathFromUriPath(apiUrlRootPath);
			let apiDirectoryPath
				= PathUtil.toDirectoryPathFromUriPath(this.apiDirectoryPath);
			//
			apiServiceUrlRoot
				= StringUtil.joinStringsWithDelimiter(
					UriPathDelimiter.Paths,
					true,
					apiUrlRootPath,
					apiDirectoryPath);
			//
		}
		this.apiServiceUrlRoot = apiServiceUrlRoot;
		let timeoutSeconds = this.timeoutSeconds;
		let isCredentialsEnable = this.isCredentialsEnable;

		// !!!
		this.axios = this.didCreateAxios(
			apiServiceUrlRoot,
			timeoutSeconds,
			isCredentialsEnable);
		// !!!
		return this.axios;
	}

	////////////////////////////////////////////////
	// @同步请求函数
	////////////////////////////////////////////////

	private createResponseWithRequestMethod<RequestParamType, ResponseParamType>(
		apiMethodPath: string,
		requestMethod: string,
		requestContentType: string,
		//
		requestParam?: RequestParamType,
		callbackSpecified: ApiResponseThenable<ResponseParamType> | null = null)
		: ApiResponseThenable<ResponseParamType>
	{
		let callback
			= callbackSpecified != null
				? callbackSpecified
				: new ApiResponseThenable<ResponseParamType>();
		switch (requestMethod)
		{
			case ApiRequestMethod.Post:
				{
					let finalRequestParam: RequestParamType | FormData | null = null;
					if (requestParam != undefined
						&& requestParam != null)
					{
						if (StringUtil.isEquals(
							ApiRequestContentType.FormData,
							requestContentType))
						{
							if (typeof window != undefined
								&& window.FormData)
							{
								let formData = new FormData();
								{
									let requestParamAny = requestParam as any;
									for (let formParamName in requestParam)
									{
										let formParamValue = requestParamAny[formParamName];
										if (formParamValue instanceof DateTime)
										{
											formParamValue
												= (formParamValue as DateTime).toISOString();
										}
										// !!!
										formData.append(
											formParamName,
											formParamValue);
										// !!!
									}
								}
								finalRequestParam = formData;
							}
							else
							{
								//
								console.error(`#BaoXia.ApiRequestUtil.JavaScript#，当前运行环境（可能为小程序，或Node环境）不支持“FormData类型”，因此要提交至“${apiMethodPath}”的请求参数将被转换为“JSON字符串”。`);
								//
								finalRequestParam = requestParam;
							}
						}
						else
						{
							finalRequestParam = requestParam;
						}
					}

					this.getAxios()
						.post(
							apiMethodPath,
							finalRequestParam,
							{
								headers: this.didTransformRequestHeaders({
									'Content-Type': requestContentType
								}),
								transformRequest: [
									(data, headers) =>
									{
										let finalRequestData
											= this.didTransformRequest(
												data,
												headers);
										if (finalRequestData != null)
										{
											if (typeof finalRequestData === 'object')
											{
												if (typeof window == 'undefined'
													|| !window.FormData
													|| !(finalRequestData instanceof FormData))
												{
													finalRequestData = JSON.stringify(finalRequestData);
												}
											}
										}
										return finalRequestData;
									}],
								transformResponse: [
									(data, headers, statusCode) =>
									{
										return this.didTransformResponse<ResponseParamType>(
											data,
											headers,
											statusCode);
									}]
							})
						.then((response) =>
						{
							let apiResponseInfo
								= new ApiResponseInfo<ResponseParamType>(
									null,
									response.data,
									response);
							////////////////////////////////////////////////                    
							// !!!
							callback.setResult(
								null,
								apiResponseInfo);
							// !!!
							////////////////////////////////////////////////
						})
						.catch((error: AxiosError | any) =>
						{
							////////////////////////////////////////////////                    
							// !!!
							callback.setResult(
								error,
								null);
							// !!!
							////////////////////////////////////////////////
						});
				} break;
			case ApiRequestMethod.Get:
			default:
				{
					let finalRequestParam: RequestParamType | any = requestParam;
					if (typeof requestParam === 'object')
					{
						finalRequestParam = new Map();
						for (let requestParamName in requestParam)
						{
							let requestParamValue = requestParam[requestParamName];
							if (requestParamValue != null
								&& requestParamValue instanceof DateTime)
							{
								let dateTime
									= requestParamValue as DateTime;
								let utcDateTime
									= dateTime.dateTimeByAddHours(
										-1 * dateTime.timeZone);
								let dateTimeString
									= utcDateTime.toISOString();
								let indexOfTimeZoneDelimiter = dateTimeString.indexOf('+');
								if (indexOfTimeZoneDelimiter >= 0)
								{
									dateTimeString
										= dateTimeString.substring(
											0,
											indexOfTimeZoneDelimiter)
										+ "Z";
								}
								// !!!
								finalRequestParam.set(
									requestParamName,
									dateTimeString);
								// !!!
							}
							else
							{
								// !!!
								finalRequestParam.set(
									requestParamName,
									requestParamValue);
								// !!!
							}
						}
					}

					this.getAxios()
						.get(
							apiMethodPath,
							{
								params: requestParam,
								headers: this.didTransformRequestHeaders({
								}),
								transformRequest: [
									(data, headers) =>
									{
										return this.didTransformRequest(
											data,
											headers);
									}],
								transformResponse: [
									(data, headers, statusCode) =>
									{
										let finalResponse = this.didTransformResponse<ResponseParamType>(
											data,
											headers,
											statusCode);
										{ }
										return finalResponse;
									}]
							})
						.then((response) =>
						{
							let apiResponseInfo
								= new ApiResponseInfo<ResponseParamType>(
									null,
									response.data,
									response);
							////////////////////////////////////////////////                    
							// !!!
							callback.setResult(
								null,
								apiResponseInfo);
							// !!!
							////////////////////////////////////////////////
						})
						.catch((error: AxiosError | any) =>
						{
							////////////////////////////////////////////////                    
							// !!!
							callback.setResult(
								error,
								null);
							// !!!
							////////////////////////////////////////////////
						});
				} break;
		}
		return callback;
	}

	protected getResponseFromApi<RequestParamType, ResponseParamType>(
		apiMethodPath: string,
		queryParam?: RequestParamType,
		callbackSpecified: ApiResponseThenable<ResponseParamType> | null = null)
		: ApiResponseThenable<ResponseParamType>
	{
		return this.createResponseWithRequestMethod(
			apiMethodPath,
			ApiRequestMethod.Get,
			ApiRequestContentType.None,
			//
			queryParam,
			callbackSpecified);
	}

	protected postToGetResponseFromApi<RequestParamType, ResponseParamType>(
		apiMethodPath: string,
		apiRequestContentType: string,
		postParams?: RequestParamType,
		callbackSpecified: ApiResponseThenable<ResponseParamType> | null = null)
		: ApiResponseThenable<ResponseParamType>
	{
		return this.createResponseWithRequestMethod(
			apiMethodPath,
			ApiRequestMethod.Post,
			apiRequestContentType,
			//
			postParams,
			callbackSpecified);
	}

	protected get<RequestParamType, ResponseParamType>(apiMethodName: string)
		: ((requestParam?: RequestParamType) => ApiResponseThenable<ResponseParamType>)
	{
		let api
			= (requestParam?: RequestParamType): ApiResponseThenable<ResponseParamType> =>
			{
				return this.getResponseFromApi<RequestParamType, ResponseParamType>(
					apiMethodName,
					requestParam);
			};
		return api;
	}

	protected post<RequestParamType, ResponseParamType>(
		apiMethodName: string,
		apiRequestContentType: string = ApiRequestContentType.Json)
		: ((requestParam?: RequestParamType) => ApiResponseThenable<ResponseParamType>)
	{
		let api
			= (requestParam?: RequestParamType): ApiResponseThenable<ResponseParamType> =>
			{
				return this.postToGetResponseFromApi<RequestParamType, ResponseParamType>(
					apiMethodName,
					apiRequestContentType,
					requestParam);
			};
		return api;
	}

	////////////////////////////////////////////////
	// @异步请求函数
	////////////////////////////////////////////////

	private async createResponseWithRequestMethodAsync<RequestParamType, ResponseParamType>(
		apiMethodPath: string,
		requestMethod: string,
		requestContentType: string,
		//
		requestParam?: RequestParamType)
		: Promise<ApiResponseInfo<ResponseParamType>>
	{
		let apiResponseInfo: ApiResponseInfo<ResponseParamType> | null = null;
		switch (requestMethod)
		{
			case ApiRequestMethod.Post:
				{
					try
					{
						let finalRequestParam: RequestParamType | FormData | null = null;
						if (requestParam != undefined
							&& requestParam != null)
						{
							if (StringUtil.isEquals(
								ApiRequestContentType.FormData,
								requestContentType))
							{
								if (typeof window != undefined
									&& window.FormData)
								{
									let formData = new FormData();
									{
										let requestParamAny = requestParam as any;
										for (let formParamName in requestParam)
										{
											let formParamValue = requestParamAny[formParamName];
											if (formParamValue instanceof DateTime)
											{
												formParamValue
													= (formParamValue as DateTime).toISOString();
											}
											// !!!
											formData.append(
												formParamName,
												formParamValue);
											// !!!
										}
									}
									finalRequestParam = formData;
								}
								else
								{
									//
									console.error(`#BaoXia.ApiRequestUtil.JavaScript#，当前运行环境（可能为小程序，或Node环境）不支持“FormData类型”，因此要提交至“${apiMethodPath}”的请求参数将被转换为“JSON字符串”。`);
									//
									finalRequestParam = requestParam;
								}
							}
							else
							{
								finalRequestParam = requestParam;
							}
						}

						let axiosResponseInfo
							= await this.getAxios()
								.post(
									apiMethodPath,
									finalRequestParam,
									{
										headers: this.didTransformRequestHeaders({
											'Content-Type': requestContentType
										}),
										transformRequest: [
											(data, headers) =>
											{
												let finalRequestData
													= this.didTransformRequest(
														data,
														headers);
												if (finalRequestData != null)
												{

													if (typeof finalRequestData === 'object')
													{
														if (typeof window == 'undefined'
															|| !window.FormData
															|| !(finalRequestData instanceof FormData))
														{
															finalRequestData = JSON.stringify(finalRequestData);
														}
													}
												}
												return finalRequestData;
											}],
										transformResponse: [
											(data, headers, statusCode) =>
											{
												return this.didTransformResponse<ResponseParamType>(
													data,
													headers,
													statusCode);
											}]
									});
						apiResponseInfo
							= new ApiResponseInfo<ResponseParamType>(
								null,
								axiosResponseInfo.data,
								axiosResponseInfo);
					}
					catch (exception: unknown)
					{
						// !!!
						console.error(exception);
						// !!!
						apiResponseInfo
							= new ApiResponseInfo<ResponseParamType>(
								exception as AxiosError,
								null,
								null);
					}
				} break;
			case ApiRequestMethod.Get:
			default:
				{
					try
					{
						let finalRequestParam: RequestParamType | any = requestParam;
						if (typeof requestParam === 'object')
						{
							finalRequestParam = new Map();
							for (let requestParamName in requestParam)
							{
								let requestParamValue = requestParam[requestParamName];
								if (requestParamValue != null
									&& requestParamValue instanceof DateTime)
								{
									let dateTime
										= requestParamValue as DateTime;
									let utcDateTime
										= dateTime.dateTimeByAddHours(
											-1 * dateTime.timeZone);
									let dateTimeString
										= utcDateTime.toISOString();
									let indexOfTimeZoneDelimiter = dateTimeString.indexOf('+');
									if (indexOfTimeZoneDelimiter >= 0)
									{
										dateTimeString
											= dateTimeString.substring(
												0,
												indexOfTimeZoneDelimiter)
											+ "Z";
									}
									// !!!
									finalRequestParam.set(
										requestParamName,
										dateTimeString);
									// !!!
								}
								else
								{
									// !!!
									finalRequestParam.set(
										requestParamName,
										requestParamValue);
									// !!!
								}
							}
						}

						let axiosResponseInfo = await this.getAxios()
							.get(
								apiMethodPath,
								{
									params: requestParam,
									headers: this.didTransformRequestHeaders({
									}),
									transformRequest: [
										(data, headers) =>
										{
											return this.didTransformRequest(
												data,
												headers);
										}],
									transformResponse: [
										(data, headers, statusCode) =>
										{
											let finalResponse = this.didTransformResponse<ResponseParamType>(
												data,
												headers,
												statusCode);
											{ }
											return finalResponse;
										}]
								});
						apiResponseInfo
							= new ApiResponseInfo<ResponseParamType>(
								null,
								axiosResponseInfo.data,
								axiosResponseInfo);
					}
					catch (exception: unknown)
					{
						// !!!
						console.error(exception);
						// !!!
						apiResponseInfo
							= new ApiResponseInfo<ResponseParamType>(
								exception as AxiosError,
								null,
								null);
					}
				} break;
		}
		return apiResponseInfo;
	}

	protected async getResponseFromApiAsync<RequestParamType, ResponseParamType>(
		apiMethodPath: string,
		queryParam?: RequestParamType)
		: Promise<ApiResponseInfo<ResponseParamType>>
	{
		return await this.createResponseWithRequestMethodAsync(
			apiMethodPath,
			ApiRequestMethod.Get,
			ApiRequestContentType.None,
			//
			queryParam);
	}

	protected async postToGetResponseFromApiAsync<RequestParamType, ResponseParamType>(
		apiMethodPath: string,
		apiRequestContentType: string,
		postParams?: RequestParamType)
		: Promise<ApiResponseInfo<ResponseParamType>>
	{
		return await this.createResponseWithRequestMethodAsync(
			apiMethodPath,
			ApiRequestMethod.Post,
			apiRequestContentType,
			//
			postParams);
	}

	protected getAsync<RequestParamType, ResponseParamType>(apiMethodName: string)
		: ((requestParam?: RequestParamType) => Promise<ApiResponseInfo<ResponseParamType>>)
	{
		let api
			= async (requestParam?: RequestParamType): Promise<ApiResponseInfo<ResponseParamType>> =>
			{
				return await this.getResponseFromApiAsync<RequestParamType, ResponseParamType>(
					apiMethodName,
					requestParam);
			};
		return api;
	}

	protected postAsync<RequestParamType, ResponseParamType>(
		apiMethodName: string,
		apiRequestContentType: string = ApiRequestContentType.Json)
		: ((requestParam?: RequestParamType) => Promise<ApiResponseInfo<ResponseParamType>>)
	{
		let api
			= (requestParam?: RequestParamType): Promise<ApiResponseInfo<ResponseParamType>> =>
			{
				return this.postToGetResponseFromApiAsync<RequestParamType, ResponseParamType>(
					apiMethodName,
					apiRequestContentType,
					requestParam);
			};
		return api;
	}

	// #endregion


	////////////////////////////////////////////////
	// @事件节点
	////////////////////////////////////////////////

	// #region

	protected didGetApiRootPath(): string | null
	{
		return null;
	}

	protected didCreateAxios(
		apiDirectoryPath: string,
		timeoutSeconds: number,
		isCredentialsEnable: boolean): AxiosInstance
	{
		let toCreateAxios = this.toCreateAxios;
		let axiosInstance = toCreateAxios != null
			? toCreateAxios(
				apiDirectoryPath,
				timeoutSeconds,
				isCredentialsEnable)
			: null;
		if (axiosInstance == null)
		{
			let axiosConfig
				= this.didCreateAxiosConfig(
					apiDirectoryPath,
					timeoutSeconds,
					isCredentialsEnable);
			if (axiosConfig != null)
			{
				// !!!
				axiosInstance = axios.create(axiosConfig);
				// !!!
			}
			else
			{
				// !!!
				axiosInstance = axios.create();
				// !!!
			}
		}
		return axiosInstance;
	}

	protected didCreateAxiosConfig(
		apiDirectoryPath: string,
		timeoutSeconds: number,
		isCredentialsEnable: boolean): CreateAxiosDefaults<any> | null
	{
		let axiosConfig: CreateAxiosDefaults<any> = {
			// Api请求URL的根目录：
			baseURL: apiDirectoryPath,
			// 默认的请求超时毫秒数：
			timeout: 1000 * timeoutSeconds,
			// 默认使用Cookie参数：
			withCredentials: isCredentialsEnable,
		};
		return axiosConfig;
	}

	protected didTransformRequestHeaders(
		headers: RawAxiosRequestHeaders | AxiosHeaders): RawAxiosRequestHeaders | AxiosHeaders
	{
		return headers;
	}

	protected didTransformRequest(
		data: any,
		headers: AxiosRequestHeaders): string | ArrayBuffer  | Buffer | null
	{
		return data;
	}
	

	protected didTransformResponse<ResponseParamType>(
		data: any,
		headers: AxiosResponseHeaders,
		statusCode?: number): ResponseParamType | null
	{
		if (data == null
			|| typeof data == undefined)
		{
			return data;
		}
		if (!this.isBaoXiaJsonSerializerEnable)
		{
			return data;
		}

		let dataTypeName = typeof data;
		if (dataTypeName === "string"
			|| dataTypeName == "object")
		{
			let responseParam = JsonUtil.parseOrConvertValue<ResponseParamType>(data);
			{ }
			return responseParam;
		}
		return data;
	}

	// #endregion
}