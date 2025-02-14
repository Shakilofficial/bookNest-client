import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { productCategories } from "@/constants/productCategories";

type CategoryFilterProps = {
  onCategoryChange: (category: string) => void;
};

const CategoryFilter = ({ onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Categories</h3>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            Filter by Category
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[180px]">
          <DropdownMenuItem onClick={() => onCategoryChange("")}>
            All Categories
          </DropdownMenuItem>
          {productCategories.map((category) => (
            <DropdownMenuItem
              key={category}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CategoryFilter;
