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

export default function App() {
    const notices = useSelect(
        (select) => select(noticesStore).getNotices(),
        []
    );
    const { removeNotice } = useDispatch(noticesStore);
    const snackbarNotices = notices.filter(({ type }) => type === "snackbar");

    // const boxRef = useRef();
    // const [isRotating, setIsRotating] = useState(false);

    // setInterval(() => {
    //     if (boxRef && boxRef.current && boxRef.current.rotation && !isRotating) {
    //         boxRef.current.rotation.x += 0.01;
    //         boxRef.current.rotation.y += 0.02;
    //         boxRef.current.rotation.z += 0.03;
    //         setIsRotating(true);
    //     }
    // }, 10);

    const [searchModal, setSearchModal] = useState("");
    // const data = useEntityRecords("postType", "page", { per_page: 20 });
    // const data = useEntityRecords('root', 'attachment', { per_page: 20, mime_type: 'model/gltf-binary' });
    // console.log(data);

    const { modals, hasResolvedModals } = useSelect(
        (select) => {
            // const query = {};
            const query = {
                meta_query: [
                    {
                        key: "mime_type",
                        value: "application/octet-stream",
                        compare: "=",
                    },
                ],
            };

            if (searchModal) {
                query.search = searchModal;
            }
            return {
                modals: select(coreDataStore).getEntityRecords(
                    "postType",
                    "attachment",
                    query
                ),
                hasResolvedModals: select(coreDataStore).hasFinishedResolution(
                    "getEntityRecords",
                    ["postType", "attachment", query]
                ),
            };
        },
        [searchModal]
    );

    if (!hasResolvedModals) {
        return <Spinner />;
    }
    if (!modals?.length) {
        return <div>No results</div>;
    }

    return (
        <div>
            App
            {/* <Canvas>
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
            </Canvas> */}
            <div className="d-flex">
                <div>
                    <h3> Modals List </h3>
                    {/* <SearchControl
                        onChange={setSearchPage}
                        value={searchModal}
                    /> */}
                    <table className="wp-list-table widefat fixed striped table-view-list">
                        <thead>
                            <tr>
                                <th>Page Title</th>
                                <td style={{ width: 120 }}>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {modals?.map((page) => (
                                <tr key={page.id}>
                                    <td>
                                        {decodeEntities(page.title.rendered)}
                                    </td>
                                    <td>
                                        {/* <PageEditButton pageId={page.id} /> */}
                                        {/* <DeletePageButton pageId={page.id} /> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <SnackbarList
                notices={snackbarNotices}
                className="components-editor-notices__snackbar"
                onRemove={removeNotice}
            />
        </div>
    );
}
