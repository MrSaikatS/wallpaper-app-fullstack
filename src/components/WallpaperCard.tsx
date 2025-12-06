"use client";

import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { Prisma } from "../../generated/prisma/client";
import { Button } from "./shadcnui/button";
import { Card, CardContent } from "./shadcnui/card";

type WallpaperCardProp = {
	wallpaper: Prisma.WallpaperGetPayload<{
		include: {
			user: true;
		};
	}>;
};

const WallpaperCard = ({
	wallpaper: { image, category, user },
}: WallpaperCardProp) => {
	// const pathname = usePathname();

	return (
		<>
			<Card className="">
				<CardContent>
					<div className="relative">
						<Image
							alt=""
							src={`/upload/${image}`}
							height={360}
							width={640}
							className="h-[338px] w-[600px]"
						/>

						<div className="border-foreground/50 bg-foreground/25 absolute right-0 bottom-0 left-0 flex w-full items-center justify-between border-t px-4 py-2 backdrop-blur-sm">
							<div className="flex gap-3">
								<div className="">
									<Image
										src={`/upload/${user.image}`}
										alt=""
										height={50}
										width={50}
										className="rounded-full border-4 border-amber-500"
									/>
								</div>
								<div className="text-background flex gap-3">
									<div className="">
										<div className="">User Full Name</div>
										<div className="font-semibold">#{category}</div>
									</div>
									<div>19 min ago</div>
								</div>
							</div>
							<div className="">
								<Button asChild>
									<a
										href={`upload/${image}`}
										download={true}>
										Download
									</a>
								</Button>
							</div>
						</div>

						<Button className="absolute top-0 right-0 z-50 mt-2 mr-2 bg-red-600 text-white">
							<Trash2Icon /> Delete
						</Button>
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export default WallpaperCard;
