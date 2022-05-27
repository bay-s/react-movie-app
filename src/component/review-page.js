import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Review from './review';

function ReviewPage() {

    const{ id }= useParams();
            return(
          <>
                <Review key={id} id={id} />
          </>
            )
}

export default ReviewPage;



