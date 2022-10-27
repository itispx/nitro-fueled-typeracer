import { useEffect } from "react";

const useKeydown = (
  func: (event: KeyboardEvent) => void,
  dependencies: [] | undefined,
) => {
  useEffect(() => {
    document.addEventListener("keydown", func, false);

    return () => {
      document.removeEventListener("keydown", func, false);
    };
  }, [func, dependencies]);
};

export default useKeydown;
