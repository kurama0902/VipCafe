import {auth} from './auth';
import {basket} from './basket';
import {archive} from './archive';
import {userProfile} from './users';
import {combineReducers} from 'redux';
import {shares, news} from './shares-and-news';
import {repeatOrder} from './repeat-order';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as toastrReducer} from 'react-redux-toastr';

export default combineReducers({
  routing,
  auth,
  userProfile,
  shares,
  news,
  basket,
  archive,
  repeatOrder,
  toastr : toastrReducer
});
