import type { DateTime } from "@baoxia/utils.javascript";

export class IndexRequest
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    public reportBeginTime: DateTime | null = null;

    public reportEndTime: DateTime | null = null;

    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor(
        reportBeginTime: DateTime | null = null,
        reportEndTime: DateTime | null = null)
    {
        this.reportBeginTime = reportBeginTime;
        this.reportEndTime = reportEndTime;
    }
}