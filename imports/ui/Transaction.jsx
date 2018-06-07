import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// import AccessingVineyard from '../../../ui/pages/clientSide/AccessingVineyard';
//import {composeWithTracker} from 'react-komposer';
import {compose} from "react-komposer";//'meteor/nicocrm:react-komposer-tracker'
import {Transactions} from '/imports/api/lib/collections';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { QRCode } from 'react-qr-svg';
import Checkbox from '@material-ui/core/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import Favorite from '@material-ui/icons/Visibility';
import FavoriteBorder from '@material-ui/icons/VisibilityOff';
import green from '@material-ui/core/colors/green';
import Field from './Field'
import _ from "lodash"
var Mnemonic = require('bitcore-mnemonic');
var crypto = require("crypto");
var eccrypto = require("eccrypto");
bs58 = require('bs58')
//var Mnemonic = require('bitcore-mnemonic');
// class Field extends React.Component
// {
//     render()
//     {
//         //classes = withStyles(styles);
//         const { classes } = this.props;
//         return (
//             <div>
//             <span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={test} /></span>
//         Shipper : ${this.context.Properties.Shipper} <br/>
//             </div>
//         )
//     }
// }
// //x =  withStyles(styles)(Field)
// export default withStyles(styles)(Field)

class Transaction extends React.Component {
    //crypto.randomBytes(32).toString('hex')


    constructor(p){
        super(p)
        this.props = p;
       // this.setState({docKey : crypto.randomBytes(32)})
        let seed = crypto.randomBytes(32).toString("hex");//.toString("hex");
        //Mnemonic.fromSeed(seed.toString("hex"));//new Buffer(seed.toString("hex")))
        let code = new Mnemonic(Mnemonic.Words.ENGLISH);
        console.log(FlowRouter.current().params.k)
        //code.fromSeed(new Buffer(seed))
        //code.fromMasterSeed(new Buffer(FlowRouter.current().params.k))
        if(FlowRouter.current().params.k !=undefined)
        {
            seed = FlowRouter.current().params.k;
        }
        this.state = {encrypting:true, decrypted:false,Id:"",Properties:{},mode:this.props.action,docKey : seed, docKeyType:"Math.random().toString()"}
        this.code = code;
    }
    Decrypt = () =>
    {
        this.setState({docKey:"0.6316490123331346"})
        //FlowRouter.go("/decrypt/"+this.transaction.Id)
    }
    Encrypt = () =>
    {
        this.setState({encrypting:true})
        //FlowRouter.go("/decrypt")
    }

    Print = () =>
    {
        window.print();
    }
    Send = () =>
    {
        location.href="mailto:?subject=Transaction:" + this.transaction.Id + "&body="+location.href
    }
     uint8arrayToStringMethod(myUint8Arr){
        return String.fromCharCode.apply(null, myUint8Arr);
    }
    Save = async () =>
    {
        // if(FlowRouter.current().params.t!=undefined)
        // {
        //     alert("This document is already saved. Future version will enable field level rights management");
        //     return;
        // }
        //window.open("/images/pass.pkpass",Math.random())
        //FlowRouter.go("/s/"+FlowRouter.current().params.t)
        //alert("todo: Download PDF")

        //encrypt each field with key from EncryptionMetaData
        //encrypt meta data based on lock option
        //
        var privateKeyA = crypto.randomBytes(32);
        var publicKeyA = eccrypto.getPublic(privateKeyA);
        x = await eccrypto.encrypt(publicKeyA,Buffer("msg to b"))
        y = await x;
        console.log("crypto"+ Base64.encode((x.toString())));

        var privateKeyB = crypto.randomBytes(32);
        var publicKeyB = eccrypto.getPublic(privateKeyB);

// Encrypting the message for B.
        eccrypto.encrypt(publicKeyB, Buffer("msg to b")).then(function(encrypted) {
            // B decrypting the message.
            eccrypto.decrypt(privateKeyB, encrypted).then(function(plaintext) {
                console.log("Message to part B:", plaintext.toString());
            });
        });

// Encrypting the message for A.
        eccrypto.encrypt(publicKeyA, Buffer("msg to a")).then(function(encrypted) {
            // A decrypting the message.
            eccrypto.decrypt(privateKeyA, encrypted).then(function(plaintext) {
                console.log("Message to part A:", plaintext.toString());
            });
        });


        console.log(this.state);
        //return;
        this.state.Properties.EncryptionMetaData = Base64.encode(JSON.stringify(this.state.Properties.EncryptionMetaData))
       // this.state.Properties.EncryptionMetaData = JSON.stringify(this.state.Properties.EncryptionMetaData)
        Meteor.call("Save",this.state.Properties,(e,r)=>{
            if(e)
            {
                console.log(e)
            }else
            {
                console.log(r);
                this.setState({mode:"view"})
                FlowRouter.go("/t/"+ r.data.tx.Id+"/"+this.state.docKey)
            }

        })
    }
    Done = () =>
    {
        FlowRouter.go("/")
    }

