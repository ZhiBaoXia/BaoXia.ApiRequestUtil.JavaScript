import { AxiosHeaders, AxiosRequestHeaders, RawAxiosRequestHeaders } from "axios";
import { ApiService } from "../../../../src/index.js";

export abstract class BaoXiaTestServiceApi extends ApiService
{
	////////////////////////////////////////////////
	// @自身实现
	////////////////////////////////////////////////

	// apiUrlRootPath = "//testtools.baoxiaruanjian.com/";
	apiUrlRootPath = "https://testtools.baoxiaruanjian.com/";

	////////////////////////////////////////////////
	// @重载
	////////////////////////////////////////////////

	protected didTransformRequestHeaders(headers: RawAxiosRequestHeaders | AxiosHeaders)
		: RawAxiosRequestHeaders | AxiosHeaders
	{
		var baseResult = super.didTransformRequestHeaders(headers);

		// !!!
		headers["BxApi-Transform-Request-Headers-01"] = "Transform-Request-Headers-01";
		headers["BxApi-Transform-Request-Headers-02"] = "Transform-Request-Headers-02";
		// !!!

		return baseResult;
	}

	protected didTransformRequest(
		data: any,
		headers: AxiosRequestHeaders)
		: string | ArrayBuffer | Buffer | null
	{
		var baseResult = super.didTransformRequest(data, headers);

		// !!!
		headers["BxApi-Shop-Identity"] = "BaoXia_ApiRequestUtil_JavaScript";
		headers["BxApi-Transform-Request-Headers-02"] = "Transform-Request-Headers-02*";
		// !!!

		return baseResult;
	}
}