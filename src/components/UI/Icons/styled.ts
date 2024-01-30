import { font } from '@css';
import styled from 'styled-components';

export const Icon = styled.img`
  height: 16px;
  width: 16px;
  padding: 0;
`;

export const TextIcon = styled.span`
  ${font}
  font-size: 20px;
  line-height: 16px;
  height: 16px;
  width: 16px;
  display: block;
  transform: scaleY(0.5);
`;
