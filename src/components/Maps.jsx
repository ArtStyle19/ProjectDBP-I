import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const MapWithMarker = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [position, setPosition] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        setPosition([data.coords.latitude, data.coords.longitude]);
      },
      (err) => console.error(err)
    );
  }, []);

  useEffect(() => {
    fetchCoordinatesFromDatabase()
      .then((data) => {
        setCoordinates(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener las coordenadas:', error);
        setIsLoading(false);
      });
  }, []);

  const fetchCoordinatesFromDatabase = async () => {
    try {
      const response = await fetch('marker_incidencia.php');
      if (!response.ok) {
        throw new Error('Error al obtener las coordenadas desde la base de datos.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>Cargando...</div>
      ) : (
          coordinates.map((coord) => (
            <MapContainer center={[position[0],position[1]]} zoom={8} style={{ height: '100vh', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <Marker key={coord.id} position={[coord.latitude, coord.longitude]}>
                <Popup>
                  <img src={`${coord.foto}`} style={{ width: '200px', height: '200px' }} />
                  <br></br>
                  {`${coord.nombres} ha encontrado una indecencia!!!
                Titulo: ${coord.incidencia}
                Descripcion: ${coord.descripcion}
                Coordenadas: ${coord.latitude}, ${coord.longitude}`}
                </Popup>
              </Marker>
            </MapContainer>
          ))
      )}
    </div>
  );
};

export default MapWithMarker;
