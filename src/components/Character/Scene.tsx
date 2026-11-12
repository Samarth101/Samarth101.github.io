import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import { setAllTimeline, setCharTimeline } from "../utils/GsapScroll";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    const canvasContainer = canvasDiv.current;
    if (!canvasContainer) return;

    let disposed = false;
    let frameId = 0;
    let debounce: number | undefined;
    let introTimer: number | undefined;
    let hoverCleanup: (() => void) | undefined;
    let characterTimelineCleanup: (() => void) | undefined;
    let careerTimelineCleanup: (() => void) | undefined;
    let resizeHandler: (() => void) | undefined;
    const rect = canvasContainer.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: window.devicePixelRatio < 2,
          powerPreference: "high-performance",
        });
      } catch (error) {
        console.warn("3D character unavailable; continuing without it.", error);
        setLoading(100);
        return () => {
          disposed = true;
        };
      }
      renderer.setSize(container.width, container.height);
      // Keep the canvas sharp on retina screens without rendering at 2x pixels.
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasContainer.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      const progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera, () => !disposed);

      loadCharacter().then((gltf) => {
        if (gltf && !disposed) {
          const animations = setAnimations(gltf);
          const hoverElement = hoverDivRef.current;
          if (hoverElement) hoverCleanup = animations.hover(gltf, hoverElement);
          mixer = animations.mixer;
          const character = gltf.scene;
          scene.add(character);
          headBone = character.getObjectByName("spine006") || null;
          screenLight = character.getObjectByName("screenlight") || null;
          characterTimelineCleanup = setCharTimeline(character, camera);
          careerTimelineCleanup = setAllTimeline();
          progress.loaded().then(() => {
            if (disposed) return;
            introTimer = window.setTimeout(() => {
              if (disposed) return;
              light.turnOnLights();
              animations.startIntro();
            }, 2500);
          });
          resizeHandler = () => handleResize(renderer, camera, canvasDiv, character);
          window.addEventListener("resize", resizeHandler);
        }
      }).catch((error) => {
        if (disposed) return;
        console.warn("3D character unavailable; continuing without it.", error);
        progress.clear();
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      const landingDiv = document.getElementById("landingDiv");
      const onTouchMove = (event: TouchEvent) => {
        handleTouchMove(event, (x, y) => (mouse = { x, y }));
      };
      const onTouchStart = () => {
        if (debounce !== undefined) window.clearTimeout(debounce);
        debounce = setTimeout(() => {
          landingDiv?.addEventListener("touchmove", onTouchMove);
        }, 200);
      };

      const onTouchEnd = () => {
        if (debounce !== undefined) window.clearTimeout(debounce);
        landingDiv?.removeEventListener("touchmove", onTouchMove);
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }
      const animate = () => {
        frameId = requestAnimationFrame(animate);
        if (disposed) return;
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      animate();
      return () => {
        disposed = true;
        if (debounce !== undefined) window.clearTimeout(debounce);
        if (introTimer !== undefined) window.clearTimeout(introTimer);
        progress.cancel();
        cancelAnimationFrame(frameId);
        hoverCleanup?.();
        characterTimelineCleanup?.();
        careerTimelineCleanup?.();
        if (resizeHandler) window.removeEventListener("resize", resizeHandler);
        document.removeEventListener("mousemove", onMouseMove);
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
          landingDiv.removeEventListener("touchmove", onTouchMove);
        }
        scene.traverse((object) => {
          const mesh = object as THREE.Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
          if (mesh.material) {
            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            materials.forEach((material) => {
              Object.values(material).forEach((value) => {
                if (value instanceof THREE.Texture) value.dispose();
              });
              material.dispose();
            });
          }
        });
        light.dispose();
        scene.clear();
        renderer.dispose();
        renderer.forceContextLoss();
        if (renderer.domElement.parentElement === canvasContainer) {
          canvasContainer.removeChild(renderer.domElement);
        }
      };
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
