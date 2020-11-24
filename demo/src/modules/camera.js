import Action from './Action';

// Actions
const INSTANCE_INITIALIZED = new Action('camera/instance-initialized');

// Reducers
const initialState = {
  xRCamera: undefined,
};
const reducer = (state = initialState, action) => {
  const { type, value } = action;
  switch(type) {
    case INSTANCE_INITIALIZED: {
      const { xRCamera } = value;
      /*const {
      } = xRCamera || initialState;*/
      return {
        ...state,
        xRCamera,
      };
    }
    default:
      return state;
  }
};
export default reducer;

// Action Creators
export const handleInstanceInitialized = xRCamera => {
  return {
    type: INSTANCE_INITIALIZED,
    value: {
      xRCamera,
    },
  };
};

