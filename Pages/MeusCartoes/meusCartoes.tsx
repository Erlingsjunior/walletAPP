import React from "react";
import { router } from "expo-router";
import { Base } from "@/components/UI/Base";
import { Button } from "@/components/UI/Button";

import type { MeuCartaoPageProps } from "./meusCartoes.types";

import * as S from "./meusCartoes.styles";

export default function MeusCartoesPage({}: MeuCartaoPageProps) {
    const handleVoltar = () => {
        router.back();
    };

    return (
        <Base title='Meu Cartão' showHeader={true}>
            <S.Container>
                <S.Title>Aqui ficará o cartão existente</S.Title>
                <S.Subtitle>
                    (Futuro: Card component com dados do cartão)
                </S.Subtitle>

                <S.ButtonContainer>
                    <Button
                        title='Voltar'
                        variant='secondary'
                        onPress={handleVoltar}
                    />
                </S.ButtonContainer>
            </S.Container>
        </Base>
    );
}
