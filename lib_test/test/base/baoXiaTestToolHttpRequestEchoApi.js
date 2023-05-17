// //testtools.baoxiaruanjian.com/httpRequestEcho
import { ApiSet } from "../../src/index.js";
export class BaoXiaTestToolHttpRequestEchoApi extends ApiSet {
    constructor() {
        ////////////////////////////////////////////////
        // @自身实现
        ////////////////////////////////////////////////
        super(...arguments);
        this.apiUrlRoot = "//testtools.baoxiaruanjian.com/";
    }
}
