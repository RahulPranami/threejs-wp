import * as THREE from "three";
import { useEffect, useRef, useState, startTransition, Suspense } from "react";
import { MeshBasicMaterial } from "three";
import { Canvas,useLoader } from "@react-three/fiber";
import { Box, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function ModelComponent({ modalFile }) {
    console.log(modalFile);
    const gltf = useLoader(GLTFLoader,modalFile);
    // const ref = useRef();

    return <primitive object={gltf.scene} />;
    // useEffect(() => {
    //     const scene = new THREE.Scene();
    //     const camera = new THREE.PerspectiveCamera(
    //         75,
    //         window.innerWidth / window.innerHeight,
    //         0.1,
    //         1000
    //     );
    //     const renderer = new THREE.WebGLRenderer();

    //     renderer.setSize(window.innerWidth, window.innerHeight);
    //     ref.current.appendChild(renderer.domElement);

    //     const geometry = new THREE.BoxGeometry();
    //     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    //     const cube = new THREE.Mesh(geometry, material);

    //     scene.add(cube);

    //     camera.position.z = 5;

    //     const animate = () => {
    //         requestAnimationFrame(animate);
    //         cube.rotation.x += 0.01;
    //         cube.rotation.y += 0.01;
    //         renderer.render(scene, camera);
    //     };

    //     animate();
    // }, []);

    // const styles = {
    //     // width: "100%",
    //     // height: "100%",
    //     // position: "absolute",
    //     // top: 0,
    //     // left: 0,
    // };
    // return <div ref={ref} style={styles} />;
    const boxRef = useRef();
    const [isRotating, setIsRotating] = useState(false);

    setInterval(() => {
        if (
            boxRef &&
            boxRef.current &&
            boxRef.current.rotation &&
            !isRotating
        ) {
            boxRef.current.rotation.x += 0.01;
            boxRef.current.rotation.y += 0.02;
            boxRef.current.rotation.z += 0.03;
            setIsRotating(true);
        }
    }, 10);

    return (
        <>
            <Canvas className="canvas">
                <Box
                    scale={[2, 2, 2]}
                    position={[0, 0, 0]}
                    ref={boxRef}
                    material={[
                        new MeshBasicMaterial({ color: "red" }),
                        new MeshBasicMaterial({ color: "green" }),
                        new MeshBasicMaterial({ color: "blue" }),
                        new MeshBasicMaterial({ color: "yellow" }),
                        new MeshBasicMaterial({ color: "purple" }),
                        new MeshBasicMaterial({ color: "orange" }),
                    ]}
                ></Box>
                <OrbitControls />
            </Canvas>
        </>
    );
}
