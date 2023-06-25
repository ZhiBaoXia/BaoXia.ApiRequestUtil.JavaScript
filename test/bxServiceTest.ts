import { DateTime, StringUtil, TestCase } from "@baoxia/utils.javascript"
import { BxServiceStateReport } from "./testApi/bxService/BxServiceStateReport.js"
import { IndexRequest } from "./testApi/bxService/viewModels/indexRequest.js";

export class BxServiceTest extends TestCase
{
    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor()
    {
        super("BxService Test",
            (assert, assertFalse) =>
            {
                let bxService = new BxServiceStateReport();

                ////////////////////////////////////////////////
                // @Get 请求
                ////////////////////////////////////////////////

                let now = new DateTime();
                let requestParam = new IndexRequest(
                    now.dateTimeByAddSeconds(-2.0),
                    now);

                bxService
                    .index(requestParam)
                    .then((response) =>
                    {
                        //
                        console.log("response = " + response);
                        //
                    });
            });
    }
}