import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Tweetbox from './TweetBox';
import TweetList from './TweetList';
import TweetStore from '../stores/TweetStore';
import TweetActions from '../actions/TweetActions';

import { Link } from 'react-router-dom'

let getAppState = () => {
    return {tweetsList: TweetStore.getAll() };
};

export default class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = getAppState();
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount(){
        TweetActions.getAllTweets();
        TweetStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        TweetStore.removeChangeListener(this._onChange);
    }

    _onChange(){
        this.setState(getAppState());
    }

    render() {
        return(
            <div className="container">
                <Link to="/follow">Who to follow</Link>
                <Tweetbox />
                <TweetList tweets={this.state.tweetsList} />
            </div>
        );
    }
}