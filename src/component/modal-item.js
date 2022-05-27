import React from 'react'

function ModalItem(props){

    return(
   <div className='image-wrap'>
            <img src={props.image} alt="test" />
      
<div  className="tombol-top">
<a href="#"  className="close"></a>  
            </div>
   </div>
    )
}


export default ModalItem;