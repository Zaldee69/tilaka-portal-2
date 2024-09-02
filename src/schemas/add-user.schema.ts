import { z } from 'zod';

export const userRegistrationSchema = (t: (key: string) => string) =>
  z.object({
    users: z.array(
      z.object({
        fullname: z.string().min(4, {
          message: t('errorMessage.fullname.empty')
        }),
        email: z
          .string()
          .min(1, {
            message: t('errorMessage.email.empty')
          })
          .email({
            message: t('errorMessage.email.wrongFormat')
          })
      })
    )
  });

export type UserRegistrationProps = z.infer<
  ReturnType<typeof userRegistrationSchema>
>;
