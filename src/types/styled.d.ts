import 'styled-components';

import { ThemeObject } from 'context/Theme/types';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeObject {}
}
