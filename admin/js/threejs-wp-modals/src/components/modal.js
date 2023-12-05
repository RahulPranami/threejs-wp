import { useGLTF } from "@react-three/drei";

export default function Model(props) {
    const groupRef = useRef();
    const { nodes, materials } = useGLTF("/path/to/your/model.glb"); // replace with your GLB file path
    return (
        <group ref={groupRef} {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Curve007_1.geometry}
                material={materials["Material.001"]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Curve007_2.geometry}
                material={materials["Material.002"]}
            />
        </group>
    );
}
useGLTF.preload("/path/to/your/model.glb"); // replace with your GLB file path

// import React, { useRef } from 'react'
//   import { useGLTF } from '@react-three/drei/useGLTF'

// export default function modal() {
//     const group = useRef()
//     const { nodes, materials } = useGLTF('/model.glb')

//     return (
//         <Canvas>
//             <GlbModal />
//         </Canvas>
//     );
// }

//   function Model({ ...props }) {
//     return (
//       <group ref={group} {...props} dispose={null}>
//         <mesh geometry={nodes.part1.geometry} material={materials.material1}/>
//         <mesh geometry={nodes.part2.geometry} material={materials.material2}/>
//         <!-- Add more meshes as per your model -->
//       </group>
//     )
//   }
