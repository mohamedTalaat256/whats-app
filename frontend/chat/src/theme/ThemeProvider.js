import PropTypes from 'prop-types';
import { createContext, useContext, useMemo } from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
//
import paletteLight from './light/paletteLight';
import shadowsLight from './light/shadowsLight';
import customShadowsLight from './light/customShadowsLight';


import paletteDark from './dark/paletteDark';
import shadowsDark from './dark/shadowsDark';
import customShadowsDark from './dark/customShadowsDark';


import typography from './typography';
import GlobalStyles from './globalStyles';
import componentsOverride from './overrides';

export default function ThemeProvider({ children }) {

    const [appTheme, setAppTheme] = useState(localStorage.getItem('THEME'));
  
  
  
    const toggleTheme = () => {
      setAppTheme(appTheme === 'light' ? 'dark' : 'light');
    };
  
    const themeOptions = useMemo(
      () => (
        appTheme === 'light' ?
  
          {
            palette: paletteLight,
            shape: { borderRadius: 6 },
            typography,
            shadows: shadowsLight(),
            customShadows: customShadowsLight(),
          }
          :
          {
            palette: paletteDark,
            shape: { borderRadius: 6 },
            typography,
            shadows: shadowsDark(),
            customShadows: customShadowsDark(),
          }
  
      ),
      []
    );
  
  
    const theme = createTheme(themeOptions);
    theme.components = componentsOverride(theme);
  
    return (
      <ThemeContext.Provider value={{ appTheme, setAppTheme: toggleTheme }}>
        <StyledEngineProvider injectFirst>
          <MUIThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            {children}
          </MUIThemeProvider>
        </StyledEngineProvider>
      </ThemeContext.Provider>
  
    );
  }
  
  ThemeProvider.propTypes = {
    children: PropTypes.node,
  };
  