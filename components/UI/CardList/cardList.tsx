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

//     // Refs para animação de cada cartão
//     const cardAnimations = useRef<{
//         [key: string]: {
//             translateY: Animated.Value;
//             opacity: Animated.Value;
//         };
//     }>({});

//     // Inicializar animações para cada cartão
//     useEffect(() => {
//         cards.forEach((card) => {
//             if (!cardAnimations.current[card.id]) {
//                 cardAnimations.current[card.id] = {
//                     translateY: new Animated.Value(0),
//                     opacity: new Animated.Value(1),
//                 };
//             }
//         });
//     }, [cards]);

//     useEffect(() => {
//         cards.forEach((card) => {
//             const isActive = activeCardId === card.id;
//             const animations = cardAnimations.current[card.id];

//             if (!animations) return;

//             if (activeCardId === null) {
//                 // Nenhum cartão selecionado - todos voltam à posição normal
//                 Animated.parallel([
//                     Animated.spring(animations.translateY, {
//                         toValue: 0,
//                         useNativeDriver: true,
//                         tension: 100,
//                         friction: 8,
//                     }),
//                     Animated.spring(animations.opacity, {
//                         toValue: 1,
//                         useNativeDriver: true,
//                         tension: 100,
//                         friction: 8,
//                     }),
//                 ]).start();
//             } else if (isActive) {
//                 // Cartão ativo - posição normal, totalmente visível
//                 Animated.parallel([
//                     Animated.spring(animations.translateY, {
//                         toValue: 0,
//                         useNativeDriver: true,
//                         tension: 120, // Mais rápido para subir
//                         friction: 7, // Mais bounce
//                     }),
//                     Animated.spring(animations.opacity, {
//                         toValue: 1,
//                         useNativeDriver: true,
//                         tension: 100,
//                         friction: 8,
//                     }),
//                 ]).start();
//             } else {
//                 // Cartão inativo - desce e fica opaco
//                 Animated.parallel([
//                     Animated.spring(animations.translateY, {
//                         toValue: 60, // Desce 60px
//                         useNativeDriver: true,
//                         tension: 80, // Mais lento para descer
//                         friction: 6, // Mais bounce
//                     }),
//                     Animated.spring(animations.opacity, {
//                         toValue: 0.4, // Fica bem opaco
//                         useNativeDriver: true,
//                         tension: 100,
//                         friction: 8,
//                     }),
//                 ]).start();
//             }
//         });
//     }, [activeCardId, cards]);

//     // Função para mascarar número do cartão
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

//     return (
//         <S.Container>
//             {cards.map((card) => {
//                 const isActive = activeCardId === card.id;
//                 const isGreen = card.type === "green";
//                 const showCardNumbers = showNumbersState[card.id] || false;
//                 const animations = cardAnimations.current[card.id];

//                 // VALIDAÇÃO NO TSX - ESCOLHER COMPONENTE
//                 let CardComponent;
//                 let CardTypeComponent;
//                 let ToggleIconComponent;
//                 let CardNumberComponent;
//                 let CardLabelComponent;
//                 let CardNameComponent;
//                 let CardExpiryComponent;

//                 if (isGreen) {
//                     CardComponent = isActive
//                         ? S.GreenCardActive
//                         : S.GreenCardInactive;
//                     CardTypeComponent = S.GreenCardType;
//                     ToggleIconComponent = S.GreenToggleIcon;
//                     CardNumberComponent = S.GreenCardNumber;
//                     CardLabelComponent = S.GreenCardLabel;
//                     CardNameComponent = S.GreenCardName;
//                     CardExpiryComponent = S.GreenCardExpiry;
//                 } else {
//                     CardComponent = isActive
//                         ? S.BlackCardActive
//                         : S.BlackCardInactive;
//                     CardTypeComponent = S.BlackCardType;
//                     ToggleIconComponent = S.BlackToggleIcon;
//                     CardNumberComponent = S.BlackCardNumber;
//                     CardLabelComponent = S.BlackCardLabel;
//                     CardNameComponent = S.BlackCardName;
//                     CardExpiryComponent = S.BlackCardExpiry;
//                 }

