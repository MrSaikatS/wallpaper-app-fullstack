"use client";

import Image from "next/image";
import { Button } from "./shadcnui/button";
import { Card, CardContent } from "./shadcnui/card";

type WallpaperCardProp = {
	wallpaper: {
		image: string;
		id: string;
		category: string;
		createdAt: Date;
		updatedAt: Date;
	};
};

const WallpaperCard = ({ wallpaper }: WallpaperCardProp) => {
	return (
		<>
			<Card className="w-2xl">
				<CardContent>
					<div className="relative">
						<Image
							alt=""
							src={"https://placehold.co/1920x1080"}
							height={440}
							width={640}
						/>

						<div className="absolute right-0 bottom-0 left-0 flex w-full justify-between">
							<div className="flex gap-3">
								<div className="">
									<Image
										src={"https://placehold.co/50x50"}
										alt=""
										height={50}
										width={50}
										className="rounded-full border-4 border-amber-500"
									/>
								</div>
								<div className="flex gap-3 text-black">
									<div className="">
										<div className="">User Full Name</div>
										<div className="font-semibold"> #Nature</div>
									</div>
									<div>Just now</div>
								</div>
							</div>
							<div className="">
								<Button>Download</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export default WallpaperCard;
