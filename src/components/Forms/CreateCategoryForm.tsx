"use client";

import { dialogDrawerAtom } from "@/lib/jotaiAtom";
import { useAtom } from "jotai";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../shadcnui/dialog";
import CategoryForm from "./CategoryForm";

const CreateCategoryForm = () => {
	const [open, setOpen] = useAtom(dialogDrawerAtom);

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}>
			<DialogTrigger className="cursor-pointer text-blue-500 underline">
				Create Now
			</DialogTrigger>

			<DialogContent className="sm:max-w-106.25">
				<DialogHeader>
					<DialogTitle>Create Category</DialogTitle>

					<DialogDescription>
						Enter a category name to organize your wallpapers
					</DialogDescription>
				</DialogHeader>

				<CategoryForm />
			</DialogContent>
		</Dialog>
	);
};

export default CreateCategoryForm;
