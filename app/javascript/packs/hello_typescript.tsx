// Run this example by adding <%= javascript_pack_tag 'hello_typescript' %> to the head of your layout file,
// like app/views/layouts/application.html.erb.

import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@material-ui/core'
import styles from '../src/TweetBox.module.css'

interface  Props {
    message: string
}

class App extends React.Component<Props>{
    render(){
        return(
            <div>
                <Button className={styles.stampImage} >Click Here</Button>
                {this.props.message}
        </div>
    )
    }
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