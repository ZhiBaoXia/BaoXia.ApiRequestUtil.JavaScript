import { StringUtil } from "@baoxia/utils.javascript";
import { BaoXiaTestServiceApi } from "./base/baoXiaTestServiceApi.js";
import { HttpRequestEchoResponse } from "./viewModel/httpRequestEchoResponse.js";
import { NameAndValueParam } from "./viewModel/namAndValueParam.js";

export class HttpRequestEcho extends BaoXiaTestServiceApi
{
    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    protected apiDirectoryPath: string = "/httpRequestEcho";

    getWithParams = this.get<NameAndValueParam, HttpRequestEchoResponse>("index");

    postWithParams = this.post<NameAndValueParam, HttpRequestEchoResponse>("index");
}