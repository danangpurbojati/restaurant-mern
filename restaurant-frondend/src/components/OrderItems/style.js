import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    tableHead: {
        backgroundColor: '#b9b9b9',
    },
    tableItem: {
        display: 'flex',
        alignItems: 'center',
    },
    imageItem: {
        height: '50px', 
        width: '50px', 
        objectFit: 'cover',
        marginRight: 16,
    },
    tableQuantity: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tableSubtotal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    linkMenu: {
        color: 'red',
        fontWeight: 'bold',
        textDecoration: 'none',
    },
    totalCardWrapper: {
        marginTop: 18,
        backgroundColor: 'green'
    },
    totalWrapper: {
        display: 'flex', 
        justifyContent: 'space-between',
    },
    totalText: {
        fontWeight: 'bold',
    }
});

export default useStyles;