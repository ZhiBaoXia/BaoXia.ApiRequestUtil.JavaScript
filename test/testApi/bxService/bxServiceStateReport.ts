import BxServiceApi from "./bxServiceApi.js";
import type { IndexRequest } from "./viewModels/indexRequest.js";
import type { IndexResponse } from "./viewModels/indexResponse.js";

export class BxServiceStateReport extends BxServiceApi
{

    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    protected apiDirectoryPath: string = "/bxServiceStateReport";


    index = this.post<IndexRequest, IndexResponse>("/index");

}