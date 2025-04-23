
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { UserDialog } from "@/components/users/user-dialog";
import { useState } from "react";
import { useUsers } from "@/context/users-provider";
import { toast } from "sonner";

export function UserCardView() {
  const { users, deleteUser, updateUser } = useUsers();
  const [userToEdit, setUserToEdit] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"edit" | "view" | "delete">("view");

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

  const handleUpdateUser = (updatedUser: any) => {
    updateUser(updatedUser);
    setIsDialogOpen(false);
    toast.success("User updated successfully");
  };

  return (
    <div className="space-y-4">
      {users.map(user => (
        <div 
          key={user.id} 
          className="flex items-center justify-between border rounded-lg p-4 hover:bg-muted/50 cursor-pointer"
          onClick={() => handleView(user)}
        >
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={user.picture} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex gap-2 mt-1">
                <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                  {user.gender}
                </span>
                <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                  {user.location}
                </span>
              </div>
            </div>
          </div>
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
        </div>
      ))}

      <UserDialog 
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        user={userToEdit}
        mode={dialogMode}
        onUpdate={handleUpdateUser}
        onDelete={confirmDelete}
      />
    </div>
  );
}
