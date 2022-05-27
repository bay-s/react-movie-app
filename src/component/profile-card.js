import React from 'react'

function ProfileCard(props){

const img = `https://image.tmdb.org/t/p/h632/${props.profil.profile_path}`
const waktu = new Date(props.profil.birthday);
const today = new Date();
const todayY = today.getFullYear();
const birthY = waktu.getFullYear();
const alias =  [...new Set(props.alias)];
    return(
<>
<div className="profil-pic">
        <img src={img} alt="" onClick={props.modalClick}/>
 </div>
      <section className="person-info">
        <h3 className="titles">Personal Info</h3>
      
        <div className="info-column">
          <p className="sub-titles">Known For</p>
          <p className="info-text">{props.profil.known_for_department}</p>
        </div>
        <div className="info-column">
          <p className="sub-titles">Gender</p>
          <p className="info-text">{props.profil.gender > 1 ? "Male" : "Female"}</p>
        </div>
        <div className="info-column">
        <p className="sub-titles">Birthday</p>
        <p className="info-text">{props.profil.birthday} ({todayY - birthY - 1} years old)</p>
      </div>
        <div className="info-column">
          <p className="sub-titles">Place of birth</p>
          <p className="info-text">{props.profil.place_of_birth}</p>
        </div>

        <div className="info-column">
        {alias.length == 0 ? "" : <p className="sub-titles">Also Known As</p>}
         <div className="info-name">
   {alias.map(name => {
       return <p className="info-text">{name}</p>
   })}

         </div>
        </div>
      
      </section>
</>
    )
}

export default ProfileCard;