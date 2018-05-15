import React from 'react';
// import AccessingVineyard from '../../../ui/pages/clientSide/AccessingVineyard';
 //import {composeWithTracker} from 'react-komposer';
import {compose} from "react-komposer";//'meteor/nicocrm:react-komposer-tracker'
import {Transactions} from '/imports/api/lib/collections';
import { withTracker } from 'meteor/react-meteor-data';
class Layout extends React.Component {

    render(r) {
        return (
            <div className="wrapper">
                <div >
                    <a href="/"><img src="/images/blockfreight_logo_grey.svg" width="300px" /></a>
                    {/*<div className="header">Block Explorer</div>*/}
                </div>
                <div>c
                    {this.props.main}
                </div>
            </div>

        );
    }
}
// const c = (props, onData) => {
//     if(Meteor.subscribe('transactions').ready()) {
//         const transactions = Transactions.find().fetch();
//         onData(null, {transactions});
//     }
// };
// export default composeWithTracker(c) (Layout);//();

// const trackerContainer = composeWithTracker((props, onData) => {
//     //const contactId = props.params.id
//     const listDataSub = Meteor.subscribe('transactions')
//
//     if(listDataSub.ready()) {
//         const transactions = Transactions.find().fetch()
//         onData(null, {
//             transactions
//         })
//     }
// })
// function getTrackerLoader(reactiveMapper) {
//     return (props, onData, env) => {
//         let trackerCleanup = null;
//         const handler = Tracker.nonreactive(() => {
//             return Tracker.autorun(() => {
//                 // assign the custom clean-up function.
//                 trackerCleanup = reactiveMapper(props, onData, env);
//             });
//         });
//
//         return () => {
//             if(typeof trackerCleanup === 'function') trackerCleanup();
//             return handler.stop();
//         };
//     };
// }
//
// // usage
// function reactiveMapper(props, onData) {
//     if (Meteor.subscribe('transactions').ready()) {
//         const transactions = Transactions.find().fetch();
//         onData(null, { transactions });
//     };
// }
//
// export default compose(getTrackerLoader(reactiveMapper))(Layout)

export default withTracker(props => {
    // Do all your reactive data access in this method.
    // Note that this subscription will get cleaned up when your component is unmounted
    const handle = Meteor.subscribe('transactions');

    return {
        //currentUser: Meteor.user(),
        listLoading: !handle.ready(),
        transactions: Transactions.find().fetch(),
    };
})(Layout);