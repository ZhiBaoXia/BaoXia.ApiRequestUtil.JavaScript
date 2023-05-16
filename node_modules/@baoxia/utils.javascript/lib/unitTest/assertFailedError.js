export class AssertFailedError extends Error {
    constructor() {
        super("断言失败");
    }
}
