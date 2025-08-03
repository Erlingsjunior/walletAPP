import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: #142995;
    padding: 16px;
    position: relative;
    overflow: hidden;
`;

export const BackgroundSquare = styled.View`
    position: absolute;
    width: 300px;
    height: 450px;
    border-radius: 50px;
    background-color: #eeeeee;
    opacity: 0.1;
    transform: rotate(45deg);
`;

export const TopLeftSquare = styled(BackgroundSquare)`
    top: -120px;
    left: -60px;
`;

export const BottomRightSquare = styled(BackgroundSquare)`
    bottom: -120px;
    right: -60px;
`;

export const Content = styled.View`
    flex: 1;
    max-width: 400px;
    width: 100%;
    align-self: center;
    z-index: 1;
`;

export const Header = styled.View`
    margin-top: 32px;
    margin-bottom: 24px;
`;

export const Title = styled.Text`
    font-size: 24px;
    font-weight: 700;
    color: #ffffff;
    text-align: center;
`;
