import styled from "styled-components/native";

export const Container = styled.ScrollView.attrs(() => ({
    keyboardShouldPersistTaps: "handled",
    showsVerticalScrollIndicator: false,
    contentContainerStyle: { flexGrow: 1 },
}))`
    flex: 1;
`;

export const Content = styled.View`
    padding: 20px;
    flex: 1;
`;

export const Header = styled.View`
    align-items: start;
    margin-top: 40px;
    margin-bottom: 10px;
`;

export const HeaderSubtitle = styled.Text`
    color: #ffffff;
    font-size: 20px;
    font-weight: 400;
    opacity: 0.8;
    margin-top: 4px;
    padding-left: 120px;
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

export const VirtualCardContainer = styled.View`
    margin-bottom: 20px;
`;

export const FormContainer = styled.View``;

export const InputContainer = styled.View`
    margin-bottom: 20px;
`;

export const Label = styled.Text`
    color: #ffffff;
    font-size: 14px;
    margin-bottom: 8px;
`;

export const InputWrapper = styled.View`
    position: relative;
`;

// Input básico - SEM props condicionais
export const Input = styled.TextInput`
    background-color: #ffffff;
    border-radius: 8px;
    padding: 16px;
    padding-left: 48px;
    font-size: 16px;
    color: #333333;
`;

export const InputNormal = styled.TextInput`
    background-color: #ffffff;
    border-radius: 8px;
    padding: 16px;
    font-size: 16px;
    color: #333333;
`;

export const CardIcon = styled.View`
    position: absolute;
    left: 16px;
    top: 16px;
    width: 24px;
    height: 16px;
    background-color: #10b981;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
`;

export const CardIconText = styled.Text`
    color: #ffffff;
    font-size: 10px;
`;

export const RowContainer = styled.View`
    flex-direction: row;
    gap: 16px;
`;

export const HalfInput = styled.View`
    flex: 1;
`;

export const ErrorText = styled.Text`
    color: #ef4444;
    font-size: 12px;
    margin-top: 4px;
    min-height: 16px;
`;

export const ButtonContainer = styled.View`
    margin-top: 20px;
`;
