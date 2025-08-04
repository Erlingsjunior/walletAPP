// import React, { useState, useEffect, useRef } from "react";
// import { Animated } from "react-native";
// import { router } from "expo-router";
// import { BaseWallet } from "@/components/UI/BaseWallet/baseWallet";
// import { CardItem } from "@/components/UI/CardItem/cardItem";
// import { generateColorPalette, type CardColor } from "@/utils/colorUtils";
// import type {
//     MeusCartoesPageProps,
//     MeusCartoesPageState,
// } from "./meusCartoes.types";

// import type { CardData } from "@/components/UI/CardItem/cardList.types";

// // Importar dados do JSON
// import dbData from "@/db.json";

// import * as S from "./meusCartoes.styles";

// export default function MeusCartoesPage({}: MeusCartoesPageProps) {
//     const [state, setState] = useState<MeusCartoesPageState>({
//         cards: [],
//         activeCardId: null,
//         loading: true,
//     });

//     // Estado para controlar visibilidade dos números de cada cartão
//     const [showNumbersState, setShowNumbersState] = useState<{
//         [key: string]: boolean;
//     }>({});

//     const [cardColors, setCardColors] = useState<Record<string, CardColor>>({});

//     const cardAnimations = useRef<Record<string, Animated.Value>>({});

//     const initializeAnimations = (cards: CardData[]) => {
//         const animations: Record<string, Animated.Value> = {};

//         cards.forEach((card, index) => {
//             // Posição inicial: cartões empilhados (cada um um pouco atrás do anterior)
//             const initialPosition = index * -80; // -80px para cada cartão atrás
//             animations[card.id] = new Animated.Value(initialPosition);
//         });

//         cardAnimations.current = animations;
//         console.log("🎬 Animações inicializadas para", cards.length, "cartões");
//     };

//     // Função para animar cartões baseado no estado ativo
//     const animateCards = (activeCardId: string | null, cards: CardData[]) => {
//         if (
//             !cardAnimations.current ||
//             Object.keys(cardAnimations.current).length === 0
//         ) {
//             return;
//         }

//         console.log("🎬 Animando cartões - Ativo:", activeCardId);

//         if (activeCardId === null) {
//             // ===== ESTADO NEUTRO - EMPILHADOS =====
//             const animations = cards.map((card, index) =>
//                 Animated.spring(cardAnimations.current[card.id], {
//                     toValue: index * -80, // Empilhados: 0, -20, -40, -60...
//                     useNativeDriver: true,
//                     tension: 100,
//                     friction: 8,
//                 })
//             );

//             Animated.parallel(animations).start();
//         } else {
//             // ===== CARTÃO ATIVO - SEPARAR =====
//             const activeIndex = cards.findIndex(
//                 (card) => card.id === activeCardId
//             );

//             if (activeIndex === -1) return;

//             const animations = cards.map((card, index) => {
//                 let targetPosition = 0;

//                 if (index === activeIndex) {
//                     // Cartão ativo: vai para cima
//                     targetPosition = -140;
//                 } else if (index < activeIndex) {
//                     // Cartões antes do ativo: vão mais para trás
//                     targetPosition = (index - activeIndex) * 100 + 200;
//                 } else {
//                     // Cartões depois do ativo: vão para baixo
//                     targetPosition = (index - activeIndex) * 100 + 300;
//                 }

//                 return Animated.spring(cardAnimations.current[card.id], {
//                     toValue: targetPosition,
//                     useNativeDriver: true,
//                     tension: 120,
//                     friction: 7,
//                 });
//             });

//             Animated.parallel(animations).start();
//         }
//     };

//     // Effect para animar quando cartão ativo muda
//     useEffect(() => {
//         if (state.cards.length > 0) {
//             animateCards(state.activeCardId, state.cards);
//         }
//     }, [state.activeCardId, state.cards]);

//     // Carregar dados do JSON quando componente montar
//     useEffect(() => {
//         const loadCards = () => {
//             try {
//                 setTimeout(() => {
//                     const cards = dbData.cards;

//                     // Gerar paleta de cores para os cartões
//                     const cardIds = cards.map((card) => card.id);
//                     const colorPalette = generateColorPalette(cardIds);

//                     setState({
//                         cards: cards,
//                         activeCardId: null,
//                         loading: false,
//                     });

//                     setCardColors(colorPalette);

