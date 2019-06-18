import { createMuiTheme } from '@material-ui/core/styles'
import theme from '../styles/theme'
import colors from '../styles/colors'

export default createMuiTheme({
  ...theme,
  typography: {
    fontFamily: 'Open Sans',
  },
  overrides: {
    MuiTypography: {
      h6: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
    },
    MuiBadge: {
      badge: {
        backgroundColor: colors.cornflower,
        color: colors.white,
      },
    },
    MuiButton: {
      root: {
        padding: '6px 24px',
      },
      text: {
        padding: '6px 24px',
      },
    },
    MuiTouchRipple: {
      child: { backgroundColor: 'var(--dark-greyblue)' },
    },
    MuiLinearProgress: {
      colorPrimary: {
        backgroundColor: colors.paleCyan,
      },
      barColorPrimary: {
        backgroundColor: colors.greenBlue,
      },
      bar: {
        borderRadius: 4,
      },
      root: {
        height: 6,
        borderRadius: 4,
      },
    },
    MuiGridListTile: {
      tile: {
        width: '40%',
        padding: 0,
      },
    },
    MuiSnackbar: {
      anchorOriginTopRight: {
        '@media (min-width: 600px)': {
          top: 'calc(var(--header-height) + 24px)',
        },
      },
    },
    MuiSnackbarContent: {
      root: {
        backgroundColor: 'var(--white)',
      },
    },
    MuiGrid: {
      item: {
        flexDirection: 'row',
      },
    },
    MuiCard: {
      root: {
        height: '100%',
      },
    },
  },
})
