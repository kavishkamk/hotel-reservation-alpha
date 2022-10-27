/*
    this is a template for the errors
    for extend this class, statusCode and serializeErrors should be initialized
        statusCode: number => store status code of the error type
        message: string => error message
        serializeErrors: {message: string, field?: string}[] => this method will return error message in this format
*/

export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, CustomError.prototype);
    };

    abstract serializeErrors(): { message: string; field?: string }[];
}