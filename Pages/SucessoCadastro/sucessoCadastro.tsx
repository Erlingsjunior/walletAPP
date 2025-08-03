import React from "react";
import { router } from "expo-router";
import { Base } from "@/components/UI/Base/base";
import { VirtualCard } from "@/components/UI/VirtualCard/virtualCard";
import { Button } from "@/components/UI/Button/button";
import type { SucessoCadastroPageProps } from "./sucessoCadastro.types";
import * as S from "./sucessoCadastro.styles";

export default function SucessoCadastroPage({
    numeroCartao = "1234 5678 9012 3456",
    nomeTitular = "João Carlos Pereira",
    vencimento = "04/32",
}: SucessoCadastroPageProps) {
    const handleAvancar = () => {
        console.log("Navegando para Meus Cartões...");
        router.push("/meusCartoes");
    };

    const handleVoltar = () => {
        // Voltar para a tela inicial (pular o formulário)
        router.push("/");
    };

    return (
        <Base title='' showHeader={false}>
            <S.Container>
                {/* <S.Header>
                    <S.BackButton onPress={handleVoltar}>
                        <S.BackIcon>←</S.BackIcon>
                        <S.HeaderTitle>cadastro</S.HeaderTitle>
                    </S.BackButton>
                </S.Header> */}

                <S.Content>
                    <S.MainTitle>Wallet Test</S.MainTitle>
                    <S.Subtitle>cartão cadastrado com sucesso</S.Subtitle>

                    <S.CardContainer>
                        <VirtualCard
                            numeroCartao={numeroCartao}
                            nomeTitular={nomeTitular}
                            vencimento={vencimento}
                            isValid={true}
                            triggerSend={false}
                        />
                    </S.CardContainer>

                    <S.ButtonContainer>
                        <Button
                            title='avançar'
                            variant='primary'
                            onPress={handleAvancar}
                        />
                    </S.ButtonContainer>
                </S.Content>
            </S.Container>
        </Base>
    );
}
