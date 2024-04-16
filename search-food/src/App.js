import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [food, setfoods] = useState("")

  const [container, setContainer] = useState([])

  const [endPoint, setEndPoint] = useState("")


  useEffect(() => {
    getFoods();
  }, [endPoint])
 
  const getFoods = async () => {
  const url = `https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser?nutrition-type=cooking&category%5B0%5D=generic-foods&health%5B0%5D=+${food}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '34a177613dmsh186bfd968ef1dd4p1434aajsnd655501d603d',
		'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	// const result = await response.text();
	// console.log(result);
  const data = await response.json();
  setContainer(data.hints)
} catch (error) {
	console.error(error);
}
  
}

const handleChange = (event) => {
  setfoods(event.target.value)
  // console.log(event.target.value)
}

const handleSubmit = (event) => {
  event.preventDefault();
  setEndPoint();
}

  return (
    <div className="App">
        <form onSubmit={handleSubmit}>
          <input placeholder='Search food' type='text' value={food} onChange={handleChange}/>
          <button type='submit'>Search</button>
        </form>

        {container.map((item) => (
          <div>
            <p>{item.food.label}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
