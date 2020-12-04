import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../theme';

export const StyledLink = styled(Link)`
  display: flex;
  flex: none;
  align-items: center;
  text-decoration: none;
`;

export const StyledButton = styled.button`
  font-family: 'Work Sans', sans-serif;
  outline: none;
  border: none;
  width: 11.5rem;
  height: 3rem;
  border-radius: 5px;
  background: ${theme.main};
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
`;

export const StyledAccentButton = styled(StyledButton)`
  background: ${theme.secondary};
  &:hover {
    transform: scale(1.01);
    box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.25);
  }
  &:active {
    border: none;
    background: ${theme.success};
    box-shadow: 0 0 0 2px ${theme.success}, 0 0 0 4px ${theme.success};
    transition: box-shadow 0.05s ease-in-out;
  }
`;
export const StyledThinAccentOutlinedButton = styled(StyledButton)`
  height: 2rem;
  border: 2px solid ${theme.secondary};
  width: ${props => (props.inputWidth ? props.inputWidth : '6rem')};
  background: transparent;
  &:hover {
    border: 2px solid ${theme.gray};
    box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.25);
  }
  &:active {
    border: 2px solid ${theme.success};
  }
`;
export const StyledAccentOutlinedButton = styled(StyledButton)`
  border: 2px solid ${theme.secondary};
  width: ${props => (props.inputWidth ? props.inputWidth : '6rem')};
  background: transparent;
  &:hover {
    transform: scale(1.01);
    border: 2px solid ${theme.gray};
    box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.25);
  }
  &:active {
    border: 2px solid ${theme.success};
  }
`;
export const StyledWideAccentOutlinedButton = styled(StyledButton)`
  border: 2px solid ${theme.secondary};
  width: ${props => (props.inputWidth ? props.inputWidth : '8rem')};
  background: transparent;
  &:hover {
    transform: scale(1.01);
    border: 2px solid ${theme.secondary};
    box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.25);
  }
  &:active {
    border: 2px solid ${theme.success};
  }
`;
export const StyledGrayButton = styled(StyledButton)`
  background: ${theme.gray};
`;
export const StyledGrayOutlinedButton = styled(StyledButton)`
  border: 2px solid ${theme.gray};
  width: 6rem;
  background: transparent;
  &:hover {
    transform: scale(1.01);
    border: 2px solid ${theme.secondary};
    box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.25);
  }
  &:active {
    border: 2px solid ${theme.success};
  }
`;
export const StyledRoundButton = styled(StyledButton)`
  border-radius: 50%;
  width: 3rem;
  background: ${theme.gray};
  &:hover {
    // background: ${theme.main};
    box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.25);
  }
  &:active {
    background: ${theme.main};
    box-shadow: 0 0 0 2px ${theme.main}, 0 0 0 4px ${theme.main};
    transition: box-shadow 0.05s ease-in-out;
  }
`;
