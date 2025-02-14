import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type SortDropdownProps = {
  onSort: (sortOption: string) => void;
};

export default function SortDropdown({ onSort }: SortDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[180px] justify-between">
          <span>Sort by</span>
          <ArrowUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuItem onClick={() => onSort("createdAt-desc")}>
          Newest
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSort("price-asc")}>
          Price: Low to High
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSort("price-desc")}>
          Price: High to Low
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSort("title-asc")}>
          Name: A to Z
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSort("title-desc")}>
          Name: Z to A
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
