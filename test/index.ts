import { TestProject } from "@baoxia/utils.javascript";
import { BxServiceTest } from "./bxServiceTest.js";
import { HttpRequestEchoAsyncTest } from "./httpRequestEchoAsyncTest.js";
import { HttpRequestEchoTest } from "./httpRequestEchoTest.js";

let testProject = new TestProject(
	"BaoXia.ApiRequestUtil.Javascript",
	[
		new HttpRequestEchoTest(),
		new HttpRequestEchoAsyncTest(),
		// new FileUploadTest(),
		new BxServiceTest()

	]);
// !!!
await testProject.testAsync();
// !!!