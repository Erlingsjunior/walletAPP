import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: #142995;
    position: relative;
    overflow: hidden;
`;

export const TopLeftSquare = styled.View`
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50px;
    background-color: #eeeeee;
    opacity: 0.1;
    top: -150px;
    left: -150px;
    transform: rotate(40deg);
`;

export const BottomRightSquare = styled.View`
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50px;
    background-color: #eeeeee;
    opacity: 0.1;
    bottom: -150px;
    right: -150px;
    transform: rotate(40deg);
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    padding-top: 60px;
    z-index: 1;
`;

export const HeaderButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
`;

export const BackIcon = styled.Text`
    color: #ffffff;
    font-size: 24px;
`;

export const AddIcon = styled.Text`
    color: #ffffff;
    font-size: 28px;
    font-weight: 300;
`;

export const HeaderTitle = styled.Text`
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
`;

export const SubHeader = styled.View`
    background-color: rgba(255, 255, 255, 0.15);
    margin: 0 20px;
    margin-bottom: 20px;
    border-radius: 25px;
    padding: 16px;
    align-items: center;
    z-index: 1;
`;

export const SubHeaderTitle = styled.Text`
    color: #00bcd4;
    font-size: 16px;
    font-weight: 500;
`;

export const Content = styled.View`
    flex: 1;
    z-index: 1;
`;
