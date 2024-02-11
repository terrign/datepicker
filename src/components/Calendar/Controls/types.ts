import { ActionType } from 'context/App/types';

export type GetDatePartChangeHandlerType = (
  datePart: Extract<ActionType, ActionType.CHANGE_MONTH | ActionType.CHANGE_YEAR>,
  changeAmount: 1 | -1,
) => () => void;
