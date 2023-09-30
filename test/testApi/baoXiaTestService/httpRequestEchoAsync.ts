import { BaoXiaTestServiceApi } from "./base/baoXiaTestServiceApi.js";
import { HttpRequestEchoResponse } from "./viewModel/httpRequestEchoResponse.js";
import { NameAndValueParam } from "./viewModel/namAndValueParam.js";

export class HttpRequestEchoAsync extends BaoXiaTestServiceApi
{
	////////////////////////////////////////////////
	// @自身实现
	////////////////////////////////////////////////

	protected apiDirectoryPath: string = "/httpRequestEcho";

	getWithParamsAsync = this.getAsync<NameAndValueParam, HttpRequestEchoResponse>("index");

	getWithoutParamsAsync = this.getAsync<object, HttpRequestEchoResponse>("index");

	postWithParamsAsync = this.postAsync<NameAndValueParam, HttpRequestEchoResponse>("index");

	postWithoutParamsAsync = this.postAsync<object, HttpRequestEchoResponse>("index");
}