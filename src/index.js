import createDeviceMotions from 'device-motions-js';

const calcCameraPosition = () => {
  return {
    x: 0,
    y: 0,
    z: 0,
  }
};

const calcCameraRotation = () => {
  return {
    alpha: 0,
    beta: 0,
    gamma: 0,
  };
};

class XRCamera {
  constructor(deviceMotions) {
    this._callback = function() {};
    this.deviceMotions = deviceMotions;
  }

  /* Private */
  _handler(e) {
    const position = calcCameraPosition(e);
    const rotation = calcCameraRotation(e);

    this._callback({
      position,
      rotation,
    });
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

