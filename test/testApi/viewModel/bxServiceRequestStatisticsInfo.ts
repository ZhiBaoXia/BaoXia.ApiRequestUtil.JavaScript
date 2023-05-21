import { DateTime } from "@baoxia/utils.javascript";

export class BxServiceRequestStatisticsInfo extends Response
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    requestType?: number;
    statisticsTimeInSecond?: DateTime;
    requestsCount?: number;
    responsesCount?: number;
    isValid?: boolean;
    milliseconds_0_OfRequestBytesInNeedProcessQueue?: number;
    milliseconds_1_OfDeserializeRequestBytes?: number;
    milliseconds_2_OfRouteRequest?: number;
    milliseconds_3_OfCreateResponseObject?: number;
    milliseconds_4_OfSerializeResponseObject?: number;
    milliseconds_5_OfResponseBytesInNeedSendQueue?: number;
    milliseconds_6_OfSendResponseBytes?: number;
    milliseconds_Total_OfProcessRequest?: number;
}