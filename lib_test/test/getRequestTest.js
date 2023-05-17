import { StringUtil, TestCase } from "@baoxia/utils.javascript";
import { TestApiSet } from "./testApiSet.js";
import { TestRequestParamNameAndValue } from "./viewModel/testRequestParamNameAndValue.js";
export class GetRequestTest extends TestCase {
    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////
    constructor() {
        super("GetRequest Test", (assert, assertFalse) => {
            let testApiSet = new TestApiSet();
            ////////////////////////////////////////////////
            testApiSet.getWithParams(new TestRequestParamNameAndValue("name", "value"))
                .then((error, response) => {
                if (StringUtil.isNotEmpty(error)) {
                    alert("接口出错：" + error);
                }
                else {
                    let responseData = response.data;
                    alert("接口正常：" + response);
                }
            });
        });
    }
}
