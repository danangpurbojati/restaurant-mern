// import redux modules
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

// redux thunk middleware
import thunk from 'redux-thunk';

// import reducer
import categoryReducer from '../features/Category/reducer';
import menuReducer from '../features/Menu/reducer';
import authReducer from '../features/Auth/reducer';
import cartReducer from '../features/Cart/reducer';
import addressReducer from '../features/Address/reducer';

// buah menghubungkan dengan chrome devtools redux
const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// gabung reducer
const rootReducers = combineReducers({
    categories: categoryReducer,
    menus: menuReducer,
    auth: authReducer,
    cart: cartReducer,
    address: addressReducer
});

const store = createStore(rootReducers, composerEnhancer(applyMiddleware(thunk)));

export default store;