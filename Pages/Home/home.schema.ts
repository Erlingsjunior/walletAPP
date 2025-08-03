import { z } from "zod";

// Schema para estado da página Home
export const homePageStateSchema = z.object({
    showSplash: z.boolean().default(true),
});
