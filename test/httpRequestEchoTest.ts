import { DateTime, StringUtil, TestCase } from "@baoxia/utils.javascript";
import { HttpRequestEcho } from "./testApi/baoXiaTestService/httpRequestEcho.js";
import { NameAndValueParam } from "./testApi/baoXiaTestService/viewModel/namAndValueParam.js";

export class HttpRequestEchoTest extends TestCase
{
	////////////////////////////////////////////////
	// @自身实现
	////////////////////////////////////////////////

	constructor()
	{
		super("HttpRequestEcho Test",
			(assert, assertFalse) =>
			{
				let httpRequestEcho = new HttpRequestEcho();
				let testsCount = 0;

				////////////////////////////////////////////////
				// @Get 请求
				////////////////////////////////////////////////
				httpRequestEcho.getWithParams(
					new NameAndValueParam(
						"测试请求参数名称",
						"测试请求参数值",
						DateTime.Now))
					.then((error, response) =>
					{
						if (error != null)
						{
							console.log("HttpRequestEcho.getWithParams，请求失败。", error);
						}
						else
						{
							let responseData = response!.data;
							{ }
							console.log("HttpRequestEcho.getWithParams，请求正常：" + JSON.stringify(responseData));
						}
						testsCount--;
					});

				////////////////////////////////////////////////
				// @Get 请求，无参数
				////////////////////////////////////////////////
				httpRequestEcho.getWithoutParams()
					.then((error, response) =>
					{
						if (error != null)
						{
							console.log("HttpRequestEcho.getWithoutParams，请求失败。", error);
						}
						else
						{
							let responseData = response!.data;
							{ }
							console.log("HttpRequestEcho.getWithoutParams，请求正常：" + JSON.stringify(responseData));
						}
						testsCount--;
					});

				////////////////////////////////////////////////
				// @Post 请求
				////////////////////////////////////////////////

				httpRequestEcho.postWithParams(
					new NameAndValueParam(
						"测试请求参数名称",
						"测试请求参数值"))
					.then((error, response) =>
					{
						if (error != null)
						{
							console.log("HttpRequestEcho.postWithParams，请求失败。", error);
						}
						else
						{
							let responseData = response!.data;
							{ }
							console.log("HttpRequestEcho.postWithParams，请求正常：" + JSON.stringify(responseData));
						}
					});

				////////////////////////////////////////////////
				// @Post 请求，无参数。
				////////////////////////////////////////////////

				httpRequestEcho.postWithoutParams()
					.then((error, response) =>
					{
						if (error != null)
						{
							console.log("HttpRequestEcho.postWithParams，请求失败。", error);
						}
						else
						{
							let responseData = response!.data;
							{ }
							console.log("HttpRequestEcho.postWithParams，请求正常：" + JSON.stringify(responseData));
						}
					});
			});
	}
}