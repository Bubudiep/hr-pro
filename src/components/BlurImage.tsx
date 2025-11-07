import { useState } from "react";
const BlurImage = ({
  src,
  alt = "",
  className,
}: {
  src: string;
  alt?: string | null;
  className?: string | null;
}) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative flex overflow-hidden rounded-md aspect-2/1">
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      )}
      <img
        src={src}
        alt={alt || ""}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`transition-all duration-700 ease-in-out 
          ${loaded ? "opacity-100 blur-0" : "opacity-40 blur-sm"} 
          ${className}`}
      />
    </div>
  );
};

export default BlurImage;
