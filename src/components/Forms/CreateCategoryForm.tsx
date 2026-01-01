"use client";

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
import { dialogDrawerAtom } from "@/lib/jotaiAtom";

const CreateCategoryForm = () => {
	const [open, setOpen] = useAtom(dialogDrawerAtom);

	return (
		<>
			<Dialog
				open={open}
				onOpenChange={setOpen}>
				<DialogTrigger className="text-blue-500 underline">
					Create Now
				</DialogTrigger>

				<DialogContent className="sm:max-w-106.25">
					<DialogHeader>
						<DialogTitle>Create Category</DialogTitle>

						<DialogDescription className="hidden"></DialogDescription>
					</DialogHeader>

					<div className="">
						<CategoryForm />
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default CreateCategoryForm;
