import { makeStyles } from '@material-ui/core/styles';
import heroImage from '../../assets/images/hero.jpg';

const useStyles = makeStyles({
    heroWrapper: {
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center', 
        height: '90vh', 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    heroTittle: {
        color: '#fff',
        fontWeight: 'bold'
    },
    heroSubTittle: {
        color: '#fff',
        margin: 16,
    },
    heroLinkWrapper: {
        textAlign: 'center',
    },
    categoryWrapper: {
        marginTop: 24,
    },
    categoryTitle: {
        fontWeight: 'bold',
        marginBottom: 24,
    },
    card: {
        height: '200px', 
        position: 'relative',
    },
    cardImage: {
        objectFit: 'cover', 
        height: '100%', 
        width: '100%', 
        filter: 'brightness(50%)',
    },
    cardText: {
        position: 'absolute', 
        left: '50%', 
        top: '50%', 
        transform: 'translate(0, -50%)', 
        color: 'white',
    },
    categoryCardTitle: {
        fontWeight: 'bold',
        textTransform: 'capitalize',
        marginBottom: 16,
    },
    loading: {
        textAlign: 'center',
        marginTop: 16
    }
});

export default useStyles;