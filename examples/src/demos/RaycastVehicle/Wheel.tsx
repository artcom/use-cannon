import { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useCylinder } from '@react-three/cannon'

import type { BufferGeometry, Material, Object3D } from 'three'
import type { GLTF } from 'three-stdlib/loaders/GLTFLoader'
import type { CylinderProps } from '@react-three/cannon'

useGLTF.preload('/wheel.glb')

// Initially Auto-generated by: https://github.com/pmndrs/gltfjsx

type WheelGLTF = GLTF & {
  materials: Record<'Chrom' | 'Rubber' | 'Steel', Material>
  nodes: Record<'wheel_1' | 'wheel_2' | 'wheel_3', { geometry: BufferGeometry }>
}

type WheelProps = CylinderProps & {
  leftSide?: boolean
  radius: number
}

export const Wheel = forwardRef<Object3D, WheelProps>(({ radius = 0.7, leftSide, ...props }, ref) => {
  const { nodes, materials } = useGLTF('/wheel.glb') as WheelGLTF
  useCylinder(
    () => ({
      mass: 1,
      type: 'Kinematic',
      material: 'wheel',
      collisionFilterGroup: 0,
      args: [radius, radius, 0.5, 16],
      ...props,
    }),
    ref,
  )
  return (
    <mesh ref={ref}>
      <mesh rotation={[0, 0, ((leftSide ? 1 : -1) * Math.PI) / 2]}>
        <mesh material={materials.Rubber} geometry={nodes.wheel_1.geometry} />
        <mesh material={materials.Steel} geometry={nodes.wheel_2.geometry} />
        <mesh material={materials.Chrom} geometry={nodes.wheel_3.geometry} />
      </mesh>
    </mesh>
  )
})