//                 return (
//                     <S.CardContainer
//                         key={card.id}
//                         style={{
//                             transform: [
//                                 {
//                                     translateY: animations?.translateY || 0,
//                                 },
//                             ],
//                             opacity: animations?.opacity || 1,
//                         }}
//                     >
//                         <CardComponent onPress={() => onCardPress(card.id)}>
//                             <S.CardTop>
//                                 <CardTypeComponent>
//                                     {isGreen ? "Green Card" : "Black Card"}
//                                 </CardTypeComponent>

//                                 <S.ToggleButton
//                                     onPress={() =>
//                                         toggleCardVisibility(card.id)
//                                     }
//                                 >
//                                     <ToggleIconComponent>
//                                         {showCardNumbers ? "🙈" : "👁️"}
//                                     </ToggleIconComponent>
//                                 </S.ToggleButton>
//                             </S.CardTop>

//                             <CardNumberComponent>
//                                 {maskCardNumber(card.numero, showCardNumbers)}
//                             </CardNumberComponent>

//                             <S.CardBottom>
//                                 <S.CardInfo>
//                                     <CardLabelComponent>
//                                         Card Holder
//                                     </CardLabelComponent>
//                                     <CardNameComponent>
//                                         {card.nome}
//                                     </CardNameComponent>
//                                 </S.CardInfo>

//                                 <S.CardInfo>
//                                     <CardLabelComponent>
//                                         Expires
//                                     </CardLabelComponent>
//                                     <CardExpiryComponent>
//                                         Validade {card.validade}
//                                     </CardExpiryComponent>
//                                 </S.CardInfo>
//                             </S.CardBottom>
//                         </CardComponent>

//                         {isActive && (
//                             <S.UseButton onPress={() => onUseCard?.(card.id)}>
//                                 <S.UseButtonText>
//                                     {isGreen
//                                         ? "pagar com este cartão"
//                                         : "usar este cartão"}
//                                 </S.UseButtonText>
//                             </S.UseButton>
//                         )}
//                     </S.CardContainer>
//                 );
//             })}
//         </S.Container>
//     );
// };

// ===== COMPONENTS/UI/CARDLIST/CARDLIST.TSX (STACK SYSTEM) =====
import React, { useState, useRef, useEffect } from "react";
import { Animated } from "react-native";
import type { CardListProps } from "./cardList.types";
import * as S from "./cardList.styles";

