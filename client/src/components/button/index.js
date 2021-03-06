import React from 'react';
import {
  StyledLink,
  StyledButton,
  StyledAccentButton,
  StyledAccentOutlinedButton,
  StyledWideAccentOutlinedButton,
  StyledThinAccentOutlinedButton,
  StyledGrayButton,
  StyledGrayOutlinedButton,
  StyledRoundButton,
} from './style';

const buttonWrapper = (Component, props) => {
  const { to, children, ...rest } = props;
  const Button = <Component {...rest}>{children}</Component>;
  if (to) return <StyledLink to={to}>{Button}</StyledLink>;
  return Button;
};

export const Button = props => buttonWrapper(StyledButton, props);

export const AccentButton = props => buttonWrapper(StyledAccentButton, props);
export const WideAccentOutlinedButton = props =>
  buttonWrapper(StyledWideAccentOutlinedButton, props);

export const GrayButton = props => buttonWrapper(StyledGrayButton, props);

export const AccentOutlinedButton = props =>
  buttonWrapper(StyledAccentOutlinedButton, props);
export const ThinAccentOutlinedButton = props =>
  buttonWrapper(StyledThinAccentOutlinedButton, props);

export const GrayOutlinedButton = props =>
  buttonWrapper(StyledGrayOutlinedButton, props);

export const RoundButton = props => buttonWrapper(StyledRoundButton, props);
