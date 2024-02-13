import { typeStyleMap } from '@components/Calendar/Day/constants';
import { defaultBlock, font } from '@constants';
import styled from 'styled-components';

import { DayType } from './types';

export const StyledDay = styled.button.attrs<{ $type: DayType }>((props) => {
  return {
    ...props,
    type: 'button',
  };
})`
  ${defaultBlock}

  ${font}

  flex-grow: 1;

  cursor: pointer;
  ${({ $type }) => typeStyleMap[$type]}
`;
