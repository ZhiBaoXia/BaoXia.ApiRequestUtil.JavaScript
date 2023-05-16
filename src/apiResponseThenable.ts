
import {Thenable} from '@baoxia/utils.javascript/lib/thenable.js';
import type { ApiResponseInfo } from './apiResponseInfo.js';

export class ApiResponseThenable<ResponseParamType> 
    extends Thenable<ApiResponseInfo<ResponseParamType>>
{}