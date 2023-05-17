import { BaoXiaTestToolHttpRequestEchoApi } from "./base/baoXiaTestToolHttpRequestEchoApi.js";
export class TestApiSet extends BaoXiaTestToolHttpRequestEchoApi {
    constructor() {
        ////////////////////////////////////////////////
        // @自身实现
        ////////////////////////////////////////////////
        super(...arguments);
        this.apiDirectoryPath = "/httpRequestEcho";
        this.getWithParams = this.get("index");
        this.postWithParams = this.post("index");
    }
}
