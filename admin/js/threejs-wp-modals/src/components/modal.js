import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function ModelErrorFallback({ error }) {
    return <div>Error loading model: {error.message}</div>;
}

export default function Model({ modalFile }) {
    // const gltf = useGLTF(modalFile);
    const gltf = useGLTF("https://thinkuldeep.com/modelviewer/Astronaut.glb");

    return (
        <div>
            <Canvas>
                {/* <ambientLight /> */}
                {/* {gltf && <primitive object={gltf.scene} />} */}
            </Canvas>
        </div>
    );
}

// export default function Home({ urls }) {
//     return (
//         <div>
//             <Suspense>
//                 <Canvas>
//                     <ambientLight />
//                     {urls.map((url, index) => (
//                         <Model key={index} url={url} />
//                     ))}
//                 </Canvas>
//             </Suspense>
//         </div>
//     );
// }

// function Model() {
//   const gltf = useGLTF('https://thinkuldeep.com/modelviewer/Astronaut.glb')
//   return (<primitive object={gltf.scene} />)
// }

// export default function Home() {
//   return (
//     <div>
//       <Suspense>
//         <Canvas>
//           <ambientLight />
//           <Model />
//         </Canvas>
//       </Suspense>
//     </div>
//   )
// }

// export default function Model({ modalFile }) {
//     // console.log(modalFile);
//     const groupRef = useRef();
//     // const { nodes, materials } = useGLTF(modalFile); // replace with your GLB file path
//     return (
//         <div>
//             {/* <group ref={groupRef} {...props} dispose={null}>
//             <mesh
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Curve007_1.geometry}
//                 material={materials["Material.001"]}
//             />
//             <mesh
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Curve007_2.geometry}
//                 material={materials["Material.002"]}
//             />
//         </group> */}
//         </div>
//     );
// }
useGLTF.preload("https://thinkuldeep.com/modelviewer/Astronaut.glb");

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
