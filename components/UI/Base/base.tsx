import React from "react";
import { StatusBar } from "expo-status-bar";
import * as S from "./base.styles";

interface BaseProps {
    children: React.ReactNode;
    title?: string;
    showHeader?: boolean;
}

export const Base: React.FC<BaseProps> = ({
    children,
    title = "Wallet Test",
    showHeader = true,
}) => {
    return (
        <S.Container>
            <StatusBar style='light' />

            {/* Quadrados de fundo com bordas arredondadas */}
            <S.TopLeftSquare />
            <S.BottomRightSquare />

            <S.Content>
                {showHeader && (
                    <S.Header>
                        <S.Title>{title}</S.Title>
                    </S.Header>
                )}
                {children}
            </S.Content>
        </S.Container>
    );
};
