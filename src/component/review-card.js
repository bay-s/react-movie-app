import React  from "react";
import akun from '../akun.png'

function ReviewCard(props){

    const img = `https://image.tmdb.org/t/p/w185/${props.data.author_details.avatar_path}`;
    return(
              <div className="review-card">
                <div className="profil">
                  <img src={props.data.author_details.avatar_path ? img : akun} />
                  <div className="profil-info">
                    <div className="author">
                        <h3 className="review-title">Review by {props.data.author_details.username} </h3>
                        <p className="datez">Written by {props.data.author_details.username} {props.data.created_at}</p>
                    </div>
                    {/* <p className={props.data.length < 2 ? "parafs" : "paraf"}>{props.data.content}</p> */}
                    <p className="paraf">{props.data.content}</p> 
                  </div>
                </div>
              </div>
    )
}

export default ReviewCard;