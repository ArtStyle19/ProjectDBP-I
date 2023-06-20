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
    if (position.length > 0) {
      fetchCoordinatesFromDatabase()
        .then((data) => {
          setCoordinates(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error al obtener las coordenadas:', error);
          setIsLoading(false);
        });
    }
  }, [position]);

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

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (position.length === 0) {
    return <div>Obteniendo ubicación...</div>;
  }

  return (
    <MapContainer center={[position[0], position[1]]} zoom={8} style={{ height: '100vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {coordinates.map((coord) => (
        <Marker key={coord.id} position={[coord.latitude, coord.longitude]}>
          <Popup className='request-popup'>
            <img src={`${coord.foto}`} className='card-img-top' />
            <div className='card-body'>
              <h5 className='card-title'>{coord.incidencia}</h5>
              <p className='card-text'>
                Informante: {coord.nombres}<br />
                Descripcion: {coord.descripcion} <br />
                Coordenadas: {coord.latitude}, ${coord.longitude}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapWithMarker;
