// ===== PAGES/MEUCARTAO/MEUCARTAO.SCHEMA.TS =====
import { z } from "zod";

// Schema para dados do cartão existente (quando vier da API/storage)
export const cartaoDataSchema = z.object({
    id: z.string(),
    numeroCartao: z.string().min(16, "Número deve ter 16 dígitos"),
    nomePortador: z.string().min(2, "Nome é obrigatório"),
    dataVencimento: z.string().regex(/^\d{2}\/\d{2}$/, "Formato: MM/AA"),
    bandeira: z.enum(["visa", "mastercard", "amex", "elo"]),
    cor: z.enum(["black", "green", "blue", "gold"]).default("black"),
    ativo: z.boolean().default(true),
    dataCriacao: z.string().datetime(),
});

// Schema para estado da página MeuCartao
export const meuCartaoPageStateSchema = z.object({
    loading: z.boolean().default(false),
    cartao: cartaoDataSchema.nullable().default(null),
    error: z.string().nullable().default(null),
});

// Tipos derivados dos schemas
export type CartaoData = z.infer<typeof cartaoDataSchema>;
export type MeuCartaoPageState = z.infer<typeof meuCartaoPageStateSchema>;

// Schema para ações/operations na página
export const meuCartaoActionsSchema = z.object({
    excluirCartao: z.boolean().default(false),
    editarCartao: z.boolean().default(false),
});

export type MeuCartaoActions = z.infer<typeof meuCartaoActionsSchema>;

// Schema para props opcionais da página (se vier de navegação)
export const meuCartaoPagePropsSchema = z.object({
    cartaoId: z.string().optional(),
    highlight: z.boolean().default(false),
});

export type MeuCartaoPagePropsValidated = z.infer<
    typeof meuCartaoPagePropsSchema
>;
