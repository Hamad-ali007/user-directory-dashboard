
import { UsersDataTable } from "@/components/users/users-data-table";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { UsersProvider } from "@/context/users-provider";

export default function Home() {
  return (
    <main className="container mx-auto p-4 md:p-6 min-h-screen">
      <UsersProvider>
        <DashboardHeader />
        <UsersDataTable />
      </UsersProvider>
    </main>
  );
}
