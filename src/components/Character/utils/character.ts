import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  isActive: () => boolean
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        if (!isActive()) {
          resolve(null);
          return;
        }
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        loader.load(
          blobUrl,
          async (gltf) => {
            try {
              if (!isActive()) {
                resolve(null);
                dracoLoader.dispose();
                URL.revokeObjectURL(blobUrl);
                return;
              }

              const character = gltf.scene;
              await renderer.compileAsync(character, camera, scene);
              if (!isActive()) {
                resolve(null);
                dracoLoader.dispose();
                URL.revokeObjectURL(blobUrl);
                return;
              }

              character.traverse((child: any) => {
                if (child.isMesh) {
                  const mesh = child as THREE.Mesh;
                  child.castShadow = false;
                  child.receiveShadow = false;
                  mesh.frustumCulled = true;
                  if (mesh.material && !Array.isArray(mesh.material)) {
                    (mesh.material as THREE.ShaderMaterial).precision = "mediump";
                  }
                }
              });

              const footR = character.getObjectByName("footR");
              const footL = character.getObjectByName("footL");
              if (footR) footR.position.y = 3.36;
              if (footL) footL.position.y = 3.36;

              resolve(gltf);
              dracoLoader.dispose();
              URL.revokeObjectURL(blobUrl);
            } catch (error) {
              URL.revokeObjectURL(blobUrl);
              reject(error);
            }
          },
          undefined,
          (error) => {
            URL.revokeObjectURL(blobUrl);
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
