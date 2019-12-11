import React, { Component } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

const EpisodeInfo = props => ( 
    <div className="info">
        <h1 className='title'>{ props.episodes.name }</h1>
        <div>
            <img className='smallPoster' alt="poster" src={ props.episodes.featuredImage } />
            <div className='description'><span>Description: </span>{ props.episodes.longDescription }</div>
            <div className='dateofpublish'><span>Date of start: </span>{ props.episodes.dateOfPublish }</div>
            <div className='lastModifiedDate'><span>Last modified date: </span>{ props.episodes.lastModifiedDate }</div>
            <div className='rating'><span>Rating: </span><StarRatings rating={props.episodes.usersRating} starRatedColor="yellow" 
             numberOfStars={10} name='rating' starSpacing="1px" starDimension="25px" />
            </div>
        </div>
        <iframe  title="videoplayer" className='video' src={props.episodes.videoFragmentUrl} 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>  
    </div>
   )

export default class EpisodesList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            episodes:[]
         };
    }

    componentDidMount() {
        
        axios.get('http://localhost:5000/episodes/' + this.props.match.params.relatedShow + '/' + this.props.match.params.relatedSeason + '/episode' + this.props.match.params.number)
            .then(response => {
                this.setState({ episodes: response.data })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    episodesInfo() {
        return this.state.episodes.map(currentepisodes => {
            return <EpisodeInfo episodes = { currentepisodes }
            key = { currentepisodes._id }
            />;
        })
    }
    render() {
        return ( <div className="container">
            <div>{this.episodesInfo()}</div>        
             </div>
        )
    }
}