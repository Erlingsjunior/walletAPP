export interface CardData {
    id: string;
    type: "black" | "green";
    nome: string;
    numero: string;
    validade: string;
    cvv: string;
}

export interface CardListProps {
    cards: CardData[];
    activeCardId?: string | null;
    onCardPress: (cardId: string) => void;
    onUseCard?: (cardId: string) => void;
    showNumbers?: boolean;
}
