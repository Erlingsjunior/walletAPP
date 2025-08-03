import { z } from "zod";

// Schema para futuro formulário de cartão
export const adicionarCartaoSchema = z.object({
    numeroCartao: z.string().min(16, "Número deve ter 16 dígitos"),
    nomePortador: z.string().min(2, "Nome é obrigatório"),
    dataVencimento: z.string().regex(/^\d{2}\/\d{2}$/, "Formato: MM/AA"),
    cvv: z.string().min(3, "CVV deve ter 3 dígitos"),
});

export type AdicionarCartaoForm = z.infer<typeof adicionarCartaoSchema>;
