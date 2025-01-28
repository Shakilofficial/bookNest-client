import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortDropdownProps = {
  onSort: (sortOption: string) => void;
};

export default function SortDropdown({ onSort }: SortDropdownProps) {
  return (
    <Select onValueChange={onSort}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="price-asc">Price: Low to High</SelectItem>
        <SelectItem value="price-desc">Price: High to Low</SelectItem>
        <SelectItem value="title-asc">Title: A to Z</SelectItem>
        <SelectItem value="title-desc">Title: Z to A</SelectItem>
        <SelectItem value="publishedAt-desc">Newest</SelectItem>
        <SelectItem value="publishedAt-asc">Oldest</SelectItem>
      </SelectContent>
    </Select>
  );
}
