import React from 'react';
// import AccessingVineyard from '../../../ui/pages/clientSide/AccessingVineyard';
//import {composeWithTracker} from 'react-komposer';
import {compose} from "react-komposer";//'meteor/nicocrm:react-komposer-tracker'
import {Transactions} from '/imports/api/lib/collections';
import { withTracker } from 'meteor/react-meteor-data';
class TransactionList extends React.Component {
    constructor(p){
        super(p)
    }
    render() {
        blockNum = 3
        return (
            <div className="wrapper">

                <div className="app2">
                    {/*style="paddingTop: 50px;"*/}
                    <div className="container">
                        {/*style="text-align:center;"*/}

                        {/*style="text-align:center; margin-top: 30px;"*/}
                        {/*<h4>*/}
                        {/*<a href="/#/block/{{blockNum}}">Latest Block: </a>*/}
                        {/*</h4>*/}
                        {/*style="padding:0px;float:left;margin:0px;width:100%"*/}
                        <table className="table table-striped" cellPadding="0" cellSpacing="0" >
                            <tbody>
                            <tr>
                                <th>Block #</th>
                                <th>Tx #</th>
                                {/*<th>Size</th>*/}
                                {/*<th>Timestamp</th>*/}
                            </tr>
                            {Transactions.find().fetch().map((t,i)=>{

                                return(
                                    <tr key={i}>
                                        <td><a href="/#/block/"></a></td>
                                        <td> <a href={"/t/" +t.Id}>{t.Id}</a></td>
                                        {/*<td></td>*/}
                                        {/*<td></td>*/}
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>

                    </div>
                    {/*{this.props.main}*/}
                </div>
            </div>

        );
    }
}

export default withTracker(props => {
    const handle = Meteor.subscribe('transactions');
    //Transactions.allow({})
    Transactions.findOne()
    return{};
    // return {
    //     //currentUser: Meteor.user(),
    //     listLoading: !handle.ready(),
    //     transactions: Transactions.find().fetch(),
    // };
})(TransactionList);