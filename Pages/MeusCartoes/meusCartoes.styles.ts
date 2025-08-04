// import styled from "styled-components/native";

// // ===== ESTILOS EXISTENTES =====
// export const Container = styled.View`
//     flex: 1;
// `;

// export const Content = styled.View`
//     flex: 1;
// `;

// export const LoadingContainer = styled.View`
//     flex: 1;
//     justify-content: center;
//     align-items: center;
//     padding: 40px 20px;
// `;

// export const LoadingText = styled.Text`
//     font-size: 16px;
//     color: #666;
//     text-align: center;
// `;

// export const EmptyContainer = styled.View`
//     flex: 1;
//     justify-content: center;
//     align-items: center;
//     padding: 40px 20px;
// `;

// export const EmptyText = styled.Text`
//     font-size: 20px;
//     font-weight: bold;
//     color: #333;
//     text-align: center;
//     margin-bottom: 8px;
// `;

// export const EmptySubText = styled.Text`
//     font-size: 14px;
//     color: #666;
//     text-align: center;
//     line-height: 20px;
// `;

// // ===== NOVOS ESTILOS PARA ANIMAÇÃO =====
// export const CardsAnimationContainer = styled.View`
//     flex: 1;
//     padding: 0 20px;
//     position: relative;
// `;

// export const StackContainer = styled.View`
//     position: relative;
//     margin-top: 60px;
//     height: 400px;
//     width: 100%;
// `;

// export const DebugInfo = styled.Text`
//     position: absolute;
//     top: -30px;
//     left: 0;
//     right: 0;
//     text-align: center;
//     font-size: 12px;
//     color: #666;
//     background-color: rgba(255, 255, 255, 0.9);
//     padding: 5px;
//     border-radius: 8px;
//     z-index: 1000;
// `;

import styled from "styled-components/native";

// ===== ESTILOS EXISTENTES =====
export const Container = styled.View`
    flex: 1;
`;

export const Content = styled.View`
    flex: 1;
`;

export const LoadingContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
`;

export const LoadingText = styled.Text`
    font-size: 16px;
    color: #666;
    text-align: center;
`;

export const EmptyContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
`;

export const EmptyText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 8px;
`;

export const EmptySubText = styled.Text`
    font-size: 14px;
    color: #666;
    text-align: center;
    line-height: 20px;
`;

// ===== NOVOS ESTILOS PARA ANIMAÇÃO =====
export const CardsAnimationContainer = styled.View`
    flex: 1;
    padding: 0 20px;
    position: relative;
`;

export const StackContainer = styled.View`
    position: relative;
    height: 400px;
    width: 100%;
`;

export const DebugInfo = styled.Text`
    position: absolute;
    top: -30px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 12px;
    color: #666;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 5px;
    border-radius: 8px;
    z-index: 1000;
`;

// 🆕 NOVOS ESTILOS PARA BOTÕES DE LIMPEZA
export const CleanupMenu = styled.View`
    position: absolute;
    top: -80px;
    left: 0;
    right: 0;
    flex-direction: row;
    justify-content: space-around;
    z-index: 999;
`;

export const CleanupButton = styled.TouchableOpacity`
    background-color: rgba(255, 0, 0, 0.8);
    padding: 8px 12px;
    border-radius: 12px;
    margin: 0 5px;
`;

export const CleanupButtonText = styled.Text`
    color: white;
    font-size: 11px;
    font-weight: bold;
    text-align: center;
`;
