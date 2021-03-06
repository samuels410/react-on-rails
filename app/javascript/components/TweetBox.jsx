import React from 'react'
import TestImage from '../images/stamp.jpg';
import Styles from '../src/TweetBox.module.css'
export default class TweetBox extends React.Component {

    sendTweet(event) {
        event.preventDefault();
        this.props.sendTweet(this.refs.tweetTextArea.value);
        this.refs.tweetTextArea.value = '';
    }

    render () {
        return (
            <div className="row">
                <img className={Styles.stampImage}  src={TestImage} />
                <form onSubmit={this.sendTweet.bind(this)}>
                    <div className="input-field">
                        <textarea ref="tweetTextArea" className="materialize-textarea" />
                        <label >Tweet anything!</label>
                        <button type="submit" className="btn right" >Tweet</button>
                    </div>
                </form>
            </div>
        )
    }
}