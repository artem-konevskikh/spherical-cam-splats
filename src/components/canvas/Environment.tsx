'use client'

import { Splat } from '@react-three/drei'


export default function Environment() {
    return (
        <>
            {/* Main Splat object */}
            <Splat
                alphaTest={0.1}
                // alphaHash
                src='/gs_Linz_stairs.splat'
                position={[0, 0, 0]}
            />

            {/* Add lighting */}
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0066" />

            {/* Add fog to enhance depth perception */}
            <fog attach="fog" args={['#000', 15, 30]} />
        </>
    )
}