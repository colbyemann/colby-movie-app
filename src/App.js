import React from 'react';
import './App.css';
import HeaderApp from './components/HeaderApp.js';
import Home from './components/Home.js';

import MovieBrowser from './components/MovieBrowser.js';
import { Route } from 'react-router-dom';
import Loader from './components/Loader.js';
import MovieDetials from './components/MovieDetails.js';
import CastDetials from './components/CastDetails.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movies: [], favorites: [], loading: false};
   }

   addFavClick = (e) => {
    let check = undefined;
    let tempArray = this.state.favorites;

    check = tempArray.find( ({ id }) => id === e.id );
    console.log(check)

    if (check === undefined)
    {tempArray.push(e);
      this.setState({favorites: tempArray})
    }}

    removeFav = (e) =>{
      let check = [];
      let tempArray = this.state.favorites;
      check = tempArray.filter(({ id }) => id != e)
      console.log(check)
      
        this.setState({favorites: check})
      

    }
   
    
    
   

   async componentDidMount() {
    this.setState({loading: true});
    try {
    const url = "https://www.randyconnolly.com/funwebdev/3rd/api/movie/movies-brief.php?id=ALL";
    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.sort(function(a, b){
      if(a.title < b.title) { return -1; }
      if(a.title > b.title) { return 1; }
      return 0;
  })
    this.setState( {movies: jsonData, loading: false} );
    }
    catch (error) {
    console.error(error);
    }
   }

   

  

  render() {
    const loading = this.state.loading;
    
  return (
  <main>
  <HeaderApp />
  
  {loading ? (<Loader />) :<Route path='/' exact render={(props) => <Home {...props} movies={this.state.movies}/>} />}
  <Route path='/home' exact render={(props) => <Home {...props} movies={this.state.movies}/>}/>
 
  <Route path='/MovieDetails' exact render={(props) => <MovieDetials {...props} fav={this.addFavClick} remove={this.removeFav} key={Math.random()}/>}/>
  <Route path='/CastDetails' exact render={(props) => <CastDetials {...props} remove={this.removeFav} key={Math.random()}/>}/>

  {loading ? (<Loader />) :<Route path='/browse' exact render={ (props) =>
  <MovieBrowser {...props} movies={this.state.movies} loading={this.state.loading} favorites={this.state.favorites} fav={this.addFavClick} remove={this.removeFav}/>
  }/>}
  </main>
  );
  }
 }

export default App;
