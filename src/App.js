import "./App.css";
import { useEffect, useState } from "react";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

function App() {
  const [num, setNum] = useState(1);
  const [aux, setAux] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [simpson, setSimpson] = useState([]);

  const getSimpson = async () => {
    const response = await fetch(
      `https://thesimpsonsquoteapi.glitch.me/quotes`
    );
    const simpsonsArray = await response.json();
    //console.log("simpson", simpson);
    setSimpson(simpsonsArray);
  };
  useEffect(() => {
    getSimpson();
  }, []);

  const handleNext = () => {
    getSimpson();
    //console.log("simpson: ", simpson[0]);
  };

  const handleAddFavorites = (favorit) => {
    const newSimpson = {
      image: simpson[0].image,
      character: simpson[0].character,
      quote: simpson[0].quote,
      id: num
    }
    console.log("nuevo", newSimpson);
    setFavorites([...favorites, newSimpson]);
    setNum(num + 1);
    getSimpson();
  };

  const handleDelete = (index) => {
    const newSimpsons = favorites.filter((favorite) => favorite.id !== index);
    setFavorites(newSimpsons);
    //console.log("elemento", index);
    //console.log("favoritos", favorites);
  };

  const handleEdit = (index, newText) => {
    const newSimpsons = favorites.map((favorite) => {

      if (favorite.id === index && newText != "") {
        console.log("nuevo", newText);
        
        return {
          ...favorite,
          quote: newText,
        }
      }
      return favorite
    });

    setFavorites(newSimpsons);
  };

  return (
    <div className="container">
      <div className="box-container">
       <div className="title"><h1> Ejercicio Simpsons</h1></div>
      <br />
      <Button onClick={() => handleNext()} variant="contained" disableElevation>
        {" "}
        Next{" "}
      </Button>
      <div className="random">
        {simpson.map((simp, index) => (
          <div key={simp.quote} className="card-content" id="1">
            <Card sx={{ display: 'flex' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    {simp.character}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    {simp.quote} 
                  </Typography>
                </CardContent>
                <Button variant="contained" onClick={() => handleAddFavorites(simp)}>
                  Add
                </Button>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={simp.image}
                alt="Live from space album cover"
              />
            </Card>
          </div>
        ))}
      </div>
      <h2>Favoritos</h2>
      <TextField 
        id="outlined-basic" 
        label="New Text" 
        variant="filled"
        onChange={(e) => setAux(e.target.value)} 
      />
      {favorites.map((favorit, index) => (
        <div key={index} className="card-content random" id="1">
          <Card sx={{ display: 'flex' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    {favorit.character}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    {favorit.quote} 
                  </Typography>
                </CardContent>
                <Stack direction="row" spacing={2}>
                  <Button variant="outlined" onClick={() => handleDelete(favorit.id)}>
                    Delete
                  </Button>
                  <Button variant="contained" onClick={() => handleEdit(favorit.id, aux)}>
                    Edit
                  </Button>
                </Stack>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={favorit.image}
                alt="Live from space album cover"
              />
            </Card>
        </div>
      ))}
      </div>
    </div>
  );
}

export default App;