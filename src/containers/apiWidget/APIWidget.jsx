import React, { Component } from 'react';
import SocketIO from 'socket.io-client';
import APITable from '../../components/apiTable/APITable';
import { socket } from '../../index';

class APIWidget extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedFilter: "allCalls",
            selectedDate: "oneHour",
            data:[],
            filtered:[]
        };
        this.handleChange = this.handleChange.bind(this);
    }
    filterClick(newFilterVal){
        this.setState({selectedFilter : newFilterVal});
    }
    selectedAPIFilter(clickedOption){
        // if(this.state.selectedFilter === clickedOption){
        //     return "selected"
        // }
    }
    dateClick(newDateVal){
        this.setState({selectedDate : newDateVal});
        socket.emit('api_list_fetch', { date : newDateVal })
    }
    selectedDateFilter(clickedDate){
        if(this.state.selectedDate === clickedDate){
            return "selected"
        }
    }
    componentWillMount(){
        socket.emit('api_list_fetch', { date : this.state.selectedDate })
        }
    setSocketListeners () {
        socket.on('api_list_result', (message) => {
            this.setState({data : message, filtered : message});  
        })
        socket.on('recursive_calling',(message) =>{
            socket.emit('api_list_fetch', { date : this.state.selectedDate }) 
        })
    }
        
    handleChange(e) {
        var currentList = [];
        var newList = [];
        if (e.target.value !== "") {
            currentList = this.state.data && this.state.data;
            newList = currentList.filter(item => {
                const lc = item['URL'].toLowerCase();
                const filter = e.target.value.toLowerCase();
                return lc.includes(filter);
            });
        } 
        else {
            newList = this.state.data && this.state.data;
        }
        this.setState({
            filtered: newList
        });
    }
        	 
    componentDidMount () {
        this.setSocketListeners()
    }  
    render(){    
        return(
            <div className="apiWidgetContainer">
                <div className="row m-0">
                    <div className="widgetTitle">
                        <label className="">API Report</label>
                    </div>    
                    <div className="widgetTitle">
                        <label htmlFor="searchText" className="filterLabel">Filter</label>
                        <input type="text" name="" id="searchText" className="intelliSearch" onChange={this.handleChange}/>
                        <button className={"btn filterButton disabled not-allowed " + this.selectedAPIFilter("allCalls")} onClick={() => this.filterClick("allCalls")}>All Calls</button>
                        <button className={"btn filterButton disabled not-allowed " + this.selectedAPIFilter("browserCall")} onClick={() => this.filterClick("browserCall")}>Browser Calls</button>
                        <button className={"btn filterButton disabled not-allowed " + this.selectedAPIFilter("recommCall")} onClick={() => this.filterClick("recommCall")}>Recommendation Calls</button>
                        <button className={"btn filterButton disabled not-allowed " + this.selectedAPIFilter("chatCall")} onClick={() => this.filterClick("chatCall")}>Chat Calls</button>
                        <div className="btn-group pull-right dateOptions" role="group" aria-label="">
                            <button type="button" className={"btn dateFilter " + this.selectedDateFilter("oneHour")} onClick={() => this.dateClick("oneHour")}>1 Hour</button>
                            <button type="button" className={"btn dateFilter " + this.selectedDateFilter("sixHours")} onClick={() => this.dateClick("sixHours")}>6 Hours</button>
                            <button type="button" className={"btn dateFilter " + this.selectedDateFilter("twelveHours")} onClick={() => this.dateClick("twelveHours")}>12 Hours</button>
                            <button type="button" className={"btn dateFilter " + this.selectedDateFilter("twentyfourHours")} onClick={() => this.dateClick("twentyfourHours")}>24 Hours</button>                        </div>
                    </div>               
                </div>
                <div className="row m-0 apiWidgetTableContainer">
                    <APITable data={this.state.filtered}/>
                </div>
            </div>
        )
    }
}

export default APIWidget;