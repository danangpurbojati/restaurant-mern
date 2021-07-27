import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    menuItem: {
        margin: '0 12px',
    },
    menuGroup: {
        display: 'flex',
        alignItems: 'center',
    },
    menuLink: {
        textDecoration: 'none',
        color: 'inherit',
    },
    drawer: {
        width: '300px',
    },
    mobileSearch: {
        width: '100%',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    search: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 200,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    authMenu: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
    },
    authOption: {
        display: 'flex',
        flexDirection: 'column'
    }
}));

export default useStyles;