import React, { Component } from 'react';
import ActivityDialog from '../../components/activityDialog/ActivityDialog';

class ResultWidget extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    setData(results,resultList){
        var data=[];
        var colorVal=[];
        var j =0;        
        for(var i=0;i<resultList.length;i++){
            var color = resultList[i].substr(resultList[i].length - 7);
            colorVal[i] = color;
        }
        results.forEach(function(element) {
            data.push(<ActivityDialog contentVal={element['desc']} contentID={element['event_id']} timeVal={element['created_date']} colorValue={colorVal[j]} />);
            j++;
        })
        return( data )

    }
    render(){ 
        const { results, resultList }=this.props;      
        return(
            <div className="resultWidgetContainer">
               <div className="widgetTitle">
                    <label className="">Result</label>
                </div>   
                <div className="resultData">
                    {this.setData(results, resultList)}
                </div>
            </div>
        )
    }
}

export default ResultWidget;