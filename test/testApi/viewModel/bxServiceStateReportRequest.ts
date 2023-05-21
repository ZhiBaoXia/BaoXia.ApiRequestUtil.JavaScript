import { DateTime } from "@baoxia/utils.javascript";

export class BxServiceStateReportRequest
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    reportBeginTime:DateTime;

    reportEndTime:DateTime;

    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor(reportBeginTime:DateTime,reportEndTime:DateTime)
    {
        this.reportBeginTime = reportBeginTime;
        this.reportEndTime = reportEndTime;
    }
}