import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component"
import SeriesList from "./components/series-list.component"
import SeasonsList from "./components/seasons-list.component"
import EpisodesList from "./components/episodes-list.component"
import EpisodesInfo from "./components/episodes-info.component"

function App() {
    return ( < Router >
        <Navbar />
        <br />
        <Route path = "/" exact component = { SeriesList } />  
        <Route path = "/:relatedShow" exact component = { SeasonsList } />  
        <Route path = "/:relatedShow/:relatedSeason" exact component = { EpisodesList }/> 
        <Route path = "/:relatedShow/:relatedSeason/episode:number" exact component = { EpisodesInfo }/>  
        </Router >
    );
}

export default App;