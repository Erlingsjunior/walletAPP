import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Importar dados iniciais do JSON
import dbData from "@/db.json";

export interface Card {
    id: string;
    type: string;
    nome: string;
    numero: string;
    validade: string;
    cvv: string;
}

interface CardStore {
    // Estado
    cards: Card[];
    loading: boolean;
    error: string | null;
    initialized: boolean;

    // Ações básicas
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;

    // CRUD de cartões
    loadInitialCards: () => void;
    addCard: (card: Omit<Card, "id">) => void;
    removeCard: (id: string) => void;
    updateCard: (id: string, updates: Partial<Omit<Card, "id">>) => void;
    getCardById: (id: string) => Card | undefined;

    // Utilidades
    clearAllCards: () => void;
    getTotalCards: () => number;
    resetStore: () => void; // 🆕 NOVA
    removeCardsByType: (cardType: string) => void; // 🆕 NOVA
}

// Função para gerar ID único
const generateCardId = (): string => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const useCardStore = create<CardStore>()(
    persist(
        (set, get) => ({
            // ===== ESTADO INICIAL =====
            cards: [],
            loading: false,
            error: null,
            initialized: false,

            // ===== AÇÕES BÁSICAS =====
            setLoading: (loading) => set({ loading }),

            setError: (error) => set({ error }),

            // ===== CARREGAR DADOS INICIAIS =====
            loadInitialCards: () => {
                const { initialized, cards } = get();

                console.log(
                    "🚀 loadInitialCards chamado - initialized:",
                    initialized,
                    "cards:",
                    cards.length
                );

                // Se já foi inicializado OU já tem cartões, não carrega novamente
                if (initialized || cards.length > 0) {
                    console.log(
                        "📦 Store já tem dados, pulando carregamento inicial"
                    );
                    return;
                }

                set({ loading: true, error: null });

                try {
                    // Simular delay de carregamento
                    setTimeout(() => {
                        const { cards: currentCards } = get(); // Verificar novamente

                        // Double-check: se já tem cartões, não sobrescrever
                        if (currentCards.length > 0) {
                            console.log(
                                "📦 Já existem cartões, cancelando carregamento inicial"
                            );
                            set({ loading: false, initialized: true });
                            return;
                        }

                        const initialCards = dbData.cards as Card[];

                        set({
                            cards: initialCards,
                            loading: false,
                            initialized: true,
                            error: null,
                        });

                        console.log(
                            "📦 Dados iniciais carregados do db.json:",
                            initialCards.length,
                            "cartões"
                        );
                    }, 300);
                } catch (error) {
                    console.error("❌ Erro ao carregar dados iniciais:", error);
                    set({
                        error: "Erro ao carregar cartões iniciais",
                        loading: false,
                        initialized: true,
                    });
                }
            },

            // ===== ADICIONAR CARTÃO =====
            addCard: (cardData) => {
                try {
                    const newCard: Card = {
                        ...cardData,
                        id: generateCardId(),
                    };

                    set((state) => ({
                        cards: [...state.cards, newCard],
                        error: null,
                    }));

                    console.log("✅ Cartão adicionado:", newCard);
                } catch (error) {
                    console.error("❌ Erro ao adicionar cartão:", error);
                    set({ error: "Erro ao adicionar cartão" });
                }
            },

            // ===== REMOVER CARTÃO =====
            removeCard: (id) => {
                try {
                    const { cards } = get();
                    const cardToRemove = cards.find((card) => card.id === id);

                    if (!cardToRemove) {
                        console.log(
                            "⚠️ Cartão não encontrado para remoção:",
                            id
                        );
                        return;
                    }

                    set((state) => ({
                        cards: state.cards.filter((card) => card.id !== id),
                        error: null,
                    }));

                    console.log(
                        "🗑️ Cartão removido:",
                        cardToRemove.nome,
                        "ID:",
                        id
                    );
                    console.log(
                        "📊 Total restante:",
                        get().cards.length,
                        "cartões"
                    );
                } catch (error) {
                    console.error("❌ Erro ao remover cartão:", error);
                    set({ error: "Erro ao remover cartão" });
                }
            },

            // ===== ATUALIZAR CARTÃO =====
            updateCard: (id, updates) => {
                try {
                    set((state) => ({
                        cards: state.cards.map((card) =>
                            card.id === id ? { ...card, ...updates } : card
                        ),
                        error: null,
                    }));

                    console.log("📝 Cartão atualizado:", id, updates);
                } catch (error) {
                    console.error("❌ Erro ao atualizar cartão:", error);
                    set({ error: "Erro ao atualizar cartão" });
                }
            },

            // ===== BUSCAR CARTÃO POR ID =====
            getCardById: (id) => {
                const { cards } = get();
                return cards.find((card) => card.id === id);
            },

            // ===== UTILIDADES =====
            clearAllCards: () => {
                const { cards } = get();
                const totalCards = cards.length;

                set({
                    cards: [],
                    error: null,
                });

                console.log(
                    "🧹 Todos os cartões removidos! Total deletado:",
                    totalCards
                );
            },

            getTotalCards: () => {
                const { cards } = get();
                return cards.length;
            },

            // 🆕 NOVA - Resetar store completamente (volta ao estado inicial + carrega db.json)
            resetStore: () => {
                set({
                    cards: [],
                    loading: false,
                    error: null,
                    initialized: false, // 🔑 Permite recarregar dados iniciais
                });

                console.log(
                    "🔄 Store resetado! Próximo loadInitialCards vai recarregar db.json"
                );
            },

            // 🆕 NOVA - Deletar cartões por tipo
            removeCardsByType: (cardType: string) => {
                const { cards } = get();
                const cardsToRemove = cards.filter(
                    (card) => card.type === cardType
                );
                const remainingCards = cards.filter(
                    (card) => card.type !== cardType
                );

                set({
                    cards: remainingCards,
                    error: null,
                });

                console.log(
                    `🗑️ Removidos ${cardsToRemove.length} cartões do tipo "${cardType}"`
                );
                console.log(
                    "📊 Total restante:",
                    remainingCards.length,
                    "cartões"
                );
            },
        }),
        {
            name: "card-storage", // Nome para AsyncStorage
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                cards: state.cards,
                initialized: state.initialized,
            }),
        }
    )
);
