import { DateTime } from "@baoxia/utils.javascript";

export class NameAndValueParam
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    name: string | null;

    value: any | null;

    dateTime:DateTime | null;

    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor(
        name: string | null = null,
        value: any | null = null,
        dateTime:DateTime | null = null)
    {
        this.name = name;
        this.value = value;
        this.dateTime = dateTime;
    }
}