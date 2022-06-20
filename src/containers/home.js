import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";

import axios from "axios";

function Home() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const token = "1785ce5f17b42cf981e448dd3c07b4c5";

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
  const fetchData = React.useCallback(() => {
    axios({
      method: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather?",
      params: {
        lon: lng,
        lat: lat,
        appid: token,
      },
    })
      .then(response => {
        setResponseData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (lat && lng) {
      fetchData();
    }
  }, []);
  const [country, setCountry] = useState("");

  const handleChange = event => {
    setCountry(event.target.value);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <div
          style={{
            backgroundImage: `url("https://media.istockphoto.com/photos/blue-textured-background-picture-id1169630303?k=20&m=1169630303&s=612x612&w=0&h=Y7t-JqwJ69HP4L1lCu7dUAa0GV6GafQosWto7BrT_mc=")`,
          }}
        >
          <button onClick={getLocation}>Get Location</button>
          <h1>Coordinates</h1>
          <p>{status}</p>
          {lat && <p>Latitude: {lat}</p>}
          {lng && <p>Longitude: {lng}</p>}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Seleccione su ubicación
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={"age"}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Argentina</MenuItem>
              <MenuItem value={20}>Brasil</MenuItem>
              <MenuItem value={30}>Uruguay</MenuItem>
              <MenuItem value={20}>Perú</MenuItem>
              <MenuItem value={30}>Chile</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Box>
    </>
  );
}
export default Home;
