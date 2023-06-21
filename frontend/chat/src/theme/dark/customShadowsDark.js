// @mui
import { alpha } from '@mui/material/styles';
//
import paletteDark from './paletteDark';

// ----------------------------------------------------------------------

const color = paletteDark.secondary.dark;

export default function customShadowsDark() {
  const transparent = alpha(color, 0.05);
  return {
    z1: `0 1px 2px 0 ${transparent}`,
    z4: `0 4px 8px 0 ${transparent}`,
    z8: `0 8px 16px 0 ${transparent}`,
    z12: `0 12px 24px -4px ${transparent}`,
    z16: `0 16px 32px -4px ${transparent}`,
    z20: `0 20px 40px -4px ${transparent}`,
    z24: `0 24px 48px 0 ${transparent}`,
    //
    primary: `0 8px 16px 0 ${alpha(paletteDark.primary.main, 0)}`,
    info: `0 8px 16px 0 ${alpha(paletteDark.info.main, 0)}`,
    secondary: `0 8px 16px 0 ${alpha(paletteDark.secondary.main, 0)}`,
    success: `0 8px 16px 0 ${alpha(paletteDark.success.main, 0)}`,
    warning: `0 8px 16px 0 ${alpha(paletteDark.warning.main, 0)}`,
    error: `0 8px 16px 0 ${alpha(paletteDark.error.main, 0)}`,
    //
    card: `0 0 2px 0 ${alpha(color, 0)}, 0 12px 24px -4px ${alpha(color, 0)}`,
    dialog: `-40px 40px 80px -8px ${alpha(color, 0.24)}`,
    dropdown: `0 0 2px 0 ${alpha(color, 0.24)}, -20px 20px 40px -4px ${alpha(color, 0.24)}`,
  };
}