//                     // Inicializar animações depois que cartões carregam
//                     initializeAnimations(cards);

//                     console.log("🎨 Cores geradas:", colorPalette);
//                     console.log("📊 Total de cartões:", cards.length);
//                 }, 500);
//             } catch (error) {
//                 console.error("Erro ao carregar cartões:", error);
//                 setState({
//                     cards: [],
//                     activeCardId: null,
//                     loading: false,
//                 });
//             }
//         };

//         loadCards();
//     }, []);

//     // ===== HANDLERS =====
//     const handleBack = () => {
//         router.back();
//     };

//     const handleAddCard = () => {
//         router.push("/adicionarCartao");
//     };

//     const handleCardPress = (cardId: string) => {
//         console.log("Card pressionado:", cardId);

//         setState((prev) => ({
//             ...prev,
//             activeCardId: prev.activeCardId === cardId ? null : cardId,
//         }));
//     };

//     const handleUseCard = (cardId: string) => {
//         const selectedCard = state.cards.find((card) => card.id === cardId);
//         console.log("Usar cartão:", selectedCard);
//     };

//     // Toggle visibilidade por cartão
//     const toggleCardVisibility = (cardId: string) => {
//         setShowNumbersState((prev) => ({
//             ...prev,
//             [cardId]: !prev[cardId],
//         }));
//     };

//     // Função para obter estilo de animação de cada cartão
//     const getAnimatedStyle = (card: CardData) => {
//         const animation = cardAnimations.current[card.id];

//         if (!animation) {
//             return { transform: [{ translateY: 0 }] };
//         }

//         return {
//             transform: [{ translateY: animation }],
//         };
//     };

//     // Se estiver carregando
//     if (state.loading) {
//         return (
//             <S.Container>
//                 <BaseWallet
//                     onBack={handleBack}
//                     onAddCard={handleAddCard}
//                     showAddButton={true}
//                 >
//                     <S.Content>
//                         <S.LoadingContainer>
//                             <S.LoadingText>Carregando cartões...</S.LoadingText>
//                         </S.LoadingContainer>
//                     </S.Content>
//                 </BaseWallet>
//             </S.Container>
//         );
//     }

//     // Se não tem cartões
//     if (state.cards.length === 0) {
//         return (
//             <S.Container>
//                 <BaseWallet
//                     onBack={handleBack}
//                     onAddCard={handleAddCard}
//                     showAddButton={true}
//                 >
//                     <S.Content>
//                         <S.EmptyContainer>
//                             <S.EmptyText>Nenhum cartão encontrado</S.EmptyText>
//                             <S.EmptySubText>
//                                 Toque no botão + para adicionar seu primeiro
//                                 cartão
//                             </S.EmptySubText>
//                         </S.EmptyContainer>
//                     </S.Content>
//                 </BaseWallet>
//             </S.Container>
//         );
//     }

//     // Mostrar cartões com animação dinâmica
//     return (
//         <S.Container>
//             <BaseWallet
//                 onBack={handleBack}
//                 onAddCard={handleAddCard}
//                 showAddButton={true}
//             >
//                 <S.Content>
//                     <S.CardsAnimationContainer>
//                         <S.StackContainer>
//                             {/* Debug info */}
//                             <S.DebugInfo>
//                                 📊 {state.cards.length} cartões • 🎯 Ativo:{" "}
//                                 {state.activeCardId || "nenhum"}
//                             </S.DebugInfo>

//                             {/* Renderizar todos os cartões usando map() com animação dinâmica */}
//                             {state.cards.map((card, index) => {
//                                 const cardColor =
//                                     String(cardColors[card.id]) ||
//                                     "defaultColor";

//                                 // Se ainda não temos a cor (loading), usar cor padrão
//                                 if (!cardColor) {
//                                     return null;
//                                 }

//                                 return (
//                                     <CardItem
//                                         key={card.id}
//                                         card={card}
//                                         isActive={
//                                             state.activeCardId === card.id
//                                         }
//                                         showNumbers={
//                                             showNumbersState[card.id] || false
//                                         }
//                                         cardColor={cardColor}
//                                         animatedStyle={getAnimatedStyle(card)} // 🎬 Animação dinâmica
//                                         onPress={() => handleCardPress(card.id)}
//                                         onToggleVisibility={() =>
//                                             toggleCardVisibility(card.id)
//                                         }
//                                         onUseCard={() => handleUseCard(card.id)}
//                                     />
//                                 );
//                             })}
//                         </S.StackContainer>
//                     </S.CardsAnimationContainer>
//                 </S.Content>
//             </BaseWallet>
//         </S.Container>
//     );
// }

