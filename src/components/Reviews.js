import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "./ReviewForm";

const Reviews = ({getMovieData, movie, reviews, setReviews}) => {

    const revText = useRef();
    const [loading, setLoading] = useState(true);
    const[error, setError] = useState(false);
    const params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, []); 

    const addReview = async (e) => {
        e.preventDefault();

        const rev = revText.current;
        try{
            const response = await fetch('http://localhost:8080/api/v1/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({reviewBody: rev.value, imdbId: movieId }),
            });
            if(!response.ok){
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const updatedReviews = [...reviews, {body:rev.value}];
            rev.value = '';
            setReviews(updatedReviews);
        }catch (err){
            console.log(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    if(loading) {
        return <div>Loading...</div>;
    }
    if(error) {
        return <div>There was an error loading the reviews.</div>
    }

    return (
        <Container>
          <Row>
            <Col>
              <h3>Reviews</h3>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <img src={movie?.poster} alt="" />
            </Col>
            <Col>
              <>
                <Row>
                  <Col>
                    <ReviewForm
                      handleSubmit={addReview}
                      revText={revText}
                      labelText="Write a Review?"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
              </>
              {reviews?.map((r, i) => (
                <div key={i}>
                  <Row>
                    <Col>{r.body}</Col>
                  </Row>
                  <Row>
                    <Col>
                      <hr />
                    </Col>
                  </Row>
                </div>
              ))}
            </Col>
          </Row>
          <Row>
            <Col>
              <hr />
            </Col>
          </Row>
        </Container>
      );
    };
    
    export default Reviews;