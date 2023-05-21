
import { Response } from "./base/response.js";
import { BxServiceStateReportInfo } from "./bxServiceStateReportInfo.js"

export class BxServiceStateReportResponse extends Response
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    serviceStateReportInfo?: BxServiceStateReportInfo;
}