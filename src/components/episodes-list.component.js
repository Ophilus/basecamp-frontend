import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

const SeasonInfo = props => ( 
    <div className="info">
        <h1 className='title'>{ props.seasons.name }</h1>
        <div>
            <img className='smallPoster' alt="poster" src={ props.seasons.featuredImage } />
            <div className='description'><span>Description: </span>{ props.seasons.longDescription }</div>
            <div className='dateofpublish'><span>Date of start: </span>{ props.seasons.dateOfPublish }</div>
            <div className='lastModifiedDate'><span>Last modified date: </span>{ props.seasons.lastModifiedDate }</div>
            <div className='rating'><span>Rating: </span><StarRatings rating={props.seasons.usersRating} starRatedColor="yellow" 
             numberOfStars={10} name='rating' starSpacing="1px" starDimension="25px" />
            </div>
        </div>
        <iframe  title="videoplayer" className='video' src={props.seasons.videoFragmentUrl} 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe> 
    </div>
   )

const Episode = props => ( 
        <div className="card">
            <div className="face face1">
                <div className="content">
                    <div><img src={ props.episodes.featuredImage } alt="logo"/></div>
                    <h3> {"Episode " + props.episodes.number + ": " + props.episodes.name }</h3>
                </div>
            </div>
            <div className="face face2">
                <div className="content">
                    <p>{ props.episodes.shortDescription }</p>
                    <Link to={"/"+ props.episodes.relatedShow + "/" + props.episodes.relatedSeason[0] + "/episode" + (props.episodes.number).toString()}>Read More</Link>
                </div>
            </div>
        </div>
   )

export default class EpisodesList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            seasons:[],
            episodes:[]
         };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/seasons/' + this.props.match.params.relatedShow + '/' + this.props.match.params.relatedSeason)
            .then(response => {
                this.setState({ seasons: response.data })
            })
            .catch((error) => {
                console.log(error)
            })
        axios.get('http://localhost:5000/episodes/' + this.props.match.params.relatedShow + '/' + this.props.match.params.relatedSeason)
            .then(response => {
                this.setState({ episodes: response.data })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    seasonsInfo() {
        return this.state.seasons.map(currentseasons => {
            return <SeasonInfo seasons = { currentseasons }
            key = { currentseasons._id }
            />;
        })
    }

    episodesList() {
        return this.state.episodes.map(currentepisodes => {
            return <Episode episodes = { currentepisodes }
            key = { currentepisodes._id }
            />;
        })
    }

    render() {
        return ( <div className="container">
            <div>{this.seasonsInfo()}</div>
            <div className="list">{this.episodesList()}</div>
        
             </div>
        )
    }
}