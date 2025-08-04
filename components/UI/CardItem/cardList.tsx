// import React, { useState, useRef, useEffect } from "react";
// import { Animated } from "react-native";
// import type { CardListProps } from "./cardList.types";

// import * as S from "./cardList.styles";

// export const CardList: React.FC<CardListProps> = ({
//     cards,
//     activeCardId,
//     onCardPress,
//     onUseCard,
// }) => {
//     const [showNumbersState, setShowNumbersState] = useState<{
//         [key: string]: boolean;
//     }>({});

//     const greenCard = cards.find((card) => card.type === "green");
//     const blackCard = cards.find((card) => card.type === "black");

//     const blackCardAnimation = useRef(new Animated.Value(140)).current;
//     const greenCardAnimation = useRef(new Animated.Value(0)).current;
//     useEffect(() => {
//         if (activeCardId === null) {
//             Animated.parallel([
//                 Animated.spring(greenCardAnimation, {
//                     toValue: 0, // Green no topo
//                     useNativeDriver: true,
//                     tension: 100,
//                     friction: 8,
//                 }),
//                 Animated.spring(blackCardAnimation, {
//                     toValue: -100,
//                     useNativeDriver: true,
//                     tension: 100,
//                     friction: 8,
//                 }),
//             ]).start();
//         } else if (activeCardId === greenCard?.id) {
//             Animated.parallel([
//                 Animated.spring(greenCardAnimation, {
//                     toValue: -140,
//                     useNativeDriver: true,
//                     tension: 120,
//                     friction: 7,
//                 }),
//                 Animated.spring(blackCardAnimation, {
//                     toValue: 380,
//                     useNativeDriver: true,
//                     tension: 80,
//                     friction: 6,
//                 }),
//             ]).start();
//         } else if (activeCardId === blackCard?.id) {
//             Animated.parallel([
//                 Animated.spring(blackCardAnimation, {
//                     toValue: -140,
//                     useNativeDriver: true,
//                     tension: 120,
//                     friction: 7,
//                 }),
//                 Animated.spring(greenCardAnimation, {
//                     toValue: 380,
//                     useNativeDriver: true,
//                     tension: 80,
//                     friction: 6,
//                 }),
//             ]).start();
//         }
//     }, [activeCardId, greenCard, blackCard]);

//     const maskCardNumber = (number: string, show: boolean) => {
//         if (show) return number;
//         const cleanNumber = number.replace(/\s/g, "");
//         const lastFour = cleanNumber.slice(-4);
//         return `•••• •••• •••• ${lastFour}`;
//     };

//     // Toggle visibilidade por cartão
//     const toggleCardVisibility = (cardId: string) => {
//         setShowNumbersState((prev) => ({
//             ...prev,
//             [cardId]: !prev[cardId],
//         }));
//     };

//     if (!greenCard || !blackCard) {
//         return (
//             <S.Container>
//                 <S.StackContainer />
//             </S.Container>
//         );
//     }

//     return (
//         <S.Container>
//             <S.StackContainer>
//                 <S.CardContainer
//                     style={{
//                         transform: [{ translateY: blackCardAnimation }],
//                         zIndex: 1,
//                     }}
//                 >
//                     <S.BlackCard onPress={() => onCardPress(blackCard.id)}>
//                         <S.CardTop>
//                             <S.BlackCardType>Black Card</S.BlackCardType>
//                             <S.ToggleButton
//                                 onPress={() =>
//                                     toggleCardVisibility(blackCard.id)
//                                 }
//                             >
//                                 <S.BlackToggleIcon>
//                                     {showNumbersState[blackCard.id]
//                                         ? "🙈"
//                                         : "👁️"}
//                                 </S.BlackToggleIcon>
//                             </S.ToggleButton>
//                         </S.CardTop>

//                         <S.BlackCardNumber>
//                             {maskCardNumber(
//                                 blackCard.numero,
//                                 showNumbersState[blackCard.id]
//                             )}
//                         </S.BlackCardNumber>

//                         <S.CardBottom>
//                             <S.CardInfo>
//                                 <S.BlackCardLabel>Card Holder</S.BlackCardLabel>
//                                 <S.BlackCardName>
//                                     {blackCard.nome}
//                                 </S.BlackCardName>
//                             </S.CardInfo>
//                             <S.CardInfo>
//                                 <S.BlackCardLabel>Expires</S.BlackCardLabel>
//                                 <S.BlackCardExpiry>
//                                     Validade {blackCard.validade}
//                                 </S.BlackCardExpiry>
//                             </S.CardInfo>
//                         </S.CardBottom>
//                     </S.BlackCard>

//                     {activeCardId === blackCard.id && (
//                         <S.UseButton onPress={() => onUseCard?.(blackCard.id)}>
//                             <S.UseButtonText>usar este cartão</S.UseButtonText>
//                         </S.UseButton>
//                     )}
//                 </S.CardContainer>

