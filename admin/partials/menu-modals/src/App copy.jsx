import * as THREE from "three";
import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
    PerformanceMonitor,
    AccumulativeShadows,
    RandomizedLight,
    Environment,
} from "@react-three/drei";
import { Spinner } from "@wordpress/components";
import { store as coreDataStore, useEntityRecords } from "@wordpress/core-data";
import { decodeEntities } from "@wordpress/html-entities";
import Porsche from "./components/Porche";
import Lightformers from "./components/Lightformers";
import CameraRig from "./components/CameraRig";
import "./App.css";

function App() {
    const [degraded, degrade] = useState(false);
    const query = {};

    const { hasResolved: hasResolvedModals, records: modals } =
        useEntityRecords("root", "media", query);

    const modalFiles =
        modals?.filter(
            (file) => file.mime_type === "application/octet-stream"
        ) || [];

    if (!hasResolvedModals) {
        return <Spinner />;
    }
    if (!modalFiles?.length) {
        return <div>No results</div>;
    }
    console.log(modalFiles);

    return (
        <>
            <h1> Modals List </h1>

            <div className="card">
                <div className="canvasWrapper">
                    {/* <div className="card"> */}
                    <Suspense fallback={<Spinner />}>
                        {/* <Canvas shadows camera={{ position: [5, 0, 15], fov: 30 }}> */}
                        <Canvas
                            className="canvas"
                            shadows
                            camera={{ position: [5, 0, 15], fov: 30 }}
                        >
                            <spotLight
                                position={[0, 15, 0]}
                                angle={0.3}
                                penumbra={1}
                                castShadow
                                intensity={2}
                                shadow-bias={-0.0001}
                            />
                            <ambientLight intensity={0.5} />
                            <Porsche
                                scale={1.6}
                                position={[-0.5, -0.18, 0]}
                                rotation={[0, Math.PI / 5, 0]}
                            />
                            <AccumulativeShadows
                                position={[0, -1.16, 0]}
                                frames={100}
                                alphaTest={0.9}
                                scale={10}
                            >
                                <RandomizedLight
                                    amount={8}
                                    radius={10}
                                    ambient={0.5}
                                    position={[1, 5, -1]}
                                />
                            </AccumulativeShadows>
                            {/** PerfMon will detect performance issues */}
                            <PerformanceMonitor
                                onDecline={() => degrade(true)}
                            />
                            {/* Renders contents "live" into a HDRI environment (scene.environment). */}
                            <Environment
                                frames={degraded ? 1 : Infinity}
                                resolution={256}
                                background
                                blur={1}
                            >
                                <Lightformers />
                            </Environment>
                            <CameraRig />
                        </Canvas>
                    </Suspense>
                </div>

                {/* <table className="wp-list-table widefat fixed striped table-view-list">
                    <thead>
                        <tr>
                            <th>Page Title</th>
                            <td style={{ width: 120 }}>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {modalFiles?.map((modalFile) => (
                            <tr key={modalFile.id}>
                                <td style={{ width: "200px" }}>
                                    {decodeEntities(modalFile.title.rendered)}
                                </td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table> */}
            </div>
        </>
    );
}

export default App;
