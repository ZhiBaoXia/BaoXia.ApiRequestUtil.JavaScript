import { StringUtil } from "@baoxia/utils.javascript";
import {ApiSet} from "../src/index.js";

export class TestApiSet extends ApiSet
{
    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    apiUrlRoot = "//test.baoxiaruanjian.com/";
    

    ////////////////////////////////////////////////
    // @实现“ApiSet”
    ////////////////////////////////////////////////

    protected didCreateApiUrlRoot(): string
    {
        return StringUtil.Empty;
    }
}