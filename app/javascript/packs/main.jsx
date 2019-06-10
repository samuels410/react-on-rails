import React from 'react';
import ReactDOM from 'react-dom';
import Index from '../components/Index';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Follow from "../components/Follow";

class App extends React.Component{
    render(){
        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}

let documentReady = () => {
    let reactNode = document.getElementById('react');
    if (reactNode){
        ReactDOM.render(
            <Router>
                <Route path="/"/>
                <Route path="/follow" component={Follow} />
                <Index />
            </Router>
            ,
            reactNode,
        );
    }
};

$(documentReady);