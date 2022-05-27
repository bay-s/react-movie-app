import React from 'react'
import { useParams } from 'react-router-dom'
import PeopleCard from './people-card'

function PeopleDetail(){
    const {id} = useParams()

    return(
      <PeopleCard id={id}/>

    )
}

export default PeopleDetail;