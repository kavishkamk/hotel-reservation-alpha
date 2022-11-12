import { ValidationError } from "express-validator";

import { CustomError } from "./custom-error";
import { ErrorTypes } from "./error-types";

export class RequestValidationError extends CustomError {

    errorType: ErrorTypes = ErrorTypes.INPUT_VALIDATION_ERROR;

    constructor(public statusCode: number, private validationErrors: ValidationError[]) {
        super("Validation Error");

        Object.setPrototypeOf(this, RequestValidationError.prototype);
    };

    public serializeErrors(): { message: string; field?: string | undefined; }[] {
        return this.validationErrors.map(err => {
            return { message: err.msg, field: err.param }
        });
    };
}