import React from "react";
import ReviewCard from "./review-card";

class Review extends React.Component{
    constructor() {
        super();
        this.state = {
          review: []
        };
      }
    
      async componentDidMount() {

        const review = await fetch(
          `https://api.themoviedb.org/3/movie/${this.props.id}/reviews?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
        );
    
        const revs = await review.json();
        const revResults = revs.results;
        if (revs) {
          this.setState({review:this.state.review = revResults})
        }
      }
    
      render(){
          return(
      <div className="reviews-container">


 <div className="reviews-inner">
 {this.state.review.map((rev) => {

        const img = `https://image.tmdb.org/t/p/w185/${rev.author_details.avatar_path}`;
        return <ReviewCard img={img} data={rev} />
       })}
 </div>
      </div>
          )
      }
}

export default Review;