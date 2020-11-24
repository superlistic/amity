import styled from 'styled-components';
import theme from '../theme';

export const FormInput = styled.input`
  background: ${theme.gray};
  border: none;
  height: 3rem;
  width: 80%;
  color: ${theme.main};
  border-radius: 1rem;
  padding-left: 1rem;
  margin-top: 0.5rem;
  outline: none;
`;
