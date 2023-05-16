import  { Axios } from 'axios'
import { ApiRequestMethod } from './apiRequestMethod.js';
import { ApiResponseThenable } from './apiResponseThenable.js';
import { ApiResponseInfo } from './apiResponseInfo.js';

export abstract class ApiSet
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    protected abstract readonly apiUrlRoot: string;

    protected readonly apiDirectoryPath: string;

    protected readonly apiSetUrlRoot: string;

    protected readonly axios: Axios;

    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor(
        apiDirectoryPath: string,
        timeoutSeconds: number = 0,
        isCredentialsEnable: boolean = true,
        toCreateAxios: ((
            apiDirectoryPath: string,
            timeoutSeconds: number,
            isCredentialsEnable: boolean) => Axios) | null = null)
    {
        this.apiUrlRoot = this.didCreateApiUrlRoot();
        this.apiDirectoryPath = apiDirectoryPath;

        let apiUrlRoot = this.apiUrlRoot;
        if (!apiUrlRoot.endsWith("/"))
        {
            apiUrlRoot += "/";
        }
        while (apiDirectoryPath.startsWith("/"))
        {
            apiDirectoryPath = apiDirectoryPath.substring(1);
        }
        if (!apiDirectoryPath.endsWith("/"))
        {
            apiDirectoryPath += "/";
        }
        this.apiSetUrlRoot = apiUrlRoot + apiDirectoryPath;

        let axios = toCreateAxios != null
            ? toCreateAxios(
                apiDirectoryPath, 
                timeoutSeconds,
                isCredentialsEnable)
            : null;
        if (axios == null)
        {
            axios = new Axios({
                // Api请求URL的根目录：
                baseURL: this.apiDirectoryPath,
                // 默认的请求超时毫秒数：
                timeout: 1000 * timeoutSeconds,
                // 默认使用Cookie参数：
                withCredentials: isCredentialsEnable
            })
        }
        this.axios = axios;
    }

    private getResponseWithRequestMethod<RequestParamType, ResponseParamType>(
        apiMethodPath: string,
        requestMethod: string,
        requestParam: RequestParamType,
        callbackSpecified: ApiResponseThenable<ResponseParamType> | null = null)
        : ApiResponseThenable<ResponseParamType>
    {
        while (apiMethodPath.startsWith("/"))
        {
            apiMethodPath = apiMethodPath.substring(1);
        }
        let apiUrlPath = this.apiSetUrlRoot + apiMethodPath;
        let callback
            = callbackSpecified != null
                ? callbackSpecified
                : new ApiResponseThenable<ResponseParamType>();
        switch (requestMethod)
        {
            case ApiRequestMethod.Post:
                {
                    this.axios.post(
                        apiUrlPath,
                        requestParam)
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
                    this.axios.get(
                        apiUrlPath,
                        {
                            params: requestParam
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

    protected get<RequestParamType, ResponseParamType>(apiMethodName:string)
    : ((requestParam: RequestParamType) => ApiResponseThenable<ResponseParamType>)
    {
        var api
        = (requestParam: RequestParamType):ApiResponseThenable<ResponseParamType> =>
        {
            return this.getResponseFromApi<RequestParamType, ResponseParamType>(
                apiMethodName,
                requestParam);
        };
        return api;
    }

    protected post<RequestParamType, ResponseParamType>(apiMethodName:string)
        : ((requestParam: RequestParamType) => ApiResponseThenable<ResponseParamType>)
    {
        var api 
        = (requestParam: RequestParamType):ApiResponseThenable<ResponseParamType>=>
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

    protected abstract didCreateApiUrlRoot(): string;
}