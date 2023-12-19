// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";
// import { useState, useRef } from "react";
import { MeshBasicMaterial } from "three";
import { Canvas } from "@react-three/fiber";
import { Box, OrbitControls } from "@react-three/drei";
// import { useGLTF } from "@react-three/drei/useGLTF";

// import { useLoader, useFrame } from "react-three-fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import * as THREE from "three";
import { SearchControl, Spinner, SnackbarList } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";
import { store as coreDataStore, useEntityRecords } from "@wordpress/core-data";
import { store as noticesStore } from "@wordpress/notices";
import { decodeEntities } from "@wordpress/html-entities";
// import { ErrorBoundary } from "react-error-boundary";
import Modal from "./components/Modal";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    const notices = useSelect(
        (select) => select(noticesStore).getNotices(),
        []
    );
    const { removeNotice } = useDispatch(noticesStore);
    const snackbarNotices = notices.filter(({ type }) => type === "snackbar");

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
                                {/* <div className="card"> */}
                                {/* <div> */}
                                {/* <Modal modalFile={modalFile.source_url} /> */}
                                {/* </div> */}
                                {/* <PageEditButton pageId={page.id} /> */}
                                {/* <DeletePageButton pageId={page.id} /> */}
                                {/* </div> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default App;
