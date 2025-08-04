import type { CardData } from "@/components/UI/CardList/cardList.types";

export interface MeusCartoesPageProps {
    // Props futuras se necessário
}

export interface MeusCartoesPageState {
    cards: CardData[];
    activeCardId: string | null;
    loading: boolean;
}
