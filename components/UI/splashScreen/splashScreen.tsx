import React, { useEffect } from "react";
import * as S from "./splashScreen.styles";

interface SplashScreenProps {
    onFinish: () => void;
    duration?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
    onFinish,
    duration = 2000,
}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, duration);

        return () => clearTimeout(timer);
    }, [onFinish, duration]);

    return (
        <S.Container>
            <S.Title>Wallet</S.Title>
            <S.Subtitle>Carregando...</S.Subtitle>
        </S.Container>
    );
};
