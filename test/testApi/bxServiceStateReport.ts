import { BxServiceApi } from "./base/bxServiceApi.js";
import { BxServiceStateReportRequest } from "./viewModel/bxServiceStateReportRequest.js"
import { BxServiceStateReportResponse } from "./viewModel/bxServiceStateReportResponse.js"


export class BxServiceStateReport extends BxServiceApi
{
    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    protected apiDirectoryPath: string = "/bxServiceStateReport";

    getReport = this.get<BxServiceStateReportRequest, BxServiceStateReportResponse>("index");

}