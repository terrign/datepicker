import { font, TEXT_ICON_FONT_SIZE } from '@constants';
import styled from 'styled-components';

export const Icon = styled.img`
  height: 16px;
  width: 16px;
  padding: 0;
`;

export const TextIcon = styled.span`
  ${font};

  color: inherit;
  font-size: ${TEXT_ICON_FONT_SIZE}px;
  line-height: 16px;
  height: 16px;
  width: 16px;
  display: block;
  transform: scaleY(0.5);
`;

export const CrossIcon = styled(TextIcon)`
  transform: scale(0.7);
`;
