import React, { Component } from 'react';
import SocketIO from 'socket.io-client';
import APIWidget from '../../containers/apiWidget/APIWidget';
import Topbar from '../../containers/topbar/Topbar';
import DSWidget from '../../containers/dsWidget/DSWidget';
import ResultWidget from '../../containers/resultWidget/ResultWidget';
import AnalyticsWidget from '../../containers/analyticsWidget/AnalyticsWidget';
import ActivityLogger from '../../containers/activityLogger';
import PropTypes from 'prop-types';
import registry from 'app-registry';
import { socket } from '../../index';

import Select from 'react-select';


const customStyles = {
    control: base => ({
        ...base,
        minHeight: 26,
        fontSize: '12px'
    }),
    // dropdownIndicator: base => ({
    //     ...base,
    //     padding: 2
    // }),
    clearIndicator: base => ({
        ...base,
        padding: 2
    }),
    multiValue: base => ({
        ...base,
        backgroundColor: variables.colorPrimaryLighter
    }),
    valueContainer: base => ({
        ...base,
        padding: '0px 3px'
    }),
    input: base => ({
        ...base,
        margin: 0,
        padding: 0
    }),
    menuList: base => ({
        ...base,
        fontSize: '12px'
    })
};

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: 'http://suyatidev.suyatitech.com/',
            cookieId:'all',
            collapseIcon: "",
            expandIcon: "hidden",
            collapseCurrentState: '',
            viewCurrentState: '',
            selectedDate: "oneHour",
            options:[],
            activities:[],
            events:[],
            results:[],
            eventList:[]
        };
        this.setColors = this.setColors.bind(this);
        this.getRandomColor = this.getRandomColor.bind(this);
    }
    componentWillMount(){
        const token = registry.get('storage').getItem('token');
        const gmailToken = registry.get('storage').getItem('googleAuth');
        if (token !== null || gmailToken !== null) {
            socket.emit('event_fetch_onload');  
            socket.emit('event_fetch', { date : this.state.selectedDate } ,{ cookieId : "all" })  
        }
        else{
            this.context.router.history.push('/login');    
        }
    }
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };
    dropdownHandle = (selectedOption) => {
        socket.emit('event_fetch', { date : this.state.selectedDate } ,{ cookieId : selectedOption['value'] })
        this.setState({ cookieId : selectedOption['value'] });
    }
    setSocketListeners () {
        socket.on('event_fetch_onload_result', (data) => { 
            var cookie_ids = [];
            // cookie_ids.push("all")
            data.forEach(function(element) {
                if(element['cookie_hash'] !=''){
                    cookie_ids.push((element['cookie_hash']).toString());
                }
              });
            cookie_ids = this.removeDuplication(cookie_ids);
            cookie_ids.unshift("all");
            let cookieIdList = cookie_ids.map(item =>  ({'label': item, 'value': item }) );
            this.setState({ options : cookieIdList }); 
        })
        
        socket.on('event_fetch_result', (data) => {  
            var activities = [];
            var events = [];
            var results = [];       
            var eventID = []; 
            var event_ids = [];   
            data.forEach(function(element) {
                if(element['cookie_hash'] != ''){
                    if(element['type'] == 'event'){
                        events.push(element);
                    }
                    else if(element['type'] == 'activity'){
                        activities.push(element);
                    }
                    else if(element['type'] == 'result'){
                        results.push(element);
                    }
                }
                eventID.push(element['event_id']);
              });
            event_ids = this.removeDuplication(eventID);
            this.setState({ 
                activities : activities,
                events : events,
                results : results
             });
             this.setColors(event_ids);
        })
        socket.on('recursive_calling_event',(message) =>{
            socket.emit('event_fetch', { date : this.state.selectedDate } ,{ cookieId : this.state.cookieId})
        })
    }
    setColors(ids){       
        for(var i =0; i< ids.length; ++i){
            var getColor = this.getRandomColor();
            ids[i] = ids[i] + getColor;
        }
        this.setState({            
            eventList: ids
        })
    }
    removeDuplication(cookie_ids){
        var unique = {};
        cookie_ids.forEach(function(i) {
            if(!unique[i]) {
                unique[i] = true;
            }
        });
        return Object.keys(unique);
    }
    componentDidMount () {
        this.setSocketListeners()
    } 
    collapseArea(collapseState){
        if(collapseState === "expand"){
            this.setState({
                collapseIcon: "hidden",
                expandIcon: ""
            }, function(){});
        }
        else{
            this.setState({
                collapseIcon: "",
                expandIcon: "hidden"
            }, function(){});
        }
        this.setState({
            collapseCurrentState:collapseState,
            viewCurrentState:collapseState,
        });
    }
    collapseContainer(setCollapseState){
        if(setCollapseState === this.state.collapseCurrentState){
            return "col-md-1"; 
        }
        else{
            return "col-md-3"; 
        }        
    }
    viewContainer(setViewState){
        if(setViewState === this.state.viewCurrentState){
            return "col-md-11"; 
        }
        else{
            return "col-md-9"; 
        }        
    }
    dateClick(newDateVal){
        this.setState({selectedDate : newDateVal});
        if(this.state.cookieId == ""){
            this.setState({cookieId : "all"});
            socket.emit('event_fetch', { date : newDateVal } ,{ cookieId : "all" });
        }
        else{
            socket.emit('event_fetch', { date : newDateVal } ,{ cookieId : this.state.cookieId });  
        }    
    }
    selectedDateFilter(clickedDate){
        if(this.state.selectedDate === clickedDate){
            return "selected"
        }
    }
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    render(){
        const { selectedOption } = this.state;
        return(
            <div className="viewableArea">
                <div className="row m-0">
                    <Topbar />
                </div>
                <div className="mainArea">                   
                    <div className="row m-0">
                        <div className={ "pr-0 " + this.collapseContainer("expand") }>
                            <div className="analyticsWidget">
                                <AnalyticsWidget />
                                <span className="collapseSection">
                                    <i className={"fas fa-chevron-left " + this.state.collapseIcon } onClick={() => this.collapseArea("expand")}></i>
                                    <i className={"fas fa-chevron-right " + this.state.expandIcon } onClick={() => this.collapseArea("collapse")}></i>
                                </span>
                            </div>
                        </div>
                        <div className={ "pl-1 " + this.viewContainer("expand") }>
                            <div className="row m-0">
                                <div className="apiWidget">
                                    <APIWidget />
                                </div>
                            </div>
                            <div className="row m-0">
                                <div className="col-md-7 p-0 pr-1">
                                    <div className="dropdown">
                                        <Select
                                            value={selectedOption}
                                            onChange={this.dropdownHandle}
                                            options={this.state.options}
                                            styles={customStyles}
                                            placeholder="Select User"
                                            clearIndicator
                                            components={
                                                {
                                                  DropdownIndicator: () => null,
                                                  IndicatorSeparator: () => null,
                                                }
                                            }
                                        />
                                    </div>
                                </div>  
                                <div className="col-md-5 p-0">
                                    <div className="btn-group pull-right interactionOptions" role="group" aria-label="">
                                        <button type="button" className={"btn interactionFilter " + this.selectedDateFilter("oneHour")} onClick={() => this.dateClick("oneHour")}>1 Hour</button>
                                        <button type="button" className={"btn interactionFilter " + this.selectedDateFilter("sixHours")} onClick={() => this.dateClick("sixHours")}>6 Hours</button>
                                        <button type="button" className={"btn interactionFilter " + this.selectedDateFilter("twelveHours")} onClick={() => this.dateClick("twelveHours")}>12 Hours</button>
                                        <button type="button" className={"btn interactionFilter " + this.selectedDateFilter("twentyfourHours")} onClick={() => this.dateClick("twentyfourHours")}>24 Hours</button>
                                    </div>
                                </div>                              
                            </div>
                            <div className="row m-0">
                                <div className="loggerWidget">
                                    <ActivityLogger events = {this.state.events} eventList = {this.state.eventList}  />
                                </div>
                            </div>
                            <div className="row m-0">
                                <div className="col-md-6 pl-0 pr-0">
                                    <div className="dsWidget">
                                        <DSWidget activities = {this.state.activities} activityList = {this.state.eventList}/>
                                    </div>
                                </div>
                                <div className="col-md-6 pr-0 pl-0">
                                    <div className="resultWidget">
                                        <ResultWidget results = {this.state.results}  resultList = {this.state.eventList}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>   
            </div>            
        )
    }
}
Home.contextTypes = {
    router: PropTypes.object.isRequired
  }
  
export default Home;