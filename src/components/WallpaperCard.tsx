"use client";

import { clientEnv } from "@/lib/env/clientEnv";
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
      user: {
        select: {
          id: true;
          name: true;
          image: true;
        };
      };
      category: true;
    };
  }>;
};

const WallpaperCard = ({
  wallpaper: {
    image,
    user,
    createdAt,
    id,
    category: { slug, name },
    userId,
  },
}: WallpaperCardProp) => {
  return (
    <Card>
      <CardContent>
        <div className="relative aspect-video w-full">
          <Image
            alt={`${name} wallpaper`}
            src={`${clientEnv.NEXT_PUBLIC_SPACES_CDN_ENDPOINT}/${image}`}
            height={360}
            width={640}
            sizes=""
            className="object-cover"
          />

          <div className="border-foreground/50 bg-background/50 absolute right-0 bottom-0 left-0 flex w-full items-center justify-between border-t px-4 py-1 backdrop-blur-sm md:py-2">
            <div className="flex gap-3">
              <Link
                href={`/${user.id}`}
                className="flex items-center">
                <Image
                  src={
                    user.image ?
                      `${clientEnv.NEXT_PUBLIC_SPACES_CDN_ENDPOINT}/${user.image}`
                    : `https://placehold.co/50x50?text=Avatar`
                  }
                  alt={`${user.name}'s avatar`}
                  height={30}
                  width={30}
                  className="rounded-full border-2 border-amber-500 sm:h-[50px] sm:w-[50px] sm:border-4"
                />
              </Link>

              <div className="text-foreground flex gap-3">
                <div>
                  <div className="text-xs sm:text-sm">{user.name}</div>
                  {slug && name ?
                    <Link
                      href={`/category/${slug}`}
                      className="text-xs font-semibold sm:text-sm">
                      #{name}
                    </Link>
                  : <span className="text-muted-foreground text-xs font-semibold sm:text-sm">
                      #uncategorized
                    </span>
                  }
                </div>

                <div className="text-xs sm:text-sm">
                  {formatDistanceToNow(new Date(createdAt), {
                    addSuffix: true,
                    includeSeconds: true,
                  })}
                </div>
              </div>
            </div>
            <Button
              size={"sm"}
              className={"text-xs"}>
              <a
                href={`/api/download?image=${encodeURIComponent(image)}`}
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
