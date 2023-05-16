import { TestCase } from "@baoxia/utils.javascript"
import { TestApiSet } from "./testApiSet.js";

export class GetRequestTest extends TestCase
{
    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor()
    {
        super("GetRequest Test",
            (assert, assertFalse) =>
            {
                let testApiSet = new TestApiSet();

                ////////////////////////////////////////////////

                testApiSet.getWithParams(
                    new TestRequestParamNameAndValue(
                        "name",
                        "value"));
                // testApiSet.getParams

            });
    }
}