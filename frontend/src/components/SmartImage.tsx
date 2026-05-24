import { useState } from "react";

interface Props extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string | null | undefined;
  alt: string;
  ratio?: "video" | "square" | "portrait";
}

export function SmartImage({ src, alt, ratio = "video", className = "", ...rest }: Props) {
  const [failed, setFailed] = useState(false);
  const aspect =
    ratio === "square" ? "aspect-square" : ratio === "portrait" ? "aspect-[3/4]" : "aspect-video";

  if (!src || failed) {
    return (
      <div
        className={`${aspect} w-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center text-muted-foreground text-xs uppercase tracking-widest ${className}`}
      >
        {alt || "No image"}
      </div>
    );
  }
  return (
    <div className={`${aspect} w-full overflow-hidden bg-muted ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        {...rest}
      />
    </div>
  );
}
