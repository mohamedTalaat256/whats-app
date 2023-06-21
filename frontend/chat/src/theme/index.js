import PropTypes from 'prop-types';
import { createContext, useContext } from 'react';
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
import { ContextProvider, useStateContext } from '../context/ContextProvider';

// ----------------------------------------------------------------------
//create theme provider

ThemeProvider.propTypes = {
  children: PropTypes.node,
};


const ThemeStateContext = createContext({
  currentUser: null,
  token: null,
  notification: null,
  setUser: () => { },
  setToken: () => { },
  setNotification: () => { },
  appTheme: null,
  setAppTheme: () => { }
})


export default function ThemeProvider({ children }) {

  const { appTheme, setAppTheme } = useStateContext(ContextProvider);


  if (!appTheme) {
    setAppTheme('dark');
  }

  
 const themeOptions = (mode) => {
  
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? 
        paletteDark
        :paletteLight
        ),
    },
    typography: typography,
    shadows:{
      ...(mode === "dark"
      ? 
      shadowsDark()
      :shadowsLight()
      ),
    },
    customShadows:{
      ...(mode === "dark"
      ? 
      customShadowsDark()
      :customShadowsLight()
      ),
    },
    
    
    
  };
};
 

  const theme = createTheme(themeOptions(appTheme));
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}



export const useThemeStateContext = () => useContext(ThemeStateContext);









/*  appTheme === 'light'?

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
 } */