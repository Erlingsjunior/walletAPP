import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { Alert } from "react-native";
import { Base } from "@/components/UI/Base/base";
import { FormAddCard } from "@/components/FORMS/FormAddCard/formAddCard";
import { useCardStore } from "@/stores/useCardStore"; // 🆕 Zustand
import type {
    AdicionarCartaoPageProps,
    AdicionarCartaoState,
} from "./adicionarCartao.types";

// 🔧 Usar tipo compatível com FormAddCard existente
interface FormData {
    numeroCartao: string;
    nomeTitular: string;
    vencimento: string;
    cvv?: string; // Opcional para compatibilidade
    codigoSeguranca?: string; // Caso use este nome
    [key: string]: any; // Para flexibilidade
}

export default function AdicionarCartaoPage({}: AdicionarCartaoPageProps) {
    const [state, setState] = useState<AdicionarCartaoState>({
        loading: false,
    });

    const { addCard, error, setError } = useCardStore();

    useEffect(() => {
        if (error) {
            Alert.alert("Erro", error, [
                { text: "OK", onPress: () => setError(null) },
            ]);
        }
    }, [error]);

    const handleVoltar = () => {
        router.back();
    };

    const handleSubmitCard = async (data: FormData) => {
        setState((prev) => ({ ...prev, loading: true }));

        try {
            console.log("📝 Dados do cartão recebidos:", data);

            const cvv = data.cvv || data.codigoSeguranca || "";

            if (
                !data.numeroCartao ||
                !data.nomeTitular ||
                !data.vencimento ||
                !cvv
            ) {
                Alert.alert("Erro", "Todos os campos são obrigatórios");
                setState((prev) => ({ ...prev, loading: false }));
                return;
            }

            const numeroLimpo = data.numeroCartao.replace(/\s/g, "");
            if (numeroLimpo.length < 13 || numeroLimpo.length > 19) {
                Alert.alert(
                    "Erro",
                    "Número do cartão deve ter entre 13 e 19 dígitos"
                );
                setState((prev) => ({ ...prev, loading: false }));
                return;
            }

            // Validar CVV
            if (cvv.length < 3 || cvv.length > 4) {
                Alert.alert("Erro", "CVV deve ter 3 ou 4 dígitos");
                setState((prev) => ({ ...prev, loading: false }));
                return;
            }

            const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
            if (!regex.test(data.vencimento)) {
                Alert.alert(
                    "Erro",
                    "Data de vencimento deve estar no formato MM/AA"
                );
                setState((prev) => ({ ...prev, loading: false }));
                return;
            }

            await new Promise((resolve) => setTimeout(resolve, 800));

            const cardToAdd = {
                type: determineCardType(data.numeroCartao),
                nome: data.nomeTitular,
                numero: data.numeroCartao,
                validade: data.vencimento,
                cvv: cvv,
            };

            console.log("💾 Adicionando cartão ao Zustand:", cardToAdd);

            addCard(cardToAdd);

            console.log("✅ Cartão adicionado com sucesso!");

            router.push({
                pathname: "/sucessoCadastro",
                params: {
                    numeroCartao: data.numeroCartao,
                    nomeTitular: data.nomeTitular,
                    vencimento: data.vencimento,
                },
            });
        } catch (error) {
            console.error("❌ Erro ao adicionar cartão:", error);
            Alert.alert("Erro", "Erro ao salvar cartão. Tente novamente.");
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    const determineCardType = (numero: string): string => {
        const firstDigit = numero.replace(/\s/g, "")[0];

        switch (firstDigit) {
            case "4":
                return "silver"; // Visa
            case "5":
                return "gold"; // Mastercard
            case "3":
                return "green"; // American Express
            case "6":
                return "black"; // Discover/Other
            default:
                return "black"; // Padrão
        }
    };

    return (
        <Base title='Wallet Test' showHeader={false}>
            <FormAddCard
                onSubmit={handleSubmitCard}
                onCancel={handleVoltar}
                loading={state.loading}
            />
        </Base>
    );
}
