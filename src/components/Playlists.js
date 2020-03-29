import React, { Component } from 'react';
import Emoji from 'react-emojis'
import '../stylesheets/Playlists.scss'
import { Link } from 'react-router-dom'

export default class Playlists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: null
    }
  }

  componentDidMount() {
    // const timeRange = 'long_term'
    const timeRange = 'short_term'
    // const timeRange = 'medium_term'
    this.getSpotifyTracks(timeRange)
  }

  getSpotifyTracks = async (timeRange) => {
    const apiCall = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=50`, {
      headers: {
        'Authorization': 'Bearer ' + this.props.match.params.token
      }
    })

    const response = await apiCall.json()
    this.setState({ results: response.items })
    const results = this.state.results
    console.log('RESULTS', results)
    for (let i = 0; i < Object.keys(results).length; i++) {
      console.log('Track name: ', results[i].name)
      console.log('640 image: ', results[i].album.images[0].url)
      console.log('64 image: ', results[i].album.images[2].url)
      console.log('Track ID: ', results[i].id)
      console.log('External link: ', results[i].external_urls.spotify)
    }
  }

  trigger = () => {
    console.log('TRIGGER')
  }

  render() {
    const mood = this.props.match.params.mood
    const emojis = {
      happy: 'grinning-face-with-big-eyes',
      sad: 'disappointed-face',
      angry: 'angry-face',
      fearful: 'face-screaming-in-fear',
      neutral: 'neutral-face',
      disgusted: 'confounded-face',
      surprised: 'face-with-open-mouth'
    }
    return (
      <div className='container text-white'>
        <div className='my-5'>
          <h1>Music based on your mood <Emoji emoji='musical-note' /></h1>
          <h2 className='h4'><span className='mr-2'>Mood: {mood}</span>
            {mood === 'happy' && <Emoji emoji={emojis.happy} />}
            {mood === 'sad' && <Emoji emoji={emojis.sad} />}
            {mood === 'neutral' && <Emoji emoji={emojis.neutral} />}
            {mood === 'angry' && <Emoji emoji={emojis.angry} />}
            {mood === 'surprised' && <Emoji emoji={emojis.surprised} />}
            {mood === 'fearful' && <Emoji emoji={emojis.fearful} />}
            {mood === 'disgusted' && <Emoji emoji={emojis.disgusted} />}
          </h2>
        </div>
        <div className='p-1 fluid-container bg-white py-5 px-5 color-secondary shadow'>
          <h1 className='h3'>Your top tracks</h1>
          <div className='col-md-12 col-sm-12 p-0 text-secondary'>
            <span><a href={this.trigger} onClick={this.trigger}>Last Month</a></span>
            <span className='pl-4'><a href={this.trigger} onClick={this.trigger}>Last 6 Months</a></span>
            <span className='pl-4'><a href={this.trigger} onClick={this.trigger}>All Time</a></span>
          </div>
          <hr />
          <div className='mt-4 p-1 row container'>
            <div className='col-md-4 col-sm-12'>
              <h1 className='h4'>Upbeat <Emoji emoji='beaming-face-with-smiling-eyes' /></h1>
            </div>
            <div className='col-md-4 col-sm-12'>
              <h1 className='h4'>Energetic <Emoji emoji='exploding-head' /></h1>
            </div>
            <div className='col-md-4 col-sm-12'>
              <h1 className='h4'>Party <Emoji emoji='woman-dancing' /></h1>
            </div>
          </div>
        </div>
        <div className='text-right'>
          <button className='mt-5 mb-3 button-back'><i className='pr-2 fas fa-chevron-left'></i>Go Back</button>
        </div>
      </div>
    )
  }
}