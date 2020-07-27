import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import { deckReducer } from "./deck/reducers";

const rootReducer = combineReducers({
  deck: deckReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, composeWithDevTools());
//composeWithDevTools(applyMiddleware(reduxImmutableStateInvariant())));
