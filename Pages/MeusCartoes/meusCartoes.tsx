// // ===== PAGES/MEUSCARTOES/MEUSCARTOES.TSX =====
// import React, { useState } from "react";
// import { router } from "expo-router";
// import { BaseWallet } from "@/components/UI/BaseWallet/baseWallet";
// import { CardList } from "@/components/UI/CardList/cardList";
// import type {
//     MeusCartoesPageProps,
//     MeusCartoesPageState,
// } from "./meusCartoes.types";
// import type { CardData } from "@/components/UI/CardList/cardList.types";
// import * as S from "./meusCartoes.styles";

// export default function MeusCartoesPage({}: MeusCartoesPageProps) {
//     // Estado inicial com cartões de exemplo
//     const [state, setState] = useState<MeusCartoesPageState>({
//         cards: [
//             {
//                 id: "1",
//                 type: "black",
//                 nome: "João Carlos Pereira",
//                 numero: "1234 5678 9012 3456",
//                 validade: "04/32",
//                 cvv: "123",
//             },
//             {
//                 id: "2",
//                 type: "green",
//                 nome: "João Carlos Pereira",
//                 numero: "5678 9012 3456 1234",
//                 validade: "06/29",
//                 cvv: "456",
//             },
//         ],
//         activeCardId: "1", // Black card ativo por padrão
//         loading: false,
//     });

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

//         // TODO: Aqui vai a animação de mola
//         // Por enquanto só muda o estado
//     };

//     const handleUseCard = (cardId: string) => {
//         const selectedCard = state.cards.find((card) => card.id === cardId);
//         console.log("Usar cartão:", selectedCard);

//         // TODO: Navegar para tela de pagamento ou uso
//         // Por enquanto só log
//     };

//     return (
//         <S.Container>
//             <BaseWallet
//                 onBack={handleBack}
//                 onAddCard={handleAddCard}
//                 showAddButton={true}
//             >
//                 <S.Content>
//                     <CardList
//                         cards={state.cards}
//                         activeCardId={state.activeCardId}
//                         onCardPress={handleCardPress}
//                         onUseCard={handleUseCard}
//                     />
//                 </S.Content>
//             </BaseWallet>
//         </S.Container>
//     );
// }

import React, { useState } from "react";
import { router } from "expo-router";
import { BaseWallet } from "@/components/UI/BaseWallet/baseWallet";
import { CardList } from "@/components/UI/CardList/cardList";
import type {
    MeusCartoesPageProps,
    MeusCartoesPageState,
} from "./meusCartoes.types";

import type { CardData } from "@/components/UI/CardList/cardList.types";

import * as S from "./meusCartoes.styles";

export default function MeusCartoesPage({}: MeusCartoesPageProps) {
    const [state, setState] = useState<MeusCartoesPageState>({
        cards: [
            {
                id: "1",
                type: "black",
                nome: "João Carlos Pereira",
                numero: "1234 5678 9012 3456",
                validade: "04/32",
                cvv: "123",
            },
            {
                id: "2",
                type: "green",
                nome: "João Carlos Pereira",
                numero: "5678 9012 3456 1234",
                validade: "06/29",
                cvv: "456",
            },
        ],
        activeCardId: null, // Começa sem nenhum ativo
        loading: false,
    });

    const handleBack = () => {
        router.back();
    };

    const handleAddCard = () => {
        router.push("/adicionarCartao");
    };

    const handleCardPress = (cardId: string) => {
        console.log("Card pressionado:", cardId);

        setState((prev) => ({
            ...prev,
            activeCardId: prev.activeCardId === cardId ? null : cardId,
        }));

        // Animação de mola acontece automaticamente via useEffect
    };

    const handleUseCard = (cardId: string) => {
        const selectedCard = state.cards.find((card) => card.id === cardId);
        console.log("Usar cartão:", selectedCard);
    };

    return (
        <S.Container>
            <BaseWallet
                onBack={handleBack}
                onAddCard={handleAddCard}
                showAddButton={true}
            >
                <S.Content>
                    <CardList
                        cards={state.cards}
                        activeCardId={state.activeCardId}
                        onCardPress={handleCardPress}
                        onUseCard={handleUseCard}
                    />
                </S.Content>
            </BaseWallet>
        </S.Container>
    );
}
