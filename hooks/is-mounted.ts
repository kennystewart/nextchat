import { useState, useEffect } from "react";

export function useIsMounted() {
  const [isMounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return isMounted;
}
