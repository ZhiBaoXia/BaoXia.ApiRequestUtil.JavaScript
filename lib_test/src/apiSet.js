import { Axios } from 'axios';
import { ApiRequestMethod } from './apiRequestMethod.js';
import { ApiResponseThenable } from './apiResponseThenable.js';
import { ApiResponseInfo } from './apiResponseInfo.js';
import { JsonUtil, PathUtil, StringUtil } from '@baoxia/utils.javascript';
import { UriPathDelimiter } from '@baoxia/utils.javascript/lib/constant/uriPathDelimiter.js';
export class ApiSet {
    constructor() {
        ////////////////////////////////////////////////
        // @自身属性
        ////////////////////////////////////////////////
        this.apiSetUrlRoot = null;
        this.isCredentialsEnable = true;
        this.timeoutSeconds = 0;
        this.isBaoXiaJsonSerializerEnable = true;
        this.toCreateAxios = null;
        this.axios = null;
    }
    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////
    getAxios() {
        if (this.axios != null) {
            return this.axios;
        }
        let apiSetUrlRoot;
        {
            let apiUrlRoot = PathUtil.toDirectoryPathFromUriPath(this.apiUrlRoot);
            let apiDirectoryPath = PathUtil.toDirectoryPathFromUriPath(this.apiDirectoryPath);
            //
            apiSetUrlRoot
                = StringUtil.joinStringsWithDelimiter(UriPathDelimiter.Paths, true, apiUrlRoot, apiDirectoryPath);
            //
        }
        this.apiSetUrlRoot = apiSetUrlRoot;
        let timeoutSeconds = this.timeoutSeconds;
        let isCredentialsEnable = this.isCredentialsEnable;
        let toCreateAxios = this.toCreateAxios;
        let axios = toCreateAxios != null
            ? toCreateAxios(apiSetUrlRoot, timeoutSeconds, isCredentialsEnable)
            : null;
        if (axios == null) {
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
        this.axios = axios;
        // !!!
        return this.axios;
    }
    getResponseWithRequestMethod(apiMethodPath, requestMethod, requestParam, callbackSpecified = null) {
        let callback = callbackSpecified != null
            ? callbackSpecified
            : new ApiResponseThenable();
        switch (requestMethod) {
            case ApiRequestMethod.Post:
                {
                    this.getAxios()
                        .post(apiMethodPath, requestParam, {
                        transformRequest: [
                            (data, headers) => {
                                return this.didTransformRequest(data, headers);
                            }
                        ],
                        transformResponse: [
                            (data, headers, statusCode) => {
                                return this.didTransformResponse(data, headers, statusCode);
                            }
                        ]
                    })
                        .then((response) => {
                        let apiResponseInfo = new ApiResponseInfo(null, response.data, response);
                        ////////////////////////////////////////////////                    
                        // !!!
                        callback.setResult(null, apiResponseInfo);
                        // !!!
                        ////////////////////////////////////////////////
                    })
                        .catch((error) => {
                        ////////////////////////////////////////////////                    
                        // !!!
                        callback.setResult(error, null);
                        // !!!
                        ////////////////////////////////////////////////
                    });
                }
                break;
            case ApiRequestMethod.Get:
            default:
                {
                    this.getAxios()
                        .get(apiMethodPath, {
                        params: requestParam,
                        transformRequest: [
                            (data, headers) => {
                                return this.didTransformRequest(data, headers);
                            }
                        ],
                        transformResponse: [
                            (data, headers, statusCode) => {
                                return this.didTransformResponse(data, headers, statusCode);
                            }
                        ]
                    })
                        .then((response) => {
                        let apiResponseInfo = new ApiResponseInfo(null, response.data, response);
                        ////////////////////////////////////////////////                    
                        // !!!
                        callback.setResult(null, apiResponseInfo);
                        // !!!
                        ////////////////////////////////////////////////
                    })
                        .catch((error) => {
                        ////////////////////////////////////////////////                    
                        // !!!
                        callback.setResult(error, null);
                        // !!!
                        ////////////////////////////////////////////////
                    });
                }
                break;
        }
        return callback;
    }
    getResponseFromApi(apiMethodPath, queryParam, callbackSpecified = null) {
        return this.getResponseWithRequestMethod(apiMethodPath, ApiRequestMethod.Get, queryParam, callbackSpecified);
    }
    postToGetResponseFromApi(apiMethodPath, postParams, callbackSpecified = null) {
        return this.getResponseWithRequestMethod(apiMethodPath, ApiRequestMethod.Post, postParams, callbackSpecified);
    }
    get(apiMethodName) {
        let api = (requestParam) => {
            return this.getResponseFromApi(apiMethodName, requestParam);
        };
        return api;
    }
    post(apiMethodName) {
        let api = (requestParam) => {
            return this.postToGetResponseFromApi(apiMethodName, requestParam);
        };
        return api;
    }
    ////////////////////////////////////////////////
    // @事件节点
    ////////////////////////////////////////////////
    didTransformRequest(data, headers, statusCode) {
        return data;
    }
    didTransformResponse(data, headers, statusCode) {
        if (data == null
            || typeof data == undefined) {
            return data;
        }
        if (!this.isBaoXiaJsonSerializerEnable) {
            return data;
        }
        let dataTypeName = typeof data;
        if (dataTypeName === "string"
            || dataTypeName == "object") {
            return JsonUtil.parseOrConvertValue(data);
        }
        return data;
    }
}
