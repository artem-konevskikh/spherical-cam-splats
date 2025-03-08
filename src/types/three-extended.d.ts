// Props for the SphericalCamera component
export interface SphericalCameraProps {
  speed?: number;
  verticalAmplitude?: number;
  radiusMin?: number;
  radiusMax?: number;
  lookAtAmplitude?: number;
  zoom?: number;
}

// Props for the Effects component - updated for 360 viewing
export interface EffectsProps {
  fov?: number;  // Field of view in degrees
  zoom?: number; // Camera zoom level
}

// Props for the Environment component - simplified
export interface EnvironmentProps {
  splatPath?: string;
}