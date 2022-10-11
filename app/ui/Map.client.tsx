import type { LatLngTuple } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import AntPath from "./AntPath.client";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export function Map({ paths }) {
  const position = paths;

  const antPathOptions = {
    delay: 400,
    dashArray: [10, 20],
    weight: 5,
    color: "#0000FF",
    pulseColor: "#FFFFFF",
    paused: false,
    reverse: false,
    hardwareAccelerated: true,
  };

  return (
    <MapContainer
      center={paths[0]}
      zoom={4}
      scrollWheelZoom={false}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <AntPath positions={position} options={antPathOptions} />
    </MapContainer>
  );
}
