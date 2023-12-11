import { useLayoutEffect } from "react";
import { applyProps } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export default function Porsche(props) {
    const { scene, nodes, materials } = useGLTF(
        "https://lwo219.csb.app/911-transformed.glb"
    );
    // const { scene, nodes, materials } = useGLTF("/911-transformed.glb");
    useLayoutEffect(() => {
        Object.values(nodes).forEach(
            (node) =>
                node.isMesh && (node.receiveShadow = node.castShadow = true)
        );
        applyProps(materials.rubber, {
            color: "#222",
            roughness: 0.6,
            roughnessMap: null,
            normalScale: [4, 4],
        });
        applyProps(materials.window, {
            color: "black",
            roughness: 0,
            clearcoat: 0.1,
        });
        applyProps(materials.coat, {
            envMapIntensity: 4,
            roughness: 0.5,
            metalness: 1,
        });
        applyProps(materials.paint, {
            envMapIntensity: 2,
            roughness: 0.45,
            metalness: 0.8,
            color: "#555",
        });
    }, [nodes, materials]);
    return <primitive object={scene} {...props} />;
}
