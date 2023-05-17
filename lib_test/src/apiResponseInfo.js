import { JsonUtil } from "@baoxia/utils.javascript";
export class ApiResponseInfo {
    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////
    constructor(error = null, data = null, response = null) {
        this.error = error;
        if (typeof data === "string") {
            data = JsonUtil.parse(data);
        }
        this.data = data;
        this.response = response;
    }
}
