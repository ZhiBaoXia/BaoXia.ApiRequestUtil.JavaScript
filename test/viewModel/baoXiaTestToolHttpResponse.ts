
import { BaoXiaTestToolHttpRequestInfo } from "./baoXiaTestToolHttpRequestInfo.js"

export class BaoXiaTestToolHttpResponse
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    error: string | null = null;

    errorDescription: any | null = null;

    requestInfo: BaoXiaTestToolHttpRequestInfo | null = null;
}