    HandleCheck = (e,o,v) =>
    {
        const NodeRSA = require('node-rsa');
        const key = new NodeRSA({b: 2048});
        console.log(key.exportKey());
        //keys = keys ||{};
        keys[e.target.value] = key.exportKey();
       // this.setState({keys:{proper:e.Target.value,}})
       // alert(e)
    }
    ShowQRCode()
    {
        return (

            <div style={{position:"absolute", bottom:10, right:0,}}>
                <div style={{  width:100,height:100, float:"right", marginLeft:33}}>
                    <a  href={location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '') + "/qr/" + bs58.encode(Buffer.from(FlowRouter.current().params.t, 'hex'))+"/"+bs58.encode(Buffer.from(this.state.docKey, 'hex'))} >
                        <QRCode  value={location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '') + "/qr/" + bs58.encode(Buffer.from(FlowRouter.current().params.t, 'hex'))+"/"+bs58.encode(Buffer.from(this.state.docKey, 'hex'))} />
                    </a>
                    {/*{location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '')}*/}
                    {/*{this.state.docKey}*/}
                    {/*{this.code.toString()}*/}
                </div>
                <div style={{  width:250,height:100, float:"right", marginLeft:33}}>
                    BFTX Key: {Mnemonic.fromSeed(Buffer.from(FlowRouter.current().params.t.substring(4), 'hex'),Mnemonic.Words.ENGLISH).phrase}
                </div>
                <div style={{   width:250,height:100, float:"right", marginLeft:33}}>
                    Docu Key: {Mnemonic.fromSeed(Buffer.from(this.state.docKey, 'hex'),Mnemonic.Words.ENGLISH).phrase}
                </div>
                {/*<div  style={{   width:250,height:100, float:"right", marginLeft:33}}>*/}
                    {/*/!*{this.transaction.Id}*!/*/}
                    {/*<br/>*/}
                    {/*{this.transaction==undefined?"":this.transaction.TxTimestamp}*/}



