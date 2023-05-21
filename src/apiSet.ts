import { Axios, AxiosResponseHeaders } from 'axios'
import { ApiRequestMethod } from './apiRequestMethod.js';
import { ApiResponseThenable } from './apiResponseThenable.js';
import { ApiResponseInfo } from './apiResponseInfo.js';
import { JsonUtil, ObjectUtil, PathUtil, StringUtil } from '@baoxia/utils.javascript'
import { UriPathDelimiter } from '@baoxia/utils.javascript/lib/constant/uriPathDelimiter.js';

export abstract class ApiSet
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    protected abstract readonly apiUrlRoot: string;

    protected abstract readonly apiDirectoryPath: string;

    protected apiSetUrlRoot: string | null = null;

    protected isCredentialsEnable: boolean = true;

    protected timeoutSeconds: number = 0;

    protected isBaoXiaJsonSerializerEnable: boolean = true;

    protected toCreateAxios: ((
        apiDirectoryPath: string,
        timeoutSeconds: number,
        isCredentialsEnable: boolean) => Axios) | null = null;

    protected axios: Axios | null = null;

    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    protected getAxios(): Axios
    {
        if (this.axios != null)
        {
            return this.axios;
        }

        let apiSetUrlRoot: string;
        {
            let apiUrlRoot
                = PathUtil.toDirectoryPathFromUriPath(this.apiUrlRoot);
            let apiDirectoryPath
                = PathUtil.toDirectoryPathFromUriPath(this.apiDirectoryPath);
            //
            apiSetUrlRoot
                = StringUtil.joinStringsWithDelimiter(
                    UriPathDelimiter.Paths,
                    true,
                    apiUrlRoot,
                    apiDirectoryPath);
            //
        }
        this.apiSetUrlRoot = apiSetUrlRoot;

        let timeoutSeconds = this.timeoutSeconds;
        let isCredentialsEnable = this.isCredentialsEnable;
        let toCreateAxios = this.toCreateAxios;

        let axios = toCreateAxios != null
            ? toCreateAxios(
                apiSetUrlRoot,
                timeoutSeconds,
                isCredentialsEnable)
            : null;
        if (axios == null)
        {
            axios = new Axios({
                // Api请求URL的根目录：
                baseURL: apiSetUrlRoot,
                // 默认的请求超时毫秒数：
                timeout: 1000 * timeoutSeconds,
                // 默认使用Cookie参数：
                withCredentials: isCredentialsEnable
            });
        }
        // !!!
        this.axios = axios!;
        // !!!
        return this.axios;
    }

    private getResponseWithRequestMethod<RequestParamType, ResponseParamType>(
        apiMethodPath: string,
        requestMethod: string,
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
                    this.getAxios()
                        .post(
                            apiMethodPath,
                            requestParam,
                            {
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
        }
        return callback;
    }

    protected getResponseFromApi<RequestParamType, ResponseParamType>(
        apiMethodPath: string,
        queryParam: RequestParamType,
        callbackSpecified: ApiResponseThenable<ResponseParamType> | null = null)
        : ApiResponseThenable<ResponseParamType>
    {
        return this.getResponseWithRequestMethod(
            apiMethodPath,
            ApiRequestMethod.Get,
            queryParam,
            callbackSpecified);
    }

    protected postToGetResponseFromApi<RequestParamType, ResponseParamType>(
        apiMethodPath: string,
        postParams: RequestParamType,
        callbackSpecified: ApiResponseThenable<ResponseParamType> | null = null)
        : ApiResponseThenable<ResponseParamType>
    {
        return this.getResponseWithRequestMethod(
            apiMethodPath,
            ApiRequestMethod.Post,
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

    protected post<RequestParamType, ResponseParamType>(apiMethodName: string)
        : ((requestParam: RequestParamType) => ApiResponseThenable<ResponseParamType>)
    {
        let api
            = (requestParam: RequestParamType): ApiResponseThenable<ResponseParamType> =>
            {
                return this.postToGetResponseFromApi<RequestParamType, ResponseParamType>(
                    apiMethodName,
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
        statusCode?: number): any
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
            return JsonUtil.parseOrConvertValue<ResponseParamType>(data);
        }
        return data;
    }
}