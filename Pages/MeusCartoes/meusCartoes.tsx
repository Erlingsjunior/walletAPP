import React, { useState, useEffect, useRef } from "react";
import { Animated, Vibration, TouchableWithoutFeedback } from "react-native";
import { router } from "expo-router";
import { BaseWallet } from "@/components/UI/BaseWallet/baseWallet";
import { CardItem } from "@/components/UI/CardItem/cardItem";
import { generateColorPalette, type CardColor } from "@/utils/colorUtils";
import { useCardStore } from "@/stores/useCardStore"; // 🆕 ÚNICA ADIÇÃO - Zustand
import type {
    MeusCartoesPageProps,
    MeusCartoesPageState,
} from "./meusCartoes.types";
import type { CardData } from "@/components/UI/CardItem/cardList.types";

import * as S from "./meusCartoes.styles";

// Estados da animação
type AnimationState = "stacked" | "cardAlone" | "cardChosen";

export default function MeusCartoesPage({}: MeusCartoesPageProps) {
    const [state, setState] = useState<MeusCartoesPageState>({
        cards: [],
        activeCardId: null,
        loading: true,
    });

    const {
        cards: zustandCards,
        loadInitialCards,
        removeCard,
        clearAllCards,
        resetStore,
    } = useCardStore();

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
                const activeIndex = cards.findIndex(
                    (card) => card.id === activeCardId
                );
                if (activeIndex === -1) return;

                const aloneAnimations = cards.map((card, index) => {
                    let targetPosition = 0;

                    if (index === activeIndex) {
                        targetPosition = -50;
                    } else {
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
                const chosenIndex = cards.findIndex(
                    (card) => card.id === activeCardId
                );
                if (chosenIndex === -1) return;

                const chosenAnimations = cards.map((card, index) => {
                    let targetPosition = 0;

                    if (index === chosenIndex) {
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

    useEffect(() => {
        if (state.cards.length > 0) {
            animateCards(animationState, state.activeCardId, state.cards);
        }
    }, [animationState, state.activeCardId, state.cards]);

    useEffect(() => {
        console.log(
            "🚀 meusCartoes montou - zustandCards:",
            zustandCards.length
        );

        // Só carregar se realmente não tem cartões
        if (zustandCards.length === 0) {
            console.log("🚀 Carregando dados iniciais do Zustand...");
            loadInitialCards();
        } else {
            console.log(
                "📦 Já existem",
                zustandCards.length,
                "cartões, pulando loadInitialCards"
            );
        }
    }, []); // Só executa uma vez quando monta

    useEffect(() => {
        if (zustandCards.length > 0) {
            const cardIds = zustandCards.map((card) => card.id);
            const colorPalette = generateColorPalette(cardIds);

            setState({
                cards: zustandCards, // 🔄 Usando dados do Zustand
                activeCardId: null,
                loading: false,
            });

            setCardColors(colorPalette);
            initializeAnimations(zustandCards); // 🔄 Usando dados do Zustand

            console.log("📊 Total de cartões:", zustandCards.length);
        }
    }, [zustandCards]);

    const handleBack = () => {
        router.back();
    };

    const handleAddCard = () => {
        router.push("/adicionarCartao");
    };

    const handleCardPress = (cardId: string) => {
        console.log(
            "🎯 Card pressionado:",
            cardId,
            "- Estado atual:",
            animationState
        );

        if (animationState === "stacked") {
            setState((prev) => ({ ...prev, activeCardId: cardId }));
            setAnimationState("cardAlone");
        } else if (
            animationState === "cardAlone" &&
            state.activeCardId === cardId
        ) {
            flipCard(cardId);
        } else if (
            animationState === "cardChosen" &&
            state.activeCardId === cardId
        ) {
            flipCard(cardId);
        }
    };

    const handleBackgroundPress = () => {
        if (animationState !== "stacked") {
            console.log("🔙 Voltando ao estado empilhado");
            setState((prev) => ({ ...prev, activeCardId: null }));
            setAnimationState("stacked");
            setFlippedCardId(null);
        }
    };

    const handleChooseCard = (cardId: string) => {
        console.log("✅ Cartão escolhido:", cardId);

        Vibration.vibrate(100);

        setChosenCardId(cardId);
        setAnimationState("cardChosen");
    };

    const handleUseCard = (cardId: string) => {
        console.log("💳 Usar cartão:", cardId);
    };

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

        if (!flipAnimation) {
            return { transform: [{ translateY: translateAnimation }] };
        }

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

    const shouldShowBack = (cardId: string) => {
        return flippedCardId === cardId;
    };

    const getButtonText = (cardId: string) => {
        if (chosenCardId === cardId) {
            return "Usar esse cartão?";
        }
        return "Escolher esse cartão?";
    };

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
                                            onRemoveCard={() =>
                                                removeCard(card.id)
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
