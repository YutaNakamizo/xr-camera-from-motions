import React, {
  useEffect,
} from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import * as cameraAC from '~/modules/camera';
import * as motionsAC from '~/modules/motions';
import createXRCamera from '~/xr-camera-from-motions';
import { DebugPanel } from '~/containers/DebugPanel';
import './App.css';

function App() {
  const {
    xRCamera,

    orientationGranted,
    motionGranted,
  } = useSelector(state => ({
    ...state.camera,
    ...state.motions,
  }));

  const dispatch = useDispatch();
  const handleInstanceInitialized = xRCamera => (() => {
    dispatch(cameraAC.handleInstanceInitialized(xRCamera));
    dispatch(motionsAC.handleInstanceInitialized(xRCamera?.deviceMotions));
  })();
  const handleGrantedChanged = granted => dispatch(motionsAC.handleGrantedChanged(granted));
  const handleMotionChanged = motions => dispatch(motionsAC.handleMotionChanged(motions));

  useEffect(() => {
    createXRCamera().then(xRCamera => {
      handleInstanceInitialized(xRCamera)
    });
  }, []);

  useEffect(() => {
    handleInstanceInitialized(xRCamera);
    if(!xRCamera) return;
    
    const motionHandler = motions => {
      handleMotionChanged(motions);
    };

    xRCamera.deviceMotions.register(motionHandler);
    return () => xRCamera.deviceMotions.unregister();

  }, [
    xRCamera,
  ]);

  return (
    <div className="App">
      App
      <DebugPanel
      />
    </div>
  );
}

export default App;
