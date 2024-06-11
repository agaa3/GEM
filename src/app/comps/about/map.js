import React, { useRef, useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const center = { lng: 21.012229, lat: 52.229676 };
  const [zoom] = useState(12);

  useEffect(() => {
    if (map.current) return;

    map.current = new L.Map(mapContainer.current, {
      center: L.latLng(center.lat, center.lng),
      zoom: zoom
    });

    const mtLayer = new MaptilerLayer({
      apiKey: "3kmJGwTUWe4F0ho4d9cT",
    }).addTo(map.current);

    // ikonka pinu nie dziala smh
    const gemMarker = L.marker([52.229676, 21.012229]).addTo(map.current);
    gemMarker.bindPopup("<b>GEM</b><br>ul. Ulicowa 123/45<br>00-000 Warszawa");

    gemMarker.on('click', function () {
      gemMarker.openPopup();
    });

  }, [center.lng, center.lat, zoom]);

  return (
    <div className="relative z-0" style={{ width: '80vw', height: '100vh' }}>
      <div ref={mapContainer} style={{ width: '50%', height: '50%' }} />
    </div>
  )
}

export default Map;
