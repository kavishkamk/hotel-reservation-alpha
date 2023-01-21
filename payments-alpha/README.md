# payment service
- This related to rooms and tables

## Error format
- this format defined on [@alpha-lib/shared-lib](https://www.npmjs.com/package/@alpha-lib/shared-lib)

```
 {
    errors: {message: string; field?: string}[],
    errorType: ErrorTypes
 }
```

## routes

### 1. get current user ordres
- GET request
- get current user order list

```
    GET -> api/payments/room-type/current-user-orders
```

- response (200 status code) - get record success success \

```
   {
    "roomOrders": []
   }
```

### Error Response

- response NOT_AUTHERIZED (401 -> Shoud be logged)

- response INTERNAL_SERVER_ERROR (500 -> Internal server error)

### 2. create a payment
- POST request
- make a payment (payment slip should be uploaded)

```
    POST -> api/payments/room-type
```
```
   {
      "paymentSlip": ..... ,
      "orderId": "63a848c66ed4456761c89388"
   }
```

- response (201 status code) - create payment success 

```
   {
      "payment": {
         "orderId": string;
         "slipUrl": string;
         "isConfirmed": boolean;
         "__v": number;
         "id": string;
      }
   }
```

### Error Response

- response NOT_AUTHERIZED (401 -> Shoud be logged, You don't have permision to make payment. only order created user can)

- response INTERNAL_SERVER_ERROR (500 -> Internal server error)

-  response INPUT_VALIDATION_ERROR (422 -> Input validation Error) 

- response BAD_REQUEST (400 -> Payment slip not submitted, Order already cancelled, Already uploaded the payment slip, Already Payment compleated, )

- response NOT_FOUND (404 -> Order not found)

### 3. confirm a payment
- POST request
- confirm payment ( this is admin route, this use to confirm payment for that payment client alrady uploaded the slip and waiting for comformation)

```
    POST -> api/payments/room-type/payment-confirm
```
```
   {
      "orderId": string;
   }
```

- response (201 status code) - create payment success 

```
{
    "order": {
        "userId": string;
        "status": string;
        "totalPrice": number;
        "version": number;
        "id": string;
    },
    "payment": {
        "orderId": string;
        "slipUrl": string;
        "isConfirmed": boolean
        "__v": number;
        "id": string;
    }
}
```

### 4. set order as paied
- PATCH request
- set order as paied (this is admin route, use for front desk, without uploading payment slip directly can set as paid )

```
    PATCH -> /api/payments/room-type/set-to-paid/:orderId
```

- response (200 status code) - set as paid success 

```
   {
      "order": {
         "userId": string;
         "status": string;
         "totalPrice": number;
         "version": number;
         "id": string;
      }
   }
```

### Error Response

- response NOT_AUTHERIZED (401 -> Shoud be logged and shoud be a admin)

- response INTERNAL_SERVER_ERROR (500 -> Internal server error)

-  response INPUT_VALIDATION_ERROR (422 -> Input validation Error) 

- response BAD_REQUEST (400 -> Order already cancelled, Already Payment compleated )

- response NOT_FOUND (404 -> Order not found)

### 4. request payment slip
- GET request
- send payment slip

```
   GET -> /api/payments/upload/images/slip.png;
```

### Error

- response NOT_FOUND (404 -> Not found)


### 5. get paymet by order id
- GET request
- get payment by order id

```
   GET -> api/payments/room-type/payment/:orderId
```

- response (200 status code) - get payment success 

```
   {
      "roomPayments": {
         "orderId": string;
         "slipUrl": string;
         "isConfirmed": boolean;
         "__v": number;
         "id": string;
      }
   }
```

### Error

- response NOT_FOUND (404 -> Not found)

### 6. cancel a payment
- PATCH request
- confirm payment ( this is admin route, this use to cancel payment for that payment client alrady uploaded the slip and waiting for comformation)

```
    PATCH -> api/payments/room-type/payment-cancel
```
```
   {
      "orderId": string;
   }
```

- response (201 status code) - cancel payment success 

```
{
    "order": {
        "userId": string;
        "status": string;
        "totalPrice": number;
        "version": number;
        "id": string;
    },
    "payment": {
        "orderId": string;
        "slipUrl": string;
        "isConfirmed": boolean
        "__v": number;
        "id": string;
    }
}
```