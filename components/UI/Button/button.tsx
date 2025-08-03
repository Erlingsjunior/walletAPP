import React from 'react';
import { ButtonProps } from './button.schema';
import * as S from './button.styles';

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  variant = "primary", 
  onPress 
}) => {
  const ButtonComponent = variant === "secondary" ? S.SecondaryButton : S.PrimaryButton;
  
  return (
    <ButtonComponent onPress={onPress}>
      <S.ButtonText>{title}</S.ButtonText>
    </ButtonComponent>
  );
};