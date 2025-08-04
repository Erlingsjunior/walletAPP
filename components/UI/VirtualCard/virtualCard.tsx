import React, { useEffect, useRef } from "react";
import { Animated, Dimensions } from "react-native";
import type { VirtualCardProps } from "./virtualCard.types";
import * as S from "./virtualCard.styles";

const { width: screenWidth } = Dimensions.get("window");

export const VirtualCard: React.FC<VirtualCardProps> = ({
    numeroCartao,
    nomeTitular,
    vencimento,
    isValid,
    onSendAnimation,
    triggerSend = false,
}) => {
    const slideAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    // Formatar número do cartão para exibição
    const formatDisplayNumber = (number: string) => {
        if (!number) return "•••• •••• •••• ••••";

        // Preencher com bullets os espaços vazios
        const cleanNumber = number.replace(/\s/g, "");
        const totalChars = 16;
        const missingChars = totalChars - cleanNumber.length;
        const bullets = "•".repeat(missingChars);
        const fullNumber = cleanNumber + bullets;

        // Formar grupos de 4
        return fullNumber.replace(/(.{4})/g, "$1 ").trim();
    };

    // Animação de envio
    useEffect(() => {
        if (triggerSend && isValid) {
            // Animação: deslizar para direita e diminuir
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: screenWidth,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                // Callback quando animação terminar
                if (onSendAnimation) {
                    onSendAnimation();
                }

                // Reset para próximo uso
                setTimeout(() => {
                    slideAnim.setValue(0);
                    scaleAnim.setValue(1);
                }, 100);
            });
        }
    }, [triggerSend, isValid, slideAnim, scaleAnim, onSendAnimation]);

    // Animação de entrada suave quando valores mudam
    const cardScale = useRef(new Animated.Value(1)).current;
    useEffect(() => {
        Animated.sequence([
            Animated.timing(cardScale, {
                toValue: 1.02,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(cardScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    }, [numeroCartao, nomeTitular, vencimento]);

    return (
        <S.Container>
            <S.CardContainer
                style={{
                    transform: [
                        { translateX: slideAnim },
                        { scale: Animated.multiply(scaleAnim, cardScale) },
                    ],
                }}
            >
                <S.CardGradient isValid={isValid}>
                    <S.CardTop>
                        <S.CardType>WALLET CARD</S.CardType>
                        <S.CardChip />
                    </S.CardTop>

                    <S.CardNumber hasValue={!!numeroCartao}>
                        {formatDisplayNumber(numeroCartao)}
                    </S.CardNumber>

                    <S.CardBottom>
                        <S.CardInfo>
                            <S.CardLabel>Card Holder</S.CardLabel>
                            <S.CardName hasValue={!!nomeTitular}>
                                {nomeTitular || "NOME DO TITULAR"}
                            </S.CardName>
                        </S.CardInfo>

                        <S.CardInfo>
                            <S.CardLabel>Expires</S.CardLabel>
                            <S.CardExpiry hasValue={!!vencimento}>
                                {vencimento || "MM/AA"}
                            </S.CardExpiry>
                        </S.CardInfo>
                    </S.CardBottom>
                </S.CardGradient>
            </S.CardContainer>

            <S.StatusIndicator isValid={isValid} />
        </S.Container>
    );
};

// import React, { useEffect, useRef, useCallback } from "react";
// import { Animated, Dimensions } from "react-native";
// import type { VirtualCardProps } from "./virtualCard.types";
// import * as S from "./virtualCard.styles";

// const { width: screenWidth } = Dimensions.get("window");

// export const VirtualCard: React.FC<VirtualCardProps> = ({
//     numeroCartao,
//     nomeTitular,
//     vencimento,
//     isValid,
//     onSendAnimation,
//     triggerSend = false,
// }) => {
//     const slideAnim = useRef(new Animated.Value(0)).current;
//     const scaleAnim = useRef(new Animated.Value(1)).current;
//     const cardScale = useRef(new Animated.Value(1)).current;
//     const isAnimating = useRef(false);

//     // Formatar número do cartão para exibição
//     const formatDisplayNumber = (number: string) => {
//         if (!number) return "•••• •••• •••• ••••";

//         const cleanNumber = number.replace(/\s/g, "");
//         const totalChars = 16;
//         const missingChars = totalChars - cleanNumber.length;
//         const bullets = "•".repeat(missingChars);
//         const fullNumber = cleanNumber + bullets;

//         return fullNumber.replace(/(.{4})/g, "$1 ").trim();
//     };

//     // Callback memoizado para evitar re-renders
//     const handleAnimationComplete = useCallback(() => {
//         isAnimating.current = false;
//         console.log("🎯 Animação completada");

//         if (onSendAnimation) {
//             onSendAnimation();
//         }

//         // Reset com delay maior para evitar conflitos
//         setTimeout(() => {
//             slideAnim.setValue(0);
//             scaleAnim.setValue(1);
//             console.log("🔄 Animação resetada");
//         }, 200);
//     }, [onSendAnimation, slideAnim, scaleAnim]);

//     // Animação de envio
//     useEffect(() => {
//         console.log("🚀 VirtualCard useEffect:", {
//             triggerSend,
//             isValid,
//             isAnimating: isAnimating.current,
//         });

//         if (triggerSend && isValid && !isAnimating.current) {
//             console.log("▶️ Iniciando animação...");
//             isAnimating.current = true;

//             // Animação: deslizar para direita e diminuir
//             Animated.parallel([
//                 Animated.timing(slideAnim, {
//                     toValue: screenWidth,
//                     duration: 800,
//                     useNativeDriver: true,
//                 }),
//                 Animated.timing(scaleAnim, {
//                     toValue: 0.3,
//                     duration: 800,
//                     useNativeDriver: true,
//                 }),
//             ]).start(handleAnimationComplete);
//         }
//     }, [triggerSend, isValid, slideAnim, scaleAnim, handleAnimationComplete]);

//     // Animação de feedback quando valores mudam (apenas se não está enviando)
//     useEffect(() => {
//         if (!triggerSend && !isAnimating.current) {
//             Animated.sequence([
//                 Animated.timing(cardScale, {
//                     toValue: 1.02,
//                     duration: 100,
//                     useNativeDriver: true,
//                 }),
//                 Animated.timing(cardScale, {
//                     toValue: 1,
//                     duration: 100,
//                     useNativeDriver: true,
//                 }),
//             ]).start();
//         }
//     }, [numeroCartao, nomeTitular, vencimento, triggerSend, cardScale]);

//     return (
//         <S.Container>
//             <S.CardContainer
//                 style={{
//                     transform: [
//                         { translateX: slideAnim },
//                         { scale: Animated.multiply(scaleAnim, cardScale) },
//                     ],
//                 }}
//             >
//                 <S.CardGradient isValid={isValid}>
//                     <S.CardTop>
//                         <S.CardType>WALLET CARD</S.CardType>
//                         <S.CardChip />
//                     </S.CardTop>

//                     <S.CardNumber hasValue={!!numeroCartao}>
//                         {formatDisplayNumber(numeroCartao)}
//                     </S.CardNumber>

//                     <S.CardBottom>
//                         <S.CardInfo>
//                             <S.CardLabel>Card Holder</S.CardLabel>
//                             <S.CardName hasValue={!!nomeTitular}>
//                                 {nomeTitular || "NOME DO TITULAR"}
//                             </S.CardName>
//                         </S.CardInfo>

//                         <S.CardInfo>
//                             <S.CardLabel>Expires</S.CardLabel>
//                             <S.CardExpiry hasValue={!!vencimento}>
//                                 {vencimento || "MM/AA"}
//                             </S.CardExpiry>
//                         </S.CardInfo>
//                     </S.CardBottom>
//                 </S.CardGradient>
//             </S.CardContainer>

//             <S.StatusIndicator isValid={isValid} />
//         </S.Container>
//     );
// };
