import { useRef, useEffect, useState } from "react";
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const Incidencia = () => {
  const [position, setPosition] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        setPosition([data.coords.latitude, data.coords.longitude]);
      },
      (err) => console.error(err)
    );
  }, []);

  const [formData, setFormData] = useState({
    nombres: '',
    incidencia: '',
    descripcion: '',
    foto: '',
    latitude: '',
    longitude: '',
  });

  useEffect(() => {
    if (position.length === 2) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        latitude: position[0],
        longitude: position[1],
      }));
    }
  }, [position]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataWithFile = new FormData();

    formDataWithFile.append('nombres', formData.nombres);
    formDataWithFile.append('incidencia', formData.incidencia);
    formDataWithFile.append('descripcion', formData.descripcion);
    formDataWithFile.append('latitude', position[0]);
    formDataWithFile.append('longitude', position[1]);
    formDataWithFile.append('foto', e.target.foto.files[0]);

    // Envío de los datos del formulario al backend en PHP
    fetch('/save_incidencia.php', {
      method: 'POST',
      body: formDataWithFile,
    })
      .then((response) => {
        if (response.ok) {
          console.log('Incidencia enviada correctamente');
        } else {
          throw new Error('Error al enviar la incidencia');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1 className="label">Registrar Incidencia</h1>
      <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
        <div class="form-group">
          <label for="nombres" class="col-sm-3 control-label">Nombres</label>
          <div class="col-sm-9">
            <input type="text" name="nombres" placeholder='Ingrese su nombre' value={formData.nombres} className="form-control" onChange={handleChange} />
          </div>
        </div>
        <div class="form-group">
          <label for="incidencia" class="col-sm-3 control-label">Incidencia</label>
          <div class="col-sm-9">
            <input type="text" name="incidencia" placeholder='Incidencia' value={formData.incidencia} className="form-control" onChange={handleChange} />
          </div>
        </div>
        <div class="form-group">
          <label for="descripcion" class="col-sm-3 control-label">Descripcion</label>
          <div class="col-sm-9">
            <input type="text" name="descripcion" placeholder='Ingrese su nombre' value={formData.descripcion} className="form-control" onChange={handleChange} />
          </div>
        </div>
        <div class="form-group">
          <label for="foto" class="col-sm-3 control-label">Fotografia</label>
          <div class="col-sm-9">
            <input type="file" name="foto" accept="image/*" className="form-control" onChange={handleChange} />
          </div>
        </div>
        <br></br>
        <button type="submit" className="btn btn-primary btn-block">Subir Incidencia</button>
      </form>
    </div>
  );
};

export default Incidencia;
