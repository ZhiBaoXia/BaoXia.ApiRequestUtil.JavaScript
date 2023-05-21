import { DateTime, StringUtil, TestCase } from "@baoxia/utils.javascript";
import { BxServiceStateReport } from "./testApi/bxServiceStateReport.js";
import { BxServiceStateReportRequest } from "./testApi/viewModel/bxServiceStateReportRequest.js";
export class GetRequestTest extends TestCase {
    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////
    constructor() {
        super("GetRequest Test", (assert, assertFalse) => {
            ////////////////////////////////////////////////
            // @HttpRequestEchoApiSet
            ////////////////////////////////////////////////
            // let httpRequestEcho = new HttpRequestEcho();
            // httpRequestEcho.getWithParams(
            //     new TestRequestParamNameAndValue(
            //         "name",
            //         "value"))
            //     .then((error, response) =>
            //     {
            //         if (StringUtil.isNotEmpty(error))
            //         {
            //             console.log("HttpRequestEcho，请求失败：" + error);
            //         }
            //         else
            //         {
            //             let responseData = response!.data;
            //             {}
            //             console.log("HttpRequestEcho，请求正常：" + responseData);
            //         }
            //     });
            ////////////////////////////////////////////////
            // @BxServiceStateReport
            ////////////////////////////////////////////////
            let bxServiceStateReport = new BxServiceStateReport();
            let now = DateTime.now;
            bxServiceStateReport.getReport(new BxServiceStateReportRequest(now.addSeconds(-1), now))
                .then((error, response) => {
                if (StringUtil.isNotEmpty(error)) {
                    console.log("BxServiceStateReport，请求失败：" + error);
                    assertFalse(true);
                }
                else {
                    let responseData = response.data;
                    { }
                    console.log("BxServiceStateReport，请求正常：" + responseData);
                }
            });
        });
    }
}
