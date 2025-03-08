'use client'

import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { SphericalCameraProps } from '@/types/three-extended'

export default function SphericalCamera({
    speed = 0.3,
    verticalAmplitude = 2,
    radiusMin = 2,
    radiusMax = 5,
    lookAtAmplitude = 0.8,
    zoom = 5
}: SphericalCameraProps = {}) {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null)
    const { camera } = useThree()

    // Set the main camera to our controlled one
    useEffect(() => {
        if (cameraRef.current && camera instanceof THREE.PerspectiveCamera) {
            camera.position.set(0, 0, 5)
            camera.fov = 80 // Wide FOV for fisheye-like effect
            camera.zoom = zoom
            camera.updateProjectionMatrix()
        }
    }, [camera, zoom])

    // Animation path parameters
    const pathParams = useRef({
        speed,
        verticalAmplitude,
        radiusMin,
        radiusMax,
        lookAtAmplitude,
        zoom
    })

    // Update params if props change
    useEffect(() => {
        pathParams.current = {
            speed,
            verticalAmplitude,
            radiusMin,
            radiusMax,
            lookAtAmplitude,
            zoom
        }
    }, [speed, verticalAmplitude, radiusMin, radiusMax, lookAtAmplitude, zoom])

    // Define the camera animation path
    useFrame(({ clock }) => {
        if (!(camera instanceof THREE.PerspectiveCamera)) return

        const t = clock.getElapsedTime() * pathParams.current.speed
        const p = pathParams.current

        // Create a complex path around and through the central object
        const radius = (p.radiusMin + (Math.sin(t * 0.5) + 1) * 0.5 * (p.radiusMax - p.radiusMin)) * (p.zoom / 5)
        const height = Math.sin(t * 0.3) * p.verticalAmplitude

        // Update camera position
        camera.position.x = Math.sin(t) * radius
        camera.position.z = Math.cos(t) * radius
        camera.position.y = height

        // Make the camera always look toward the center with some movement
        const lookAtX = Math.sin(t * 2) * p.lookAtAmplitude
        const lookAtY = Math.cos(t * 1.5) * p.lookAtAmplitude
        const lookAtZ = Math.sin(t * 1.8) * p.lookAtAmplitude

        camera.lookAt(lookAtX, lookAtY, lookAtZ)
    })

    return <PerspectiveCamera ref={cameraRef} makeDefault fov={80} zoom={zoom} />
}