//                 <S.CardContainer
//                     style={{
//                         transform: [{ translateY: greenCardAnimation }],
//                         zIndex: 2,
//                     }}
//                 >
//                     <S.GreenCard onPress={() => onCardPress(greenCard.id)}>
//                         <S.CardTop>
//                             <S.GreenCardType>Green Card</S.GreenCardType>
//                             <S.ToggleButton
//                                 onPress={() =>
//                                     toggleCardVisibility(greenCard.id)
//                                 }
//                             >
//                                 <S.GreenToggleIcon>
//                                     {showNumbersState[greenCard.id]
//                                         ? "🙈"
//                                         : "👁️"}
//                                 </S.GreenToggleIcon>
//                             </S.ToggleButton>
//                         </S.CardTop>

//                         <S.GreenCardNumber>
//                             {maskCardNumber(
//                                 greenCard.numero,
//                                 showNumbersState[greenCard.id]
//                             )}
//                         </S.GreenCardNumber>

//                         <S.CardBottom>
//                             <S.CardInfo>
//                                 <S.GreenCardLabel>Card Holder</S.GreenCardLabel>
//                                 <S.GreenCardName>
//                                     {greenCard.nome}
//                                 </S.GreenCardName>
//                             </S.CardInfo>
//                             <S.CardInfo>
//                                 <S.GreenCardLabel>Expires</S.GreenCardLabel>
//                                 <S.GreenCardExpiry>
//                                     Validade {greenCard.validade}
//                                 </S.GreenCardExpiry>
//                             </S.CardInfo>
//                         </S.CardBottom>
//                     </S.GreenCard>

//                     {activeCardId === greenCard.id && (
//                         <S.UseButton onPress={() => onUseCard?.(greenCard.id)}>
//                             <S.UseButtonText>
//                                 usar com este cartão
//                             </S.UseButtonText>
//                         </S.UseButton>
//                     )}
//                 </S.CardContainer>
//             </S.StackContainer>
//         </S.Container>
//     );
// };

// import React from "react";
// import type { CardData } from "@/components/UI/CardItem/cardList.types";
// import type { CardColor } from "@/utils/colorUtils";

// // Styled components para o cartão individual
// import * as S from "./cardItem.styles";

// interface CardItemProps {
//     card: CardData;
//     isActive: boolean;
//     showNumbers: boolean;
//     cardColor: CardColor; // Nova prop para cor dinâmica
//     animatedStyle?: any; // Para receber transformações de animação
//     onPress: () => void;
//     onToggleVisibility: () => void;
//     onUseCard: () => void;
// }

// export function CardItem({
//     card,
//     isActive,
//     showNumbers,
//     cardColor, // Receber cor dinâmica
//     animatedStyle,
//     onPress,
//     onToggleVisibility,
//     onUseCard,
// }: CardItemProps) {
//     // Função para mascarar número do cartão
//     const maskCardNumber = (number: string, show: boolean) => {
//         if (show) return number;
//         const cleanNumber = number.replace(/\s/g, "");
//         const lastFour = cleanNumber.slice(-4);
//         return `•••• •••• •••• ${lastFour}`;
//     };

//     return (
//         <S.CardContainer style={animatedStyle}>
//             <S.DynamicCard
//                 onPress={onPress}
//                 backgroundColor={cardColor.background}
//             >
//                 {/* Topo do cartão */}
//                 <S.CardTop>
//                     <S.DynamicText color={cardColor.text}>
//                         {card.type.toUpperCase()}
//                     </S.DynamicText>
//                     <S.ToggleButton onPress={onToggleVisibility}>
//                         <S.DynamicText color={cardColor.text}>
//                             {showNumbers ? "👁️" : "👁️‍🗨️"}
//                         </S.DynamicText>
//                     </S.ToggleButton>
//                 </S.CardTop>

//                 {/* Número do cartão */}
//                 <S.DynamicCardNumber color={cardColor.text}>
//                     {maskCardNumber(card.numero, showNumbers)}
//                 </S.DynamicCardNumber>

//                 {/* Informações do cartão */}
//                 <S.CardBottom>
//                     <S.CardInfo>
//                         <S.DynamicCardLabel color={cardColor.textSecondary}>
//                             Card Holder
//                         </S.DynamicCardLabel>
//                         <S.DynamicCardName color={cardColor.text}>
//                             {card.nome}
//                         </S.DynamicCardName>
//                     </S.CardInfo>
//                     <S.DynamicCardExpiry color={cardColor.text}>
//                         {card.validade}
//                     </S.DynamicCardExpiry>
//                 </S.CardBottom>
//             </S.DynamicCard>

//             {/* Botão Usar - só aparece quando ativo */}
//             {isActive && (
//                 <S.UseButton onPress={onUseCard}>
//                     <S.UseButtonText>USAR CARTÃO</S.UseButtonText>
//                 </S.UseButton>
//             )}
//         </S.CardContainer>
//     );
// }
