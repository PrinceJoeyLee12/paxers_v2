import { Theme } from '@material-ui/core';

export default function IconButton(theme: Theme) {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },

      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  };
}
