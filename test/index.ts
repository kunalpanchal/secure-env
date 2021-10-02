import SecureEnv, { IObject } from "secure-env-fork";

interface IEnv extends IObject {
    PASSWORD: string;
}

const env = SecureEnv<IEnv>({
    secret: "mySecret",
});

if (env?.PASSWORD)
    console.log("✅ Success, password exists")
