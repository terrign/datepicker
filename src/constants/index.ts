import {
  border,
  CLOSE_BUTTON_FONT_SIZE,
  Color,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_FONT_SIZE,
  DEFAULT_PADDING,
  defaultBlock,
  flex,
  font,
  input,
  TEXT_ICON_FONT_SIZE,
} from './styles';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const SUNDAY_INDEX = 0;

const SATURDAY_INDEX = 6;

const MONDAY_INDEX = 1;

const WEEKS_TO_DISPLAY = 6;

const WEEK_LENGTH = 7;

const TODO_STORAGE_KEY = 'todos';

const TODO_TITLE_MAX_LENGTH = 30;

const TODO_DESC_MAX_LENGTH = 70;

export {
  border,
  CLOSE_BUTTON_FONT_SIZE,
  Color,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_FONT_SIZE,
  DEFAULT_PADDING,
  defaultBlock,
  flex,
  font,
  input,
  MONDAY_INDEX,
  MONTH_NAMES,
  SATURDAY_INDEX,
  SUNDAY_INDEX,
  TEXT_ICON_FONT_SIZE,
  TODO_DESC_MAX_LENGTH,
  TODO_STORAGE_KEY,
  TODO_TITLE_MAX_LENGTH,
  WEEK_LENGTH,
  WEEKDAYS,
  WEEKS_TO_DISPLAY,
};
