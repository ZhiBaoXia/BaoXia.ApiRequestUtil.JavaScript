import { BxServiceApi } from "./base/bxServiceApi.js";
export class BxServiceStateReport extends BxServiceApi {
    constructor() {
        ////////////////////////////////////////////////
        // @自身实现
        ////////////////////////////////////////////////
        super(...arguments);
        this.apiDirectoryPath = "/bxServiceStateReport";
        this.getReport = this.get("index");
    }
}
