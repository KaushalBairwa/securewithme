import BackgroundEffects from "./BackgroundEffects";
import HeroContent from "./HeroContent";
import HeroTerminal from "./HeroTerminal";

interface HeroProps {
  embedded?: boolean;
}

export default function Hero({
  embedded = false,
}: HeroProps) {
  if (embedded) {
    return (
      <div className="relative flex min-h-[620px] w-full items-center overflow-hidden text-white">
        <BackgroundEffects />

        <div className="relative z-10 grid w-full items-center gap-10">
          <HeroContent />

          <div className="xl:hidden">
            <HeroTerminal />
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#05070b] px-6 pb-20 pt-36 text-white"
    >
      <BackgroundEffects />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <HeroContent />
        <HeroTerminal />
      </div>
    </section>
  );
}