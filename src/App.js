import './App.css';
import Home from './components/Home';
import React from "react";
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Trailer from './components/Trailer';
import Reviews from './components/Reviews';
import { useState } from 'react';

//Should use async and await when get requests to stop user screen freezing for periods

function App() {
  
  const[movie, setMovie] = useState();
  const[reviews, setReviews] = useState([]);

  const getMovieData = async (movieId, setMovie, setReviews) => {
    try{
      const response = await fetch(`http://localhost:8080/api/v1/movies/${movieId}`);
      if(!response.ok){
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovie(data);
      setReviews(data.reviews);
    } catch(err){
      console.log(err);
    }
  }

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
        <Route path="/Reviews/:movieId" element ={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
