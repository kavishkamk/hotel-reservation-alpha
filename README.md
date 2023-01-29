# Hotel Reservation System

<!--
## Client site url
- https://golden-aurora-hotel.vercel.app/


## Front dest url
- https://golden-aurora-admin.vercel.app/
- admin account for log into front desk
```
    username: micronovo@gmail.com
    password: alphahotel
```


## API Request URL
 ```
    https://alphahotelreservation.dev
```
- https://kavishkamk.live
 -->
## Architecture Diagram
<img src="https://github.com/kavishkamk/hotel-reservation-alpha/blob/main/images/diagrams/architecture-diagram.png" alt="Architectur" title="Architecture Diagram">

## Event Flow Diagram
<img src="https://github.com/kavishkamk/hotel-reservation-alpha/blob/main/images/diagrams/event-flow-diagram.jpg" alt="Event flow" title="Event flow Diagram">

## install shared libreary ([@alpha-lib/shared-lib](https://www.npmjs.com/package/@alpha-lib/shared-lib))

- install with yarn
```
    yarn add @alpha-lib/shared-lib
```

- install with npm
```
    npm install @alpha-lib/shared-lib
```

## About the application

- Micro Services Architecture
- MVC model for develop each service
- Mono Repos for manage the projects
- MERN stack for development (TypeScript backend)
- NATS Streaming Server (Event Bus) for event handling
- Ingress-Nginx as Ingress Controller and Loadbalancer
- Skaffold for automate development
- publish npm package as shared library for the project
- Use docker hub for image publish
- bull.js for handle expiration service
- use Redis Server for expiration service
- use mongoDB as a database
- Cluster IP service for internal communication
- use docker for containerized the each service
- kubernetes for manage containers
- use Google kubernetes engine for host micro services and use it as a development cluste then convert to production cluster
- Default error handling
- Backend validation
- Authentication and Autherization (JWT token, email verifications)
- Front end hosted on vercel
- Configure a domain for backend cluster
- Configure a SSL certificate to serve through ingress-nginx



<!-- ### Setup windows for requesting

- add below line in host file (C:\Windows\System32\drivers\etc\host)
```
    34.121.155.102 alphahotelreservation.dev
```
### Setup linux for requesting
-- add below line in host file (/etc/hosts)

```
    34.121.155.102 alphahotelreservation.dev
``` -->

<!-- *** if this error disply in the browser on the browser interface type below command and enter (this happend because of the ingress-nginx)
```
    thisisunsafe
```
<img src="https://github.com/kavishkamk/hotel-reservation-alpha/blob/main/images/error-img.png" alt="Error" title="Ingress error"> -->

