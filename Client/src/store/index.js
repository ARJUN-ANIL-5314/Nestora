import reducer from './reducer.js';
import saga from './saga.js';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, sagaMiddleware) // Wrap middleware array with a callback function
});
sagaMiddleware.run(saga);

const persister = 'Free';

export { store, persister };
