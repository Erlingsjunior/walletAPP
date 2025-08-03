import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

export const Title = styled.Text`
    color: #ffffff;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 8px;
`;

export const Subtitle = styled.Text`
    color: #ffffff;
    font-size: 14px;
    opacity: 0.7;
    text-align: center;
    margin-bottom: 40px;
`;

export const ButtonContainer = styled.View`
    width: 100%;
    max-width: 300px;
`;

export const CardContainer = styled.View`
    width: 100%;
    max-width: 350px;
    margin-bottom: 40px;
    align-items: center;
`;

export const CardPlaceholder = styled.View`
    width: 100%;
    height: 200px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    border: 2px dashed rgba(255, 255, 255, 0.3);
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
`;

export const CardPlaceholderText = styled.Text`
    color: #ffffff;
    font-size: 16px;
    opacity: 0.6;
    text-align: center;
`;

export const InfoContainer = styled.View`
    background-color: rgba(255, 255, 255, 0.05);
    padding: 16px;
    border-radius: 12px;
    margin-bottom: 20px;
    width: 100%;
`;

export const InfoLabel = styled.Text`
    color: #ffffff;
    font-size: 12px;
    opacity: 0.6;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

export const InfoValue = styled.Text`
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 12px;
`;

export const ActionButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    max-width: 300px;
    gap: 12px;
`;

export const EditButton = styled.TouchableOpacity`
    flex: 1;
    padding: 12px 16px;
    border-radius: 8px;
    align-items: center;
    background-color: #f59e0b;
    border: 1px solid #d97706;
`;

export const DeleteButton = styled.TouchableOpacity`
    flex: 1;
    padding: 12px 16px;
    border-radius: 8px;
    align-items: center;
    background-color: #ef4444;
    border: 1px solid #dc2626;
`;

export const DefaultActionButton = styled.TouchableOpacity`
    flex: 1;
    padding: 12px 16px;
    border-radius: 8px;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const ActionButtonText = styled.Text`
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
`;
