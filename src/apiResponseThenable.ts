
import { Thenable } from '@baoxia/utils.javascript';
import type { ApiResponseInfo } from './apiResponseInfo.js';
import { AxiosError } from 'axios';

export class ApiResponseThenable<ResponseParamType>
	extends Thenable<AxiosError | null | any, ApiResponseInfo<ResponseParamType>>
{ }
export default ApiResponseThenable;