import { StringUtil } from "@baoxia/utils.javascript";
import { BaoXiaTestToolHttpRequestEchoApi } from "./base/baoXiaTestToolHttpRequestEchoApi.js";
import { BaoXiaTestToolHttpResponse } from "./viewModel/baoXiaTestToolHttpResponse.js";
import { TestRequestParamNameAndValue } from "./viewModel/testRequestParamNameAndValue.js";

export class TestApiSet extends BaoXiaTestToolHttpRequestEchoApi
{
    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    protected apiDirectoryPath: string = "/httpRequestEcho";

    getWithParams = this.get<TestRequestParamNameAndValue, BaoXiaTestToolHttpResponse>("index");

    postWithParams = this.post<TestRequestParamNameAndValue, BaoXiaTestToolHttpResponse>("index");
}