export const CardList: React.FC<CardListProps> = ({
    cards,
    activeCardId,
    onCardPress,
    onUseCard,
}) => {
    const [showNumbersState, setShowNumbersState] = useState<{
        [key: string]: boolean;
    }>({});

    // Encontrar cartões específicos
    const greenCard = cards.find((card) => card.type === "green");
    const blackCard = cards.find((card) => card.type === "black");

    // Animações para cada cartão
    const blackCardAnimation = useRef(new Animated.Value(140)).current; // Começa 140px abaixo (20% visível)
    const greenCardAnimation = useRef(new Animated.Value(0)).current; // Começa no topo

    useEffect(() => {
        if (activeCardId === null) {
            // Estado inicial: Green na frente, Black atrás (20% visível)
            Animated.parallel([
                Animated.spring(greenCardAnimation, {
                    toValue: 0, // Green no topo
                    useNativeDriver: true,
                    tension: 100,
                    friction: 8,
                }),
                Animated.spring(blackCardAnimation, {
                    toValue: -100, // Black 140px abaixo (só 20% visível)
                    useNativeDriver: true,
                    tension: 100,
                    friction: 8,
                }),
            ]).start();
        } else if (activeCardId === greenCard?.id) {
            // Green card ativo: Black card desce até quase sumir
            Animated.parallel([
                Animated.spring(greenCardAnimation, {
                    toValue: -140, // Green fica no topo
                    useNativeDriver: true,
                    tension: 120,
                    friction: 7,
                }),
                Animated.spring(blackCardAnimation, {
                    toValue: 380, // Black desce até quase sumir
                    useNativeDriver: true,
                    tension: 80,
                    friction: 6,
                }),
            ]).start();
        } else if (activeCardId === blackCard?.id) {
            // Black card ativo: Black sobe, Green desce
            Animated.parallel([
                Animated.spring(blackCardAnimation, {
                    toValue: -140, // Black sobe para o topo
                    useNativeDriver: true,
                    tension: 120,
                    friction: 7,
                }),
                Animated.spring(greenCardAnimation, {
                    toValue: 380, // Green vai para trás (20% visível)
                    useNativeDriver: true,
                    tension: 80,
                    friction: 6,
                }),
            ]).start();
        }
    }, [activeCardId, greenCard, blackCard]);

    // Função para mascarar número do cartão
    const maskCardNumber = (number: string, show: boolean) => {
        if (show) return number;
        const cleanNumber = number.replace(/\s/g, "");
        const lastFour = cleanNumber.slice(-4);
        return `•••• •••• •••• ${lastFour}`;
    };

    // Toggle visibilidade por cartão
    const toggleCardVisibility = (cardId: string) => {
        setShowNumbersState((prev) => ({
            ...prev,
            [cardId]: !prev[cardId],
        }));
    };

    if (!greenCard || !blackCard) {
        return (
            <S.Container>
                <S.StackContainer />
            </S.Container>
        );
    }

    return (
        <S.Container>
            <S.StackContainer>
                <S.CardContainer
                    style={{
                        transform: [{ translateY: blackCardAnimation }],
                        zIndex: 1,
                    }}
                >
                    <S.BlackCard onPress={() => onCardPress(blackCard.id)}>
                        <S.CardTop>
                            <S.BlackCardType>Black Card</S.BlackCardType>
                            <S.ToggleButton
                                onPress={() =>
                                    toggleCardVisibility(blackCard.id)
                                }
                            >
                                <S.BlackToggleIcon>
                                    {showNumbersState[blackCard.id]
                                        ? "🙈"
                                        : "👁️"}
                                </S.BlackToggleIcon>
                            </S.ToggleButton>
                        </S.CardTop>

                        <S.BlackCardNumber>
                            {maskCardNumber(
                                blackCard.numero,
                                showNumbersState[blackCard.id]
                            )}
                        </S.BlackCardNumber>

                        <S.CardBottom>
                            <S.CardInfo>
                                <S.BlackCardLabel>Card Holder</S.BlackCardLabel>
                                <S.BlackCardName>
                                    {blackCard.nome}
                                </S.BlackCardName>
                            </S.CardInfo>
                            <S.CardInfo>
                                <S.BlackCardLabel>Expires</S.BlackCardLabel>
                                <S.BlackCardExpiry>
                                    Validade {blackCard.validade}
                                </S.BlackCardExpiry>
                            </S.CardInfo>
                        </S.CardBottom>
                    </S.BlackCard>

                    {activeCardId === blackCard.id && (
                        <S.UseButton onPress={() => onUseCard?.(blackCard.id)}>
                            <S.UseButtonText>usar este cartão</S.UseButtonText>
                        </S.UseButton>
                    )}
                </S.CardContainer>

                <S.CardContainer
                    style={{
                        transform: [{ translateY: greenCardAnimation }],
                        zIndex: 2,
                    }}
                >
                    <S.GreenCard onPress={() => onCardPress(greenCard.id)}>
                        <S.CardTop>
                            <S.GreenCardType>Green Card</S.GreenCardType>
                            <S.ToggleButton
                                onPress={() =>
                                    toggleCardVisibility(greenCard.id)
                                }
                            >
                                <S.GreenToggleIcon>
                                    {showNumbersState[greenCard.id]
                                        ? "🙈"
                                        : "👁️"}
                                </S.GreenToggleIcon>
                            </S.ToggleButton>
                        </S.CardTop>

                        <S.GreenCardNumber>
                            {maskCardNumber(
                                greenCard.numero,
                                showNumbersState[greenCard.id]
                            )}
                        </S.GreenCardNumber>

                        <S.CardBottom>
                            <S.CardInfo>
                                <S.GreenCardLabel>Card Holder</S.GreenCardLabel>
                                <S.GreenCardName>
                                    {greenCard.nome}
                                </S.GreenCardName>
                            </S.CardInfo>
                            <S.CardInfo>
                                <S.GreenCardLabel>Expires</S.GreenCardLabel>
                                <S.GreenCardExpiry>
                                    Validade {greenCard.validade}
                                </S.GreenCardExpiry>
                            </S.CardInfo>
                        </S.CardBottom>
                    </S.GreenCard>

                    {activeCardId === greenCard.id && (
                        <S.UseButton onPress={() => onUseCard?.(greenCard.id)}>
                            <S.UseButtonText>
                                usar com este cartão
                            </S.UseButtonText>
                        </S.UseButton>
                    )}
                </S.CardContainer>
            </S.StackContainer>
        </S.Container>
    );
};
