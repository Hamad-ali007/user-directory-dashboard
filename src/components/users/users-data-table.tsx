
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMediaQuery } from "@/hooks/use-media-query";
import { UserCardView } from "@/components/users/user-card-view";
import { UserTableView } from "@/components/users/user-table-view";
import { PaginationControls } from "@/components/users/pagination-controls";
import { Skeleton } from "@/components/ui/skeleton";
import { UserFilters } from "@/components/users/user-filters";
import { useUsers } from "@/context/users-provider";

export function UsersDataTable() {
  const { isLoading } = useUsers();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <CardTitle>All Users</CardTitle>
        <UserFilters />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : isMobile ? (
          <UserCardView />
        ) : (
          <UserTableView />
        )}
        <div className="mt-6">
          <PaginationControls />
        </div>
      </CardContent>
    </Card>
  );
}
