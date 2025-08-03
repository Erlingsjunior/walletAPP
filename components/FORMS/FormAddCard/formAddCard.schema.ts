import { z } from "zod";

export const formAddCardSchema = z.object({
    numeroCartao: z
        .string()
        .min(1, "Número do cartão é obrigatório")
        .regex(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, "Formato: 1234 5678 9012 3456"),

    nomeTitular: z
        .string()
        .min(2, "Nome do titular é obrigatório")
        .max(100, "Nome muito longo"),

    vencimento: z
        .string()
        .min(1, "Vencimento é obrigatório")
        .regex(/^\d{2}\/\d{2}$/, "Formato: MM/AA"),

    codigoSeguranca: z
        .string()
        .min(3, "Código deve ter pelo menos 3 dígitos")
        .max(4, "Código deve ter no máximo 4 dígitos")
        .regex(/^\d+$/, "Apenas números"),
});

export type FormAddCardData = z.infer<typeof formAddCardSchema>;
