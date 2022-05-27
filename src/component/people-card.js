import React from 'react'
import ModalItem from './modal-item';
import PeopleCredits from './people-movie-credit';
import ProfileCard from './profile-card';

class PeopleCard extends React.Component{
    constructor(){
super()
this.state = {
    loading:true,
    people:[],
    modal:false,
    image:''
}
    }

    async componentDidMount(){
       const people = await fetch(
        `https://api.themoviedb.org/3/person/${this.props.id}?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
      );
      const peopleRes = await people.json()
      if(peopleRes){
        this.setState(prev => {
            return{
              loading:prev.loading = false,
              people:prev.people =  peopleRes
            }
          })
      }

    }

    modalClick = (e) => {
      e.preventDefault()
      this.setState({
          modal:!this.state.modal,
          image:this.state.image = e.target.src
      })
      console.log(this.state.modal);
      console.log(e.target.src);
  }   
  
  removeModal = (e) => {
      this.setState({
        modal:false
      })
   
  }
    render(){

        return(
       <div className="people-container">
    
  {this.state.loading ? <div className="loader-wrapper">
         <span className="loader"><span class="loader-inner"></span></span>
       </div> : ""
   }
       <div className="left-menu">
   <ProfileCard  profil={this.state.people} alias={this.state.people.also_known_as} modalClick={this.modalClick} />
       </div>
   
       <div className="main">
         {/* <div className="content"> */}
           <section className="content-top">
<h3 className="title-top">{this.state.people.name}</h3>
  <div className="overview">
    <p className="titles">Biography</p>
    <p className="paraf">{this.state.people.biography}</p>
  </div>
           </section>
   
           <div className="content-card">
             <h3 className="titles">Known For</h3>
             <PeopleCredits id={this.props.id}/>
          </div>

   
       </div>
   
 
<div className={this.state.modal ? 'modals' : "modal-container"} onClick={this.removeModal }>
{this.state.modal ? <ModalItem image={this.state.image} index={this.state.index} nextSlide={this.nextSlide} prevSlide={this.prevSlide} />  : ""}
</div>
     </div>

        )
    }
}

export default PeopleCard;