import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/shadcnui/avatar";
import authUserServer from "@/hooks/action/authUserServer";

const NavProfileImg = async () => {
	const { image, name } = await authUserServer();

	const nameArray = name.split(" ");

	const charactersArray = nameArray.map((n) => {
		return n.charAt(0);
	});

	return (
		<Avatar className="ring-primary ring-4">
			<AvatarImage src={`/upload/avatar/${image}`} />
			<AvatarFallback>{charactersArray.join("")}</AvatarFallback>
		</Avatar>
	);
};

export default NavProfileImg;
