import { useEffect, useState } from "react";

interface IntersectionOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

interface IntersectionResult {
  isIntersecting: boolean;
  intersectionRatio: number;
  target: Element | null;
}

const useIntersection = (
  ref: React.RefObject<Element>,
  options: IntersectionOptions = {}
): IntersectionResult => {
  const [intersectionResult, setIntersectionResult] = useState<
    IntersectionResult
  >({
    isIntersecting: false,
    intersectionRatio: 0,
    target: null
  });

  useEffect(
    () => {
      const observer = new IntersectionObserver(([entry]) => {
        setIntersectionResult({
          isIntersecting: entry.isIntersecting,
          intersectionRatio: entry.intersectionRatio,
          target: entry.target
        });
      }, options);

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    },
    [ref, options]
  );

  return intersectionResult;
};

export default useIntersection;
