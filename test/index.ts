import SecureEnv, { IObject } from "../dist";

interface IEnv extends IObject {
    PASSWORD: string;
}

const env = SecureEnv<IEnv>({
    secret: "mySecret",
});

if (env?.PASSWORD)
    console.log("✅ Success, password exists")
