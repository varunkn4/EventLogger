import React, { Component } from 'react';

class AnalyticsWidget extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render(){       
        return(
            <div className="analyticsWidgetContainer">
               <div className="widgetTitle">
                    <label className="">Analytics</label>
                </div>   
            </div>
        )
    }
}

export default AnalyticsWidget;