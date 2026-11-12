import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (percent < 100) return;
    const loadedTimer = window.setTimeout(() => setLoaded(true), 600);
    const introTimer = window.setTimeout(() => setIsLoaded(true), 1600);
    return () => {
      window.clearTimeout(loadedTimer);
      window.clearTimeout(introTimer);
    };
  }, [percent]);

  useEffect(() => {
    import("./utils/initialFX").then((module) => {
      if (isLoaded) {
        setClicked(true);
        setTimeout(() => {
          if (module.initialFX) {
            module.initialFX();
          }
          setIsLoading(false);
        }, 900);
      }
    });
  }, [isLoaded]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          SamarthBhandegaonkar
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee>
            <span>&nbsp; AIML Lead &nbsp;</span> <span>&nbsp; CS Engineering Student &nbsp;</span>
            <span>&nbsp; AIML Lead &nbsp;</span> <span>&nbsp; CS Engineering Student &nbsp;</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent = 0;
  let interval: ReturnType<typeof setInterval>;
  let finishResolve: ((value: number) => void) | undefined;

  const stop = () => {
    if (interval) clearInterval(interval);
  };

  // Keep the counter moving smoothly while the encrypted model is fetched,
  // decoded, and compiled. It only reaches 100 after that work completes.
  interval = setInterval(() => {
    if (percent >= 88) return;
    percent = Math.min(88, percent + Math.max(0.25, (88 - percent) * 0.018));
    setLoading(Math.floor(percent));
  }, 40);

  function clear() {
    stop();
    percent = 100;
    setLoading(100);
    finishResolve?.(100);
    finishResolve = undefined;
  }

  function cancel() {
    stop();
    finishResolve?.(percent);
    finishResolve = undefined;
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      stop();
      finishResolve = resolve;
      const start = performance.now();
      const from = percent;
      interval = setInterval(() => {
        const progress = Math.min(1, (performance.now() - start) / 650);
        percent = from + (100 - from) * (1 - Math.pow(1 - progress, 3));
        const rounded = Math.floor(percent);
        setLoading(rounded);
        if (progress >= 1) {
          stop();
          percent = 100;
          setLoading(100);
          finishResolve = undefined;
          resolve(100);
        }
      }, 16);
    });
  }
  return { loaded, get percent() { return percent; }, clear, cancel };
};
