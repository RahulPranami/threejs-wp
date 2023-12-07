import { useState, useRef } from "react";
import { MeshBasicMaterial } from "three";
import { Canvas } from "@react-three/fiber";
import { Box, OrbitControls } from "@react-three/drei";

export default function App() {
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
    );
}
