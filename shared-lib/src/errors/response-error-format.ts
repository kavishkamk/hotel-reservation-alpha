import { ErrorTypes } from "./error-types";

class ResponseErrorFormat {

    constructor(
        public errors: { message: string; field?: string | undefined; }[],
        public errorType: ErrorTypes
    ) { };
};

export { ResponseErrorFormat };