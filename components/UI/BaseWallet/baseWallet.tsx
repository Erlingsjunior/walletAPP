import React from "react";
import { StatusBar } from "expo-status-bar";
import type { BaseWalletProps } from "./baseWallet.types";
import * as S from "./baseWallet.styles";

export const BaseWallet: React.FC<BaseWalletProps> = ({
    children,
    onBack,
    onAddCard,
    showAddButton = true,
}) => {
    return (
        <S.Container>
            <StatusBar style='light' />

            {/* Quadrados de fundo */}
            <S.TopLeftSquare />
            <S.BottomRightSquare />

            {/* Header */}
            <S.Header>
                <S.HeaderButton onPress={onBack}>
                    <S.BackIcon>←</S.BackIcon>
                </S.HeaderButton>

                <S.HeaderTitle>Wallet Test</S.HeaderTitle>

                {showAddButton ? (
                    <S.HeaderButton onPress={onAddCard}>
                        <S.AddIcon>+</S.AddIcon>
                    </S.HeaderButton>
                ) : (
                    <S.HeaderButton />
                )}
            </S.Header>

            {/* Sub Header */}
            <S.SubHeader>
                <S.SubHeaderTitle>Meus cartões</S.SubHeaderTitle>
            </S.SubHeader>

            {/* Content */}
            <S.Content>{children}</S.Content>
        </S.Container>
    );
};
