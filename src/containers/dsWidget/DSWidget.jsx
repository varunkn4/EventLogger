import React, { Component } from 'react';
import ActivityDialog from '../../components/activityDialog/ActivityDialog';

class DSWidget extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    setData(activities,activityList){
        var data=[];
        var colorVal=[];
        var j =0;        
        for(var i=0;i<activityList.length;i++){
            var color = activityList[i].substr(activityList[i].length - 7);
            colorVal[i] = color;
        }
        activities.forEach(function(element) {
            data.push(<ActivityDialog contentVal={element['desc']} contentID={element['event_id']} timeVal={element['created_date']} colorValue={colorVal[j]} />);
            j++;
        })
        return( data )

    }
    render(){  
        const { activities, activityList }=this.props;
        return(
            <div className="dsWidgetContainer">
               <div className="widgetTitle">
                    <label className="">Activity</label>
                </div>
                <div className="dsData">
                    {this.setData(activities,activityList)}
                </div>
            </div>
        )
    }
}

export default DSWidget;