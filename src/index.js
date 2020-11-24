import createDeviceMotions from 'device-motions-js';

const calcCameraPosition = () => {
};

const calcCameraRotation = () => {
};

class XRCamera {
  constructor(deviceMotions) {
    this._deviceMotions = deviceMotions;
    this._callback = function() {};
  }

  /* Private */
  _handler(e) {
    this._fireCallback();
  }

  _fireCallback() {
    this._callback();
  }

  /* Public */
  register(callback) {
    this._callback = callback;
    this._deviceMotions.register(function(e) {
      this._handler(e);
    }.bind(this));
  }

  unregister() {
    this._deviceMotions.unregister();
  }
};

export default async function createXRCamera(props) {
  const deviceMotions = await createDeviceMotions();
  const xRCamera = new XRCamera(deviceMotions, props);
  return xRCamera;
};

