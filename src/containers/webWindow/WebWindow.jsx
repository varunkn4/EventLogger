import React, { Component } from 'react';

class WebWindow extends Component{
    render(){
        return(
            <div className="windowView">   
                <iframe className="webContainer" src="http://40.121.39.87/"></iframe>
            </div>
        )
    }
}

export default WebWindow;