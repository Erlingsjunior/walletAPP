import { z } from "zod";

export const buttonPropsSchema = z.object({
    title: z.string(),
    variant: z.enum(["primary", "secondary"]).default("primary"),
    onPress: z.function(),
});

export type ButtonProps = {
    title: string;
    variant?: "primary" | "secondary";
    onPress: () => void;
};
