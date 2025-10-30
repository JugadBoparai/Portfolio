# 🌙 Darth Vader Easter Egg Documentation

## Overview
A hidden Darth Vader easter egg integrated into the theme toggle button. Users can discover a cinematic dark mode activation by hovering over the moon icon.

## How It Works

### Default Behavior
- **Light Mode**: Shows a moon icon (🌙)
- **Dark Mode**: Shows a sun icon (☀️)
- Click to toggle between light and dark themes normally

### Easter Egg Activation
1. **Hover on the moon** for exactly **5 seconds** in light mode
2. The moon will **gradually morph** into a Darth Vader outline
3. A **subtle red glow** indicates progress
4. **Click when fully morphed** to trigger the easter egg

### Easter Egg Animation Sequence
When clicked after the morph completes:

1. **Audio**: Darth Vader breathing sound plays (`darth-vader.mp3`)
2. **Vader Entrance** (0-1s): Silhouette enters from the left side
3. **Force Push** (0.8s): 
   - Vader extends his hand
   - Red Force energy radiates outward
   - Entire page **shakes/shivers** briefly
   - Particles scatter across the screen
4. **Quote Display** (0.5-1.8s): 
   - Text fades in: *"You don't know the power of the dark side"*
   - Red glow effect with shadow
5. **Theme Switch** (2s): Dark mode activates
6. **Vader Exit** (2s): Silhouette fades away

**Total Duration**: ~2 seconds

## Session Storage
- Uses `sessionStorage.setItem('vaderTriggered', 'true')`
- Easter egg **only triggers once per session**
- After triggered, button functions as normal toggle
- **Resets on page refresh** (sessionStorage cleared)

## Technical Details

### Components
- **VaderToggle.tsx**: Main component with easter egg logic
- **Header.tsx**: Integrated into navigation bar

### Key Features
- Framer Motion animations for smooth transitions
- SVG-based Vader silhouette (not an image)
- Cinematic shake effect using motion keyframes
- Progress-based morph using hover timer
- Audio preloading for instant playback
- Responsive design (works on mobile)

### Styling
- Tailwind CSS utilities
- Custom drop shadows and glows
- Red (#ff0000, #ff0000) color scheme for Vader/dark side
- Smooth opacity and transform transitions

## Configuration

### Adjust Hover Duration
In `VaderToggle.tsx`, line ~30:
```tsx
const progress = Math.min(elapsed / 5000, 1); // 5000ms = 5 seconds
```

### Adjust Audio Volume
In `VaderToggle.tsx`, line ~23:
```tsx
audioRef.current.volume = 0.4; // 0.0 to 1.0
```

### Change Animation Duration
In `VaderToggle.tsx`, line ~86:
```tsx
setTimeout(() => {
  onToggle();
  setShowVaderAnimation(false);
}, 2000); // 2000ms = 2 seconds
```

## Browser Compatibility
- ✅ Chrome/Edge (tested)
- ✅ Firefox (tested)
- ✅ Safari (tested)
- ⚠️ Mobile: Audio may require user interaction first (autoplay restrictions)

## Assets Required
- `/public/darth-vader.mp3` - Breathing sound effect (included)

## Performance Notes
- Audio is preloaded on component mount
- Animations use GPU-accelerated transforms
- sessionStorage prevents repeated heavy animations
- Fixed positioning prevents layout shifts

## Future Enhancements
- [ ] Add Yoda easter egg for light mode return
- [ ] Vibration API for mobile devices
- [ ] Multiple quotes rotating
- [ ] Achievement/badge system for discovering it

---

**May the Force be with you!** 🖤
