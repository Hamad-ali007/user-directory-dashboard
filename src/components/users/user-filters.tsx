
"use client";

import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUsers } from "@/context/users-provider";

export function UserFilters() {
  const { genderFilter, setGenderFilter, locationFilter, setLocationFilter, allLocations } = useUsers();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter Users</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Gender</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={genderFilter} onValueChange={setGenderFilter}>
            <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="male">Male</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="female">Female</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Location</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={locationFilter} onValueChange={setLocationFilter}>
            <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
            {allLocations.map((location) => (
              <DropdownMenuRadioItem key={location} value={location}>
                {location}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
