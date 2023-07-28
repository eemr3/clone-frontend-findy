import { useEffect, useState } from 'react';
import { Spinner } from './Spinner';

interface LoadingProps {
  type?: 'spinner' | '3Dot' | '3DotScrolling';
}

export function Loading({ type = 'spinner' }: LoadingProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    setTimeout(() => {
      const newDots = dots.length == 3 ? '' : dots.padEnd(dots.length + 1, '.');
      setDots(newDots);
    }, 350 /* 700 */);
  }, [dots]);

  return (
    <div className="mx-10 my-5 flex items-center gap-2 text-3xl text-white">
      {type == 'spinner' && <Spinner size="sm" color="#015659" />}
      {/* <span className="animate-[spin_1.5s_linear_infinite] text-3xl"> {"+"} </span> */}
      <div className="flex">
        <span>Carregando</span>
        {type == '3DotScrolling' ? (
          <div className="overflow-hidden ">
            <div className="animate-[marquee_1.5s_linear_infinite]">...</div>
          </div>
        ) : (
          <span>{dots}</span>
        )}
      </div>
    </div>
  );
}
