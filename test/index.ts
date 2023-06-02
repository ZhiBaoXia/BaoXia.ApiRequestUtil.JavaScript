import { TestProject } from "@baoxia/utils.javascript";
import { HttpRequestEchoTest } from "./httpRequestEchoTest.js";
import { FileUploadTest } from "./fileUploadTest.js";

let testProject = new TestProject(
    "BaoXia.ApiRequestUtil.Javascript",
    [
        new HttpRequestEchoTest(),
        new FileUploadTest()
        
    ]);
// !!!
testProject.test();
// !!!