// import React from "react";
// import type { CardData } from "@/components/UI/CardItem/cardList.types";
// import type { CardColor } from "@/utils/colorUtils";

// // Styled components para o cartão individual
// import * as S from "./cardItem.styles";

// interface CardItemProps {
//     card: CardData;
//     isActive: boolean;
//     isChosen?: boolean; // Novo: se cartão foi escolhido
//     showNumbers: boolean;
//     showBack?: boolean; // Novo: se deve mostrar verso (CVV)
//     cardColor: CardColor;
//     animatedStyle?: any;
//     buttonText?: string; // Novo: texto do botão
//     showButton?: boolean; // Novo: se deve mostrar botão
//     onPress: () => void;
//     onToggleVisibility: () => void;
//     onChooseCard?: () => void; // Novo: escolher cartão
//     onUseCard?: () => void; // Usar cartão
// }

// export function CardItem({
//     card,
//     isActive,
//     isChosen = false,
//     showNumbers,
//     showBack = false,
//     cardColor,
//     animatedStyle,
//     buttonText = "Escolher esse cartão?",
//     showButton = false,
//     onPress,
//     onToggleVisibility,
//     onChooseCard,
//     onUseCard,
// }: CardItemProps) {
//     // Função para mascarar número do cartão
//     const maskCardNumber = (number: string, show: boolean) => {
//         if (show) return number;
//         const cleanNumber = number.replace(/\s/g, "");
//         const lastFour = cleanNumber.slice(-4);
//         return `•••• •••• •••• ${lastFour}`;
//     };

//     // Handler do botão principal
//     const handleButtonPress = () => {
//         if (isChosen && onUseCard) {
//             onUseCard();
//         } else if (onChooseCard) {
//             onChooseCard();
//         }
//     };

//     return (
//         <S.CardContainer style={animatedStyle}>
//             <S.DynamicCard
//                 onPress={onPress}
//                 backgroundColor={cardColor.background}
//                 isChosen={isChosen}
//             >
//                 {!showBack ? (
//                     // ===== FRENTE DO CARTÃO =====
//                     <>
//                         {/* Topo do cartão */}
//                         <S.CardTop>
//                             <S.DynamicText color={cardColor.text}>
//                                 {card.type.toUpperCase()}
//                             </S.DynamicText>
//                             <S.TopRightContainer>
//                                 <S.ToggleButton onPress={onToggleVisibility}>
//                                     <S.DynamicText color={cardColor.text}>
//                                         {showNumbers ? "👁️" : "👁️‍🗨️"}
//                                     </S.DynamicText>
//                                 </S.ToggleButton>
//                                 {isChosen && (
//                                     <S.ChosenCheckmark>
//                                         <S.CheckmarkText>✓</S.CheckmarkText>
//                                     </S.ChosenCheckmark>
//                                 )}
//                             </S.TopRightContainer>
//                         </S.CardTop>

//                         {/* Número do cartão */}
//                         <S.DynamicCardNumber color={cardColor.text}>
//                             {maskCardNumber(card.numero, showNumbers)}
//                         </S.DynamicCardNumber>

//                         {/* Informações do cartão */}
//                         <S.CardBottom>
//                             <S.CardInfo>
//                                 <S.DynamicCardLabel
//                                     color={cardColor.textSecondary}
//                                 >
//                                     Card Holder
//                                 </S.DynamicCardLabel>
//                                 <S.DynamicCardName color={cardColor.text}>
//                                     {card.nome}
//                                 </S.DynamicCardName>
//                             </S.CardInfo>
//                             <S.DynamicCardExpiry color={cardColor.text}>
//                                 {card.validade}
//                             </S.DynamicCardExpiry>
//                         </S.CardBottom>
//                     </>
//                 ) : (
//                     // ===== VERSO DO CARTÃO (CVV) =====
//                     <S.CardBackContent>
//                         <S.DynamicText color={cardColor.text}>
//                             {card.type.toUpperCase()}
//                         </S.DynamicText>

//                         <S.MagneticStripe />

//                         <S.CVVSection>
//                             <S.DynamicCardLabel color={cardColor.textSecondary}>
//                                 CVV
//                             </S.DynamicCardLabel>
//                             <S.CVVBox backgroundColor={cardColor.textSecondary}>
//                                 <S.CVVText color={cardColor.background}>
//                                     {showNumbers ? card.cvv : "•••"}
//                                 </S.CVVText>
//                             </S.CVVBox>
//                         </S.CVVSection>

//                         <S.DynamicCardLabel color={cardColor.textSecondary}>
//                             Toque novamente para virar
//                         </S.DynamicCardLabel>
//                     </S.CardBackContent>
//                 )}
//             </S.DynamicCard>

//             {/* Botão principal - aparece quando cartão está sozinho */}
//             {showButton && (
//                 <S.ActionButton onPress={handleButtonPress} isChosen={isChosen}>
//                     <S.ActionButtonText isChosen={isChosen}>
//                         {buttonText}
//                     </S.ActionButtonText>
//                 </S.ActionButton>
//             )}
//         </S.CardContainer>
//     );
// }
import React from "react";
import type { Card } from "@/stores/useCardStore"; // 🔄 Usando tipo do Zustand
import type { CardColor } from "@/utils/colorUtils";

