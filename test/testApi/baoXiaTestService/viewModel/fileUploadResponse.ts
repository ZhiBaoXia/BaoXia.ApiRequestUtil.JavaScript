
import { Response } from "./base/response.js"
import { DateTime } from "@baoxia/utils.javascript"

export class FileUploadResponse extends Response
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    boolValue: boolean = false;

    intValue: number = 0.0;

    floatValue: number = 0.0;

    doubleValue: number = 0.0;

    stringValue: string | null = null;

    dateTimeValue: DateTime | null = null;

    fileValueName: string | null = null;

    fileValueBytesCount:number = 0.0;

}