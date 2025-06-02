import { useRef, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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

        // Create a simple product representation
        const geometry = new THREE.BoxGeometry(2, 2, 0.5);
        
        // Load texture from product image
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(productImage);
        
        const material = new THREE.MeshLambertMaterial({ 
          map: texture,
          transparent: true,
          opacity: 0.9
        });
        
        cube = new THREE.Mesh(geometry, material);
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
