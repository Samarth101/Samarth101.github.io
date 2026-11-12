import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading";
import { supportsWebGL } from "../components/utils/webglSupport";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(() => {
    // Skip loading on mobile
    if (window.innerWidth <= 768) return false;
    return supportsWebGL();
  });
  const [loading, setLoading] = useState(0);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };
  useEffect(() => {
    // Auto-start the same intro when this device won't show the 3D character.
    if (window.innerWidth <= 768 || !supportsWebGL()) {
      let disposed = false;
      let introTimer: number | undefined;
      import("../components/utils/initialFX").then((module) => {
        if (!disposed && module.initialFX) {
          introTimer = window.setTimeout(() => {
            if (disposed) return;
            module.initialFX();
          }, 100);
        }
      });
      return () => {
        disposed = true;
        if (introTimer !== undefined) window.clearTimeout(introTimer);
      };
    }
    return;
  }, []);

  useEffect(() => {}, [loading]);

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
