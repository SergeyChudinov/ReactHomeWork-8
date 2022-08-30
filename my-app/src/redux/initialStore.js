import {createStore, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

import { usersReducer } from './usersReducer/usersReducer';

export const store = createStore(usersReducer, applyMiddleware(thunk))