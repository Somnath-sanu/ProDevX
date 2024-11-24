import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageZoom({ src, alt, className }: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <div className={`relative ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain py-4 cursor-zoom-in overflow-hidden"
          onClick={() => setIsZoomed(true)}
          style={{ cursor: "zoom-in" }}
        />
      </div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed cursor-zoom-in inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
            style={{ cursor: "zoom-out" }}
          >
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(false);
              }}
              className="absolute right-4 top-4 z-[101] rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="relative w-[95vw] h-[95vh] max-w-[1900px] max-h-[1000px]"
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain overflow-hidden"
                quality={100}
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
