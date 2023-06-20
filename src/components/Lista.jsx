import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardGroup, Card } from 'react-bootstrap';
import '../index.css';

const Lista = () => {
  const [coordinates, setCoordinates] = useState([]);

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
    <CardGroup>
      {coordinates.map((coord) => (
        <Card key={coord.id}>
          <div className="card-img-container">
            <Card.Img variant="top" src={coord.foto} alt="Foto de la incidencia" className="centered-img" />
          </div>
          <Card.Body>
            <Card.Title>{coord.incidencia}</Card.Title>
            <Card.Text>{coord.descripcion}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Informante: {coord.nombres}</small>
            <br />
            <small className="text-muted">Coordenadas: {coord.latitude}, {coord.longitude}</small>
          </Card.Footer>
        </Card>
      ))}
    </CardGroup>
  );
};

export default Lista;
