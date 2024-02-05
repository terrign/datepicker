import { PredefinedTheme, ThemeObject } from '@types';
import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';

import { darkTheme, lightTheme } from './constants';

export interface ThemeProps extends PropsWithChildren {
  theme?: PredefinedTheme;
  customStyles?: Partial<ThemeObject>;
}

export const CustomThemeProvider = ({ children, theme, customStyles }: ThemeProps) => {
  const defineTheme = () => {
    if (theme === 'dark') {
      return { ...darkTheme, ...customStyles };
    }
    return { ...lightTheme, ...customStyles };
  };
  return <ThemeProvider theme={defineTheme()}>{children}</ThemeProvider>;
};
