import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';

import { darkTheme } from './theme.dark';
import { lightTheme } from './theme.light';
import { PredefinedTheme, Theme, ThemeObject } from './types';

export interface ThemeProps extends PropsWithChildren {
  theme?: Theme;
  customStyles?: Partial<ThemeObject>;
}

export const CustomThemeProvider = ({ children, theme, customStyles }: ThemeProps) => {
  const defineTheme = () => {
    if (theme === PredefinedTheme.DARK) {
      return { ...darkTheme, ...customStyles };
    }
    return { ...lightTheme, ...customStyles };
  };
  return <ThemeProvider theme={defineTheme()}>{children}</ThemeProvider>;
};
