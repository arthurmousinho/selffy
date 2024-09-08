import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface OrbitingCirclesProps {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
}

export default function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 5,
  delay = 10,
  radius = 50,
}: OrbitingCirclesProps) {
  return (
    <div
      style={
        {
          "--duration": duration,
          "--radius": radius,
          "--delay": -delay,
        } as React.CSSProperties
      }
      className={cn(
        "absolute flex size-full transform-gpu animate-orbit items-center justify-center rounded-xl [animation-delay:calc(var(--delay)*1000ms)]",
        { "[animation-direction:reverse]": reverse },
        className
      )}
    >
      {children}
    </div>
  );
}



export function OrbitingIconsBackground(props: { children: ReactNode }) {
  return (
    <div className="relative h-screen w-screen overflow-hidden border border-red-500">

      <div className="absolute inset-0 flex items-center justify-center z-10">
        { props.children }
      </div>

      <OrbitingCircles
        className="border-none bg-transparent top-0 left-0"
        duration={30}
        delay={0}
        radius={500}
      >
        <div className="w-10 h-10 bg-blue-300 flex items-center justify-center rounded-xl">
          <span className="text-xl">📚</span>
        </div>
      </OrbitingCircles>

      <OrbitingCircles
        className="border-none bg-transparent top-0 right-0"
        duration={35}
        delay={5}
        radius={600}
      >
        <div className="w-10 h-10 bg-yellow-300 flex items-center justify-center rounded-xl">
          <span className="text-xl">🚀</span>
        </div>
      </OrbitingCircles>

      <OrbitingCircles
        className="border-none bg-transparent bottom-0 left-0"
        duration={40}
        delay={10}
        radius={700}
      >
        <div className="w-10 h-10 bg-green-300 flex items-center justify-center rounded-xl">
          <span className="text-xl">⚽</span>
        </div>
      </OrbitingCircles>

      <OrbitingCircles
        className="border-none bg-transparent bottom-0 right-0"
        duration={45}
        delay={15}
        radius={800}
      >
        <div className="w-10 h-10 bg-pink-300 flex items-center justify-center rounded-xl">
          <span className="text-xl">💊</span>
        </div>
      </OrbitingCircles>

      <OrbitingCircles
        className="border-none bg-transparent top-1/2 left-0"
        duration={50}
        delay={20}
        radius={900}
      >
        <div className="w-10 h-10 bg-orange-300 flex items-center justify-center rounded-xl">
          <span className="text-xl">🏠</span>
        </div>
      </OrbitingCircles>

      <OrbitingCircles
        className="border-none bg-transparent top-1/2 right-0"
        duration={55}
        delay={25}
        radius={1000}
      >
        <div className="w-10 h-10 bg-violet-300 flex items-center justify-center rounded-xl">
          <span className="text-xl">🎉</span>
        </div>
      </OrbitingCircles>
    </div>
  );
}