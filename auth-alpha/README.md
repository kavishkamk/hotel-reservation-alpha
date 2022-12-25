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

### 1. sign-up
- POST request
- if user creation success create deactivated account
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
        nicNumber: string;
        profilePic?: -;
        isAdmin?: boolaen;
    }
```

- response (201 status code) - created user success \
\* but user account not activated \*
```
    {
        user: {
            userId: string;
            firstName: string;
            lastName: string;
            email: string;
            contactNumber: string;
            address: string;
            profileURL?: string;
            activeStatus: Boolean;
            nicNumber: string;
            isAdmin?: boolaen;
        }
    }
```

### Error Response

- response NOT_ACTIVATED_ACCOUNT (401 -> Account is not activated)

- response NOT_AUTHERIZED (401 -> Don't have access to create admin)

-  response EXISTING_USER (422 -> Signup Fail, User Alrady Exist, Please use another email) 

-  response INPUT_VALIDATION_ERROR (422 -> Input validation Error) 

### 2. sign-in
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
        user: {
            userId: string;
            firstName: string;
            lastName: string;
            email: string;
            contactNumber: string;
            address: string;
            profileURL?: string;
            activeStatus: Boolean;
            nicNumber: string;
            isAdmin?: boolaen;
        }
    }
```

### Error Response

- response NOT_AUTHERIZED (401 -> Login fail)

- response NOT_ACTIVATED_ACCOUNT (401 -> Account is not activated)

-  response INPUT_VALIDATION_ERROR (422 -> Input validation Error) 


### 3. request account activation otp

- PATCH request
- if user cridentias ok return the JWT token in cookie
```
    PATCH -> api/users/requestotp
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

### 4. request for currentUser

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

### 5. request for signout

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


### 6. request for activate account
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
        user: {
            userId: string;
            firstName: string;
            lastName: string;
            email: string;
            contactNumber: string;
            address: string;
            profileURL?: string;
            activeStatus: Boolean;
            nicNumber: string;
            isAdmin?: boolaen;
        }
    }
```

### Error Response

- response NOT_FOUND (404 -> User Account not found)

- response NOT_FOUND (404 -> OTP not found in DB)

- response INPUT_VALIDATION_ERROR (422 -> Input validation Error) 

- response NOT_AUTHERIZED (422 -> Wrong OTP code)

### 7. Edit profile 

- PATCH request
- if change the content user should be logged in and in cookies JWT token should be available
- if email change account will be deactivated and OTP will be reserved to new email
- that otp code can used to activate account

```
    PATCH -> api/users/editprofile (with cookie - cookie contain the jwt token)
```

```
    {
        firstName?: string;
        lastName?: string;
        email?: string;
        contactNumber?: string;
        address?: string;
        password?: string;
        newPassword?: string;
        profilePic?: -;
        nicNumber?: string;
    }
```

- response (200 status code) - if account details changed

```
    {
        user: {
            userId: string;
            firstName: string;
            lastName: string;
            email: string;
            contactNumber: string;
            address: string;
            profileURL?: string;
            activeStatus: Boolean;
            nicNumber: string;
            isAdmin?: boolaen;
        }
    }
```

### Error Response

- response NOT_FOUND (404 -> User Account not found)

- response NOT_AUTHERIZED (401 -> Current password incorrect)

- response INPUT_VALIDATION_ERROR (422 -> Input validation Error) 

- response NOT_AUTHERIZED (422 -> Wrong OTP code)

### 8. Image Request

request image


```
api/users/upload/images/${image_name.extention}
```

### 9. create user
- POST request
- if user creation success create active accout (addmin permision required to create account)
```
    POST -> api/users/add-user
```

```
    {
        firstName: string;
        lastName: string;
        email: string;
        contactNumber: string;
        address: string;
        password: string;
        nicNumber: string;
        profilePic?: -;
    }
```

- response (201 status code) - created user account success 
```
    {
        user: {
            userId: string;
            firstName: string;
            lastName: string;
            email: string;
            contactNumber: string;
            address: string;
            profileURL?: string;
            activeStatus: Boolean;
            nicNumber: string;
            isAdmin?: boolaen;
        }
    }
```

### Error Response

- response NOT_AUTHERIZED (401 -> Don't have access to create client account)

- response EXISTING_USER (422 -> Signup Fail, User Alrady Exist, Please use another email) 

- response INPUT_VALIDATION_ERROR (422 -> Input validation Error) 

- response INTERNAL_SERVER_ERROR (500 -> Internal server error, unknown error)

### 10. get users by email

- GET request
- for get the user by email (admin access required)
```
    GET -> api/users/email/${clientEmail}
```

- response (200 status code) - get user account
```
    {
        user: {
            userId: string;
            firstName: string;
            lastName: string;
            email: string;
            contactNumber: string;
            address: string;
            profileURL?: string;
            activeStatus: Boolean;
            nicNumber: string;
            isAdmin?: boolaen;
        }
    }
```

### Error Response

- response NOT_AUTHERIZED (401 -> Don't have access to get user details)

- response NOT_FOUND (404 -> User not found) 

- response INTERNAL_SERVER_ERROR (500 -> Internal server error, unknown error)

### 10. get users count

- GET request
- for get the number of users
```
    GET -> api/users/user-count
```

- response (200 status code) - get number of users
```
    {
        "count": number
    }
```

### Error Response

- response NOT_AUTHERIZED (401 -> Don't have access to get user details)

- response INTERNAL_SERVER_ERROR (500 -> Internal server error, unknown error)