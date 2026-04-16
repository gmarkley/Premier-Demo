"use client";

import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React from 'react';

export default function OrbitControlsComponent() {
  const { camera, gl } = useThree();
  return <OrbitControls args={[camera, gl.domElement]} />;
}
