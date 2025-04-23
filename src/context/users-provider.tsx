
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchUsers } from "@/lib/api";

type User = {
  id: string;
  name: string;
  email: string;
  gender: string;
  location: string;
  picture: string;
};

interface UsersContextType {
  users: User[];
  allUsers: User[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  genderFilter: string;
  setGenderFilter: (gender: string) => void;
  locationFilter: string;
  setLocationFilter: (location: string) => void;
  addUser: (user: Omit<User, "id">) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
  allLocations: string[];
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export function UsersProvider({ children }: { children: ReactNode }) {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [allLocations, setAllLocations] = useState<string[]>([]);

  // Load users when currentPage changes
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetchUsers(currentPage, 10);
        setAllUsers(response.users);
        
        // Extract unique locations
        const uniqueLocations = Array.from(new Set(response.users.map(user => user.location)));
        setAllLocations(uniqueLocations);
        
        setTotalPages(5); // API always returns 5 pages for this demo
        setError(null);
      } catch (err) {
        setError("Failed to load users");
        console.error("Error loading users:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [currentPage]);

  // Filter users based on search term and filters
  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = searchTerm 
      ? user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    const matchesGender = genderFilter !== "all" ? user.gender === genderFilter : true;
    const matchesLocation = locationFilter !== "all" ? user.location === locationFilter : true;
    
    return matchesSearch && matchesGender && matchesLocation;
  });

  const addUser = (user: Omit<User, "id">) => {
    const newId = Date.now().toString();
    const newUser = { ...user, id: newId };
    setAllUsers(prev => [...prev, newUser]);
    
    // Update locations if a new one is added
    if (!allLocations.includes(user.location)) {
      setAllLocations(prev => [...prev, user.location]);
    }
  };

  const updateUser = (updatedUser: User) => {
    setAllUsers(prev => prev.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    
    // Check if we need to update locations
    if (!allLocations.includes(updatedUser.location)) {
      setAllLocations(prev => [...prev, updatedUser.location]);
    }
  };

  const deleteUser = (id: string) => {
    setAllUsers(prev => prev.filter(user => user.id !== id));
  };

  const value = {
    users: filteredUsers,
    allUsers,
    isLoading,
    error,
    currentPage,
    setCurrentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    genderFilter,
    setGenderFilter,
    locationFilter,
    setLocationFilter,
    addUser,
    updateUser,
    deleteUser,
    allLocations,
  };

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
}
