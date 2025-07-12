import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ZoomIn, X, Move, ZoomOut, RotateCcw } from 'lucide-react';

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
  showIndicator?: boolean;
}

const ImageZoom: React.FC<ImageZoomProps> = ({ src, alt, className = '', showIndicator = true }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(2);
  
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Smooth mouse tracking for zoom
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate normalized position (-1 to 1)
    const normalizedX = (x - centerX) / centerX;
    const normalizedY = (y - centerY) / centerY;

    // Apply smooth movement with easing
    setMousePosition({ 
      x: normalizedX * 25, 
      y: normalizedY * 25 
    });
  }, [isZoomed]);

  // Mouse wheel zoom handling
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    e.preventDefault();
    
    const delta = e.deltaY > 0 ? -0.5 : 0.5;
    setZoomLevel(prev => {
      const newLevel = prev + delta;
      return Math.max(1, Math.min(5, newLevel));
    });
  }, [isZoomed]);

  // Mouse drag handling for modal
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
  }, [isZoomed, dragOffset]);

  const handleMouseMoveModal = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    setDragOffset({ x: newX, y: newY });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleToggleZoom = useCallback(() => {
    if (isZoomed) {
      setIsZoomed(false);
      setMousePosition({ x: 0, y: 0 });
      setDragOffset({ x: 0, y: 0 });
      setZoomLevel(2); // Reset zoom level
    } else {
      setIsZoomed(true);
      setMousePosition({ x: 0, y: 0 });
      setDragOffset({ x: 0, y: 0 });
    }
  }, [isZoomed]);

  const handleZoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 0.5, 5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoomLevel(2);
    setDragOffset({ x: 0, y: 0 });
  }, []);

  // Keyboard and click outside handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZoomed) {
        setIsZoomed(false);
        setMousePosition({ x: 0, y: 0 });
        setDragOffset({ x: 0, y: 0 });
        setZoomLevel(2);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (isZoomed && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsZoomed(false);
        setMousePosition({ x: 0, y: 0 });
        setDragOffset({ x: 0, y: 0 });
        setZoomLevel(2);
      }
    };

    // Prevent body scroll when modal is open
    if (isZoomed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMoveModal as any);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMoveModal as any);
      document.body.style.overflow = 'unset';
    };
  }, [isZoomed, handleMouseUp, handleMouseMoveModal]);

  return (
    <div className="relative">
      {/* Zoom Controls */}
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={handleToggleZoom}
          className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
          title={isZoomed ? "Zoom'u Kapat" : "Zoom'u Aç"}
        >
          {isZoomed ? <X className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
        </button>
      </div>

      {/* Zoom Indicator */}
      {!isZoomed && showIndicator && (
        <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs z-10 backdrop-blur-sm">
          <ZoomIn className="h-3 w-3 inline mr-1" />
          Yakınlaştır
        </div>
      )}

      {/* Image Container */}
      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-lg cursor-zoom-in ${className} ${
          isZoomed ? 'cursor-zoom-out' : ''
        }`}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
        onClick={handleToggleZoom}
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-all duration-500 ease-out"
          style={{
            transform: isZoomed 
              ? `scale(${zoomLevel}) translate(${mousePosition.x}px, ${mousePosition.y}px)` 
              : 'scale(1)',
            cursor: isZoomed ? 'zoom-out' : 'zoom-in'
          }}
        />
      </div>

      {/* Full Screen Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsZoomed(false);
              setMousePosition({ x: 0, y: 0 });
              setDragOffset({ x: 0, y: 0 });
              setZoomLevel(2);
            }
          }}
        >
          <div 
            ref={modalRef}
            className="relative max-w-6xl max-h-full w-full h-full flex items-center justify-center"
          >
            {/* Close Button */}
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={() => {
                  setIsZoomed(false);
                  setMousePosition({ x: 0, y: 0 });
                  setDragOffset({ x: 0, y: 0 });
                  setZoomLevel(2);
                }}
                className="p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                title="Kapat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="absolute top-4 left-4 z-20 flex space-x-2">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="p-2 bg-white/90 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                title="Uzaklaştır"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 5}
                className="p-2 bg-white/90 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                title="Yakınlaştır"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                title="Sıfırla"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
            
            {/* Image Container */}
            <div
              className="relative overflow-hidden rounded-lg max-w-full max-h-full"
              onMouseDown={handleMouseDown}
              onWheel={handleWheel}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              <img
                src={src}
                alt={alt}
                className="max-w-full max-h-[90vh] object-contain transition-transform duration-300 ease-out"
                style={{
                  transform: `scale(${zoomLevel}) translate(${dragOffset.x}px, ${dragOffset.y}px)`,
                  cursor: isDragging ? 'grabbing' : 'grab'
                }}
                draggable={false}
              />
            </div>

            {/* Instructions */}
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <Move className="h-4 w-4" />
                <span>Fare ile sürükleyin • Fare tekerleği ile zoom • Dışarı tıklayarak çıkın</span>
              </div>
            </div>

            {/* Zoom Level Indicator */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <ZoomIn className="h-4 w-4" />
                <span>{zoomLevel.toFixed(1)}x Zoom</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageZoom; 