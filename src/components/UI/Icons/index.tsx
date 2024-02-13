import calendar from '@assets/Calendar.svg';
import clear from '@assets/Clear.svg';

import { CrossIcon, Icon, TextIcon } from './styled';

export const CalendarIcon = () => <Icon src={calendar} alt="calendar" />;

export const ClearIcon = () => <Icon src={clear} alt="clear" />;

export const DoubleNextIcon = () => <TextIcon>{'⟫'}</TextIcon>;

export const DoublePrevIcon = () => <TextIcon>{'⟪'}</TextIcon>;

export const PrevIcon = () => <TextIcon>{'⟨'}</TextIcon>;

export const NextIcon = () => <TextIcon>{'⟩'}</TextIcon>;

export const CloseIcon = () => <CrossIcon>{'✖'}</CrossIcon>;

export const InfoIcon = () => <TextIcon>{'🛈'}</TextIcon>;
