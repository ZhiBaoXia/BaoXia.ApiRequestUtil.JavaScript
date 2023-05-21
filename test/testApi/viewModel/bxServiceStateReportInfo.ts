
import { DateTime } from "@baoxia/utils.javascript";
import { BxServiceRequestStatisticsInfo } from "./bxServiceRequestStatisticsInfo.js";

export class BxServiceStateReportInfo extends Response
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    beginTime?: DateTime;
    endTime?: string;
    state?: number;
    stateName?: string;
    loadRate?: number;
    serviceRequestStatisticsInfes?: BxServiceRequestStatisticsInfo[];
    serviceName?: string;
    serviceNodeName?: string;
    serviceDescription?: string;
}