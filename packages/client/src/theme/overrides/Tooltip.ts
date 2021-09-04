import { Theme } from '@material-ui/core';

export default function IconButton(theme: Theme) {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette?.grey[800],
        },
        arrow: {
          color: theme.palette?.grey[800],
        },
      },
    },
  };
}
