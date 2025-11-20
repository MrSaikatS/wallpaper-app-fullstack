"use client";

import { authClient } from "@/lib/betterAuth/auth-client";
import Image from "next/image";

const ProfileAvatarImage = () => {
	const { data, error, isPending, isRefetching } = authClient.useSession();

	if (error) {
		return (
			<div className="grid h-60 w-60 place-items-center rounded-full">
				<div className="text-xs">Something went wrong</div>
			</div>
		);
	}

	if (isPending || isRefetching) {
		return (
			<div className="grid h-60 w-60 place-items-center rounded-full">
				<div className="text-xs">Loading...</div>
			</div>
		);
	}

	if (data != null) {
		return (
			<Image
				src={`/upload/${data.user.image}`}
				alt="Avatar Image"
				width={240}
				height={240}
				className="aspect-square h-60 w-60 rounded-full object-cover"
			/>
		);
	}
	return <></>;
};

export default ProfileAvatarImage;
