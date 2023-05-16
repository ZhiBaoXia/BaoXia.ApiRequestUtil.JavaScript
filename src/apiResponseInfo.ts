
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
        data: ResponseDataType | null = null,
        response: any = null)
    {
        this.error = error;
        this.data = data;
        this.response = response;
    }
}