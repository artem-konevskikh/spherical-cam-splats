'use client'

import { Canvas } from '@react-three/fiber'
import { Preload, Loader } from '@react-three/drei'
import { Suspense, useState } from 'react'
import SphericalCamera from './SphericalCamera'
import Environment from './Environment'
import Effects from './Effects'
import * as THREE from 'three'
import { EffectsProps } from '@/types/three-extended'

export default function Experience() {
    const [viewParams, setViewParams] = useState<EffectsProps>({
        fov: 180,
        zoom: 5
    })

    return (
        <div className="relative w-full h-screen">
            {/* UI Controls for 360 viewing */}
            <div className="absolute top-4 right-4 z-10 bg-black/50 p-4 rounded text-white">
                <h3 className="mb-2 font-bold">View Controls</h3>
                <div className="mb-2">
                    <label className="block text-sm">Field of View: {viewParams.fov}°</label>
                    <input
                        type="range"
                        min="30"
                        max="360"
                        step="1"
                        value={viewParams.fov}
                        onChange={(e) => setViewParams({
                            ...viewParams,
                            fov: parseInt(e.target.value)
                        })}
                        className="w-full"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm">Zoom: {viewParams.zoom}x</label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        step="0.1"
                        value={viewParams.zoom}
                        onChange={(e) => setViewParams({
                            ...viewParams,
                            zoom: parseFloat(e.target.value)
                        })}
                        className="w-full"
                    />
                </div>
            </div>

            {/* Canvas with 360 camera effect */}
            <Canvas
                shadows
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    outputColorSpace: THREE.SRGBColorSpace
                }}
                camera={{ position: [0, 0, 5], fov: 80 }}
                style={{ background: 'black' }}
            >
                <Suspense fallback={null}>
                    <SphericalCamera zoom={viewParams.zoom} />
                    <Environment />
                    <Effects {...viewParams} />
                    <Preload all />
                </Suspense>
            </Canvas>

            {/* External loader for better UX */}
            <Loader
                containerStyles={{ background: 'rgba(0, 0, 0, 0.8)' }}
                dataInterpolation={(p) => `Loading Scene... ${p.toFixed(0)}%`}
                dataStyles={{ color: 'white', fontSize: '0.9em' }}
            />
        </div>
    )
}