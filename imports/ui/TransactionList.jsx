import React from 'react';
// import AccessingVineyard from '../../../ui/pages/clientSide/AccessingVineyard';
//import {composeWithTracker} from 'react-komposer';
import {compose} from "react-komposer";//'meteor/nicocrm:react-komposer-tracker'
import {Transactions} from '/imports/api/lib/collections';
import { withTracker } from 'meteor/react-meteor-data';
import Fade from '@material-ui/core/Fade';
//import {withStyles} from "@material-ui/core/styles/index";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
class TransactionList extends React.Component {
    constructor(p){
        super(p)
    }
     timeConverter(UNIX_timestamp){
        UNIX_timestamp = parseInt(UNIX_timestamp);
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();

         (hour.toString().length==2)?"":hour="0"+hour.toString();
         (min.toString().length==2)?"":min="0"+min.toString();
         (sec.toString().length==2)?"":sec="0"+sec.toString();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    }

    render() {
        //blockNum = 3
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

                        <table className="table table-striped" cellPadding="0" cellSpacing="0" style={{width:"100%"}} >
                            <tbody>
                            <tr>

                                <th>Transaction Id</th>
                                <th>Timestamp</th>
                                <th>Block</th>
                                {/*<th>Unix</th>*/}
                                {/*<th>Size</th>*/}
                                {/*<th>Timestamp</th>*/}
                            </tr>
                            {Transactions.find({}, {sort: {TxTimestamp: -1}}).fetch().sort((a, b) => {
                                return (a.TxTimestamp < b.TxTimestamp) ? 1 : -1
                            }).map((t, i) => {

                                    if (i == 0) {
                                        return (

                                            <tr key={i}>


                                                <td><Fade timeout={{enter: 1000}} in={true}>
                                                    <div><a href={"/t/" + t.Id}><pre>{t.Id}</pre></a></div>
                                                </Fade></td>
                                                <td><Fade timeout={{enter: 1000}} in={true}>
                                                    <div><a href={"/t/" + t.Id}>{this.timeConverter(t.TxTimestamp)}</a>
                                                    </div>
                                                </Fade></td>
                                                <td><Fade timeout={{enter: 1000}} in={true}>
                                                    <div><a href={"/t/" + t.Id}>{t.Height}</a></div>
                                                </Fade></td>
                                                {/*<td><Fade timeout={{enter: 1000}} in={true}>*/}
                                                    {/*<div>*/}
                                                        {/*<div></div>*/}
                                                        {/*<a href={"/t/" + t.Id}> {t.TxTimestamp}   </a></div>*/}
                                                {/*</Fade></td>*/}

                                            </tr>
                                        )
                                    } else {
                                        return (
                                            <tr key={i}>


                                                <td>
                                                    <div><a href={"/t/" + t.Id}><pre>{t.Id}</pre></a></div>
                                                </td>
                                                <td>
                                                    <div><a href={"/t/" + t.Id}> {this.timeConverter(t.TxTimestamp)}</a>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div><a href={"/t/" + t.Id}> {t.Height}</a></div>
                                                </td>
                                                {/*<td>*/}
                                                    {/*<div><a href={"/t/" + t.Id}> {t.TxTimestamp}   </a></div>*/}
                                                {/*</td>*/}

                                            </tr>

                                        )
                                    }
                                }
                            )}
                            </tbody>
                        </table>
                    </div>
                    {/*{this.props.main}*/}
                </div>
            </div>

        );
    }
}
const styles = theme => ({
    button: {
        margin: theme.spacing.unit,

    },
});
TransactionList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withTracker(props => {
    const handle = Meteor.subscribe('transactions');
    //Transactions.allow({})
    //Transactions.findOne()
    Transactions.find({},{sort:{TxTimestamp:-1}}).fetch();
    return{};
    // return {
    //     //currentUser: Meteor.user(),
    //     listLoading: !handle.ready(),
    //     transactions: Transactions.find().fetch(),
    // };
})(withStyles(styles)(TransactionList));