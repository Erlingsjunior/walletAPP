// import styled from "styled-components/native";
// import { Animated } from "react-native";

// export const Container = styled.View`
//     align-items: center;
//     margin: 5px 0;
// `;

// export const CardContainer = styled(Animated.View)`
//     width: 430px;
//     height: 250px;
//     border-radius: 16px;
//     padding: 20px;
//     /* shadow-color: #000;
//     shadow-offset: 0px 4px;
//     shadow-opacity: 0.3;
//     shadow-radius: 8px;
//     elevation: 8; */
// `;

// export const CardGradient = styled.View<{ isValid: boolean }>`
//     flex: 1;
//     border-radius: 16px;
//     background-color: ${({ isValid }) => (isValid ? "#1a1a1a" : "#666666")};
//     padding: 20px;
//     justify-content: space-between;
// `;

// export const CardTop = styled.View`
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: flex-start;
// `;

// export const CardType = styled.Text`
//     color: #ffffff;
//     font-size: 12px;
//     font-weight: bold;
//     opacity: 0.8;
// `;

// export const CardChip = styled.View`
//     width: 32px;
//     height: 24px;
//     background-color: #ffd700;
//     border-radius: 4px;
//     margin-top: 8px;
// `;

// export const CardNumber = styled.Text<{ hasValue: boolean }>`
//     color: ${({ hasValue }) =>
//         hasValue ? "#FFFFFF" : "rgba(255, 255, 255, 0.3)"};
//     font-size: 18px;
//     font-weight: 500;
//     letter-spacing: 2px;
//     margin: 16px 0;
//     font-family: "Courier New";
// `;

// export const CardBottom = styled.View`
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: flex-end;
// `;

// export const CardInfo = styled.View`
//     flex: 1;
// `;

// export const CardLabel = styled.Text`
//     color: rgba(255, 255, 255, 0.6);
//     font-size: 8px;
//     text-transform: uppercase;
//     letter-spacing: 1px;
//     margin-bottom: 2px;
// `;

// export const CardName = styled.Text<{ hasValue: boolean }>`
//     color: ${({ hasValue }) =>
//         hasValue ? "#FFFFFF" : "rgba(255, 255, 255, 0.3)"};
//     font-size: 12px;
//     font-weight: 500;
//     text-transform: uppercase;
// `;

// export const CardExpiry = styled.Text<{ hasValue: boolean }>`
//     color: ${({ hasValue }) =>
//         hasValue ? "#FFFFFF" : "rgba(255, 255, 255, 0.3)"};
//     font-size: 12px;
//     font-weight: 500;
//     margin-left: 20px;
// `;

// export const StatusIndicator = styled.View<{ isValid: boolean }>`
//     width: 12px;
//     height: 12px;
//     border-radius: 6px;
//     background-color: ${({ isValid }) => (isValid ? "#10B981" : "#EF4444")};
//     margin-top: 8px;
//     align-self: center;
// `;

import styled from "styled-components/native";
import { Animated } from "react-native";

export const Container = styled.View`
    align-items: center;
    margin: 10px 0;
`;

export const CardContainer = styled(Animated.View)`
    width: 430px;
    height: 240px;
    border-radius: 16px;
    padding: 20px;
`;

export const CardGradient = styled.View<{ isValid: boolean }>`
    flex: 1;
    border-radius: 16px;
    background-color: ${({ isValid }: any) =>
        isValid ? "#1a1a1a" : "#666666"};
    padding: 16px;
    justify-content: space-between;
`;

export const CardTop = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
`;

export const CardType = styled.Text`
    color: #ffffff;
    font-size: 10px;
    font-weight: bold;
    opacity: 0.8;
`;

export const CardChip = styled.View`
    width: 28px;
    height: 20px;
    background-color: #ffd700;
    border-radius: 4px;
`;

export const CardNumber = styled.Text<{ hasValue: boolean }>`
    color: ${({ hasValue }: any) =>
        hasValue ? "#FFFFFF" : "rgba(255, 255, 255, 0.3)"};
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 2px;
    margin: 12px 0;
    font-family: "Courier New";
`;

export const CardBottom = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
`;

export const CardInfo = styled.View`
    flex: 1;
`;

export const CardLabel = styled.Text`
    color: rgba(255, 255, 255, 0.6);
    font-size: 7px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 2px;
`;

export const CardName = styled.Text<{ hasValue: boolean }>`
    color: ${({ hasValue }: any) =>
        hasValue ? "#FFFFFF" : "rgba(255, 255, 255, 0.3)"};
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
`;

export const CardExpiry = styled.Text<{ hasValue: boolean }>`
    color: ${({ hasValue }: any) =>
        hasValue ? "#FFFFFF" : "rgba(255, 255, 255, 0.3)"};
    font-size: 10px;
    font-weight: 500;
    margin-left: 16px;
`;

export const StatusIndicator = styled.View<{ isValid: boolean }>`
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${({ isValid }: any) =>
        isValid ? "#10B981" : "#EF4444"};
    margin-top: 8px;
    align-self: center;
`;
