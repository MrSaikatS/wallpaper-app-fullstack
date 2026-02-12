"use client";

import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Prisma } from "../../generated/prisma/client";
import DeleteWallpaperButton from "./Buttons/DeleteWallpaperButton";
import { Button } from "./shadcnui/button";
import { Card, CardContent } from "./shadcnui/card";

type WallpaperCardProp = {
	wallpaper: Prisma.WallpaperGetPayload<{
		include: {
			user: true;
			category: true;
		};
	}>;
};

const WallpaperCard = ({
	wallpaper: { image, user, createdAt, id, category, userId },
}: WallpaperCardProp) => {
	return (
		<Card>
			<CardContent>
				<div className="relative">
					<Image
						alt=""
						src={`/upload/wallpaper/${image}`}
						height={360}
						width={640}
						className="h-84.5 w-150"
					/>

					<div className="border-foreground/50 bg-background/50 absolute right-0 bottom-0 left-0 flex w-full items-center justify-between border-t px-4 py-2 backdrop-blur-sm">
						<div className="flex gap-3">
							<Link href={`/${user.id}`}>
								<Image
									src={`/upload/avatar/${user.image}`}
									alt={`${user.name}'s avatar`}
									height={50}
									width={50}
									className="rounded-full border-4 border-amber-500"
								/>
							</Link>

							<div className="text-foreground flex gap-3">
								<div className="">
									<div className="">{user.name}</div>
									<Link
										href={`/category/${category.slug}`}
										className="font-semibold">
										#{category.name}
									</Link>
								</div>

								<div>
									{formatDistanceToNow(new Date(createdAt), {
										addSuffix: true,
										includeSeconds: true,
									})}
								</div>
							</div>
						</div>

						<Button asChild>
							<a
								href={`/upload/wallpaper/${image}`}
								download>
								Download
							</a>
						</Button>
					</div>

					<DeleteWallpaperButton
						wallpaperId={id}
						wallpaperImg={image}
						wallpaperOwnerId={userId}
					/>
				</div>
			</CardContent>
		</Card>
	);
};

export default WallpaperCard;
