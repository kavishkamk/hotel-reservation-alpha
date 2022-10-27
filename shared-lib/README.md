# This is the shared libreary ([@alpha-lib/shared-lib](https://www.npmjs.com/package/@alpha-lib/shared-lib))

- install with yarn
```
    yarn add @alpha-lib/shared-lib
```

- install with npm
```
    npm install @alpha-lib/shared-lib
```

## contenet of the libreary

### error handling
- comman error class \
```
import {CommonError} from "@alpha-lib/shared-lib"

new CommonError(404, "route not found");
```
- request validation class \
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
