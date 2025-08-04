// import styled from "styled-components/native";
// import { Animated } from "react-native";

// export const CardContainer = styled(Animated.View)`
//     position: absolute;
//     margin-top: 280px;
//     width: 100%;
//     border-radius: 16px;
// `;

// // ===== COMPONENTES DINÂMICOS (CORES VIA PROPS) =====

// interface DynamicCardProps {
//     backgroundColor: string;
// }

// export const DynamicCard = styled.TouchableOpacity<DynamicCardProps>`
//     border-radius: 16px;
//     padding: 20px;
//     height: 240px;
//     justify-content: space-between;
//     width: 100%;
//     background-color: ${(props: any) => props.backgroundColor};
// `;

// interface DynamicTextProps {
//     color: string;
// }

// export const DynamicText = styled.Text<DynamicTextProps>`
//     color: ${(props: any) => props.color};
//     font-size: 12px;
//     font-weight: bold;
//     opacity: 0.8;
// `;

// export const DynamicCardNumber = styled.Text<DynamicTextProps>`
//     color: ${(props: any) => props.color};
//     font-size: 18px;
//     font-weight: 500;
//     letter-spacing: 2px;
//     margin: 16px 0;
//     font-family: "Courier New";
// `;

// export const DynamicCardLabel = styled.Text<DynamicTextProps>`
//     color: ${(props: any) => props.color};
//     font-size: 8px;
//     text-transform: uppercase;
//     letter-spacing: 1px;
//     margin-bottom: 2px;
// `;

// export const DynamicCardName = styled.Text<DynamicTextProps>`
//     color: ${(props: any) => props.color};
//     font-size: 12px;
//     font-weight: 500;
//     text-transform: uppercase;
// `;

// export const DynamicCardExpiry = styled.Text<DynamicTextProps>`
//     color: ${(props: any) => props.color};
//     font-size: 12px;
//     font-weight: 500;
//     margin-left: 20px;
// `;

// // ===== COMPONENTES FIXOS =====

// export const CardTop = styled.View`
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: flex-start;
// `;

// export const ToggleButton = styled.TouchableOpacity`
//     width: 32px;
//     height: 32px;
//     border-radius: 16px;
//     background-color: rgba(255, 255, 255, 0.2);
//     align-items: center;
//     justify-content: center;
// `;

// export const CardBottom = styled.View`
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: flex-end;
// `;

// export const CardInfo = styled.View`
//     flex: 1;
// `;

// export const UseButton = styled.TouchableOpacity`
//     background-color: #00bcd4;
//     border-radius: 25px;
//     padding: 12px 24px;
//     margin-top: 16px;
//     align-items: center;
//     position: absolute;
//     bottom: -100px;
//     left: 0;
//     right: 0;
// `;

// export const UseButtonText = styled.Text`
//     color: #ffffff;
//     font-size: 14px;
//     font-weight: 600;
// `;

// // ===== COMPONENTES LEGADOS (MANTER PARA COMPATIBILIDADE) =====

// const CardBase = `
//   border-radius: 16px;
//   padding: 20px;
//   height: 240px;
//   justify-content: space-between;
//   width: 100%;
// `;

// export const GreenCard = styled.TouchableOpacity`
//     ${CardBase}
//     background-color: #10B981;
// `;

// export const BlackCard = styled.TouchableOpacity`
//     ${CardBase}
//     background-color: #1a1a1a;
// `;

// export const GreenCardType = styled.Text`
//     color: #000000;
//     font-size: 12px;
//     font-weight: bold;
//     opacity: 0.8;
// `;

// export const BlackCardType = styled.Text`
//     color: #ffffff;
//     font-size: 12px;
//     font-weight: bold;
//     opacity: 0.8;
// `;

// export const GreenToggleIcon = styled.Text`
//     color: #000000;
//     font-size: 16px;
// `;

// export const BlackToggleIcon = styled.Text`
//     color: #ffffff;
//     font-size: 16px;
// `;

// export const GreenCardNumber = styled.Text`
//     color: #000000;
//     font-size: 18px;
//     font-weight: 500;
//     letter-spacing: 2px;
//     margin: 16px 0;
//     font-family: "Courier New";
// `;

