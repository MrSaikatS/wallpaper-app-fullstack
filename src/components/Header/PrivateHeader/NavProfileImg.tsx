import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcnui/avatar";
import authUserServer from "@/hooks/action/authUserServer";
import { clientEnv } from "@/lib/env/clientEnv";

const NavProfileImg = async () => {
  const { image, name } = await authUserServer();

  const nameArray = name.split(" ");

  const charactersArray = nameArray.map((n) => {
    return n.charAt(0);
  });

  return (
    <Avatar className="ring-primary ring-4">
      <AvatarImage
        src={
          image ?
            `${clientEnv.NEXT_PUBLIC_SPACES_CDN_ENDPOINT}/${image}`
          : undefined
        }
      />
      {!image && <AvatarFallback>{charactersArray.join("")}</AvatarFallback>}
    </Avatar>
  );
};

export default NavProfileImg;
