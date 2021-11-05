
import './App.css';
import {useEffect, useState} from "react";

function App() {

  const [num, setNum] = useState("1");
  const [favorite, setFavorite] = useState([]);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const [callApi, setCallApi] = useState(false);
  const [simpson, setSimpson] = useState([]);
    
    useEffect( () => {
      const getSimpson = async() => {
        const response = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=${num}`);
        const simpsonsArray = await response.json();
        console.log("simpsonsArray", simpsonsArray[0]);
        console.log("simpson", simpson);
        setSimpson(simpsonsArray);
        setCallApi(false);
      };
      callApi && getSimpson();
    }, [callApi]);

    useEffect( () => {

    })

  const handleNext = ( number) => {
    //var card = document.getElementById("1");
    console.log("num", number);
    setNum( number)
    setCallApi(true)
  }

  const handleAddFavorites = ( imagesimp, namesimp, textsimp) => {
    setImage(imagesimp);
    setName(namesimp);
    setText(textsimp);

    console.log("image", image);
    console.log("name", name);
    console.log("text", text);
  }

  return (
    <div>
      <h1>  Ejercicio Simpsons</h1>
      <br/>
      <input type="number" name="num" id="num"/>
      <button onClick={() => handleNext (document.getElementById("num"))} > Next </button>
        <div className="random">
        
          {
            simpson.map( (simp) => (
              <div className="card-content" id="1">
                <div>
                  <img src= {simpson[0].image} className="card" />
                  </div>
                <div>
                  <h3> {simpson[0].character} </h3>
                  <p> {simpson[0].quote} </p>  
                  <button onClick={ () => handleAddFavorites (simpson.image, simpson.character, simpson.quote)} >Favoritos</button>
                </div>
              </div>
              
            ))
          }
        </div>
      <h2>Favoritos</h2>
      {
        favorite.map( (favorit) => (
          <div className="card-content" id="1">
            <div>
              <img src= {simpson[0].image} className="card" />
            </div>
            <div>
              <h3> {simpson[0].character} </h3>
              <p> {simpson[0].quote} </p>  
              <button onClick={handleAddFavorites} >Favoritos</button>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default App;
