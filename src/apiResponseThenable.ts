
import {Thenable} from '@baoxia/utils.javascript';
import type { ApiResponseInfo } from './apiResponseInfo.js';

export class ApiResponseThenable<ResponseParamType> 
    extends Thenable<string | null, ApiResponseInfo<ResponseParamType>>
{}
export default ApiResponseThenable;