                {/*</div>*/}
            </div>

        )
    }

    render() {
        const { classes } = this.props;
        const t = Transactions.findOne({Id:FlowRouter.current().params.t})
        this.transaction = t;
        if(this.state.encrypting)
        {
            classes.checkbox = classes.checkboxVisible;
        }else {
            classes.checkbox = classes.checkboxHidden;
        }
       // t.Properties.Shipper.Key = 1234;
        //if(t==undefined)return(<div></div>);
        return (
            <div className="wrapper">
                <div className="QRCode">
                    <div className="section-to-print">
                        {FlowRouter.current().params.k !=undefined?this.ShowQRCode():""}
                    </div>
                </div>
                <div style={{position:"absolute", top:50, right:0,}}>
                    <div style={{  width:420,height:100, float:"right", marginLeft:33}}>
                <div className="noPrint">
                    {/*<Button variant="raised" size="medium" color="primary" className={classes.button} onClick={this.Decrypt}>*/}
                        {/*Decrypt with QR Key*/}
                    {/*</Button>*/}
                    <Button variant="raised" size="medium" color="primary" className={classes.button} onClick={this.Save} disabled={FlowRouter.current().params.k !=undefined}>
                        Save
                    </Button>

                    <Button variant="raised" size="medium" color="primary" className={classes.button} onClick={this.Print}>
                        Print
                    </Button>
                    <Button variant="raised" size="medium" color="primary" className={classes.button} onClick={this.Send}>
                        Send
                    </Button>

                    <Button variant="raised" size="medium" color="primary" className={classes.button} onClick={this.Done}>
                        Done
                    </Button>
                </div>
                    </div>
                </div>
                <div className="section-to-print">
                    <div className={classes.doc}>


                        <Field state={this.state} node={_.get(this,"transaction.Properties")} name="Shipper" />
                        <Field state={this.state} node={_.get(this,"transaction.Properties")} name="BolNum" />
                        <Field state={this.state} node={_.get(this,"transaction.Properties")} name="RefNum" />
                        <br/>
                        <Field state={this.state} node={_.get(this,"transaction.Properties")} name="Consignee" />
                        <Field state={this.state} node={_.get(this,"transaction.Properties")} name="HouseBill" />
                        <Field state={this.state} node={_.get(this,"transaction.Properties")} name="Vessel" />
                        <br/>
                        <Field state={this.state} node={_.get(this,"transaction.Properties")} name="Packages" />
                        <Field state={this.state} node={_.get(this,"transaction.Properties")} name="PackType" />
                        <Field state={this.state} node={_.get(this,"transaction.Properties")} name="PackType" />
                        <br/>
                        <Field state={this.state} node={_.get(this,"transaction.Properties")} name="INCOTerms" />

                        {/*<span className="eye"><Checkbox onChange={this.HandleCheck}  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value="Id" /> </span>*/}
                        {/*Id : ${this.transaction.Id} <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*Shipper : ${t.Properties.Shipper} <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*BolNum : 15455 <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*RefNum : 154532165 <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*Consignee : teste <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*HouseBill : <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*Vessel : 132153456 <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*Packages : <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*PackType : <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*INCOTerms : <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*PortOfLoading : 21514 <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*PortOfDischarge : 51651 <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*Destination : <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*MarksAndNumbers : <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*UnitOfWeight : <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*DeliverAgent : <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*ReceiveAgent : <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*Container : <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*ContainerSeal : <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*ContainerMode : <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*ContainerType : <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*Volume : <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*UnitOfVolume : <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*NotifyAddress : 89-91 City Rd Southbank 3006 VIC Australia <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*DescOfGoods : This is the goods description. <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*GrossWeight : 15523 <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*FreightPayableAmt : 354534 <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*FreightAdvAmt : 35448552 <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*GeneralInstructions : There are many general instructions. <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*DateShipped : 20161128 <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*<br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*IssueDetails.PlaceOfIssue : Place 1 <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*IssueDetails.DateOfIssue : 20171228 <br/>*/}
                                        {/*<br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*NumBol : 15555 <br/>*/}
                                        {/*<br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*MasterInfo.FirstName : First name masterinfo <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*MasterInfo.LastName : last name masterinfo <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*MasterInfo.Sig : teste <br/>*/}


                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*AgentForMaster.FirstName : First name masterinfo <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*AgentForMaster.LastName : last name masterinfo <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*AgentForMaster.Sig : teste <br/>*/}


                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*AgentForOwner.FirstName : First name masterinfo <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*AgentForOwner.LastName : last name masterinfo <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*AgentForOwnerSig : teste <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*ConditionsForCarriage : blablabsla <br/>*/}

                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*EncryptionMetaData : <br/>*/}

                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*Signhash : /t6CXddokVckXt1OGtmYmw== <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*Signature : 1453166459388149541856721135232200190801181842112215522622612514712315111117584271871141111541282020211623918863471322097161131108513118253130114191353534802491947725 <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*Verified : true <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*Transmitted : true <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*Amendment : <br/>*/}
                        {/*<span className="eye"><Checkbox  className={classes.checkbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked={this.state.decrypted} value={this.transaction.Shipper} /></span>*/}
                        {/*Private : <br/>*/}
                    </div>
                </div>
            </div>
        );
    }
}

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,

    },
    doc: {
        margin: theme.spacing.unit,

    },
    block: {
        maxWidth: 250,
    },
    checkbox: {
     //   marginBottom: 16,
     //   color: green[500],
        visibility: "hidden",
        height:0
    },
    checkboxHidden: {
        //   marginBottom: 16,
        //   color: green[500],
        visibility: "hidden",
    },
    checkboxVisible: {
        //   marginBottom: 16,
        //   color: green[500],
        visibility: "visible",
        height:20,

    },
    root: {
        visibility: "hidden",
        height:0

    },
});
Transaction.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withTracker(props => {
    const handle = Meteor.subscribe('transactions');
    return {
        //currentUser: Meteor.user(),
        listLoading: !handle.ready(),
        transactions: Transactions.find().fetch(),
    };
})(withStyles(styles)(Transaction));