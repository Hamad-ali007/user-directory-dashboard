
import { Search } from "@/components/search/search";

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Directory</h1>
        <p className="text-muted-foreground">
          Manage and view all user information in one place
        </p>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <Search />
      </div>
    </div>
  );
}
