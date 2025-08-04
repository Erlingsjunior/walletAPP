// Array de cores bonitas e legíveis para cartões
const CARD_COLORS = [
    {
        background: "#1a1a1a", // Black
        text: "#ffffff",
        textSecondary: "rgba(255, 255, 255, 0.6)",
        name: "black",
    },
    {
        background: "#10B981", // Green
        text: "#000000",
        textSecondary: "rgba(0, 0, 0, 0.6)",
        name: "green",
    },
    {
        background: "#FFD700", // Gold
        text: "#000000",
        textSecondary: "rgba(0, 0, 0, 0.6)",
        name: "gold",
    },
    {
        background: "#8B5CF6", // Purple
        text: "#ffffff",
        textSecondary: "rgba(255, 255, 255, 0.6)",
        name: "purple",
    },
    {
        background: "#EF4444", // Red
        text: "#ffffff",
        textSecondary: "rgba(255, 255, 255, 0.6)",
        name: "red",
    },
    {
        background: "#3B82F6", // Blue
        text: "#ffffff",
        textSecondary: "rgba(255, 255, 255, 0.6)",
        name: "blue",
    },
    {
        background: "#F59E0B", // Orange
        text: "#000000",
        textSecondary: "rgba(0, 0, 0, 0.6)",
        name: "orange",
    },
    {
        background: "#EC4899", // Pink
        text: "#ffffff",
        textSecondary: "rgba(255, 255, 255, 0.6)",
        name: "pink",
    },
    {
        background: "#06B6D4", // Cyan
        text: "#ffffff",
        textSecondary: "rgba(255, 255, 255, 0.6)",
        name: "cyan",
    },
    {
        background: "#84CC16", // Lime
        text: "#000000",
        textSecondary: "rgba(0, 0, 0, 0.6)",
        name: "lime",
    },
];

export interface CardColor {
    background: string;
    text: string;
    textSecondary: string;
    name: string;
}

// Função para gerar cor baseada no ID do cartão (sempre a mesma cor para o mesmo cartão)
export const getCardColorById = (cardId: string): CardColor => {
    // Converter ID em número hash para garantir consistência
    let hash = 0;
    for (let i = 0; i < cardId.length; i++) {
        const char = cardId.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Converter para 32-bit integer
    }

    // Usar valor absoluto do hash para pegar índice
    const index = Math.abs(hash) % CARD_COLORS.length;
    return CARD_COLORS[index];
};

// Função para gerar cor baseada no índice do array (primeira cor, segunda cor, etc.)
export const getCardColorByIndex = (index: number): CardColor => {
    return CARD_COLORS[index % CARD_COLORS.length];
};

// Função para gerar cor realmente aleatória (diferente a cada render)
export const getRandomCardColor = (): CardColor => {
    const randomIndex = Math.floor(Math.random() * CARD_COLORS.length);
    return CARD_COLORS[randomIndex];
};

// Função para obter todas as cores disponíveis
export const getAllCardColors = (): CardColor[] => {
    return CARD_COLORS;
};

// Função para gerar paleta de cores para uma lista de cartões (sem repetição)
export const generateColorPalette = (
    cardIds: string[]
): Record<string, CardColor> => {
    const palette: Record<string, CardColor> = {};

    cardIds.forEach((cardId, index) => {
        // Usar índice para evitar repetição nas primeiras cores
        // Se tiver mais cartões que cores, vai repetir
        palette[cardId] = getCardColorByIndex(index);
    });

    return palette;
};

// Função para embaralhar array de cores (para variedade)
export const shuffleColors = (): CardColor[] => {
    const shuffled = [...CARD_COLORS];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};
