# This is the shared libreary ([@alpha-lib/shared-lib](https://www.npmjs.com/package/@alpha-lib/shared-lib))

- install with yarn
```
    yarn add @alpha-lib/shared-lib
```

- install with npm
```
    npm install @alpha-lib/shared-lib
```

## Error Format

```
 {
    errors: {message: string; field?: string}[],
    errorType: ErrorTypes
 }
```


## ErrorTypes

```
NOT_ACTIVATED_ACCOUNT = "User Account Not Activated",
EXISTING_USER = "User already exists",
INPUT_VALIDATION_ERROR = "Input Validation Error",
INTERNAL_SERVER_ERROR = "Internal Server Error",
NOT_FOUND = "not found",
NOT_AUTHERIZED = "Unautherized Activity",
ALREADY_ACTIVATED_ACCOUNT = "Already Activated Account"
```

## contenet of the libreary

### error handling
- comman error class 
```
    CommonError(statusCode: number, errorTypes: ErrorTypes, errorMessage: string)
```
```
import {CommonError} from "@alpha-lib/shared-lib"

new CommonError(404, ErrorTypes.NOT_FOUND, "route not found");
```
- request validation class - return  INPUT_VALIDATION_ERROR\
this method return the formatted error message for the "[express-validator](https://express-validator.github.io/docs/)" error result
```
import {RequestValidationError} from "@alpha-lib/shared-lib"
import { validationResult } from "express-validator";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

        if (!errors.isEmpty()) {
        return next(new RequestValidationError(422, errors.array()));
    }
}
```

### middleware
- handled unhandled routes \
\* this middleware should add after all the routes \* \
becase this middleware catch all the routes and return a error as "Could not found this route"
```
import express from "express";
import { unhandledRouteMiddleware } from "@alpha-lib/shared-lib";

const app = express();

app.use(unhandledRouteMiddleware);
```
- default error handling \
this middleware catch the all the errors and send as a formatted error
```
import express from "express";
import { errorMiddleware } from "@alpha-lib/shared-lib";

const app = express();

app.use(errorMiddleware);
```
- validation result handling \
    this middleware use to handle the "[express-validator](https://express-validator.github.io/docs/)" validationResult \
    this middleware should use after setting the validations

```
    import { Router } from "express";
    import { body } from "express-validator";
    import { requestValidationMiddleware } from "@alpha-lib/shared-lib";

    const router = Router();

    router.post(
        "/", 
        [
            body("email")
                .isEmail()
                .normalizeEmail()
        ],
        requestValidationMiddleware
    );
```

- current-user-middleware \
this middleware used to get the current user details that are attached to jwt token in session \
in the session has jwt token (req.session.jwt) verify user and then set payload as req.currentUser\
if not set jwt, return to next middleware through the next();
```
import express from "express";
import { currentUserMiddleware } from "@alpha-lib/shared-lib";

const app = express();

app.use(currentUserMiddleware);
```
- require auth middleware \
this meddileware check if user logged in or not and if not logged in return "Not Autherized" error with "401"status Code
** before run this it's required to run currentUserMiddleware **
```
import express from "express";
import { currentUserMiddleware, requireAuthMiddleware } from "@alpha-lib/shared-lib";

const app = express();

app.use(currentUserMiddleware, requireAuthMiddleware);
```

- file upload middleware

this add image to "upload/images" folder. This folder should create in the server

```
    router.post(
        "/signup",
        fileUpload.single("profilePic")
    );

    const filePath = req.file.path;
```