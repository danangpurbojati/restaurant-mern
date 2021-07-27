import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    menuPageWrapper: {
        marginTop: 24,
    },
    menuTitle: {
        fontWeight: 'bold',
        marginBottom: 16,
    },
    menuSubTitle: {
        fontWeight: 'bold',
        marginBottom: 16,
    },
    filterWrapper: {
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center', 
        marginBottom: 15,
    },
    select: {
        marginLeft: 20,
        minWidth: '120px'
    },
    menuItemWrapper: {
        marginTop: 16,
        marginBottom: 24,
    },
    menuImage: {
        width: '100%', 
        height: '200px', 
        objectFit: 'cover',
    },
    pagination: {
        display: 'flex', 
        justifyContent: 'center',
    }
});

export default useStyles;