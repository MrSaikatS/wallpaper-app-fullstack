"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./shadcnui/button";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
} from "./shadcnui/pagination";

type PaginationQueryProps = {
	totalPage: number;
	pageNumber: number;
};

const PaginationQuery = ({ totalPage, pageNumber }: PaginationQueryProps) => {
	const { push } = useRouter();

	const handlePageChange = async (newPage: number) => {
		push(`?page=${newPage}`, { scroll: false });
	};

	const getPageNumbers = () => {
		if (totalPage <= 7) {
			const pageNumArray: string[] = [];
			pageNumArray.length = totalPage;
			pageNumArray.fill("");

			const result = pageNumArray.map((val, ind) => ind + 1);
			return result;
		}

		if (pageNumber <= 3) {
			return [1, 2, 3, 4, 5, "ellipsis", totalPage];
		}

		if (pageNumber >= totalPage - 2) {
			return [
				1,
				"ellipsis",
				totalPage - 3,
				totalPage - 2,
				totalPage - 1,
				totalPage,
			];
		}

		return [
			1,
			"ellipsis",
			pageNumber - 1,
			pageNumber,
			pageNumber + 1,
			"ellipsis",
			totalPage,
		];
	};
	return (
		<Pagination className={`my-4 ${!totalPage ? "hidden" : "flex"}`}>
			<PaginationContent>
				<PaginationItem>
					<Button
						onClick={() => handlePageChange(pageNumber - 1)}
						disabled={pageNumber === 1}
						variant="ghost"
						className="cursor-pointer gap-1">
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
								variant={pageNumber === pageNum ? "default" : "ghost"}
								onClick={() => handlePageChange(pageNum as number)}
								className="min-w-9 cursor-pointer sm:min-w-10">
								{pageNum}
							</Button>
						</PaginationItem>
					),
				)}

				<PaginationItem>
					<Button
						onClick={() => handlePageChange(pageNumber + 1)}
						disabled={pageNumber === totalPage}
						variant="ghost"
						className="cursor-pointer gap-1">
						<span className="hidden sm:inline">Next</span>
						<ChevronRightIcon className="h-4 w-4" />
					</Button>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default PaginationQuery;
