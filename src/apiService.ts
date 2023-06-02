import { AxiosInstance, AxiosResponseHeaders } from 'axios'
import axios from 'axios'
import { ApiRequestMethod } from './apiRequestMethod.js';
import { ApiResponseThenable } from './apiResponseThenable.js';
import { ApiResponseInfo } from './apiResponseInfo.js';
import { DateTime, JsonUtil, ObjectUtil, PathUtil, StringUtil } from '@baoxia/utils.javascript'
import { UriPathDelimiter } from '@baoxia/utils.javascript/lib/constant/uriPathDelimiter.js';
import { ApiRequestContentType } from './apiRequestContentType.js';

export abstract class ApiService
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    protected abstract readonly apiUrlRoot: string;

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

    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    protected getAxios(): AxiosInstance
    {
        if (this.axios != null)
        {
            return this.axios;
        }

        let apiServiceUrlRoot: string;
        {
            let apiUrlRoot
                = PathUtil.toDirectoryPathFromUriPath(this.apiUrlRoot);
            let apiDirectoryPath
                = PathUtil.toDirectoryPathFromUriPath(this.apiDirectoryPath);
            //
            apiServiceUrlRoot
                = StringUtil.joinStringsWithDelimiter(
                    UriPathDelimiter.Paths,
                    true,
                    apiUrlRoot,
                    apiDirectoryPath);
            //
        }
        this.apiServiceUrlRoot = apiServiceUrlRoot;

        let timeoutSeconds = this.timeoutSeconds;
        let isCredentialsEnable = this.isCredentialsEnable;
        let toCreateAxios = this.toCreateAxios;

        let axiosInstance = toCreateAxios != null
            ? toCreateAxios(
                apiServiceUrlRoot,
                timeoutSeconds,
                isCredentialsEnable)
            : null;
        if (axiosInstance == null)
        {
            axiosInstance = axios.create({
                // Api请求URL的根目录：
                baseURL: apiServiceUrlRoot,
                // 默认的请求超时毫秒数：
                timeout: 1000 * timeoutSeconds,
                // 默认使用Cookie参数：
                withCredentials: isCredentialsEnable
            });
        }
        // !!!
        this.axios = axiosInstance!;
        // !!!
        return this.axios;
    }

    private createResponseWithRequestMethod<RequestParamType, ResponseParamType>(
        apiMethodPath: string,
        requestMethod: string,
        requestContentType: string,
        //
        requestParam: RequestParamType,
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
                    let finalRequestParam: RequestParamType | FormData;
                    if (StringUtil.isEquals(
                        ApiRequestContentType.FormData,
                        requestContentType))
                    {
                        let formData = new FormData();
                        if (requestParam != null)
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
                        finalRequestParam = requestParam;
                    }

                    this.getAxios()
                        .post(
                            apiMethodPath,
                            finalRequestParam,
                            {
                                headers:
                                {
                                    'Content-Type': requestContentType
                                },
                                transformRequest: [
                                    (data, headers) =>
                                    {
                                        let finalRequestData
                                            = this.didTransformRequest(
                                                data,
                                                headers);
                                        if (finalRequestData != null)
                                        {
                                            if (typeof finalRequestData === 'object'
                                                && !(finalRequestData instanceof FormData))
                                            {
                                                finalRequestData = JSON.stringify(finalRequestData);
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
                        .catch((error) =>
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
                        .catch((error) =>
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
        queryParam: RequestParamType,
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
        postParams: RequestParamType,
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
        : ((requestParam: RequestParamType) => ApiResponseThenable<ResponseParamType>)
    {
        let api
            = (requestParam: RequestParamType): ApiResponseThenable<ResponseParamType> =>
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
        : ((requestParam: RequestParamType) => ApiResponseThenable<ResponseParamType>)
    {
        let api
            = (requestParam: RequestParamType): ApiResponseThenable<ResponseParamType> =>
            {
                return this.postToGetResponseFromApi<RequestParamType, ResponseParamType>(
                    apiMethodName,
                    apiRequestContentType,
                    requestParam);
            };
        return api;
    }

    ////////////////////////////////////////////////
    // @事件节点
    ////////////////////////////////////////////////

    protected didTransformRequest(
        data: any,
        headers: AxiosResponseHeaders,
        statusCode?: number): string | ArrayBuffer | Buffer | null
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
}