// export const BlackCardNumber = styled.Text`
//     color: #ffffff;
//     font-size: 18px;
//     font-weight: 500;
//     letter-spacing: 2px;
//     margin: 16px 0;
//     font-family: "Courier New";
// `;

// export const GreenCardLabel = styled.Text`
//     color: rgba(0, 0, 0, 0.6);
//     font-size: 8px;
//     text-transform: uppercase;
//     letter-spacing: 1px;
//     margin-bottom: 2px;
// `;

// export const BlackCardLabel = styled.Text`
//     color: rgba(255, 255, 255, 0.6);
//     font-size: 8px;
//     text-transform: uppercase;
//     letter-spacing: 1px;
//     margin-bottom: 2px;
// `;

// export const GreenCardName = styled.Text`
//     color: #000000;
//     font-size: 12px;
//     font-weight: 500;
//     text-transform: uppercase;
// `;

// export const BlackCardName = styled.Text`
//     color: #ffffff;
//     font-size: 12px;
//     font-weight: 500;
//     text-transform: uppercase;
// `;

// export const GreenCardExpiry = styled.Text`
//     color: #000000;
//     font-size: 12px;
//     font-weight: 500;
//     margin-left: 20px;
// `;

// export const BlackCardExpiry = styled.Text`
//     color: #ffffff;
//     font-size: 12px;
//     font-weight: 500;
//     margin-left: 20px;
// `;

import styled from "styled-components/native";
import { Animated } from "react-native";

export const CardContainer = styled(Animated.View)`
    position: absolute;
    margin-top: 280px;
    width: 100%;
    border-radius: 16px;
`;

// ===== COMPONENTES DINÂMICOS (CORES VIA PROPS) =====

interface DynamicCardProps {
    backgroundColor: string;
    isChosen?: boolean;
}

export const DynamicCard = styled.TouchableOpacity<DynamicCardProps>`
    border-radius: 16px;
    padding: 20px;
    height: 240px;
    justify-content: space-between;
    width: 100%;
    background-color: ${(props: any) => props.backgroundColor};
    border-width: ${(props: any) => (props.isChosen ? "3px" : "0px")};
    border-color: #00ff88;
    shadow-color: ${(props: any) => (props.isChosen ? "#00FF88" : "#000")};
    shadow-opacity: ${(props: any) => (props.isChosen ? 0.3 : 0.1)};
    shadow-radius: ${(props: any) => (props.isChosen ? 8 : 4)};
    elevation: ${(props: any) => (props.isChosen ? 8 : 4)};
`;

interface DynamicTextProps {
    color: string;
}

export const DynamicText = styled.Text<DynamicTextProps>`
    color: ${(props: any) => props.color};
    font-size: 12px;
    font-weight: bold;
    opacity: 0.8;
`;

export const DynamicCardNumber = styled.Text<DynamicTextProps>`
    color: ${(props: any) => props.color};
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 2px;
    margin: 16px 0;
    font-family: "Courier New";
`;

export const DynamicCardLabel = styled.Text<DynamicTextProps>`
    color: ${(props: any) => props.color};
    font-size: 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 2px;
`;

export const DynamicCardName = styled.Text<DynamicTextProps>`
    color: ${(props: any) => props.color};
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
`;

export const DynamicCardExpiry = styled.Text<DynamicTextProps>`
    color: ${(props: any) => props.color};
    font-size: 12px;
    font-weight: 500;
    margin-left: 20px;
`;

// ===== NOVOS COMPONENTES PARA SISTEMA AVANÇADO =====

export const CardTop = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
`;

export const TopRightContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const ToggleButton = styled.TouchableOpacity`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.2);
    align-items: center;
    justify-content: center;
`;

export const ChosenCheckmark = styled.View`
    width: 28px;
    height: 28px;
    border-radius: 14px;
    background-color: #00ff88;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
`;

export const CheckmarkText = styled.Text`
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
`;

// ===== VERSO DO CARTÃO =====

export const CardBackContent = styled.View`
    flex: 1;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
