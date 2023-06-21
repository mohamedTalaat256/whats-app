// @mui
import { GlobalStyles as MUIGlobalStyles } from '@mui/material';

// ----------------------------------------------------------------------

export default function GlobalStyles() {
  const inputGlobalStyles = (
    <MUIGlobalStyles
      styles={{
        '*': {
        //  boxSizing: 'border-box',
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          WebkitOverflowScrolling: 'touch',
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          position: 'relative',
          minHeight: '100%',
          boxSizing: 'inherit',

        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        img: {
          display: 'block',
          maxWidth: '100%',
        },
        ul: {
          margin: 0,
          padding: 0,
        },
        '*::-webkit-scrollbar': {
          width: '0.0em',
        },
        '*::-webkit-scrollbar-track': {
         /*  '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)', */
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.2)',
        },
      }}
    />
  );

  return inputGlobalStyles;
}
