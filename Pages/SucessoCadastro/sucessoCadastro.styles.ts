import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    padding: 20px;
`;

export const Header = styled.View`
    align-items: center;
    margin-bottom: 20px;
`;

export const BackButton = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`;

export const BackIcon = styled.Text`
    color: #00bcd4;
    font-size: 16px;
    margin-right: 8px;
`;

export const HeaderTitle = styled.Text`
    color: #00bcd4;
    font-size: 16px;
`;

export const Content = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const MainTitle = styled.Text`
    color: #ffffff;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 16px;
`;

export const Subtitle = styled.Text`
    color: #ffffff;
    font-size: 16px;
    text-align: center;
    margin-bottom: 40px;
    opacity: 0.8;
`;

export const CardContainer = styled.View`
    margin-bottom: 40px;
`;

export const ButtonContainer = styled.View`
    width: 100%;
    max-width: 300px;
`;
