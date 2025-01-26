import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, X, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { tourSteps } from './TourSteps';

interface OnboardingTourProps {
  onComplete?: () => void;
  run: boolean;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ onComplete, run }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [elementPosition, setElementPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [isReady, setIsReady] = useState(false);
  
  const step = tourSteps[currentStep];

  useEffect(() => {
    if (!run) return;
    
    const updatePosition = () => {
      const element = document.querySelector(step.target);
      if (element) {
        const rect = element.getBoundingClientRect();
        setElementPosition({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height
        });
        if (!isReady) setIsReady(true);
      }
    };

    updatePosition();
    const observer = new ResizeObserver(updatePosition);
    const element = document.querySelector(step.target);
    if (element) observer.observe(element);
    
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [currentStep, step.target, run, isReady]);

  const handleNext = () => {
    if (currentStep === tourSteps.length - 1) {
      handleComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleComplete = () => {
    localStorage.setItem('harSettTur', 'true');
    onComplete?.();
  };

  if (!run || !isReady) return null;

  const getTooltipPosition = () => {
    const margin = 16;
    const tooltipWidth = 360;
    const tooltipHeight = 180;

    let top = elementPosition.top;
    let left = elementPosition.left;
    let arrowPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

    switch (step.placement) {
      case 'top':
        top = elementPosition.top - tooltipHeight - margin;
        left = elementPosition.left + (elementPosition.width - tooltipWidth) / 2;
        arrowPosition = 'bottom';
        break;
      case 'bottom':
        top = elementPosition.top + elementPosition.height + margin;
        left = elementPosition.left + (elementPosition.width - tooltipWidth) / 2;
        arrowPosition = 'top';
        break;
      case 'left':
        top = elementPosition.top + (elementPosition.height - tooltipHeight) / 2;
        left = elementPosition.left - tooltipWidth - margin;
        arrowPosition = 'right';
        break;
      case 'right':
        top = elementPosition.top + (elementPosition.height - tooltipHeight) / 2;
        left = elementPosition.left + elementPosition.width + margin;
        arrowPosition = 'left';
        break;
    }

    // Ensure tooltip stays within viewport
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    left = Math.max(margin, Math.min(left, viewport.width - tooltipWidth - margin));
    top = Math.max(margin, Math.min(top, viewport.height - tooltipHeight - margin));

    return { top, left, arrowPosition };
  };

  const { top, left, arrowPosition } = getTooltipPosition();

  return (
    <div className="fixed inset-0 z-[1000000] pointer-events-none">
      {/* Backdrop with blur effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-auto"
      />

      {/* Spotlight with gradient border */}
      <motion.div
        initial={false}
        animate={{
          clipPath: `circle(${elementPosition.width + 16}px at ${
            elementPosition.left + elementPosition.width / 2
          }px ${elementPosition.top + elementPosition.height / 2}px)`
        }}
        transition={{ type: "spring", bounce: 0, duration: 0.6 }}
        className="absolute inset-0 bg-black/50"
        style={{ clipPath: 'circle(0px at 0px 0px)' }}
      />

      {/* Target highlight with gradient border */}
      <motion.div
        initial={false}
        animate={{
          top: elementPosition.top - 8,
          left: elementPosition.left - 8,
          width: elementPosition.width + 16,
          height: elementPosition.height + 16
        }}
        className="absolute rounded-xl pointer-events-auto"
        style={{
          background: 'linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.2), 0 4px 20px rgba(0,0,0,0.3)'
        }}
      />

      {/* Tooltip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          style={{
            top,
            left,
            width: 360
          }}
          className={cn(
            "absolute bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6",
            "border border-white/20",
            "pointer-events-auto"
          )}
        >
          {/* Progress bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 rounded-t-2xl overflow-hidden">
            <motion.div
              className="h-full bg-[#003057]"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 -mr-2 -mt-2 hover:bg-gray-100/50"
              onClick={handleComplete}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">{step.content}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleComplete}
                className="text-gray-500 hover:text-gray-900"
              >
                Hopp over
              </Button>
              
              {/* Step indicators */}
              <div className="flex items-center gap-1.5">
                {tourSteps.map((_, index) => (
                  <Circle
                    key={index}
                    className={cn(
                      "h-2 w-2 fill-current",
                      index === currentStep
                        ? "text-[#003057]"
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrev}
                  className="h-8 w-8 hover:bg-gray-100/50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}
              <Button
                size="sm"
                onClick={handleNext}
                className="bg-[#003057] hover:bg-[#002543] text-white min-w-[100px]"
              >
                {currentStep === tourSteps.length - 1 ? (
                  'Fullfør'
                ) : (
                  <>
                    Neste
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Arrow */}
          <div
            className={cn(
              "absolute w-4 h-4 bg-white/95 rotate-45 border",
              "border-white/20",
              arrowPosition === 'top' && "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
              arrowPosition === 'bottom' && "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
              arrowPosition === 'left' && "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
              arrowPosition === 'right' && "right-0 top-1/2 translate-x-1/2 -translate-y-1/2"
            )}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};