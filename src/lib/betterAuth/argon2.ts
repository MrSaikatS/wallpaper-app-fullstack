import { hash, verify } from "@node-rs/argon2";
import { serverEnv } from "../env/serverEnv";

type VerifyPasswordType = {
	hash: string;
	password: string;
};

export const hashPasswordFunction = async (password: string) => {
	const hashedPassword = await hash(password, {
		secret: Buffer.from(serverEnv.BETTER_AUTH_SECRET),
	});

	return hashedPassword;
};

export const verifyPasswordFunction = async (data: VerifyPasswordType) => {
	const { hash, password } = data;

	const varifiedPassword = await verify(hash, password, {
		secret: Buffer.from(serverEnv.BETTER_AUTH_SECRET),
	});

	return varifiedPassword;
};
