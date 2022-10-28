import { app } from "./app";

const port = 4000;

app.listen(port, () => {
    console.log("Server start on port: " + port);
});