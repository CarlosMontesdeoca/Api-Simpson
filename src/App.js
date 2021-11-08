import "./App.css";
import { useEffect, useState } from "react";
import faker from "faker";

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
    <div>
      <h1> Ejercicio Simpsons</h1>
      <br />
      <input
        type="text"
        name="edit"
        id="edit"
        onChange={(e) => setAux(e.target.value)}
      />
      <button onClick={() => handleNext()}>
        {" "}
        Next{" "}
      </button>
      <div className="random">
        {simpson.map((simp, index) => (
          <div key={simp.quote} className="card-content" id="1">
            <div>
              <img src={simp.image} className="card" alt="photo" />
            </div>
            <div>
              <h3> {simp.character} </h3>
              <p> {simp.quote} </p>
              <button 
                onClick={() => handleAddFavorites(simp)}
              >
                Favoritos
              </button>
            </div>
          </div>
        ))}
      </div>
      <h2>Favoritos</h2>
      {favorites.map((favorit, index) => (
        <div key={index} className="card-content random" id="1">
          <div>
            <img src={favorit.image} className="card" alt="photo" />
          </div>
          <div>
            <h3> {favorit.character} </h3>
            <p> {favorit.quote} </p>
            <button onClick={() => handleEdit(favorit.id, aux)}>Edit</button>
            <button onClick={() => handleDelete(favorit.id)}>Delet</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;