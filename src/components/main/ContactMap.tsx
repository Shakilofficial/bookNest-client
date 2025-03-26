/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

const ContactMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This is a placeholder for a real map implementation
    // In a real application, you would use a library like Google Maps, Mapbox, or Leaflet
    if (mapRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = mapRef.current.clientWidth;
      canvas.height = 400;
      mapRef.current.appendChild(canvas);

      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Draw a simple placeholder map
        ctx.fillStyle = "#e5e7eb";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw some roads
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 6;

        // Horizontal roads
        for (let i = 1; i < 5; i++) {
          ctx.beginPath();
          ctx.moveTo(0, i * 80);
          ctx.lineTo(canvas.width, i * 80);
          ctx.stroke();
        }

        // Vertical roads
        for (let i = 1; i < 8; i++) {
          ctx.beginPath();
          ctx.moveTo(i * 120, 0);
          ctx.lineTo(i * 120, canvas.height);
          ctx.stroke();
        }

        // Draw a marker for the store location
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Pin shadow
        ctx.beginPath();
        ctx.arc(centerX, centerY + 5, 10, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.fill();

        // Pin base
        ctx.beginPath();
        ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
        ctx.fillStyle = "#0ab218";
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 3;
        ctx.stroke();

        // Store name
        ctx.font = "bold 14px Arial";
        ctx.fillStyle = "#0ab218";
        ctx.textAlign = "center";
        ctx.fillText("BookNest", centerX, centerY - 30);
      }
    }

    return () => {
      if (mapRef.current) {
        while (mapRef.current.firstChild) {
          mapRef.current.removeChild(mapRef.current.firstChild);
        }
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] bg-muted">
      <div ref={mapRef} className="w-full h-full"></div>
      <div className="absolute bottom-4 right-4 bg-background p-3 rounded-md shadow-md">
        <p className="text-sm font-medium">BookNest </p>
        <p className="text-xs text-muted-foreground">Delduar, Tangail</p>
        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary hover:underline mt-1 inline-block"
        >
          Get Directions
        </a>
      </div>
    </div>
  );
};

export default ContactMap;
