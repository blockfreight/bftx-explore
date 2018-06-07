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
import _ from "lodash"
import TextField from '@material-ui/core/TextField';
import CryptoJS from 'crypto-js';

var crypto = require("crypto");
var eccrypto = require("eccrypto");

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

class Field extends React.Component
{
    state ={name:"",value:""}
    constructor(p){
        super(p)
        this.state ={name:"",value:""}
        //this.setState({name:p.name})

        this.isNew = true;
        //p.state.setState({p.name.toString() :""})

        if(_.get(this, 'props.node['+this.props.name+']')) {
            // if (undefined != this.props.node[this.props.name]) {
            //this.setState({value:this.props.transaction.Properties[this.props.name]});
            this.state = {name: this.props.name, value: this.props.node[this.props.name]}
            this.isNew = false;
            // }
        }else{
            //
            this.state.value = "";
        }
    }
    VisibilityChange = (o) =>
    {
        this.props.state.docKey ="test"
    }
    FieldChange = (o)=>
    {
        if(this.props.state.mode=="new")
        {
            this.props.state.mode = "edit"
        }


        console.log(o.target.id + " " + o.target.value)

        //this.props.state.Properties[o.target.id]  = Object.assign(this.props.state.Properties[o.target.id],obj)
        //this.props.state.Properties[o.target.id] = this.props.state.Properties[o.target.id] ||{}
        obj = {}
        obj[o.target.id] = this.state.keyEncrypted;
        this.props.state.Properties["EncryptionMetaData"] = this.props.state.Properties["EncryptionMetaData"] ||{}
        this.props.state.Properties["EncryptionMetaData"] = Object.assign(this.props.state.Properties["EncryptionMetaData"],obj)
        this.props.state.Properties["EncryptionMetaData"] = Object.assign(this.props.state.Properties["EncryptionMetaData"],{keyType:this.state.keyType})
        this.props.state.Properties[o.target.id]= this.encryptDataToString(o.target.value, this.state.key);//o.target.value

        //this.props.state.Properties[o.target.id].meta = {key:this.state.key}
        this.setState({value:o.target.value})
        this.setState({encryptedValue:this.encryptDataToString(o.target.value, this.state.key)});
        // this.state.value = this.state.value + o.target.value
        // this.setState();


    }
    //FieldChange.bind(this)
    shouldComponentUpdate(nextProps, nextState){
    // return a boolean value
    return true;
}
    arrayToAscii  (arr) {
        var res = [];
        for (var i = 0; i < arr.length; i++) {
            res.push(String.fromCharCode(arr[i]));
        }
        return res.join("");
    };
    ViewMode()
    {
        const { classes } = this.props;
        if(_.get(this, 'props.node['+this.props.name+']') && this.props.name !="Id" && this.props.name !="TxTimestamp") {
            if(FlowRouter.current().params.k ==undefined)
            {
                this.state.value
                return(<div></div>);
            }
            // if (undefined != this.props.node[this.props.name]) {
            //this.setState({value:this.props.transaction.Properties[this.props.name]})
            this.state = {name: this.props.name, value: this.props.node[this.props.name]}
                this.isNew = false;
            //console.log(this.decryptDataFromText(JSON.parse(this.arrayToAscii(Base64.decode(_.get(this, 'props.node[EncryptionMetaData]'))))[this.props.name],"0.9761703231864409"))
            filedKey = this.decryptDataFromText(JSON.parse(this.arrayToAscii(Base64.decode(_.get(this, 'props.node[EncryptionMetaData]'))))[this.props.name],this.props.state.docKey);//"0.150276099894739");
            console.log("filedKey: " + filedKey)
            console.log("encryptedValue: "+this.props.node[this.props.name])
            console.log("filedValue: " + this.decryptDataFromText(this.props.node[this.props.name],filedKey));
            this.state.value = this.decryptDataFromText(this.props.node[this.props.name],filedKey);
            style={"width":"29%"}
            // }
        }else {
            if(this.props.name =="Id")
            {
                this.state.value  = FlowRouter.current().params.t
                style={"width":"65%"}
            }
            else {
                style={"width":"29%"
            }

           }
        }
        //JSON.parse(this.arrayToAscii(Base64.decode(_.get(this, 'props.node[EncryptionMetaData]')))).Shipper

        //console.log(JSON.parse(this.arrayToAscii(Base64.decode(this.props.node.Properties.EncryptionMetaData))))
            return (
                <span style={{"whiteSpace": "nowrap"}}>
           <span className="eye">
               <Checkbox className={classes.checkbox} icon={<FavoriteBorder/>}
                         checkedIcon={<Favorite/>} defaultChecked={true}
                         onChange={this.VisibilityChange}
                         value={"da"}/></span>
               <TextField className={classes.button}
                          id={this.props.name}
                          label={this.props.name}
                          type="text"
                          value={this.state.value}
                          margin="-50"
                          disabled={true}
                          underlineShow={false}
                          onChange={this.FieldChange}
                          style={style}
               />
       </span>
            )
    }
    EditMode()
    {
        const { classes } = this.props;
        style={"width":"30%"}
        return (
            <span style={{"whiteSpace": "nowrap"}}>
             <span className="eye" >
            <Checkbox className={classes.checkbox} icon={<FavoriteBorder/>}
                      checkedIcon={<Favorite/>} defaultChecked={false}
                      value={"da"}/></span>
                <TextField className={classes.button}
                    value={this.state.value}
                    id={this.props.name}
                    label={this.props.name}
                    type="search"
                           style={{"color":"black"}}
                    onChange={this.FieldChange.bind(this)}
                    margin="dense"
                           style={style}

             />

            </span>)
    }

