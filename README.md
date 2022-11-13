## install shared libreary ([@alpha-lib/shared-lib](https://www.npmjs.com/package/@alpha-lib/shared-lib))

- install with yarn
```
    yarn add @alpha-lib/shared-lib
```

- install with npm
```
    npm install @alpha-lib/shared-lib
```

## API Request setup
- url
```
    https://alphahotelreservation.dev
```

### Setup windows for requesting

- add below line in host file (C:\Windows\System32\drivers\etc\host)
```
    34.121.155.102 alphahotelreservation.dev
```
### Setup linux for requesting
-- add below line in host file (/etc/hosts)

```
    34.121.155.102 alphahotelreservation.dev
```

*** if this error disply in the browser on the browser interface type below command and enter (this happend because of the ingress-nginx)
```
    thisisunsafe
```

<img src="https://github.com/kavishkamk/hotel-reservation-alpha/tree/main/images/error-img.png" alt="Error" title="Ingress error">

