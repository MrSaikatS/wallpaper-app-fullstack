"use client";

import getWallpapers from "@/hooks/action/getWallpapers";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { Button } from "./shadcnui/button";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
} from "./shadcnui/pagination";

type totalPageProp = {
	Pages: number;
};

const PaginationQuery = ({ Pages }: totalPageProp) => {
	const { refresh } = useRouter();

	const totalPages = Number(Pages);
	const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

	const handlePageChange = async (newPage: number) => {
		setPage(newPage);

		await getWallpapers(page);

		refresh();
	};

	const getPageNumbers = () => {
		if (page <= 3) {
			return [1, 2, 3, 4, "ellipsis"];
		}
		if (page >= 4 && page !== totalPages) {
			return [1, "ellipsis", page - 1, page, page + 1];
		}

		return [1, "ellipsis", page - 1, page];
	};
	return (
		<Pagination className="my-4">
			<PaginationContent>
				<PaginationItem>
					<Button
						onClick={() => handlePageChange(page - 1)}
						disabled={page === 1}
						variant="ghost"
						className="gap-1">
						<ChevronLeftIcon className="h-4 w-4" />
						<span className="hidden sm:inline">Previous</span>
					</Button>
				</PaginationItem>

				{getPageNumbers().map((pageNum, idx) =>
					pageNum === "ellipsis" ? (
						<PaginationItem
							key={`ellipsis-${idx}`}
							className="hidden sm:block">
							<PaginationEllipsis />
						</PaginationItem>
					) : (
						<PaginationItem key={pageNum}>
							<Button
								variant={page === pageNum ? "default" : "ghost"}
								onClick={() => handlePageChange(pageNum as number)}
								className="min-w-9 sm:min-w-10">
								{pageNum}
							</Button>
						</PaginationItem>
					),
				)}

				<PaginationItem>
					<Button
						onClick={() => handlePageChange(page + 1)}
						disabled={page === totalPages || page >= totalPages}
						variant="ghost"
						className="gap-1">
						<span className="hidden sm:inline">Next</span>
						<ChevronRightIcon className="h-4 w-4" />
					</Button>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default PaginationQuery;
