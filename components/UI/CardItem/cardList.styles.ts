import styled from "styled-components/native";
import { Animated } from "react-native";

export const Container = styled.View`
    flex: 1;
    padding: 0 20px;
    position: relative;
`;

export const StackContainer = styled.View`
    position: relative;
    height: 400px;
    width: 100%;
`;

export const CardContainer = styled(Animated.View)`
    position: absolute;
    margin-top: 280px;
    width: 100%;
    border-radius: 16px;
`;

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

export const CardTop = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
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

// Toggle Button
export const ToggleButton = styled.TouchableOpacity`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.2);
    align-items: center;
    justify-content: center;
`;

// Toggle Icon - Green
export const GreenToggleIcon = styled.Text`
    color: #000000;
    font-size: 16px;
`;

// Toggle Icon - Black
export const BlackToggleIcon = styled.Text`
    color: #ffffff;
    font-size: 16px;
`;

// Card Number - Green
export const GreenCardNumber = styled.Text`
    color: #000000;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 2px;
    margin: 16px 0;
    font-family: "Courier New";
`;

// Card Number - Black
export const BlackCardNumber = styled.Text`
    color: #ffffff;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 2px;
    margin: 16px 0;
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

// Card Label - Green
export const GreenCardLabel = styled.Text`
    color: rgba(0, 0, 0, 0.6);
    font-size: 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 2px;
`;

// Card Label - Black
export const BlackCardLabel = styled.Text`
    color: rgba(255, 255, 255, 0.6);
    font-size: 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 2px;
`;

// Card Name - Green
export const GreenCardName = styled.Text`
    color: #000000;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
`;

// Card Name - Black
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
