
"use client";

import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useUsers } from "@/context/users-provider";

export function Search() {
  const { searchTerm, setSearchTerm } = useUsers();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative w-full md:w-[300px]">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search users..."
        className="w-full pl-8"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
}
