
"use client";

import axios from "axios";
import { userResponseSchema, type User } from "./schema";

const API_URL = "https://randomuser.me/api";

export async function fetchUsers(page: number = 1, results: number = 10) {
  try {
    const response = await axios.get(`${API_URL}/?page=${page}&results=${results}&seed=abc`);
    const validated = userResponseSchema.parse(response.data);
    
    // Map API response to our application user model
    const users = validated.results.map((user) => ({
      id: user.login.uuid || String(Math.random()),
      name: `${user.name.title} ${user.name.first} ${user.name.last}`.trim(),
      email: user.email,
      gender: user.gender,
      location: user.location.country,
      picture: user.picture.medium,
    }));

    return {
      users,
      pagination: {
        page: page,
        results: results,
        seed: "abc",
      },
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}
