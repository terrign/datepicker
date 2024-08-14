import { Flex } from '@components/UI/Flex';
import { defaultBlock } from '@constants';
import styled from 'styled-components';

export const StyledWeek = styled(Flex)`
  margin-top: 6px;

  div {
    ${defaultBlock}

    font-weight: 700;
  }
`;
