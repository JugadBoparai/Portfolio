/**
 * NavbarDestruction
 * Creates cinematic navbar destruction - items turn to flame and fall as burning debris
 * Supports restoration of original navbar state
 */

// Store original navbar states
const originalNavbarStates = new Map<HTMLElement, {
  filter: string;
  textShadow: string;
  color: string;
  transform: string;
  opacity: string;
}>();

export async function burnHeadings(): Promise<void> {
  try {
    const header = document.querySelector('header');
    if (!header) return;

    // Select only the menu buttons (not the logo or toggle)
    const navButtons = Array.from(
      header.querySelectorAll('nav button:not([aria-label]), nav a')
    ) as HTMLElement[];

    console.log(`🔥 Igniting ${navButtons.length} navbar headings`);

    // Store original states and apply flame effect
    navButtons.forEach((el) => {
      // Store original state
      originalNavbarStates.set(el, {
        filter: el.style.filter || '',
        textShadow: el.style.textShadow || '',
        color: el.style.color || '',
        transform: el.style.transform || '',
        opacity: el.style.opacity || '',
      });

      // Apply flame effect
      el.style.filter = 'brightness(2) saturate(3) hue-rotate(-30deg)';
      el.style.textShadow = '0 0 20px #ff0000, 0 0 40px #ff4400, 0 0 60px #ff6600';
      el.style.color = '#ff3300';
      el.style.transition = 'all 0.3s ease';
    });
  } catch (e) {
    console.warn('Burn headings failed', e);
  }
}

export async function destroyNavbarAsDebris(): Promise<void> {
  try {
    const { gsap } = await import('gsap');

    if (!gsap) {
      console.warn('GSAP not available for NavbarDestruction');
      return;
    }

    const header = document.querySelector('header');
    if (!header) return;

    // Select only the menu buttons
    const navButtons = Array.from(
      header.querySelectorAll('nav button:not([aria-label]), nav a')
    ) as HTMLElement[];

    console.log(`🌋 Turning ${navButtons.length} navbar items into debris`);

    // Make headings fall as burning debris
    navButtons.forEach((el, index) => {
      // Create a clone for the debris effect
      const clone = el.cloneNode(true) as HTMLElement;
      clone.style.position = 'fixed';
      clone.style.pointerEvents = 'none';
      clone.style.zIndex = '10000';
      const rect = el.getBoundingClientRect();
      clone.style.left = `${rect.left}px`;
      clone.style.top = `${rect.top}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      document.body.appendChild(clone);

      // Hide original
      el.style.opacity = '0';
      el.style.pointerEvents = 'none';

      // Animate clone to fall as debris
      gsap.to(clone, {
        y: window.innerHeight + 200,
        x: gsap.utils.random(-150, 150),
        rotation: gsap.utils.random(-360, 360),
        scale: gsap.utils.random(0.5, 1.2),
        opacity: 0,
        duration: 2 + Math.random() * 1,
        delay: index * 0.1,
        ease: 'power2.in',
        force3D: true,
        onUpdate: function() {
          const progress = this.progress();
          clone.style.filter = `brightness(${2 + progress * 2}) saturate(${3 + progress * 1.5}) hue-rotate(-30deg)`;
        },
        onComplete: () => {
          clone.remove();
        }
      });
    });
  } catch (e) {
    console.warn('Navbar destruction failed', e);
  }
}

export async function restoreNavbar(): Promise<void> {
  try {
    const header = document.querySelector('header');
    if (!header) return;

    const navButtons = Array.from(
      header.querySelectorAll('nav button:not([aria-label]), nav a')
    ) as HTMLElement[];

    console.log(`✨ Restoring ${navButtons.length} navbar items`);

    // Restore original states
    navButtons.forEach((el) => {
      const original = originalNavbarStates.get(el);
      if (original) {
        el.style.filter = original.filter;
        el.style.textShadow = original.textShadow;
        el.style.color = original.color;
        el.style.transform = original.transform;
        el.style.opacity = original.opacity;
        el.style.pointerEvents = '';
        el.style.transition = 'all 0.5s ease';
      } else {
        // Fallback: reset to defaults
        el.style.filter = '';
        el.style.textShadow = '';
        el.style.color = '';
        el.style.transform = '';
        el.style.opacity = '';
        el.style.pointerEvents = '';
      }
    });

    // Clear stored states
    originalNavbarStates.clear();
  } catch (e) {
    console.warn('Navbar restoration failed', e);
  }
}

// Legacy function for backwards compatibility
export async function destroyNavbar() {
  await burnHeadings();
  await destroyNavbarAsDebris();
}
