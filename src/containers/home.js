import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";

import axios from "axios";

function Home() {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [status, setStatus] = useState(null);
  const token = "1785ce5f17b42cf981e448dd3c07b4c5";
  const [selectedCountry, setSelectedCountry] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        position => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };
  let [responseData, setResponseData] = useState("");

  useEffect(() => {
    getLocation();
  }, []);
  console.log("esto es donde se hace el fetch", lat, lng);

  const fetchData = (updated1, updated2) => {
    axios({
      method: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather?",
      params: {
        lon: updated1,
        lat: updated2,
        appid: token,
      },
    })
      .then(response => {
        setResponseData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    console.log("a ver si llega", updated1, updated2);
  };

  useEffect(() => {
    if (lat != "" && lng != "") {
      var updated1 = lat;
      var updated2 = lng;
      //setLng(lng);
      fetchData(updated1, updated2);
    }
  }, [lat, lng]);

  const handleChange = event => {
    var selectedCountry = event.target.value;
    //setCountry(event.target.value);
    switch (selectedCountry) {
      case 1:
        setLat("-34.61315");
        setLng("-58.37723");
        setSelectedCountry("Argentina");
        break;
      case 2:
        setLat("-15.7801");
        setLng("-47.9292");
        setSelectedCountry("Brasil");
        break;
      case 3:
        setLat("-34.8833");
        setLng("-56.1667");
        setSelectedCountry("Uruguay");
        break;
      case 4:
        setLat("-9.189967");
        setLng("-75.015152");
        setSelectedCountry("Perú");
        break;
      case 5:
        setLat("-70.6482700");
        setLng("-33.4569400");
        setSelectedCountry("Chile");
        break;
      //default:
      //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
      //break;
    }
    console.log("averr", selectedCountry);
  };
  console.log("la data final", responseData);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <div>
          <Typography variant="h2" fontSize="24">
            Bienvenido a AppClima
          </Typography>
          <Typography variant="h3">
            Esta información es en base a su ubicación.
          </Typography>
          <button onClick={getLocation}>Get Location</button>
          <h1>Coordenadas de su ubicación</h1>
          <p>{status}</p>

          {lat && <p>Latitude: {lat}</p>}
          {lng && <p>Longitude: {lng}</p>}

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">
              Seleccione su ubicación
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={""}
              label="Select"
              onChange={handleChange}
            >
              <MenuItem value={1}>Argentina</MenuItem>
              <MenuItem value={2}>Brasil</MenuItem>
              <MenuItem value={3}>Uruguay</MenuItem>
              <MenuItem value={4}>Perú</MenuItem>
              <MenuItem value={5}>Chile</MenuItem>
            </Select>
          </FormControl>
          {selectedCountry ? (
            <Typography> País seleccionado: {selectedCountry}</Typography>
          ) : null}
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              {responseData ? (
                <div className="card card-body mt-2 animated fadeInUp">
                  {responseData.main.temp && (
                    <p>
                      <i className="fas fa-temperature-low"></i> Temperatura:
                      {responseData.main.temp} ℃
                    </p>
                  )}
                  {responseData.weather[0].description && (
                    <p>
                      <i className="fas fa-temperature-low"></i> Descripción:
                      {responseData.weather[0].description}
                    </p>
                  )}
                  {responseData.main.humidity && (
                    <p>
                      <i className="fas fa-water"></i> Humedad:
                      {responseData.main.humidity}
                    </p>
                  )}
                  {responseData.main.wind_speed && (
                    <p>
                      <i className="fas fa-wind"></i> Velocidad del viento:
                      {responseData.main.wind_speed}
                    </p>
                  )}
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </Box>
    </>
  );
}
export default Home;