`;

export const MagneticStripe = styled.View`
    width: 100%;
    height: 40px;
    background-color: #333333;
    margin: 20px 0;
`;

export const CVVSection = styled.View`
    align-items: center;
    margin: 20px 0;
`;

interface CVVBoxProps {
    backgroundColor: string;
}

export const CVVBox = styled.View<CVVBoxProps>`
    width: 60px;
    height: 30px;
    background-color: ${(props: any) => props.backgroundColor};
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
`;

export const CVVText = styled.Text<DynamicTextProps>`
    color: ${(props: any) => props.color};
    font-size: 16px;
    font-weight: bold;
    font-family: "Courier New";
`;

// ===== BOTÃO PRINCIPAL =====

interface ActionButtonProps {
    isChosen?: boolean;
}

export const ActionButton = styled.TouchableOpacity<ActionButtonProps>`
    background-color: ${(props: any) =>
        props.isChosen ? "#00FF88" : "#00bcd4"};
    border-radius: 25px;
    padding: 16px 24px;
    margin-top: 20px;
    align-items: center;
    position: absolute;
    bottom: -120px;
    left: 0;
    right: 0;
    shadow-color: ${(props: any) => (props.isChosen ? "#00FF88" : "#00bcd4")};
    shadow-opacity: 0.3;
    shadow-radius: 8;
    elevation: 6;
`;

interface ActionButtonTextProps {
    isChosen?: boolean;
}

export const ActionButtonText = styled.Text<ActionButtonTextProps>`
    color: ${(props: any) => (props.isChosen ? "#000000" : "#ffffff")};
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
`;

// ===== COMPONENTES FIXOS =====

export const CardBottom = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
`;

export const CardInfo = styled.View`
    flex: 1;
`;

// ===== COMPONENTES LEGADOS (MANTER PARA COMPATIBILIDADE) =====

const CardBase = `
  border-radius: 16px;
  padding: 20px;
  height: 240px;
  justify-content: space-between;
  width: 100%;
`;

export const GreenCard = styled.TouchableOpacity`
    ${CardBase}
    background-color: #10B981;
`;

export const BlackCard = styled.TouchableOpacity`
    ${CardBase}
    background-color: #1a1a1a;
`;

export const GreenCardType = styled.Text`
    color: #000000;
    font-size: 12px;
    font-weight: bold;
    opacity: 0.8;
`;

export const BlackCardType = styled.Text`
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    opacity: 0.8;
`;

export const GreenToggleIcon = styled.Text`
    color: #000000;
    font-size: 16px;
`;

export const BlackToggleIcon = styled.Text`
    color: #ffffff;
    font-size: 16px;
`;

export const GreenCardNumber = styled.Text`
    color: #000000;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 2px;
    margin: 16px 0;
    font-family: "Courier New";
`;

export const BlackCardNumber = styled.Text`
    color: #ffffff;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 2px;
    margin: 16px 0;
    font-family: "Courier New";
`;

export const GreenCardLabel = styled.Text`
    color: rgba(0, 0, 0, 0.6);
    font-size: 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 2px;
`;

export const BlackCardLabel = styled.Text`
    color: rgba(255, 255, 255, 0.6);
    font-size: 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 2px;
`;

export const GreenCardName = styled.Text`
    color: #000000;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
`;

export const BlackCardName = styled.Text`
    color: #ffffff;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
`;

export const GreenCardExpiry = styled.Text`
    color: #000000;
    font-size: 12px;
    font-weight: 500;
    margin-left: 20px;
`;

export const BlackCardExpiry = styled.Text`
    color: #ffffff;
    font-size: 12px;
    font-weight: 500;
    margin-left: 20px;
`;

// Botão legado (manter para compatibilidade)
export const UseButton = styled.TouchableOpacity`
    background-color: #00bcd4;
    border-radius: 25px;
    padding: 12px 24px;
    margin-top: 16px;
    align-items: center;
    position: absolute;
    bottom: -100px;
    left: 0;
    right: 0;
`;

export const UseButtonText = styled.Text`
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
`;
