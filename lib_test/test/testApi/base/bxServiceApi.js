import { ApiSet } from "../../../src/index.js";
export class BxServiceApi extends ApiSet {
    constructor() {
        ////////////////////////////////////////////////
        // @自身实现
        ////////////////////////////////////////////////
        super(...arguments);
        this.apiUrlRoot = "//127.0.0.1:8081";
    }
}
