import React from 'react'
import {Link} from 'react-router-dom'
import SliderImage from './slider'


class Banner extends React.Component{
    constructor(){
super()
this.state = {
  isLoad:true,
  movie:[],
  index:0,
  intervalId: setInterval(() => {},1000)
}
    }

    async componentDidMount(){
    this.state.intervalId = setInterval(() => {
        this.setState({index:this.state.index + 1})
        return () => clearInterval(this.state.intervalId );
      }, 10000);
      
      const popular = await  fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=0ccbee0a69447c2b1bd0090bf76b0358"
        )
       const respon = await popular.json()  
       const movies = respon.results
       if(!Array.isArray(movies) || movies.length <= 0){
        return null;
      }
       if (respon) {
              this.setState(prev => {
                  return{
                    isLoad:prev.isLoad = false,
                    movie:prev.movie = movies
                  }
                })
      }
  }

  componentWillUnmount(){
    clearInterval(this.state.intervalId);
  }

  nextSlide = (e) => {
    e.preventDefault()
const length = this.state.movie.length
this.setState({index:this.state.index = this.state.index + 1})
  }

 prevSlide = (e) => {
  e.preventDefault()
  const length = this.state.movie.length
  this.setState({index:this.state.index = this.state.index - 1})
 } 
  
dotsClick = (e) => {
  const targets = parseFloat(e.target.dataset.length)
  console.log(targets);
  this.setState({index:this.state.index = targets})
  console.log(this.state.index);
}
render(){
      if (this.state.index > 19) {
        this.setState({index:this.state.index = 0})
      }

const Slide = this.state.movie.map(m => {
  const dates = [new Date(m.release_date)]
  return <SliderImage data={m.id} index={this.state.index} date={dates} />
})
let length = -1;

const dots =  this.state.movie.map(m => {
  length++
  return <span className={length === this.state.index ? 'dot-active' : 'dot'} data-length={length} onClick={this.dotsClick}></span>
})
        return( 
   <div className="banner">
{/* <a href="#"  className="kiri"  onClick={this.prevSlide} style={ this.state.index >= 1 ? { display:'block'} : {display : 'none'} }  ></a>
<a href="#" className="kanan" onClick={this.nextSlide}  style={ this.state.index >= 19 ? { display:'none'} : {display : 'block'} }  ></a> */}
<div className='dot-container'>
  {dots }
</div>
{Slide}
</div>
      
        )
    }
}


export default Banner;

