
import type { DateTime } from "@baoxia/utils.javascript"
import type { ServiceRequestStatisticsInfo } from "./serviceRequestStatisticsInfo.js"

export class ServiceStateReportInfo
{
    serviceName: string | null = null
    serviceNodeName: string | null = null
    serviceDescription: string | null = null

    beginTime: DateTime | null = null
    endTime: DateTime | null = null

    state: number = 0
    stateName: string | null = null

    loadRate: number = 0

    serviceRequestStatisticsInfes: ServiceRequestStatisticsInfo[] | null = null
}