import React, { useState, useEffect, useRef } from "react";
import { Animated, Vibration, TouchableWithoutFeedback } from "react-native";
import { router } from "expo-router";
import { BaseWallet } from "@/components/UI/BaseWallet/baseWallet";
import { CardItem } from "@/components/UI/CardItem/cardItem";
import { generateColorPalette, type CardColor } from "@/utils/colorUtils";
import type {
    MeusCartoesPageProps,
    MeusCartoesPageState,
} from "./meusCartoes.types";
import type { CardData } from "@/components/UI/CardItem/cardList.types";

// Importar dados do JSON
import dbData from "@/db.json";

import * as S from "./meusCartoes.styles";

// Estados da animação
type AnimationState = "stacked" | "cardAlone" | "cardChosen";

export default function MeusCartoesPage({}: MeusCartoesPageProps) {
    const [state, setState] = useState<MeusCartoesPageState>({
        cards: [],
        activeCardId: null,
        loading: true,
    });

    // Estados avançados
    const [animationState, setAnimationState] =
        useState<AnimationState>("stacked");
    const [chosenCardId, setChosenCardId] = useState<string | null>(null);
    const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

    // Estado para controlar visibilidade dos números de cada cartão
    const [showNumbersState, setShowNumbersState] = useState<{
        [key: string]: boolean;
    }>({});

    // Estado para as cores dos cartões
    const [cardColors, setCardColors] = useState<Record<string, CardColor>>({});

    // ===== ANIMAÇÕES =====
    const cardAnimations = useRef<Record<string, Animated.Value>>({});
    const cardFlipAnimations = useRef<Record<string, Animated.Value>>({});

    // Inicializar animações
    const initializeAnimations = (cards: CardData[]) => {
        const animations: Record<string, Animated.Value> = {};
        const flipAnimations: Record<string, Animated.Value> = {};

        cards.forEach((card, index) => {
            const initialPosition = index * -80;
            animations[card.id] = new Animated.Value(initialPosition);
            flipAnimations[card.id] = new Animated.Value(0); // 0 = frente, 180 = verso
        });

        cardAnimations.current = animations;
        cardFlipAnimations.current = flipAnimations;
        console.log("🎬 Animações inicializadas para", cards.length, "cartões");
    };

    // ===== FUNÇÃO PRINCIPAL DE ANIMAÇÃO =====
    const animateCards = (
        newState: AnimationState,
        activeCardId: string | null,
        cards: CardData[]
    ) => {
        if (
            !cardAnimations.current ||
            Object.keys(cardAnimations.current).length === 0
        ) {
            return;
        }

        console.log("🎬 Animando:", newState, "- Cartão ativo:", activeCardId);

        switch (newState) {
            case "stacked":
                // ===== TODOS EMPILHADOS =====
                const stackedAnimations = cards.map((card, index) =>
                    Animated.spring(cardAnimations.current[card.id], {
                        toValue: index * -80, // 0, -80, -160, -240...
                        useNativeDriver: true,
                        tension: 100,
                        friction: 8,
                    })
                );
                Animated.parallel(stackedAnimations).start();
                break;

            case "cardAlone":
                // ===== UM CARTÃO SOZINHO, OUTROS DESCENDO =====
                const activeIndex = cards.findIndex(
                    (card) => card.id === activeCardId
                );
                if (activeIndex === -1) return;

                const aloneAnimations = cards.map((card, index) => {
                    let targetPosition = 0;

                    if (index === activeIndex) {
                        // Cartão ativo: posição de destaque
                        targetPosition = -50;
                    } else {
                        // Outros cartões: descem bastante (quase saem da tela)
                        targetPosition = 500 + index * 20;
                    }

                    return Animated.spring(cardAnimations.current[card.id], {
                        toValue: targetPosition,
                        useNativeDriver: true,
                        tension: 120,
                        friction: 8,
                    });
                });

                Animated.parallel(aloneAnimations).start();
                break;

            case "cardChosen":
                // ===== CARTÃO ESCOLHIDO (FIXO E COM CHECK) =====
                const chosenIndex = cards.findIndex(
                    (card) => card.id === activeCardId
                );
                if (chosenIndex === -1) return;

                const chosenAnimations = cards.map((card, index) => {
                    let targetPosition = 0;

                    if (index === chosenIndex) {
                        // Cartão escolhido: posição fixa de destaque
                        targetPosition = -100;
                    } else {
                        // Outros cartões: bem embaixo
                        targetPosition = 600;
                    }

                    return Animated.spring(cardAnimations.current[card.id], {
                        toValue: targetPosition,
                        useNativeDriver: true,
                        tension: 150,
                        friction: 9,
                    });
                });

                Animated.parallel(chosenAnimations).start();
                break;
        }
    };

    // ===== FUNÇÃO DE FLIP DO CARTÃO =====
    const flipCard = (cardId: string) => {
        const currentFlip = cardFlipAnimations.current[cardId];
        if (!currentFlip) return;

        const isFlipped = flippedCardId === cardId;
        const toValue = isFlipped ? 0 : 180; // 0 = frente, 180 = verso

        Animated.spring(currentFlip, {
            toValue,
            useNativeDriver: true,
            tension: 120,
            friction: 8,
        }).start();

        setFlippedCardId(isFlipped ? null : cardId);
        console.log("🔄 Flip cartão:", cardId, isFlipped ? "frente" : "verso");
    };

    // ===== EFEITOS =====
    useEffect(() => {
        if (state.cards.length > 0) {
            animateCards(animationState, state.activeCardId, state.cards);
        }
    }, [animationState, state.activeCardId, state.cards]);

    // Carregar dados
    useEffect(() => {
        const loadCards = () => {
            try {
                setTimeout(() => {
                    const cards = dbData.cards;
                    const cardIds = cards.map((card) => card.id);
                    const colorPalette = generateColorPalette(cardIds);

                    setState({
                        cards: cards,
                        activeCardId: null,
                        loading: false,
                    });

                    setCardColors(colorPalette);
                    initializeAnimations(cards);

                    console.log("📊 Total de cartões:", cards.length);
                }, 500);
            } catch (error) {
                console.error("Erro ao carregar cartões:", error);
                setState({
                    cards: [],
                    activeCardId: null,
                    loading: false,
                });
            }
        };

        loadCards();
    }, []);

    // ===== HANDLERS =====
    const handleBack = () => {
        router.back();
    };

    const handleAddCard = () => {
        router.push("/adicionarCartao");
    };

    // Handler para clicar no cartão
    const handleCardPress = (cardId: string) => {
        console.log(
            "🎯 Card pressionado:",
            cardId,
            "- Estado atual:",
            animationState
        );

        if (animationState === "stacked") {
            // Do empilhado → cartão sozinho
            setState((prev) => ({ ...prev, activeCardId: cardId }));
            setAnimationState("cardAlone");
        } else if (
            animationState === "cardAlone" &&
            state.activeCardId === cardId
        ) {
            // Cartão sozinho clicado → flip para mostrar CVV
            flipCard(cardId);
        } else if (
            animationState === "cardChosen" &&
            state.activeCardId === cardId
        ) {
            // Cartão escolhido clicado → flip
            flipCard(cardId);
        }
    };

    // Handler para clicar na área vazia (voltar ao empilhado)
    const handleBackgroundPress = () => {
        if (animationState !== "stacked") {
            console.log("🔙 Voltando ao estado empilhado");
            setState((prev) => ({ ...prev, activeCardId: null }));
            setAnimationState("stacked");
            setFlippedCardId(null); // Reset flip
        }
    };

    // Handler para escolher cartão
    const handleChooseCard = (cardId: string) => {
        console.log("✅ Cartão escolhido:", cardId);

        // Vibração de feedback
        Vibration.vibrate(100);

        setChosenCardId(cardId);
        setAnimationState("cardChosen");
    };

    // Handler para usar cartão
    const handleUseCard = (cardId: string) => {
        console.log("💳 Usar cartão:", cardId);
        // Aqui iria para tela de pagamento/uso
    };

    // Toggle visibilidade por cartão
    const toggleCardVisibility = (cardId: string) => {
        setShowNumbersState((prev) => ({
            ...prev,
            [cardId]: !prev[cardId],
        }));
    };

    const getAnimatedStyle = (card: CardData) => {
        const translateAnimation = cardAnimations.current[card.id];
        const flipAnimation = cardFlipAnimations.current[card.id];

        if (!translateAnimation) {
            return { transform: [{ translateY: 0 }] };
        }

        // Se não tem flip, só translateY
        if (!flipAnimation) {
            return { transform: [{ translateY: translateAnimation }] };
        }

        // Se tem flip, inclui rotateY
        return {
            transform: [
                { translateY: translateAnimation },
                {
                    rotateY: flipAnimation.interpolate({
                        inputRange: [0, 180],
                        outputRange: ["0deg", "180deg"],
                    }),
                },
            ],
        };
    };

    // Determinar se deve mostrar verso (CVV)
    const shouldShowBack = (cardId: string) => {
        return flippedCardId === cardId;
    };

    // Determinar texto do botão
    const getButtonText = (cardId: string) => {
        if (chosenCardId === cardId) {
            return "Usar esse cartão?";
        }
        return "Escolher esse cartão?";
    };

    // Se estiver carregando
    if (state.loading) {
        return (
            <S.Container>
                <BaseWallet
                    onBack={handleBack}
                    onAddCard={handleAddCard}
                    showAddButton={true}
                >
                    <S.Content>
                        <S.LoadingContainer>
                            <S.LoadingText>Carregando cartões...</S.LoadingText>
                        </S.LoadingContainer>
                    </S.Content>
                </BaseWallet>
            </S.Container>
        );
    }

    // Se não tem cartões
    if (state.cards.length === 0) {
        return (
            <S.Container>
                <BaseWallet
                    onBack={handleBack}
                    onAddCard={handleAddCard}
                    showAddButton={true}
                >
                    <S.Content>
                        <S.EmptyContainer>
                            <S.EmptyText>Nenhum cartão encontrado</S.EmptyText>
                            <S.EmptySubText>
                                Toque no botão + para adicionar seu primeiro
                                cartão
                            </S.EmptySubText>
                        </S.EmptyContainer>
                    </S.Content>
                </BaseWallet>
            </S.Container>
        );
    }

    // Mostrar cartões com sistema avançado
    return (
        <S.Container>
            <BaseWallet
                onBack={handleBack}
                onAddCard={handleAddCard}
                showAddButton={true}
            >
                <S.Content>
                    <TouchableWithoutFeedback onPress={handleBackgroundPress}>
                        <S.CardsAnimationContainer>
                            <S.StackContainer>
                                {/* Debug info */}
                                <S.DebugInfo>
                                    📊 {state.cards.length} cartões • 🎯 Estado:{" "}
                                    {animationState} •
                                    {chosenCardId &&
                                        `✅ Escolhido: ${chosenCardId.slice(
                                            0,
                                            3
                                        )}`}
                                </S.DebugInfo>

                                {/* Renderizar cartões */}
                                {state.cards.map((card) => {
                                    const cardColor = cardColors[card.id];
                                    if (!cardColor) return null;

                                    const isActive =
                                        state.activeCardId === card.id;
                                    const isChosen = chosenCardId === card.id;
                                    const showBack = shouldShowBack(card.id);
                                    const showButton =
                                        (animationState === "cardAlone" ||
                                            animationState === "cardChosen") &&
                                        isActive;

                                    return (
                                        <CardItem
                                            key={card.id}
                                            card={card}
                                            isActive={isActive}
                                            isChosen={isChosen}
                                            showNumbers={
                                                showNumbersState[card.id] ||
                                                false
                                            }
                                            showBack={showBack}
                                            cardColor={cardColor}
                                            animatedStyle={getAnimatedStyle(
                                                card
                                            )}
                                            buttonText={getButtonText(card.id)}
                                            showButton={showButton}
                                            onPress={() =>
                                                handleCardPress(card.id)
                                            }
                                            onToggleVisibility={() =>
                                                toggleCardVisibility(card.id)
                                            }
                                            onChooseCard={() =>
                                                handleChooseCard(card.id)
                                            }
                                            onUseCard={() =>
                                                handleUseCard(card.id)
                                            }
                                        />
                                    );
                                })}
                            </S.StackContainer>
                        </S.CardsAnimationContainer>
                    </TouchableWithoutFeedback>
                </S.Content>
            </BaseWallet>
        </S.Container>
    );
}
