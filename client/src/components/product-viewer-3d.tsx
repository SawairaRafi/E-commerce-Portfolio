import { useRef, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';

interface ProductViewer3DProps {
  productName: string;
  productImage: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductViewer3D({ productName, productImage, isOpen, onClose }: ProductViewer3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;

    // Initialize Three.js scene
    let scene: any, camera: any, renderer: any, cube: any;
    let animationFrameId: number;

    const initThreeJS = async () => {
      try {
        // Dynamically import Three.js to avoid SSR issues
        const THREE = await import('three');
        
        // Scene setup
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8fafc);

        // Camera setup
        camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 5;

        // Renderer setup
        renderer = new THREE.WebGLRenderer({ 
          canvas: canvasRef.current!,
          antialias: true 
        });
        renderer.setSize(400, 400);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Create realistic product representation based on product type
        cube = new THREE.Group();
        
        if (productName.toLowerCase().includes('headphone') || productName.toLowerCase().includes('wireless pro max')) {
          // Create detailed headphone geometry
          const headbandGeometry = new THREE.TorusGeometry(1.2, 0.08, 8, 32, Math.PI);
          const headbandMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a, shininess: 50 });
          const headband = new THREE.Mesh(headbandGeometry, headbandMaterial);
          headband.rotation.z = Math.PI;
          cube.add(headband);

          // Left ear cup
          const earcupGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.15, 32);
          const earcupMaterial = new THREE.MeshPhongMaterial({ color: 0x2a2a2a, shininess: 80 });
          const leftEarcup = new THREE.Mesh(earcupGeometry, earcupMaterial);
          leftEarcup.position.set(-1, -0.5, 0);
          leftEarcup.rotation.z = Math.PI / 2;
          cube.add(leftEarcup);

          // Right ear cup
          const rightEarcup = new THREE.Mesh(earcupGeometry, earcupMaterial);
          rightEarcup.position.set(1, -0.5, 0);
          rightEarcup.rotation.z = Math.PI / 2;
          cube.add(rightEarcup);

          // Add padding detail
          const paddingGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.05, 32);
          const paddingMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 });
          const leftPadding = new THREE.Mesh(paddingGeometry, paddingMaterial);
          leftPadding.position.set(-1, -0.5, 0.1);
          leftPadding.rotation.z = Math.PI / 2;
          cube.add(leftPadding);

          const rightPadding = new THREE.Mesh(paddingGeometry, paddingMaterial);
          rightPadding.position.set(1, -0.5, 0.1);
          rightPadding.rotation.z = Math.PI / 2;
          cube.add(rightPadding);

        } else if (productName.toLowerCase().includes('watch') || productName.toLowerCase().includes('smart') || productName.toLowerCase().includes('fitness')) {
          // Create detailed smartwatch geometry
          const watchBodyGeometry = new THREE.BoxGeometry(0.8, 1.0, 0.25);
          const watchBodyMaterial = new THREE.MeshPhongMaterial({ color: 0x2a2a2a, shininess: 100 });
          const watchBody = new THREE.Mesh(watchBodyGeometry, watchBodyMaterial);
          watchBody.position.set(0, 0, 0);
          cube.add(watchBody);

          // Watch screen
          const screenGeometry = new THREE.PlaneGeometry(0.6, 0.8);
          const screenMaterial = new THREE.MeshPhongMaterial({ color: 0x000000, emissive: 0x001122 });
          const screen = new THREE.Mesh(screenGeometry, screenMaterial);
          screen.position.set(0, 0, 0.13);
          cube.add(screen);

          // Digital crown
          const crownGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.15, 16);
          const crownMaterial = new THREE.MeshPhongMaterial({ color: 0x666666, shininess: 100 });
          const crown = new THREE.Mesh(crownGeometry, crownMaterial);
          crown.position.set(0.45, 0.2, 0);
          crown.rotation.z = Math.PI / 2;
          cube.add(crown);

          // Watch band
          const bandGeometry = new THREE.BoxGeometry(0.4, 0.1, 0.15);
          const bandMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a });
          const topBand = new THREE.Mesh(bandGeometry, bandMaterial);
          topBand.position.set(0, 0.8, 0);
          cube.add(topBand);

          const bottomBand = new THREE.Mesh(bandGeometry, bandMaterial);
          bottomBand.position.set(0, -0.8, 0);
          cube.add(bottomBand);

        } else if (productName.toLowerCase().includes('earbuds') || productName.toLowerCase().includes('true wireless')) {
          // Create earbuds with case
          const caseGeometry = new THREE.BoxGeometry(1.2, 0.8, 0.4);
          const caseMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 100 });
          const case3d = new THREE.Mesh(caseGeometry, caseMaterial);
          case3d.position.set(0, 0, 0);
          cube.add(case3d);

          // Left earbud
          const earbudGeometry = new THREE.SphereGeometry(0.15, 16, 16);
          const earbudMaterial = new THREE.MeshPhongMaterial({ color: 0x2a2a2a, shininess: 80 });
          const leftEarbud = new THREE.Mesh(earbudGeometry, earbudMaterial);
          leftEarbud.position.set(-0.3, 0, 0.25);
          cube.add(leftEarbud);

          // Right earbud
          const rightEarbud = new THREE.Mesh(earbudGeometry, earbudMaterial);
          rightEarbud.position.set(0.3, 0, 0.25);
          cube.add(rightEarbud);

          // Stems
          const stemGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.3, 8);
          const leftStem = new THREE.Mesh(stemGeometry, earbudMaterial);
          leftStem.position.set(-0.3, -0.2, 0.25);
          cube.add(leftStem);

          const rightStem = new THREE.Mesh(stemGeometry, earbudMaterial);
          rightStem.position.set(0.3, -0.2, 0.25);
          cube.add(rightStem);

        } else if (productName.toLowerCase().includes('dock') || productName.toLowerCase().includes('charger')) {
          // Create charging dock
          const baseGeometry = new THREE.BoxGeometry(1.5, 1.0, 0.2);
          const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x333333, shininess: 100 });
          const base = new THREE.Mesh(baseGeometry, baseMaterial);
          base.position.set(0, 0, 0);
          cube.add(base);

          // Charging pads
          const padGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 32);
          const padMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a, emissive: 0x001100 });
          
          for (let i = 0; i < 3; i++) {
            const pad = new THREE.Mesh(padGeometry, padMaterial);
            pad.position.set(-0.4 + i * 0.4, 0, 0.15);
            cube.add(pad);
          }

          // Stand
          const standGeometry = new THREE.BoxGeometry(0.3, 0.8, 0.1);
          const standMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 });
          const stand = new THREE.Mesh(standGeometry, standMaterial);
          stand.position.set(0.6, 0, 0.4);
          cube.add(stand);

        } else {
          // Default tech accessory with better details
          const mainGeometry = new THREE.BoxGeometry(1.5, 1.0, 0.3);
          const mainMaterial = new THREE.MeshPhongMaterial({ color: 0x2a2a2a, shininess: 80 });
          const mainBody = new THREE.Mesh(mainGeometry, mainMaterial);
          
          // Add some detail elements
          const detailGeometry = new THREE.BoxGeometry(1.2, 0.8, 0.1);
          const detailMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a });
          const detail = new THREE.Mesh(detailGeometry, detailMaterial);
          detail.position.set(0, 0, 0.2);
          
          cube.add(mainBody);
          cube.add(detail);
        }
        
        cube.castShadow = true;
        scene.add(cube);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0x2563eb, 0.6, 100);
        pointLight.position.set(-10, -10, 10);
        scene.add(pointLight);

        // Ground plane for shadow
        const planeGeometry = new THREE.PlaneGeometry(10, 10);
        const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -2;
        plane.receiveShadow = true;
        scene.add(plane);

        setIsLoading(false);

        // Animation loop
        function animate() {
          animationFrameId = requestAnimationFrame(animate);
          
          if (cube) {
            cube.rotation.x = rotation.x;
            cube.rotation.y = rotation.y;
            cube.scale.setScalar(zoom);
          }
          
          camera.position.z = 5 / zoom;
          renderer.render(scene, camera);
        }
        animate();

      } catch (error) {
        console.error('Failed to load Three.js:', error);
        setIsLoading(false);
      }
    };

    initThreeJS();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [isOpen, productImage, rotation, zoom]);

  const handleRotate = () => {
    setRotation(prev => ({
      x: prev.x,
      y: prev.y + Math.PI / 4
    }));
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.buttons === 1) { // Left mouse button
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const deltaX = (e.clientX - rect.left - rect.width / 2) / 100;
      const deltaY = (e.clientY - rect.top - rect.height / 2) / 100;
      
      setRotation({
        x: deltaY,
        y: deltaX
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>3D Product View</span>
            <span className="text-sm font-normal text-slate-600">- {productName}</span>
          </DialogTitle>
          <DialogDescription>
            Interactive 3D model viewer for {productName}. Drag to rotate, use controls to zoom and interact with the product.
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <span className="text-slate-600">Loading 3D model...</span>
              </div>
            </div>
          )}
          
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className={`w-full h-96 rounded-lg border border-slate-200 cursor-grab active:cursor-grabbing ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onMouseMove={handleMouseMove}
            onMouseDown={(e) => e.preventDefault()}
          />
          
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleRotate}
              className="w-10 h-10 p-0"
            >
              <RotateCw className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleZoomIn}
              className="w-10 h-10 p-0"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleZoomOut}
              className="w-10 h-10 p-0"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="text-sm text-slate-600 text-center">
          <p>Drag to rotate • Use controls to zoom and rotate</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
