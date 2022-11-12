# auth service

## Error format
- this format defined on [@alpha-lib/shared-lib](https://www.npmjs.com/package/@alpha-lib/shared-lib)

```
 {
    errors: {message: string; field?: string}[],
    errorType: ErrorTypes
 }
```

## routes

### sign-up
- POST request
- if user creation success this send email with activation email to given email address
```
    POST -> api/users/signup
```

```
    {
        firstName: string;
        lastName: string;
        email: string;
        contactNumber: string;
        address: string;
        password: string;
        profileURL?: string;
    }
```

- response (201 status code) - created user success \
\* but user account not activated \*
```
    {
        userId: string;
        firstName: string;
        lastName: string;
        email: string;
        contactNumber: string;
        address: string;
        profileURL?: string;
        activeStatus: Boolean;
    }
```

### Error Response

- response NOT_ACTIVATED_ACCOUNT (401 -> Account is not activated)

-  response EXISTING_USER (422 -> Signup Fail, User Alrady Exist, Please use another email) 

-  response INPUT_VALIDATION_ERROR (422 -> Input validation Error) 

### sign-in
- POST request
- if user cridentias ok return the JWT token in cookie
```
    POST -> api/users/signin
```

```
    {
        email: string;
        password: string;
    }
```
- response (200 status code) - if login success \
```
    {
        userId: string;
        firstName: string;
        lastName: string;
        email: string;
        contactNumber: string;
        address: string;
        profileURL?: string;
        activeStatus: Boolean;
    }
```

### Error Response

- response NOT_AUTHERIZED (401 -> Login fail)

- response NOT_ACTIVATED_ACCOUNT (401 -> Account is not activated)

-  response INPUT_VALIDATION_ERROR (422 -> Input validation Error) 


### request account activation otp

- PATCH request
- if user cridentias ok return the JWT token in cookie
```
    PATCH -> api/users/requestactivation
```

```
    {
        email: string;
    }
```
- response (200 status code) - if otp send success
```
    {
        message: "Send OTP Success. Plase check your mail box"
    }
```

### Error Response

- response NOT_FOUND (404 -> User Account not found)

- response INPUT_VALIDATION_ERROR (422 -> Input validation Error) 

- response ALREADY_ACTIVATED_ACCOUN (422 -> Input validation Error)

### request for currentUser

- GET request
- for get the current user
```
    GET -> api/users/currentuser
```

- response (200 status code) 
```
    { 
        id: string;
        email: string;
    } 
        or 
    null
```

### request for signout

- POST request
- for signout and unset cookie
```
    POST -> api/users/signout
```

```
    { }
```
- response (200 status code) 
```
    { }
```


### request for activate account
- PATCH request
- if activation success return JWT in cookie

```
    PATCH -> api/users/activate
```
```
    {
        email: string;
        otpCode: number;
    }
```
- response (200 status code) - if account activated success

```
    {
       userId: string;
        firstName: string;
        lastName: string;
        email: string;
        contactNumber: string;
        address: string;
        profileURL?: string;
        activeStatus: Boolean;
    }
```

### Error Response

- response NOT_FOUND (404 -> User Account not found)

- response NOT_FOUND (404 -> OTP not found in DB)

- response INPUT_VALIDATION_ERROR (422 -> Input validation Error) 

- response NOT_AUTHERIZED (422 -> Wrong OTP code)