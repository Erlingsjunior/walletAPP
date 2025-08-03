import React, { useState } from "react";
import { router } from "expo-router";
import { Base } from "@/components/UI/Base";
import { Button } from "@/components/UI/Button";
import { SplashScreen } from "@/components/UI/splashScreen";

import type { HomePageProps, HomePageState } from "./home.types";

import * as S from "./home.styles";

export default function HomePage({}: HomePageProps) {
    const [state, setState] = useState<HomePageState>({
        showSplash: true,
    });

    const handleSplashFinish = () => {
        setState((prev) => ({ ...prev, showSplash: false }));
    };

    const handleMeuCartao = () => {
        console.log("Navegando para Meu cartão");
        router.push("/meuCartao");
    };

    const handleAdicionarCartao = () => {
        console.log("Navegando para Adicionar cartão");
        router.push("/adicionarCartao");
    };

    if (state.showSplash) {
        return <SplashScreen onFinish={handleSplashFinish} />;
    }

    return (
        <Base title='Wallet Test'>
            <S.Container>
                <S.ButtonContainer>
                    <Button
                        title='Meu cartão'
                        variant='secondary'
                        onPress={handleMeuCartao}
                    />
                    <Button
                        title='Adicionar cartão'
                        variant='primary'
                        onPress={handleAdicionarCartao}
                    />
                </S.ButtonContainer>
            </S.Container>
        </Base>
    );
}
