/*
    this class for handle errors with status code and custom message
        - message: string -> error messages
        - statusCode: number -> status code
        - serialize method return the result as a { message: string; field?: string | undefined; }[]
*/

import { CustomError } from "./custom-error";
import { ErrorTypes } from "./error-types";

export class CommonError extends CustomError {

    constructor(public statusCode: number, public errorType: ErrorTypes, message: string) {
        super(message);

        Object.setPrototypeOf(this, CommonError.prototype);
    };

    public serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{ message: this.message }];
    }
}