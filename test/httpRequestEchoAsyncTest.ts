import { DateTime, StringUtil } from "@baoxia/utils.javascript";
import { TestCaseAsync } from "@baoxia/utils.javascript/lib/unitTest/testCaseAsync.js";
import { HttpRequestEchoAsync } from "./testApi/baoXiaTestService/httpRequestEchoAsync.js";
import { NameAndValueParam } from "./testApi/baoXiaTestService/viewModel/namAndValueParam.js";

export class HttpRequestEchoAsyncTest extends TestCaseAsync
{
	////////////////////////////////////////////////
	// @自身实现
	////////////////////////////////////////////////

	constructor()
	{
		super("HttpRequestEchoAsync Test",
			async (assert, assertFalse) =>
			{
				let httpRequestEchoAsync = new HttpRequestEchoAsync();

				////////////////////////////////////////////////
				// @Get 请求
				////////////////////////////////////////////////
				var response = await httpRequestEchoAsync.getWithParamsAsync(
					new NameAndValueParam(
						"测试请求参数名称",
						"测试请求参数值",
						DateTime.Now));
				if (response.error != null)
				{
					console.log("HttpRequestEcho.getWithParamsAsync，请求失败。", response.error);
				}
				else
				{
					let responseData = response!.data;
					{ }
					console.log("HttpRequestEcho.getWithParamsAsync，请求正常：" + JSON.stringify(responseData));
				}

				////////////////////////////////////////////////
				// @Get 请求，无参数
				////////////////////////////////////////////////
				response = await httpRequestEchoAsync.getWithoutParamsAsync();
				if (response.error != null)
				{
					console.log("HttpRequestEcho.getWithoutParamsAsync，请求失败。", response.error);
				}
				else
				{
					let responseData = response!.data;
					{ }
					console.log("HttpRequestEcho.getWithoutParamsAsync，请求正常：" + JSON.stringify(responseData));
				}


				////////////////////////////////////////////////
				// @Post 请求
				////////////////////////////////////////////////
				response = await httpRequestEchoAsync.postWithParamsAsync(
					new NameAndValueParam(
						"测试请求参数名称",
						"测试请求参数值"));
				if (response.error != null)
				{
					console.log("HttpRequestEcho.postWithParamsAsync，请求失败。", response.error);
				}
				else
				{
					let responseData = response!.data;
					{ }
					console.log("HttpRequestEcho.postWithParamsAsync，请求正常：" + JSON.stringify(responseData));
				}


				////////////////////////////////////////////////
				// @Post 请求，无参数。
				////////////////////////////////////////////////
				response = await httpRequestEchoAsync.postWithoutParamsAsync();
				if (response.error != null)
				{
					console.log("HttpRequestEcho.postWithParamsAsync，请求失败。", response.error);
				}
				else
				{
					let responseData = response!.data;
					{ }
					console.log("HttpRequestEcho.postWithParamsAsync，请求正常：" + JSON.stringify(responseData));
				}
			});
	}
}