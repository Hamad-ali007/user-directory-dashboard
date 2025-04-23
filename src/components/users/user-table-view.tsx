
"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash } from "lucide-react";
import { UserDialog } from "@/components/users/user-dialog";
import { useState } from "react";
import { useUsers } from "@/context/users-provider";
import { toast } from "sonner";

export function UserTableView() {
  const { users, addUser, updateUser, deleteUser } = useUsers();
  const [userToEdit, setUserToEdit] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit" | "view" | "delete">("view");

  const handleAdd = () => {
    setUserToEdit(null);
    setDialogMode("add");
    setIsDialogOpen(true);
  };

  const handleEdit = (user: any) => {
    setUserToEdit(user);
    setDialogMode("edit");
    setIsDialogOpen(true);
  };

  const handleDelete = (user: any) => {
    setUserToEdit(user);
    setDialogMode("delete");
    setIsDialogOpen(true);
  };

  const handleView = (user: any) => {
    setUserToEdit(user);
    setDialogMode("view");
    setIsDialogOpen(true);
  };

  const confirmDelete = () => {
    if (userToEdit) {
      deleteUser(userToEdit.id);
      setIsDialogOpen(false);
      toast.success("User deleted successfully");
    }
  };

  const handleAddUser = (newUser: any) => {
    addUser(newUser);
    setIsDialogOpen(false);
    toast.success("User added successfully");
  };

  const handleUpdateUser = (updatedUser: any) => {
    updateUser(updatedUser);
    setIsDialogOpen(false);
    toast.success("User updated successfully");
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button size="sm" onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-1" />
          Add User
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleView(user)}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.picture} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {user.name}
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.location}</TableCell>
                <TableCell>
                  <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(user);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="text-destructive hover:text-destructive" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(user);
                      }}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <UserDialog 
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        user={userToEdit}
        mode={dialogMode}
        onAdd={handleAddUser}
        onUpdate={handleUpdateUser}
        onDelete={confirmDelete}
      />
    </div>
  );
}
