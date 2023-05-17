import { JsonUtil } from "@baoxia/utils.javascript";

export class ApiResponseInfo<ResponseDataType>
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    error: any;

    data: ResponseDataType | null;

    response: any;

    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor(
        error: any = null,
        data: ResponseDataType | string | null = null,
        response: any = null)
    {
        this.error = error;

        if (typeof data === "string")
        {
            data = JsonUtil.parse<ResponseDataType>(data);
        }
        this.data = data;
        this.response = response;
    }
}