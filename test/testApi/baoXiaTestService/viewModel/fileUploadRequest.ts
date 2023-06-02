import { DateTime } from "@baoxia/utils.javascript";
import { File } from "buffer";

export class FileUploadRequest
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    boolValue: boolean;

    intValue: number;

    floatValue: number;

    doubleValue: number;

    stringValue: string;

    dateTimeValue: DateTime;

    fileValue: File | null;

    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor(
        fileValue: File | null = null,
        boolValue: boolean = true,
        intValue: number = 1,
        floatValue: number = 2.2,
        doubleValue: number = 3.3,
        stringValue: string = "Abc",
        dateTimeValue: DateTime = DateTime.now)
    {
        this.fileValue = fileValue;
        this.boolValue = boolValue;
        this.intValue = intValue;
        this.floatValue = floatValue;
        this.doubleValue = doubleValue;
        this.stringValue = stringValue;
        this.dateTimeValue = dateTimeValue;
    }
}