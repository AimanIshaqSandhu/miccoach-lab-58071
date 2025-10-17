import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageLightboxProps {
  images: { id: string; image_url: string; title?: string | null }[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const ImageLightbox = ({ images, currentIndex, onClose, onNavigate }: ImageLightboxProps) => {
  const [zoom, setZoom] = useState(1);

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    onNavigate(newIndex);
    setZoom(1);
  };

  const handleNext = () => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    onNavigate(newIndex);
    setZoom(1);
  };

  const handleZoomIn = () => setZoom(Math.min(zoom + 0.5, 3));
  const handleZoomOut = () => setZoom(Math.max(zoom - 0.5, 1));

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm animate-fade-in">
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white hover:bg-white/10"
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Zoom Controls */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleZoomOut}
          disabled={zoom <= 1}
          className="text-white hover:bg-white/10"
        >
          <ZoomOut className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleZoomIn}
          disabled={zoom >= 3}
          className="text-white hover:bg-white/10"
        >
          <ZoomIn className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 h-12 w-12"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 h-12 w-12"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Image Container */}
      <div className="flex items-center justify-center h-full p-20">
        <div className="relative max-w-7xl max-h-full overflow-hidden">
          <img
            src={images[currentIndex].image_url}
            alt={images[currentIndex].title || "Gallery image"}
            className="max-w-full max-h-[80vh] object-contain transition-transform duration-300"
            style={{ transform: `scale(${zoom})` }}
          />
        </div>
      </div>

      {/* Image Info */}
      {images[currentIndex].title && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-6 py-3 rounded-lg">
          <p className="text-white text-lg font-medium">{images[currentIndex].title}</p>
          <p className="text-white/70 text-sm text-center mt-1">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  );
};
