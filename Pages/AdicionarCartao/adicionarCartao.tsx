import React, { useState } from "react";
import { router } from "expo-router";
import { Alert } from "react-native";
import { Base } from "@/components/UI/Base/base";
import { FormAddCard } from "@/components/FORMS/FormAddCard/formAddCard";
import type {
    AdicionarCartaoPageProps,
    AdicionarCartaoState,
} from "./adicionarCartao.types";

export default function AdicionarCartaoPage({}: AdicionarCartaoPageProps) {
    const [state, setState] = useState<AdicionarCartaoState>({
        loading: false,
    });

    const handleVoltar = () => {
        router.back();
    };

    const handleSubmitCard = async (data: any) => {
        setState((prev) => ({ ...prev, loading: true }));

        try {
            console.log("Dados do cartão:", data);

            // Simular delay da API
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Em vez de Alert, navegar para tela de sucesso
            router.push({
                pathname: "/sucessoCadastro",
                params: {
                    numeroCartao: data.numeroCartao,
                    nomeTitular: data.nomeTitular,
                    vencimento: data.vencimento,
                },
            });
        } catch (error) {
            Alert.alert("Erro", "Erro ao salvar cartão. Tente novamente.");
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
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
