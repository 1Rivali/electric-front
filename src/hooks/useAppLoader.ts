import { useState, useEffect } from "react";

interface UseAppLoaderReturn {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  hideLoader: () => void;
}

const useAppLoader = (): UseAppLoaderReturn => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loader after a minimum time to ensure smooth UX
    const minLoadingTime = 1500; // 1.5 seconds minimum
    const startTime = Date.now();

    const hideLoaderAfterMinTime = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    };

    // Check if critical resources are loaded
    const checkResourcesLoaded = () => {
      // Check if document is ready
      if (document.readyState === "complete") {
        hideLoaderAfterMinTime();
      } else {
        window.addEventListener("load", hideLoaderAfterMinTime);
      }
    };

    // Start checking after a short delay
    const checkTimeout = setTimeout(checkResourcesLoaded, 100);

    return () => {
      clearTimeout(checkTimeout);
      window.removeEventListener("load", hideLoaderAfterMinTime);
    };
  }, []);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  return {
    isLoading,
    setLoading,
    hideLoader,
  };
};

export default useAppLoader;
