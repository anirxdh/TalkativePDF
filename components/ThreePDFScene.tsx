'use client';
import { Canvas } from '@react-three/fiber';
import { Float, Html, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';

function PDFIcon() {
  // Simple box as a placeholder for a PDF icon
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={[-1.5, 0, 0]}>
        <boxGeometry args={[0.7, 1, 0.1]} />
        <meshStandardMaterial color={'#fff'} />
      </mesh>
      <Html position={[-1.5, -0.7, 0]} center style={{ color: '#222', fontWeight: 'bold', fontSize: 16 }}>
        PDF
      </Html>
    </Float>
  );
}

function ChatbotIcon() {
  // Simple sphere as a placeholder for a chatbot
  return (
    <Float speed={1.5} rotationIntensity={1.2} floatIntensity={2.5}>
      <mesh position={[1.5, 0, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color={'#333'} />
      </mesh>
      <Html position={[1.5, -0.7, 0]} center style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
        AI
      </Html>
    </Float>
  );
}

export default function ThreePDFScene() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 2]} intensity={0.5} />
        <PDFIcon />
        <ChatbotIcon />
        {/* Optionally add more floating objects here */}
        {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
      </Canvas>
    </div>
  );
} 