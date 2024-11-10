import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { typedata } from "@/data";
import React from "react";

interface CategoryFilterProps {
  category: string;
  setCategory: (category: string) => void;
}

const CategoryFilter = ({ category, setCategory }: CategoryFilterProps) => {
  return (
    <Select onValueChange={setCategory} defaultValue={category}>
      <SelectTrigger className="px-10 py-2 bg-white/20 rounded-full">
        Categories
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {typedata.map(({ id, title }) => (
            <SelectItem key={id} value={title.toLowerCase()}>
              {title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
