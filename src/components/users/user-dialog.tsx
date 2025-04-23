
"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user: any;
  mode: "add" | "edit" | "view" | "delete";
  onAdd?: (user: any) => void;
  onUpdate?: (user: any) => void;
  onDelete?: () => void;
}

export function UserDialog({ 
  isOpen, 
  setIsOpen, 
  user, 
  mode, 
  onAdd, 
  onUpdate, 
  onDelete 
}: UserDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "male",
    location: "US",
    picture: `https://randomuser.me/api/portraits/men/1.jpg`
  });

  // Reset form data when user changes
  useEffect(() => {
    if (user && mode !== "add") {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        gender: user.gender || "male",
        location: user.location || "US",
        picture: user.picture || ""
      });
    } else if (mode === "add") {
      setFormData({
        name: "",
        email: "",
        gender: "male",
        location: "US",
        picture: `https://randomuser.me/api/portraits/men/1.jpg`
      });
    }
  }, [user, mode]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "add" && onAdd) {
      onAdd(formData);
    } else if (mode === "edit" && onUpdate && user) {
      onUpdate({ ...formData, id: user.id });
    }
  };

  const getTitle = () => {
    switch (mode) {
      case "add": return "Add User";
      case "edit": return "Edit User";
      case "view": return "User Details";
      case "delete": return "Delete User";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          {mode === "delete" && (
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          )}
        </DialogHeader>

        {mode === "delete" ? (
          <div className="flex items-center gap-4 py-4">
            <Avatar>
              <AvatarImage src={user?.picture} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        ) : mode === "view" ? (
          <div className="space-y-4 py-4">
            <div className="flex justify-center mb-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.picture} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <p className="text-muted-foreground">Name:</p>
              <p>{user?.name}</p>
              <p className="text-muted-foreground">Email:</p>
              <p>{user?.email}</p>
              <p className="text-muted-foreground">Gender:</p>
              <p>{user?.gender}</p>
              <p className="text-muted-foreground">Location:</p>
              <p>{user?.location}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right">
                  Gender
                </Label>
                <Select 
                  value={formData.gender} 
                  onValueChange={(value) => handleChange("gender", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Select 
                  value={formData.location} 
                  onValueChange={(value) => handleChange("location", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="AU">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                {mode === "add" ? "Add" : "Save"}
              </Button>
            </DialogFooter>
          </form>
        )}

        {mode === "delete" && (
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onDelete}>
              Delete
            </Button>
          </DialogFooter>
        )}

        {mode === "view" && (
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
