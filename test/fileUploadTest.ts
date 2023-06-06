import { StringUtil, DateTime, TestCase } from "@baoxia/utils.javascript"
import { FileUploadTest as FileUploadTestApi } from "./testApi/baoXiaTestService/fileUploadTest.js"
import { FileUploadRequest } from "./testApi/baoXiaTestService/viewModel/fileUploadRequest.js";
import { File } from "buffer";
import fs from "fs";

export class FileUploadTest extends TestCase
{
    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor()
    {
        super("FileUpload Test",
            (assert, assertFalse) =>
            {
                let fileUploadTestApi = new FileUploadTestApi();
                let testImageFile = fs.readFileSync('./test/asset/test_01.webp');
                fileUploadTestApi.upload(new FileUploadRequest(
                    new File(testImageFile as any, "test.jpg"),
                    true,
                    1,
                    2.0,
                    3.0,
                    "Abc",
                    DateTime.Now))
                    .then((error, response) =>
                    {
                        if (StringUtil.isNotEmpty(error))
                        {
                            console.log("FileUploadTestApi.upload，上传失败：" + error);
                        }
                        else
                        {
                            let responseData = response!.data;
                            { }
                            console.log("FileUploadTestApi.upload，上传正常：" + JSON.stringify(responseData));
                        }
                    });
            });
    }
}