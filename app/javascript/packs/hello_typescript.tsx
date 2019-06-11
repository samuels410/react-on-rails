// Run this example by adding <%= javascript_pack_tag 'hello_typescript' %> to the head of your layout file,
// like app/views/layouts/application.html.erb.

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider } from 'react-redux'
import {combineReducers, createStore, Reducer} from 'redux'
import { Button } from '@material-ui/core'
import {makeStyles} from "@material-ui/styles";
import tweetStyles from '../src/TweetBox.module.css'
import Hello from '../components/Hello'
import cx from 'classnames'

interface  Props {
    message: string
}

const useStyles = makeStyles(() => ({
    test:{background: 'red'}
}))

const reducer:Reducer<{hey:string} | undefined,any> = (s,a):{hey:string} => {
    return {hey: 'hello'}
}

const store = createStore(combineReducers({hey:reducer}))



const App = (props: Props) =>{

        const classes = useStyles('')
        return(
            <Provider store={store}>
            <div className={classes.test}>
                <Hello />
                <Button className={cx(tweetStyles.stampImage,'hello')} >Click Here</Button>
                {props.message}
        </div>
        </Provider>
    )
}

let documentReady = () => {
    let reactNode = document.getElementById('tsx');
    if (reactNode){
        ReactDOM.render(
            <App message={"Hello World"}/>
            ,
            reactNode,
    );
    }
};

// @ts-ignore
$(documentReady);