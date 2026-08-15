import { z } from "zod";

const testSchema = z.object({
  name: z.string(),
});

export default testSchema;