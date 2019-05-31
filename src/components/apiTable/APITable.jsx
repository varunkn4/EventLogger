import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class APITable extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render(){     
        return(
            <div className="apiTableContainer">
                <BootstrapTable data={ this.props.data } bordered={ false } striped>
                    <TableHeaderColumn dataField='URL' isKey dataSort={ true } width='52%'>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='Status' dataSort={ true } width='12%'>Status</TableHeaderColumn>
                    <TableHeaderColumn dataField='Type' dataSort={ true } width='12%'>Type</TableHeaderColumn>
                    <TableHeaderColumn dataField='Initiator' dataSort={ true } width='12%'>Initiator</TableHeaderColumn>
                    <TableHeaderColumn dataField='Time' dataSort={ true } width='12%'>Time (in ms)</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default APITable;