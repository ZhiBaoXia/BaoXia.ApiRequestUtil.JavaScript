
import { Response } from "./base/response.js"
import { HttpRequestInfo } from "./httpRequestInfo.js"

export class HttpRequestEchoResponse extends Response
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    requestInfo: HttpRequestInfo | null = null;
}