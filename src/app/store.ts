import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { campaignsSlice } from '../features/campaign/campaignsSlice';
import { schedulesSlice } from '../features/campaign/schedulesSlice';
import { screensSlice } from '../features/campaign/screensSlice';
import { showsSlice } from '../features/campaign/showsSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  [campaignsSlice.reducerPath]: campaignsSlice.reducer,
  [screensSlice.reducerPath]: screensSlice.reducer,
  [showsSlice.reducerPath]: showsSlice.reducer,
  [schedulesSlice.reducerPath]: schedulesSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      campaignsSlice.middleware,
      screensSlice.middleware,
      showsSlice.middleware,
      schedulesSlice.middleware
    ),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store);
