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
`;
export const StyledAccentOutlinedButton = styled(StyledButton)`
  border: 2px solid ${theme.secondary};
  width: 6rem;
  background: transparent;
`;
export const StyledGrayButton = styled(StyledButton)`
  background: ${theme.gray};
`;
export const StyledGrayOutlinedButton = styled(StyledButton)`
  border: 2px solid ${theme.gray};
  width: 6rem;
  background: transparent;
`;

// &:hover {
//     background: ${theme.bg.border};
//   }

//   &:focus {
//     box-shadow: 0 0 0 2px ${theme.bg.default}, 0 0 0 4px ${theme.bg.border};
//     transition: box-shadow 0.2s ease-in-out;
//   }

//   &:active {
//     box-shadow: 0 0 0 2px ${theme.bg.default},
//       0 0 0 4px ${tint(theme.bg.border, -24)};
//     transition: box-shadow 0.2s ease-in-out;
//   }
