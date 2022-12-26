# booking service
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

### 1. Room Types routes

### 1.1. get room types
- GET request
- get room types

```
   GET -> api/booking/room-types
```

- response (200 status code) - get room types success 
```
   {
      "roomType": 
         {
            "roomType": string;
            "price": number;
            "numberOfRooms": number;
            "maxGuest": number;
            "version": number;
            "id": string;
         }[];
   }
```

### Error Response

- response INTERNAL_SERVER_ERROR (500 -> Internal server error, unknown error)

### 2. Restaurent Types routes

### 1.1. get restaurent types
- GET request
- get restaurent types

```
   GET -> api/booking/restaurent-types
```

- response (200 status code) - get restaurent types success 
```
   {
      "roomType":
         {
            "restaurentType": string;
            "numberOfTables": number;
            "maxGuest": number;
            "version": number;
            "id": string;
         }[]
   }
```

### Error Response

- response INTERNAL_SERVER_ERROR (500 -> Internal server error, unknown error)