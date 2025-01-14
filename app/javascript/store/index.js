import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import paymentReducer from '../features/payment/paymentSlice';
import customerReducer from '../features/customer/customerSlice'

import authTransform from '../features/auth/authTransform';


const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  payment: paymentReducer,
  customer: customerReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/FLUSH'],
      },
    }),
});
export const persistor = persistStore(store);
