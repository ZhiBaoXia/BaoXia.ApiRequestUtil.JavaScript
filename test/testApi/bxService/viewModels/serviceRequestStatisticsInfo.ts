import type { DateTime } from "@baoxia/utils.javascript";

export class ServiceRequestStatisticsInfo  {
    requestType:number = 0
    statisticsTimeInSecond:DateTime | null = null
    requestsCount: number = 0
    responsesCount: number = 0
    
    milliseconds_0_OfRequestBytesInNeedProcessQueue: number = 0
    milliseconds_1_OfDeserializeRequestBytes: number = 0
    milliseconds_2_OfRouteRequest: number = 0
    milliseconds_3_OfCreateResponseObject: number = 0
    milliseconds_4_OfSerializeResponseObject: number = 0
    milliseconds_5_OfResponseBytesInNeedSendQueue: number = 0
    milliseconds_6_OfSendResponseBytes: number = 0
    milliseconds_Total_OfProcessRequest: number = 0
}