import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Recipe from './Recipe';

const App = () => {
 const APP_ID= "ac1e129f";
 const APP_KEY = "b84b16bdf763bfa77126bbe2e09af05e	";
 
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query,setQuery] = useState('burger');

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
