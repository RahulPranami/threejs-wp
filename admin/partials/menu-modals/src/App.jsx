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
import Modal from "./components/Modal";
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
                {/* <div className="canvasWrapper"> */}
                {/* <Suspense fallback={<Spinner />}>
                        <Canvas
                            className="canvas"
                            shadows
                            camera={{ position: [5, 0, 15], fov: 30 }}
                        >
                            <Porsche
                                scale={1.6}
                                position={[-0.5, -0.18, 0]}
                                rotation={[0, Math.PI / 5, 0]}
                            />
                            <CameraRig />
                        </Canvas>
                    </Suspense> */}
                {/* </div> */}

                <table className="wp-list-table widefat fixed striped table-view-list">
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
                                <td>
                                    <Suspense fallback={<Spinner />}>
                                        <Canvas
                                            className="canvas"
                                            shadows
                                            camera={{
                                                position: [5, 0, 15],
                                                fov: 30,
                                            }}
                                        >
                                            <Modal modalFile={modalFile.source_url} />
                                            {/* <Porsche
                                scale={1.6}
                                position={[-0.5, -0.18, 0]}
                                rotation={[0, Math.PI / 5, 0]}
                            /> */}
                                            <CameraRig />
                                        </Canvas>
                                    </Suspense>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default App;
