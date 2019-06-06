import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Tweetbox from '../components/TweetBox'
import TweetList from '../components/TweetList'

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {tweetsList: []};
  }

  addTweet(tweetToAdd) {
    let newTweetList = this.state.tweetsList;
    newTweetList.unshift({id: Date.now(),name: 'sam', body: tweetToAdd});
    this.setState({tweetsList: newTweetList});
  }
  render() {
      return(
          <div className="container">
            <Tweetbox sendTweet={this.addTweet.bind(this)} />
            <TweetList tweets={this.state.tweetsList} />
          </div>
      );
  }
}

let documentReady = () => {
  ReactDOM.render(
    <Main />,
      document.getElementById('react'),
  );
};

$(documentReady);