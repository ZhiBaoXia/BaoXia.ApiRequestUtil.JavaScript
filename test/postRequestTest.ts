import { StringUtil, TestCase } from "@baoxia/utils.javascript"
import { HttpRequestEcho } from "./testApi/httpRequestEcho.js"
import { TestRequestParamNameAndValue } from "./testApi/viewModel/testRequestParamNameAndValue.js";

export class PostRequestTest extends TestCase
{
    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor()
    {
        super("PostRequest Test",
            (assert, assertFalse) =>
            {
                ////////////////////////////////////////////////
                // @HttpRequestEchoApiService
                ////////////////////////////////////////////////

                let httpRequestEcho = new HttpRequestEcho();
                httpRequestEcho.postWithParams(
                    new TestRequestParamNameAndValue(
                        "name",
                        "value"))
                    .then((error, response) =>
                    {
                        if (StringUtil.isNotEmpty(error))
                        {
                            console.log("HttpRequestEcho，请求失败：" + error);
                            assertFalse(true);
                        }
                        else
                        {
                            let responseData = response!.data;
                            {}
                            console.log("HttpRequestEcho，请求正常：" + responseData);
                        }
                    });
            });
    }
}