
export class TestRequestParamNameAndValue
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    name: string | null = null;

    value: any | null = null;

    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor(
        name: string | null = null,
        value: any | null = null)
    {
        this.name = name;
        this.value = value;
    }
}