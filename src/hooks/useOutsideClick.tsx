import { useEffect, useRef } from 'react';

const useOutsideClick = (callback: (event: MouseEvent) => void) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event);
        document.removeEventListener('mousedown', handleClick);
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, callback]);

  return ref;
};

export default useOutsideClick;
