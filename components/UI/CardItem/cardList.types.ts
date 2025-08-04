export interface CardData {
    id: string;
    type: string; //black, green, etc.
    nome: string;
    numero: string;
    validade: string;
    cvv: string;
}

export interface CardListProps {
    cards: CardData[];
    cardColor?: string; // Cor do cartão, se necessário
    activeCardId?: string | null;
    onCardPress: (cardId: string) => void;
    onUseCard?: (cardId: string) => void;
    showNumbers?: boolean;
}
