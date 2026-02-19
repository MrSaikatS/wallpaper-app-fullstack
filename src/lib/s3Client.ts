import { S3 } from "@aws-sdk/client-s3";
import { serverEnv } from "./env/serverEnv";

const s3Client = new S3({
	forcePathStyle: false, // Configures to use subdomain/virtual calling format.
	endpoint: serverEnv.SPACES_ENDPOINT,
	region: "blr1",
	credentials: {
		accessKeyId: serverEnv.SPACES_KEY,
		secretAccessKey: serverEnv.SPACES_SECRET,
	},
});

export default s3Client;
