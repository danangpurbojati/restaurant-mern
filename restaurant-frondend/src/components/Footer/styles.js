import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footerWrapper: {
        marginTop: 32,
        backgroundColor: '#bfbfbf',
    },
    footerMenuWrapper: {
        margin: '24px 0',
    },
    menuFooter: {
        marginBottom: 16,
    },
    footerMenuLink: {
        textDecoration: 'none',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        color: 'inherit',
    },
    socialLink: {
        color: 'inherit',
        marginRight: 8,
        textDecoration: 'none',
    },
    footerDesigner: {
        backgroundColor: '#0f0f0f',
        color: 'white',
        padding: 8
    },
    footerDesignerLink: {
        color: 'inherit'
    }
}));

export default useStyles;