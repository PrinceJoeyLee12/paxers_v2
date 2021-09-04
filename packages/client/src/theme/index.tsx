import React, { useMemo } from 'react';
// material
import { CssBaseline } from '@material-ui/core';
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from '@material-ui/core/styles';
//
import shape from './shape';
import palette from './palette';
import typography from './typography';
import GlobalStyles from './globalStyles';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';

// ----------------------------------------------------------------------

const ThemeConfig: React.FC = ({ children }): any => {
  const themeOptions: any = useMemo(
    () => ({
      palette,
      shape,
      typography,
      shadows,
      customShadows,
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeConfig;
