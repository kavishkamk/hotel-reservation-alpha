# service service
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

### 1. Room Types Tag routes

### 1.1. create tag
- POST request
- create tag
```
   POST -> api/services/roomtags
```

```
   {
      "tagName": string;
   }
```
- response (201 status code) - created room tag success 
```
   {
      "tag": {
         "tagName": string;
         "version": number;
         "id": string;
      }
   }
```

### Error Response

- response NOT_AUTHERIZED (401 -> Don't have admin access to create)

- response INPUT_VALIDATION_ERROR (422 -> Input validation Error)

- response INTERNAL_SERVER_ERROR (500 -> Internal server error, unknown error)

### 1.2. update tag
- PATCH request
- update room tag
```
   PATCH -> api/services/roomtags
```
```
   {
      "id": string;
      "tagName": string;
   }
```
- response (200 status code) - updated room tag success 
```
   {
      "tag": {
         "tagName": string,
         "version": number,
         "id": string
      }
   }
```

### Error Response
- response NOT_AUTHERIZED (401 -> Don't have admin access to create)

-  response INPUT_VALIDATION_ERROR (422 -> Input validation Error)

- response NOT_FOUND (404 -> not found)

- response INTERNAL_SERVER_ERROR (500 -> Internal server error, unknown error)

### 1.3. get room tags
- GET request
- get room tags
```
   PATCH -> api/services/roomtags
```
- response (200 status code) - get room tag list 
```
   {
      "tags": 
        {
            "tagName": string;
            "version": number;
            "id": string;
        }[]
    
}
```
### Error Response
- response INTERNAL_SERVER_ERROR (500 -> Internal server error, unknown error)

### 1.4. delete room tag
- DELETE request
- delete room tag
```
   DELETE -> api/services/roomtags
```
```
   {
      "id": string;
   }
```
- response (200 status code) - deleted room tag
```
   {
      "deleteCount": {
         "acknowledged": boolean;
         "deletedCount": number;
      }
   }
```
### Error Response
- response NOT_AUTHERIZED (401 -> Don't have admin access to create)

- response INPUT_VALIDATION_ERROR (422 -> Input validation Error)

- response NOT_FOUND (404 -> not found)

- response INTERNAL_SERVER_ERROR (500 -> Internal server error, unknown error)

### 2. Restaurent Tag routes

### 2.1. create restaurent tag
- POST request
- create restaurnet tag
```
   POST -> api/services/restaurenttags
```

```
   {
      "tagName": string
   }
```
- response (201 status code) - created restaurent tag success 
```
   {
      "tag": {
         "tagName": string,
         "version": number,
         "id": string
      }
   }
```

### Error Response

- response NOT_AUTHERIZED (401 -> Don't have admin access to create)

-  response INPUT_VALIDATION_ERROR (422 -> Input validation Error)

- response INTERNAL_SERVER_ERROR (500 -> Internal server error, unknown error)

### 2.2. update tag
- PATCH request
- update restaurent tag
```
   PATCH -> api/services/restaurenttags
```
```
   {
      "id": string;
      "tagName": string;
   }
```
- response (200 status code) - updated restaurent tag success 
```
   {
      "tag": {
         "tagName": string,
         "version": number,
         "id": string
      }
   }
```

- response NOT_AUTHERIZED (401 -> Don't have admin access to create)

-  response INPUT_VALIDATION_ERROR (422 -> Input validation Error)

- response NOT_FOUND (404 -> not found)

- response INTERNAL_SERVER_ERROR (500 -> Internal server error, unknown error)

### 2.3. get restaurent tags
- GET request
- get restaurent tags
```
   PATCH -> api/services/restaurenttags
```
- response (200 status code) - get restaurent tag list 
```
   {
      "tags": 
        {
            "tagName": string;
            "version": number;
            "id": string;
        }[]
    
}
```
### Error Response

- response INTERNAL_SERVER_ERROR (500 -> Internal server error, unknown error)

### 2.4. delete restaurent tag
- DELETE request
- delete restaurent tag
```
   DELETE -> api/services/restaurenttags
```
```
   {
      "id": string;
   }
```
- response (200 status code) - deleted restaurent tag
```
   {
      "deleteCount": {
         "acknowledged": boolean;
         "deletedCount": number;
      }
   }
```
### Error Response
- response NOT_AUTHERIZED (401 -> Don't have admin access to create)

- response INPUT_VALIDATION_ERROR (422 -> Input validation Error)

- response NOT_FOUND (404 -> not found)

- response INTERNAL_SERVER_ERROR (500 -> Internal server error, unknown error)

### 3. Room Type routes

### 3.1. create room type 
- POST request
- create room type
```
   POST -> api/services/rooms
```

```
   {
      "roomType": string;
      "numberOfRooms": number;
      "description": string;
      "imageURL": string;
      "price": number;
      "stars": number;
      "amenities": string[]
      "tags": string[] -> (room tags id)
      "maxGuest": numbers
   }
```
- response (201 status code) - created room type success 
```
   {
      "roomType": {
         "roomType": number;
         "numberOfRooms": number;
         "description": string;
         "imageURL": string;
         "price": number;
         "stars": number;
         "amenities": string[];
         "tags": string[];
         "maxGuest": number;
         "version": number;
         "id": string;
      }
   }
```

### Error Response

- response NOT_AUTHERIZED (401 -> Don't have admin access to create)

-  response INPUT_VALIDATION_ERROR (422 -> Input validation Error)

- response INTERNAL_SERVER_ERROR (500 -> Internal server error, unknown error)

### 3.2. get room types
- GET request
- get room tpes
```
   GET -> api/services/rooms
```
- response (200 status code) - get room list success
```
   {
      "rooms": 
         {
            "roomType": string;
            "numberOfRooms": string;
            "description": string;
            "imageURL": string;
            "price": number;
            "stars": number;
            "amenities": string[];
            "tags": 
               {
                  "tagName": string;
                  "version": number;
                  "id": string;
               }[]
            "maxGuest": number;
            "version": number;
            "id": number;
         }[]
      
   }
```
### Error Response

- response INTERNAL_SERVER_ERROR (500 -> Internal server error, unknown error)

### 3.3. delete room type
- DELETE request
- delete room types

```
   POST -> api/services/rooms/${roomTypeId}
```
- response (200 status code) - delete room type
 ```
   {
      "deleteCount": {
         "acknowledged": boolean;
         "deletedCount": number;
      }
   }
```
### Error Response
- response NOT_AUTHERIZED (401 -> Don't have admin access to create)

- response NOT_FOUND (404 -> not found)

- response INTERNAL_SERVER_ERROR (500 -> Internal server error, unknown error)

### 3.4. get rooms contains given tags
- PATCH request
- get rooms contains given tags
```
   PATCH -> api/services/rooms/filter
```

```
   {
      "tags": string[]
   }
```
- response (200 status code) - reserved room list successfully

```
   {
      "rooms":
        {
            "roomType": string;
            "numberOfRooms": number;
            "description": string;
            "imageURL": string;
            "price": number;
            "stars": number;
            "amenities": string[];
            "tags": 
                {
                    "tagName": string;
                    "version": number;
                    "id": string;
                }[];
            "maxGuest": number;
            "version": number;
            "id": string;
         }[];
   }
```
### Error Response
- response INPUT_VALIDATION_ERROR (422 -> Input validation Error )

- response INTERNAL_SERVER_ERROR (500 -> Internal server error, unknown error)

### 3.5. get room types
- GET request
- get room tpes
```
   GET -> api/services/rooms/roomId
```
- response (200 status code) - get room list success
```
   {
      "rooms": 
         {
            "roomType": string;
            "numberOfRooms": string;
            "description": string;
            "imageURL": string;
            "price": number;
            "stars": number;
            "amenities": string[];
            "tags": 
               {
                  "tagName": string;
                  "version": number;
                  "id": string;
               }[]
            "maxGuest": number;
            "version": number;
            "id": number;
         }
   }
```
### Error Response

- response INTERNAL_SERVER_ERROR (500 -> Internal server error, unknown error)

- response NOT_FOUND (404 -> not found)

### 4. Restaurent routes

### 4.1. create restaurent
- POST request
- create restaurent type
```
   POST -> api/services/restaurents
```

```
   {
      "roomType": string;
      "numberOfRooms": number;
      "description": string;
      "imageURL": string;
      "price": number;
      "stars": number;
      "amenities": string[]
      "tags": string[] -> (room tags id)
      "maxGuest": numbers
   }
```
- response (201 status code) - created restaurent type success 
```
   {
      "roomType": {
         "roomType": number;
         "numberOfRooms": number;
         "description": string;
         "imageURL": string;
         "price": number;
         "stars": number;
         "amenities": string[];
         "tags": string[];
         "maxGuest": number;
         "version": number;
         "id": string;
      }
   }
```

### Error Response

- response NOT_AUTHERIZED (401 -> Don't have admin access to create)

- response INPUT_VALIDATION_ERROR (422 -> Input validation Error)

- response INTERNAL_SERVER_ERROR (500 -> Internal server error, unknown error)

### 4.2. get restaurent types
- GET request
- get restaurent types
```
   GET -> api/services/restaurenttags
```
- response (200 status code) - get restaurent list success
```
   {
      "restaurent": 
         {
            "roomType": string;
            "numberOfRooms": string;
            "description": string;
            "imageURL": string;
            "price": number;
            "stars": number;
            "amenities": string[];
            "tags": 
               {
                  "tagName": string;
                  "version": number;
                  "id": string;
               }[]
            "maxGuest": number;
            "version": number;
            "id": number;
         }[]
      
   }
```
### Error Response

- response INTERNAL_SERVER_ERROR (500 -> Internal server error, unknown error)

### 4.3. delete restaurent type
- DELETE request
- delete restaurent types

```
   POST -> api/services/restaurents/${RestaurentTypeId}
```
- response (200 status code) - delete restaurent type
 ```
   {
      "deleteCount": {
         "acknowledged": boolean;
         "deletedCount": number;
      }
   }
```
### Error Response
- response NOT_AUTHERIZED (401 -> Don't have admin access to delete)

- response NOT_FOUND (404 -> not found)

- response INTERNAL_SERVER_ERROR (500 -> Internal server error, unknown error)

### 4.4. get restaurents contains given tags
- PATCH request
- get restaurents contains given tags
```
   PATCH -> api/services/restaurents/filter
```

```
   {
      "tags": string[]
   }
```
- response (200 status code) - reserved restaurent list successfully

```
   {
      "restaurents": 
         {
            "restaurentType": string;
            "numberOfTables": number;
            "description": string;
            "imageURL": string;
            "stars": number;
            "tags":
                {
                    "tagName": string;
                    "version": number;
                    "id": string
                }[];
            "maxGuest": number;
            "version": number;
            "id": string;
         }[];
   }
```
### Error Response
- response INPUT_VALIDATION_ERROR (422 -> Input validation Error )

- response INTERNAL_SERVER_ERROR (500 -> Internal server error, unknown error)

### 4.5. get restaurnt types
- GET request
- get restaurent tpes
```
   GET -> api/services/restaurents/restaurentId
```
- response (200 status code) - get restaurent list success
```
   {
      "restaurent": {
         "restaurentType": string;
         "numberOfTables": mumber;
         "description": string;
         "imageURL": string;
         "stars": number
         "tags":
            {
                "tagName": string;
                "version": number;
                "id": string;
            }[];
        "maxGuest": number;
        "version": number;
        "id": string;
    }
}
```
### Error Response

- response INTERNAL_SERVER_ERROR (500 -> Internal server error, unknown error)

- response NOT_FOUND (404 -> not found)