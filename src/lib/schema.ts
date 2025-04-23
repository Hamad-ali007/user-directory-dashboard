
import { z } from "zod";

const nameSchema = z.object({
  title: z.string(),
  first: z.string(),
  last: z.string(),
});

const loginSchema = z.object({
  uuid: z.string(),
});

const pictureSchema = z.object({
  large: z.string(),
  medium: z.string(),
  thumbnail: z.string(),
});

const locationSchema = z.object({
  country: z.string(),
  city: z.string(),
  state: z.string(),
  street: z.object({
    number: z.number(),
    name: z.string(),
  }),
});

export const userSchema = z.object({
  login: loginSchema,
  name: nameSchema,
  email: z.string().email(),
  gender: z.string(),
  location: locationSchema,
  picture: pictureSchema,
});

export const userResponseSchema = z.object({
  results: z.array(userSchema),
  info: z.object({
    seed: z.string(),
    results: z.number(),
    page: z.number(),
    version: z.string(),
  }),
});

export type User = z.infer<typeof userSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
