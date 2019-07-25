import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import vendorsReducer from "./vendorsReducer";
import itemsReducer from "./itemsReducer";
import bomReducer from "./bomReducer";
import subTypesReducer from "./subTypesReducer";
import materialTypeReducer from "./materialTypeReducer";
import categoryReducer from "./categoryReducer";
import commonReducer from './commonReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  vendor: vendorsReducer,
  item: itemsReducer,
  bom: bomReducer,
  subtype: subTypesReducer,
  materialType: materialTypeReducer,
  category: categoryReducer,
  common:commonReducer
});