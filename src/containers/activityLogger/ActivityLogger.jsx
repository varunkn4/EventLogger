import React, { Component } from 'react';
import ActivityDialog from '../../components/activityDialog/ActivityDialog';

class ActivityLogger extends Component{
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            currentTheme: 'light'
        };
        this.count = 0;
        this.messagePool = [];
        this.unique = [];
        this.colorSwitcher = this.colorSwitcher.bind(this);
    }
    sendComponent(logMessage){ 
        if(logMessage != null){    
            for(var i = (logMessage.length - 1) ; i >= 0 ; i--){
                this.messagePool[this.count] = logMessage[i];
                this.count = this.count + 1;
            }

            function onlyUnique(value, index, self) { 
                return self.indexOf(value) === index;
            }
            var unique = this.messagePool.filter( onlyUnique );
            this.state.messages=[]; 
            // for(var j = 0; j < this.messagePool.length ; j ++ ){
            //     this.manageArray(unique[j]);  
            // }
            var j = 0;
            messagePool.forEach(function() {
                this.manageArray(unique[j]);
                j = j + 1;
            });
        }
    }
    manageArray(logMessage){
        if(logMessage != null){
            this.state.messages.push(logMessage);
        }        
    }
    colorSwitcher(){
        if(this.state.currentTheme === "light"){
            this.setState({currentTheme:'dark'});
        }
        else{
            this.setState({currentTheme:'light'});
        }
        
    }
    setData(events,eventList){ 
        var data=[]; 
        var colorVal=[];
        var j =0;        
        for(var i=0;i<eventList.length;i++){
            var color = eventList[i].substr(eventList[i].length - 7);
            colorVal[i] = color;
        }
        events.forEach(function(element) {            
            data.push(
                <ActivityDialog contentVal={element['desc']} contentID={element['event_id']} timeVal={element['created_date']} colorValue={colorVal[j]}/>
            );            
            j++;
        })
        return( data )
    }
    render(){
        const { events , eventList}=this.props;
        return(
            <div className={"activityWidget "  + this.state.currentTheme}>
                <div className="widgetTitle">
                    <label className="">Event Logger</label>
                </div>
                <div className="dialogBox">
                   {this.setData(events,eventList)}
                </div>
            </div>
        )
    }
}

export default ActivityLogger;