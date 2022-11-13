/*
    to handle password
    password hasing and compare
*/

import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scriptAsync = promisify(scrypt);

export class PasswordHandle {
    // to hash password and return it
    static async toHash(password: string) {
        const salt = randomBytes(8).toString("hex");
        const buff = await scriptAsync(password, salt, 64) as Buffer;

        return `${buff.toString("hex")}.${salt}`;
    };

    // to compare password
    // if password match this method return true, else return false
    static async compare(storedPassword: string, providedPassword: string) {
        const [hashedPassword, salt] = storedPassword.split(".");
        const buff = (await scriptAsync(providedPassword, salt, 64)) as Buffer;

        return hashedPassword === buff.toString("hex");
    };
}