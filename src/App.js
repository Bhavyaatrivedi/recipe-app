import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Recipe from './Recipe';

const App = () => {
  const APP_ID= "b4fc4322";
  const APP_KEY = "56118bed6cc1fa58991a05484344365b	";
 
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query,setQuery] = useState('chicken');

  useEffect (() => {
    getRecipes();
  }, [query]);
const getRecipes= async () => {
  const response = await fetch(`http://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  const data= await response.json();
  setRecipes(data.hits);
  console.log(data.hits);
}

const updateSearch = e =>{
    setSearch(e.target.value);
    
}

const getSearch =e => {
  e.preventDefault();
  setQuery(search);
  setSearch('');
}
  
  return (
    <div className="App">
      <form onSubmit ={getSearch} className='search-form'>
        <input className='search-bar' type='text' value={search} onChange={updateSearch}></input>
        <button  className='search-button' type='submit'>
          Search
        </button>
      </form>
      <div className='recipes'>
      {recipes.map(recipe => (
        <Recipe
        key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients= {recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
