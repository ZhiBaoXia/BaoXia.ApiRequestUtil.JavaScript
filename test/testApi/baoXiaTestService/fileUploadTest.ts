import { StringUtil } from "@baoxia/utils.javascript";
import { BaoXiaTestServiceApi } from "./base/baoXiaTestServiceApi.js";
import { FileUploadRequest } from "./viewModel/fileUploadRequest.js";
import { FileUploadResponse } from "./viewModel/fileUploadResponse.js";
import { ApiRequestContentType } from "../../../src/apiRequestContentType.js";

export class FileUploadTest extends BaoXiaTestServiceApi
{
    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    protected apiDirectoryPath: string = "/fileUploadTest";

    upload = this.post<FileUploadRequest, FileUploadResponse>(
        "index",
        ApiRequestContentType.FormData);

}