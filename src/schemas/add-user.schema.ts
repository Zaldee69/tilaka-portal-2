import { z } from 'zod';

// Update your schema to handle an array of users
export const UserRegistrationSchema = z.object({
  users: z.array(
    z.object({
      fullname: z.string().min(4, {
        message: 'Nama lengkap harus minimal 4 karakter'
      }),
      email: z.string().email({ message: 'Format email salah' })
    })
  )
});

export type UserRegistrationProps = z.infer<typeof UserRegistrationSchema>;