    encryptDataToString = function (data, secret) {
    if(typeof data == 'undefined') return;
    if(typeof data == 'string' && data !== ''){
        return CryptoJS.AES.encrypt(data, secret).toString();
    }else if(typeof data == 'object'){
        return CryptoJS.AES.encrypt(JSON.stringify(data), secret).toString();
    }
};

    decryptDataFromText = function (data, secret, json) {
    if(typeof data == 'undefined') return;
    if(typeof data == 'string' && data !== ''){
        const bytes = CryptoJS.AES.decrypt(data, secret);
        if(json){
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }else{
            return bytes.toString(CryptoJS.enc.Utf8)
        }
    }
};
    EncryptedKey(key)
    {

        return  this.encryptDataToString(key.toString(), this.props.state.docKey.toString())


        //todo implement eliptical curve encryption
        //--figure out how to persist integer array to string and then restore from string to integer array (serialize/deserialize object)
        // var crypto = require("crypto");
        // var id = crypto.randomBytes(20).toString('hex'
        //var convertHex = Buffer.from('548e09f70356a1237594fbe489e33684', 'hex');
        // x =  await eccrypto.encrypt(await eccrypto.getPublic(this.props.state.docKey), key);
        // return x
        //var privateKeyA = this.props.state.docKey;//crypto.randomBytes(32);
        //console.log(key);
        // var privateKey = new bitcore.PrivateKey('L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy');
        //
        //
        // var publicKeyA = eccrypto.getPublic(this.props.state.docKey);
        // encryptedKey = await eccrypto.encrypt(publicKeyA,key)
        //
        // cypher = encryptedKey.ciphertext
        // console.log("base64encoded "+ Base64.encode(cypher))//Base64.encode(x));
        // console.log("decoded "+ Base64.encode(await eccrypto.decrypt(this.props.state.docKey,encryptedKey)))
        // return  Base64.encode(x.toString());
    }
    render()
    {

        //this.state ={name:"",value:""}
        console.log(this.state)
        //classes = withStyles(styles);
        const { classes } = this.props;
        switch (this.props.state.mode)
        {
            case "new":
                this.state.value = ""
                this.state.key = crypto.randomBytes(32).toString('hex');//"test";//Math.random().toString();
                //console.log(this.state.key )
                this.state.keyEncrypted =   this.EncryptedKey(this.state.key);
                this.state.keyType ="AES"
                // this.state.key = Math.random();
                // this.state.keyType ="Math.random()"
                return this.EditMode();

                break;
            case  "edit":
                return this.EditMode();
                break;
            default:
                return this.ViewMode()

                break;
        }
        // if(this.props.state.mode=="new") {
        //     //this.state.value = ""
        //     this.props.node = {};
        //     return (
        //         <span>
        //             <span className="eye">
        //                 <Checkbox className={classes.checkbox} icon={<FavoriteBorder/>}
        //                           checkedIcon={<Favorite/>} defaultChecked={false}
        //                           value={"da"}/></span>
        //              <TextField className={classes.button}
        //                         value={this.state.value}
        //                         id={this.props.name}
        //                         label={this.props.name}
        //                         type="search"
        //                         onChange={this.FieldChange}
        //                         margin="dense"
        //              />
        //             <br/>
        //         </span>)
        //
        // }else {
        //     if(_.get(this, 'props.node['+this.props.name+']')) {
        //         // if (undefined != this.props.node[this.props.name]) {
        //         //this.setState({value:this.props.transaction.Properties[this.props.name]});
        //         this.state = {name: this.props.name, value: this.props.node[this.props.name]}
        //         this.isNew = false;
        //         // }
        //     }
        //     return (
        //         <span>
        //             <span className="eye">
        //                 <Checkbox className={classes.checkbox} icon={<FavoriteBorder/>}
        //                           checkedIcon={<Favorite/>} defaultChecked={false}
        //                           value={"da"}/></span>
        //                 <TextField className={classes.button}
        //                            id={this.props.name}
        //                            label={this.props.name}
        //                            type="search"
        //                            value={this.state.value}
        //                            margin="dense"
        //                            onChange={this.FieldChange}
        //                 /><br/>
        //         </span>
        //     )
        // }
    }
}

export default withStyles(styles)(Field)

