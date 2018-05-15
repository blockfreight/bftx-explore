import React from 'react';
// import AccessingVineyard from '../../../ui/pages/clientSide/AccessingVineyard';
//import {composeWithTracker} from 'react-komposer';
import {compose} from "react-komposer";//'meteor/nicocrm:react-komposer-tracker'
import {Transactions} from '/imports/api/lib/collections';
import { withTracker } from 'meteor/react-meteor-data';
class Transaction extends React.Component {
    render() {
        const t = Transactions.findOne({Id:FlowRouter.current().params.t})
        if(t==undefined)return(<div></div>);
        return (
            <div className="wrapper">
                <div className="app2">
                   Transaction {t.Properties.Shipper}
                </div>
                <pre>
                    {`
"_id" : "BFTXca3b2bff9667fa0aefe41fde75ee29da43edfecbab769224930a08a79202849c",

"Shipper" : "qV2fdXdaddadd4d54a23F",
"BolNum" : "15455",
"RefNum" : "154532165",
"Consignee" : "teste",
"HouseBill" : "",
"Vessel" : "132153456",
"Packages" : "",
"PackType" : "",
"INCOTerms" : "",
"PortOfLoading" : "21514",
"PortOfDischarge" : "51651",
"Destination" : "",
"MarksAndNumbers" : "",
"UnitOfWeight" : "",
"DeliverAgent" : "",
"ReceiveAgent" : "",
"Container" : "",
"ContainerSeal" : "",
"ContainerMode" : "",
"ContainerType" : "",
"Volume" : "",
"UnitOfVolume" : "",
"NotifyAddress" : "89-91 City Rd, Southbank 3006, VIC, Australia",
"DescOfGoods" : "This is the goods description.",
"GrossWeight" : "15523",
"FreightPayableAmt" : "354534",
"FreightAdvAmt" : "35448552",
"GeneralInstructions" : "There are many general instructions.",
"DateShipped" : "20161128",

"IssueDetails.PlaceOfIssue" : "Place 1",
"IssueDetails.DateOfIssue" : "20171228"

"NumBol" : "15555",

"MasterInfo.FirstName" : "First name masterinfo",
"MasterInfo.LastName" : "last name masterinfo",
"MasterInfo.Sig" : "teste"


"AgentForMaster.FirstName" : "First name masterinfo",
"AgentForMaster.LastName" : "last name masterinfo",
"AgentForMaster.Sig" : "teste"


"AgentForOwner.FirstName" : "First name masterinfo",
"AgentForOwner.LastName" : "last name masterinfo",
".AgentForOwnerSig" : "teste",
"ConditionsForCarriage" : "blablabsla"

"EncryptionMetaData" : ""

"Id" : "BFTXca3b2bff9667fa0aefe41fde75ee29da43edfecbab769224930a08a79202849c",
"Signhash" : "/t6CXddokVckXt1OGtmYmw==",
"Signature" : "1453166459388149541856721135232200190801181842112215522622612514712315111117584271871141111541282020211623918863471322097161131108513118253130114191353534802491947725",
"Verified" : true,
"Transmitted" : true,
"Amendment" : "",
"Private" : ""
                    `}
                </pre>
            </div>
        );
    }
}
export default withTracker(props => {
    const handle = Meteor.subscribe('transactions');
    return {
        //currentUser: Meteor.user(),
        listLoading: !handle.ready(),
        transactions: Transactions.find().fetch(),
    };
})(Transaction);