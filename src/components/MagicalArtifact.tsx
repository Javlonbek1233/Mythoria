import { Canvas } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Sphere, Float, MeshWobbleMaterial } from '@react-three/drei';

export function MagicalArtifact() {
  return (
    <div className="w-full h-[300px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} color="#6d28d9" intensity={1} />

        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
          <Sphere args={[1, 100, 100]}>
            <MeshDistortMaterial
              color="#d4af37"
              attach="material"
              distort={0.4}
              speed={4}
              roughness={0}
              metalness={1}
            />
          </Sphere>
        </Float>

        <Float speed={5} rotationIntensity={3} floatIntensity={1}>
           <mesh rotation={[Math.PI / 4, 0, 0]}>
              <torusKnotGeometry args={[1.5, 0.05, 128, 16]} />
              <MeshWobbleMaterial
                color="#6d28d9"
                factor={0.6}
                speed={2}
                transparent
                opacity={0.5}
              />
           </mesh>
        </Float>

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
}
