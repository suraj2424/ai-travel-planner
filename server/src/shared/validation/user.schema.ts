import z from "zod";

const userSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3)
})

export default userSchema;