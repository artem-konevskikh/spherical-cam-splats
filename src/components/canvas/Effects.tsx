'use client'

import { useRef, useEffect } from 'react'
import { EffectComposer } from '@react-three/postprocessing'
import { Effect, BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { EffectsProps } from '@/types/three-extended'

// Create a custom effect for 360-degree viewing
class Panoramic360Effect extends Effect {
    constructor(fov = 180) {
        const fragmentShader = `
            uniform float fov;
            
            #define CUSTOM_PI 3.14159265359
            #define CUSTOM_TWO_PI 6.28318530718
            #define CUSTOM_HALF_PI 1.57079632679
            
            vec3 uvToDirection(vec2 uv) {
                // Pre-compute values
                float phi = uv.x * CUSTOM_TWO_PI;
                float theta = uv.y * CUSTOM_PI;
                float sinTheta = sin(theta);
                
                // Optimized direction calculation
                return vec3(
                    sinTheta * cos(phi),
                    cos(theta),
                    sinTheta * sin(phi)
                );
            }
            
            vec2 directionToUV(vec3 dir) {
                dir = normalize(dir);
                float phi = atan(dir.z, dir.x);
                float theta = acos(dir.y);
                
                // Adjust phi to handle wrapping correctly
                phi = phi < 0.0 ? phi + CUSTOM_TWO_PI : phi;
                
                return vec2(
                    phi / CUSTOM_TWO_PI,
                    theta / CUSTOM_PI
                );
            }
            
            void mainUv(inout vec2 uv) {
                // Convert UV to direction
                vec3 dir = uvToDirection(uv);
                
                // Apply FOV scaling with optimized calculation
                float fovScale = radians(fov) / CUSTOM_PI;
                dir.xz *= fovScale;
                dir = normalize(dir);
                
                // Convert back to UV
                uv = directionToUV(dir);
            }
            
            void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
                outputColor = (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) 
                    ? vec4(0.0, 0.0, 0.0, 1.0)
                    : inputColor;
            }
        `;

        super('Panoramic360Effect', fragmentShader, {
            blendFunction: BlendFunction.NORMAL,
            uniforms: new Map([
                ['fov', new THREE.Uniform(fov)]
            ])
        });
    }

    setFOV(value: number): void {
        this.uniforms.get('fov')!.value = value;
    }
}

// Custom hook for managing the 360 effect
function usePanoramic360Effect(fov: number) {
    const effectRef = useRef<Panoramic360Effect | null>(null);

    useEffect(() => {
        if (!effectRef.current) {
            effectRef.current = new Panoramic360Effect(fov);
        } else {
            effectRef.current.setFOV(fov);
        }

        return () => {
            effectRef.current = null;
        };
    }, [fov]);

    return effectRef.current;
}

// Main component for the postprocessing effects
export default function Effects({ fov = 180 }: EffectsProps) {
    const panoramicEffect = usePanoramic360Effect(fov);

    if (!panoramicEffect) {
        return null;
    }

    return (
        <EffectComposer>
            <primitive object={panoramicEffect} />
        </EffectComposer>
    );
}