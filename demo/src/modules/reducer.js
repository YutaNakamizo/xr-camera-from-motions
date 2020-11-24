import {
  combineReducers,
} from 'redux';
import motions from './motions';
import camera from './camera';

export default combineReducers({
  motions,
  camera,
});