// Styled components para o cartão individual
import * as S from "./cardItem.styles";

interface CardItemProps {
    card: Card; // 🔄 Tipo do Zustand
    isActive: boolean;
    isChosen?: boolean;
    showNumbers: boolean;
    showBack?: boolean;
    cardColor: CardColor;
    animatedStyle?: any;
    buttonText?: string;
    showButton?: boolean;
    onPress: () => void;
    onToggleVisibility: () => void;
    onChooseCard?: () => void;
    onUseCard?: () => void;
    onRemoveCard?: () => void; // 🆕 Nova função deletar (opcional)
}

export function CardItem({
    card,
    isActive,
    isChosen = false,
    showNumbers,
    showBack = false,
    cardColor,
    animatedStyle,
    buttonText = "Escolher esse cartão?",
    showButton = false,
    onPress,
    onToggleVisibility,
    onChooseCard,
    onUseCard,
    onRemoveCard,
}: CardItemProps) {
    // Função para mascarar número do cartão
    const maskCardNumber = (number: string, show: boolean) => {
        if (show) return number;
        const cleanNumber = number.replace(/\s/g, "");
        const lastFour = cleanNumber.slice(-4);
        return `•••• •••• •••• ${lastFour}`;
    };

    // Handler do botão principal
    const handleButtonPress = () => {
        if (isChosen && onUseCard) {
            onUseCard();
        } else if (onChooseCard) {
            onChooseCard();
        }
    };

    return (
        <S.CardContainer style={animatedStyle}>
            <S.DynamicCard
                onPress={onPress}
                backgroundColor={cardColor.background}
                isChosen={isChosen}
            >
                {!showBack ? (
                    // ===== FRENTE DO CARTÃO =====
                    <>
                        {/* Topo do cartão */}
                        <S.CardTop>
                            <S.DynamicText color={cardColor.text}>
                                {card.type.toUpperCase()}
                            </S.DynamicText>
                            <S.TopRightContainer>
                                <S.ToggleButton onPress={onToggleVisibility}>
                                    <S.DynamicText color={cardColor.text}>
                                        {showNumbers ? "👁️" : "👁️‍🗨️"}
                                    </S.DynamicText>
                                </S.ToggleButton>
                                {isChosen && (
                                    <S.ChosenCheckmark>
                                        <S.CheckmarkText>✓</S.CheckmarkText>
                                    </S.ChosenCheckmark>
                                )}
                                {/* Botão deletar (opcional) - só aparece quando cartão está ativo */}
                                {isActive && onRemoveCard && (
                                    <S.DeleteButton onPress={onRemoveCard}>
                                        <S.DeleteButtonText>
                                            🗑️
                                        </S.DeleteButtonText>
                                    </S.DeleteButton>
                                )}
                            </S.TopRightContainer>
                        </S.CardTop>

                        {/* Número do cartão */}
                        <S.DynamicCardNumber color={cardColor.text}>
                            {maskCardNumber(card.numero, showNumbers)}
                        </S.DynamicCardNumber>

                        {/* Informações do cartão */}
                        <S.CardBottom>
                            <S.CardInfo>
                                <S.DynamicCardLabel
                                    color={cardColor.textSecondary}
                                >
                                    Card Holder
                                </S.DynamicCardLabel>
                                <S.DynamicCardName color={cardColor.text}>
                                    {card.nome}
                                </S.DynamicCardName>
                            </S.CardInfo>
                            <S.DynamicCardExpiry color={cardColor.text}>
                                {card.validade}
                            </S.DynamicCardExpiry>
                        </S.CardBottom>
                    </>
                ) : (
                    // ===== VERSO DO CARTÃO (CVV) =====
                    <S.CardBackContent>
                        <S.DynamicText color={cardColor.text}>
                            {card.type.toUpperCase()}
                        </S.DynamicText>

                        <S.MagneticStripe />

                        <S.CVVSection>
                            <S.DynamicCardLabel color={cardColor.textSecondary}>
                                CVV
                            </S.DynamicCardLabel>
                            <S.CVVBox backgroundColor={cardColor.textSecondary}>
                                <S.CVVText color={cardColor.background}>
                                    {showNumbers ? card.cvv : "•••"}
                                </S.CVVText>
                            </S.CVVBox>
                        </S.CVVSection>

                        <S.DynamicCardLabel color={cardColor.textSecondary}>
                            Toque novamente para virar
                        </S.DynamicCardLabel>
                    </S.CardBackContent>
                )}
            </S.DynamicCard>

            {/* Botão principal - aparece quando cartão está sozinho */}
            {showButton && (
                <S.ActionButton onPress={handleButtonPress} isChosen={isChosen}>
                    <S.ActionButtonText isChosen={isChosen}>
                        {buttonText}
                    </S.ActionButtonText>
                </S.ActionButton>
            )}
        </S.CardContainer>
    );
}
