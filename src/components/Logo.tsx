import { useMemo } from "react";

interface LogoProps {
  isActive?: boolean;
}

export default function Logo({ isActive = false }: LogoProps) {
  const name = "Jugad Singh Boparai";
  const letters = useMemo(() => name.split(""), []);

  return (
    <div className="relative flex items-center gap-2 cursor-pointer group no-tap-highlight">
      {/* Logo/Initials JSB */}
      <div 
        className={`flex-shrink-0 relative z-[2] transition-all duration-300 group-hover:opacity-50 text-2xl md:text-2xl lg:text-3xl font-bold ${
          isActive ? 'text-cyan-500 dark:text-orange-500' : 'text-gray-500 dark:text-gray-300'
        }`}
        style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.05em' }}
      >
        JSB
      </div>

      {/* Vertical cascade letters - hidden on mobile/small screens */}
      <div className="hidden md:block lg:block absolute right-full top-0 rotate-[-90deg] origin-top-right whitespace-nowrap pointer-events-none z-[1] invisible group-hover:visible mr-[0.7cm]">
        {letters.map((letter, idx) => {
          const reverseDelay = (letters.length - 1 - idx) * 30;
          return (
            <span
              key={idx}
              className={`inline-block text-base font-bold leading-none opacity-0 translate-y-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 ${
                isActive ? 'text-cyan-500 dark:text-orange-500' : 'text-gray-500 dark:text-gray-300'
              }`}
              style={{ 
                transitionDelay: `${reverseDelay}ms`,
                letterSpacing: '0.05em',
                fontFamily: "'Montserrat', sans-serif"
              }}
            >
              {letter === ' ' ? '\u00A0\u00A0' : letter}
            </span>
          );
        })}
      </div>
    </div>
  );
}
