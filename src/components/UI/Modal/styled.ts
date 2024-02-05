import { flex, font } from '@constants';
import { Button } from 'components/UI/Button';
import styled from 'styled-components';

export const StyledModal = styled.section`
  ${font}
  position: absolute;
  max-width: 400px;
  width: 100%;
  height: 100%;
  max-height: 300px;
  border-radius: 8px;
  left: 0;
  top: 0;
  ${flex}
  flex-direction: column;
  background: ${({ theme }) => theme.bgColor};
  z-index: 202;
`;

export const ModalCloseButton = styled(Button)`
  position: absolute;
  background-color: transparent;
  top: 10px;
  left: calc(100% - 42px);
  outline: none;
  ${flex}
  font-size: 5px;
  border: none;
  cursor: pointer;
  box-sizing: border-box;
`;
