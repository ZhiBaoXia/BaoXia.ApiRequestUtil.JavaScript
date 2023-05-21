import { TestProject } from "@baoxia/utils.javascript";
import { GetRequestTest } from "./getRequestTest.js";
import { PostRequestTest } from "./postRequestTest.js";

let testProject = new TestProject(
    "BaoXia.ApiRequestUtil.Javascript",
    [
        new GetRequestTest()
        // ,
        // new PostRequestTest()
    ]);
// !!!
testProject.test();
// !!!