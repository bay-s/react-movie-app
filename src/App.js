import React from 'react'
import Header from './component/header'
import './App.css';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route ,Routes} from 'react-router-dom';
import Home from './component/home'
import  NotFound from  './component/404not'
import TvDetail from  './component/tv-detail';
import MovieDetail from  './component/moviedetail';
import SearchPage from './component/search-page'
import Footer from './component/footer';
import PeopleDetail from './component/people-detail'
import PopularPeople from './component/popular-people';
import GenrePage from './component/genre-page';
import MoviePopuler from './component/movie-all';
import AnimePopuler from './component/anime'
import ReviewPage from './component/review-page';
import PosterPage from './component/poster-page';
import BackdropPage from './component/backdrop-page';
import TvPopuler from './component/tv-all';

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      search:''
    }
  }


  render(){

    return (
      <Router>
         <Header />
         <Routes>
              <Route path="/" element={<Home/>} exact/>
              <Route path="/movie-detail/:id" element={<MovieDetail />} />
              <Route path="/tv-detail/:id" element={<TvDetail />} />
              <Route path='/movie-search/:id' element={<SearchPage/>} />
              <Route path='/person-detail/:id' element={<PeopleDetail />} />
              <Route path='/popular-people/' element={<PopularPeople />} />
              <Route path='/movies/' element={<MoviePopuler />} />
              <Route path='/anime-populer/' element={<AnimePopuler />} />
              <Route path='/tv-series/' element={<TvPopuler />} />
              <Route path='/genre/:id' element={<GenrePage />} />
              <Route path='/review/:id' element={<ReviewPage />} />
              <Route path='/poster-page/:id' element={<PosterPage />} />
              <Route path='/backdrop-page/:id' element={<BackdropPage />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />   
    </Router>
    )
  }
}

export default App;

