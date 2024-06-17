// RayGrab.js
import React, { useRef, useState } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { useXREvent } from '@react-three/xr';
import { Raycaster, Vector3 } from 'three';

extend({ Raycaster });

function RayGrab({ children, ...props }) {
  const groupRef = useRef();
  const raycasterRef = useRef(new Raycaster());
  const [grabbed, setGrabbed] = useState(null);
  const controllerRef = useRef();

  useXREvent('selectstart', (event) => {
    if (controllerRef.current) {
      const intersects = raycasterRef.current.intersectObjects(groupRef.current.children);
      if (intersects.length > 0) {
        setGrabbed(intersects[0].object);
        controllerRef.current = event.controller;
      }
    }
  });

  useXREvent('selectend', () => {
    setGrabbed(null);
    controllerRef.current = null;
  });

  useFrame(() => {
    if (grabbed && controllerRef.current) {
      const controllerPos = new Vector3();
      controllerRef.current.getWorldPosition(controllerPos);
      grabbed.position.copy(controllerPos);
    }
    if (controllerRef.current) {
      const controllerPos = new Vector3();
      controllerRef.current.getWorldPosition(controllerPos);
      raycasterRef.current.set(controllerPos, controllerRef.current.getWorldDirection(new Vector3()));
    }
  });

  return (
    <group ref={groupRef} {...props}>
      {children}
    </group>
  );
}

export default RayGrab;
