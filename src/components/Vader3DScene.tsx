import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { Physics, RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

// Camera shake for cinematic effect
function CameraShake() {
  useFrame((state) => {
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    state.camera.position.y = Math.cos(state.clock.elapsedTime * 3) * 0.1;
  });
  return null;
}

/**
 * Vader3DScene
 * - Heavy 3D overlay with Rapier physics engine
 * - Realistic debris falling with physics simulation
 */

// Physics-based molten debris particles with flaming text effect
function DebrisParticles() {
  const count = 20; // Reduced for better performance
  const debris = [];

  for (let i = 0; i < count; i++) {
    const size = Math.random() * 0.4 + 0.15;
    const position: [number, number, number] = [
      (Math.random() - 0.5) * 15,
      Math.random() * 8 + 3,
      (Math.random() - 0.5) * 8
    ];
    
    // Mix of navbar-like flaming blocks and molten chunks
    const isNavbarPiece = Math.random() > 0.5;
    
    if (isNavbarPiece) {
      // Flaming navbar text debris - bright orange/red
      debris.push(
        <RigidBody 
          key={i} 
          position={position}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
          linearVelocity={[(Math.random() - 0.5) * 2, -1, (Math.random() - 0.5) * 2]}
          angularVelocity={[(Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4]}
        >
          <mesh castShadow>
            <boxGeometry args={[size * 1.5, size * 0.5, size * 0.3]} />
            <meshStandardMaterial 
              color="#ff3300"
              metalness={0.3}
              roughness={0.6}
              emissive="#ff6600"
              emissiveIntensity={1.5}
            />
          </mesh>
        </RigidBody>
      );
    } else {
      // Regular molten debris
      const isMolten = Math.random() > 0.4;
      const debrisColor = isMolten ? '#ff3300' : '#1a0a00';
      const emissiveColor = isMolten ? '#ff4400' : '#ff2200';
      const emissiveIntensity = isMolten ? Math.random() * 0.8 + 0.5 : Math.random() * 0.3 + 0.2;

      debris.push(
        <RigidBody 
          key={i} 
          position={position}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
          linearVelocity={[(Math.random() - 0.5) * 3, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 3]}
          angularVelocity={[(Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5]}
        >
          <mesh castShadow>
            <boxGeometry args={[size, size, size]} />
            <meshStandardMaterial 
              color={debrisColor}
              metalness={0.7}
              roughness={0.4}
              emissive={emissiveColor}
              emissiveIntensity={emissiveIntensity}
            />
          </mesh>
        </RigidBody>
      );
    }
  }

  return <>{debris}</>;
}

// Lava Storm Particles - Intense falling lava drops
function LavaStorm() {
  const particlesRef = useRef<THREE.Points>(null);
  
  useEffect(() => {
    if (!particlesRef.current) return;
    
    let animationId: number;
    let time = 0;
    
    const animate = () => {
      if (!particlesRef.current || !particlesRef.current.geometry) {
        return;
      }
      
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const colors = particlesRef.current.geometry.attributes.color.array as Float32Array;
      time += 0.016;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Fast falling lava
        positions[i + 1] -= Math.random() * 0.15 + 0.1; // Faster fall
        
        // Slight horizontal drift
        positions[i] += (Math.random() - 0.5) * 0.05;
        
        // Pulsating glow effect on colors
        const pulse = Math.sin(time * 5 + i) * 0.3 + 0.7;
        colors[i] = 1.0; // Red
        colors[i + 1] = 0.3 * pulse; // Orange glow
        colors[i + 2] = 0.0; // No blue
        
        // Reset when too low
        if (positions[i + 1] < -8) {
          positions[i + 1] = Math.random() * 15 + 8;
          positions[i] = (Math.random() - 0.5) * 25;
          positions[i + 2] = (Math.random() - 0.5) * 15;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.geometry.attributes.color.needsUpdate = true;
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const particleCount = 400; // Reduced for better performance
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 25;
    positions[i + 1] = Math.random() * 20;
    positions[i + 2] = (Math.random() - 0.5) * 15;
    
    // Lava colors - red/orange
    colors[i] = 1.0;
    colors[i + 1] = Math.random() * 0.5;
    colors[i + 2] = 0.0;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial 
        size={0.18}
        vertexColors
        transparent 
        opacity={0.95}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}


export default function Vader3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      shadows
      gl={{ 
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      }}
    >
      {/* Cinematic camera shake */}
      <CameraShake />
      
      {/* Professional lighting setup */}
      <ambientLight intensity={0.2} color="#ff3300" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.8} 
        color="#ff6600" 
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* Multiple red point lights for lava glow effect */}
      <pointLight position={[-10, 10, -5]} intensity={1.5} color="#ff0000" distance={20} decay={2} />
      <pointLight position={[10, -5, 5]} intensity={1.2} color="#ff3300" distance={18} decay={2} />
      
      {/* Atmospheric fog */}
      <fog attach="fog" args={['#200000', 8, 20]} />
      
      <Physics gravity={[0, -9.8, 0]}>
        <DebrisParticles />
        
        {/* Ground plane for physics collisions */}
        <RigidBody type="fixed" position={[0, -10, 0]}>
          <mesh receiveShadow>
            <boxGeometry args={[30, 1, 20]} />
            <meshStandardMaterial color="#111" transparent opacity={0} />
          </mesh>
        </RigidBody>
      </Physics>
      
      <LavaStorm />
    </Canvas>
  );
}
