// import type { CardData } from "@/components/UI/CardItem/cardList.types";

// export interface MeusCartoesPageProps {
//     // Props futuras se necessário
// }

// export interface MeusCartoesPageState {
//     cards: CardData[];
//     activeCardId: string | null;
//     loading: boolean;
// }

import type { CardData } from "@/components/UI/CardItem/cardList.types";

export interface MeusCartoesPageProps {
    // Props futuras se necessário
}

export interface MeusCartoesPageState {
    cards: CardData[];
    activeCardId: string | null;
    loading: boolean;
}

// ===== NOVOS TIPOS PARA SISTEMA AVANÇADO =====

// Estados da animação
export type AnimationState = "stacked" | "cardAlone" | "cardChosen";

// Estado completo da página (se você quiser usar um estado único)
export interface AdvancedMeusCartoesState {
    // Estado básico
    cards: CardData[];
    activeCardId: string | null;
    loading: boolean;

    // Estados avançados
    animationState: AnimationState;
    chosenCardId: string | null;
    flippedCardId: string | null;

    // Controles de visibilidade
    showNumbersState: Record<string, boolean>;

    // Cores dos cartões
    cardColors: Record<string, import("@/utils/colorUtils").CardColor>;
}

// Tipos para handlers
export interface CardHandlers {
    onCardPress: (cardId: string) => void;
    onBackgroundPress: () => void;
    onChooseCard: (cardId: string) => void;
    onUseCard: (cardId: string) => void;
    onToggleVisibility: (cardId: string) => void;
}

// Props para debug
export interface DebugInfo {
    totalCards: number;
    animationState: AnimationState;
    activeCardId: string | null;
    chosenCardId: string | null;
    flippedCardId: string | null;
}
