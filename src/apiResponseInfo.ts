import { JsonUtil } from "@baoxia/utils.javascript";

export class ApiResponseInfo<ResponseDataType>
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    public error: any;

    public data: ResponseDataType | null;

    public response: any;

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