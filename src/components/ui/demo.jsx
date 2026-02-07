import { LayeredText } from "@/components/ui/layered-text";
import { Hero } from "@/components/ui/animated-hero";

function DemoOne() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
      <LayeredText />
    </div>
  );
}


function HeroDemo() {
  return (
    <div className="block">
      <Hero />
    </div>
  );
}

export { DemoOne, HeroDemo };
