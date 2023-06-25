
import type { Response } from "./base/response.js"
import type { ServiceStateReportInfo } from "./serviceStateReportInfo.js"

export interface IndexResponse extends Response
{
    serviceStateReportInfo: ServiceStateReportInfo | null
}