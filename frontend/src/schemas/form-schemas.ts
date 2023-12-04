import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres" })
    .max(20, { message: "O nome deve ter no máximo 20 caracteres" }),
  nickname: z
    .string()
    .min(3, { message: "O apelido/nickname deve ter no mínimo 3 caracteres" })
    .max(20, {
      message: "O apelido/nickname deve ter no máximo 20 caracteres",
    }),
  email: z.string().email({ message: "O email fornecido não é válido" }),
  password: z
    .string()
    .min(5, { message: "A senha deve ter no mínimo 5 caracteres" }),
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres" })
    .max(20, { message: "O nome deve ter no máximo 20 caracteres" })
    .optional(),
  nickname: z
    .string()
    .min(3, { message: "O apelido/nickname deve ter no mínimo 3 caracteres" })
    .max(20, {
      message: "O apelido/nickname deve ter no máximo 20 caracteres",
    })
    .optional(),
  email: z
    .string()
    .email({ message: "O email fornecido não é válido" })
    .optional(),
  password: z
    .string()
    .min(5, { message: "A senha deve ter no mínimo 5 caracteres" })
    .optional(),
  photoUrl: z.string().optional(),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
