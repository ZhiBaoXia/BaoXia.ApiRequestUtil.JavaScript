import { AxiosRequestHeaders } from "axios";
import { ApiService } from "../../../../src/index.js";

export abstract class BaoXiaTestServiceApi extends ApiService
{
	////////////////////////////////////////////////
	// @自身实现
	////////////////////////////////////////////////

	apiUrlRootPath = "//testtools.baoxiaruanjian.com/";

	////////////////////////////////////////////////
	// @重载
	////////////////////////////////////////////////

	protected didTransformRequest(
		data: any,
		headers: AxiosRequestHeaders)
		: string | ArrayBuffer | Buffer | null
	{
		var baseResult = super.didTransformRequest(data, headers);

		// !!!
		headers["BxApi-Shop-Identity"] = "BaoXia_ApiRequestUtil_JavaScript";
		// !!!

		return baseResult;
	}
}