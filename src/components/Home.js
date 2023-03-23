import {useState, useEffect} from 'react';
import React from "react";
import { Switch, useNavigate, Link } from 'react-router-dom';
import './Home.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';

//Include hero element in part of code which returns JSX code from the home component
//Ensure movies array is being passed down from app component to home component and to hero component
const Home = () => {

  const navigate = useNavigate();

  function reviews(movieId) 
  {
    navigate(`/Reviews/${movieId}`);
  }

//Creating a destructured array - first item movies and will store array of movie data returned from a call to relevant api endpoint
  //Second item - function to change state of movies variable - when state of variable tracked by react through use state hook - component
  // is re rendered 
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  //useEffect hook used so fetch happens when app component first loads
  //fetch is going to return a response to us (object) - this is converted to JSON to get the data from within the body as it is not accessible directly from the response object
  //fetch is promised based - which means we can use async await or .then and .catch with it
  //res.json returns another promise which is our actual data
  //Only time you get a failure is with fecth itself and not the api you're calling - can add if statements inside res (after arrow) to check if it's ok
  //Can use options section of fetch to pass in what HTTP method you are using (GET, POST, PUT)
  //For POST then need to pass the data inside the body
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/movies', {
       method: 'GET'
       /* For a POST method - need coma after the method line - need to send the data in json
       Also need to set the header and tell fetch that you are passing JSON
       headers: {
        'Content-Type': 'application/json'
       },
        body: JSON.stringify({
          name: 'User 1'
       })
       */
    })
      //If using POST need to return res.json() after the arrow in res .then statement
      .then(res => res.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(error => console.log(error));
 }, []);


 //JSX code returned from out component
 //Route mappings 
  return (
    <div className='movie-carousel-container'>
        <Carousel>
            {loading ? (
                <p>Loading movies...</p>
            ) : movies.length > 0 ? (
                movies.map(movie => (
                  <div className='movie-card-container'>
                    <div className="movie-card" style={{"--img": `url(${movie.backdrops[0]})`}}>
                      <div className="movie-detail">
                          <div className="movie-poster">
                            <img src={movie.poster} alt={movie.title} />
                          </div>
                          <div className="movie-title">
                            <h4>{movie.title}</h4>
                          </div>
                          <div className="movie-buttons-container">
                            <Link to={movie.trailerLink} target="_blank">
                              <div className="play-button-icon-container">
                                <FontAwesomeIcon className="play-button-icon" icon={faCirclePlay}/>
                              </div>
                            </Link>
                            <div className='movie-review-button-container'>
                              <Button variant="info" onClick={() => reviews(movie.imdbId)} >Reviews</Button>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
                <p>No movies found.</p>
            )}
        </Carousel>
    </div>
   );
  }

  
export default Home