import React from 'react';
// import AccessingVineyard from '../../../ui/pages/clientSide/AccessingVineyard';
 //import {composeWithTracker} from 'react-komposer';
import {compose} from "react-komposer";//'meteor/nicocrm:react-komposer-tracker'
import {Transactions} from '/imports/api/lib/collections';
import { withTracker } from 'meteor/react-meteor-data';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
//import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// var Mnemonic = require('bitcore-mnemonic');
// var Buffer = require('buffer/').Buffervar Mnemonic = require('bitcore-mnemonic');
// var Buffer = require('buffer/').Buffer
const Instascan = require('instascan');

class Layout extends React.Component {
    state = {
        open: true,
    };

    // constructor(p){
    //     super(p)
    //     this.props = p;
    //     state = {
    //         open: true,
    //     };
    // }
    ScanTransactionQrCode =()=>
    {
        this.setState({open:true})
        this.state.open = true;
        FlowRouter.go("/scan")
        return;
        let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
        this.scanner = scanner;
        scanner.addListener('scan', function (content) {
            console.log(content);
        });
        Instascan.Camera.getCameras().then(function (cameras) {
            if (cameras.length > 0) {
                scanner.start(cameras[0]);
            } else {
                console.error('No cameras found.');
            }
        }).catch(function (e) {
            console.error(e);
        });
    }
    EnterTx = (e) =>
    {
        if(e.key=="Enter")
        {
           // alert(e.target.value.length)
            this.scanner.stop()
         // FlowRouter.go("/t/"+  e.target.value)
        }
    }
    ChangeTx = (e) =>
    {
        if(e.target.value.length==68)
        {

            FlowRouter.go("/t/"+  e.target.value)
        }
    }
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    New = () =>
    {
        this.setState({"Id":"BFTX"})
        this.setState({"Shipper":""})
        this.setState({mode:"new"})
        FlowRouter.go("/n/BFTX")
    }
    render() {
       console.log(this.state.open)

        // return(
        //     <div>
        //         <Button  variant="raised" size="medium" color="primary" onClick={this.ScanTransactionQrCode} >
        //             Camera Scan Transaction QR Code
        //         </Button>
        //         <Dialog
        //     open={this.state.open}
        //     onClose={this.handleClose}
        //     aria-labelledby="alert-dialog-title"
        //     aria-describedby="alert-dialog-description"
        // >
        //     <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        //     <DialogContent>
        //         <DialogContentText id="alert-dialog-description">
        //             Let Google help apps determine location. This means sending anonymous location data to
        //             Google, even when no apps are running.
        //         </DialogContentText>
        //     </DialogContent>
        //     <DialogActions>
        //         <Button onClick={this.handleClose} color="primary">
        //             Disagree
        //         </Button>
        //         <Button onClick={this.handleClose} color="primary" autoFocus>
        //             Agree
        //         </Button>
        //     </DialogActions>
        // </Dialog></div>)

        const { classes } = this.props;
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];

        return (

            <div className="wrapper">

                {/*<Modal*/}
                    {/*aria-labelledby="simple-modal-title"*/}
                    {/*aria-describedby="simple-modal-description"*/}
                    {/*open={true}*/}
                    {/*onClose={this.handleClose}*/}
                {/*>*/}
                    {/*<div style={getModalStyle()} >*/}
                        {/*<Typography variant="title" id="modal-title">*/}
                            {/*Text in a modal*/}
                        {/*</Typography>*/}
                        {/*<Typography variant="subheading" id="simple-modal-description">*/}
                            {/*Duis mollis, est non commodo luctus, nisi erat porttitor ligula.*/}
                        {/*</Typography>*/}
                        {/*<div>test</div>*/}
                        {/*/!*<video id="preview"></video>*!/*/}
                        {/*/!*<SimpleModalWrapped />*!/*/}
                    {/*</div>*/}
                {/*</Modal>*/}

                <link href="//cdn.muicss.com/mui-0.9.39/css/mui.min.css" rel="stylesheet" type="text/css" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <div>
                    <a href="/"><img src="/images/blockfreight_logo_grey.svg" width="300px" /></a>

                    {/*<div className="header">Block Explorer</div>*/}
                </div>
                <div className="noPrint">
                <div className="float-left">
                    <TextField className={classes.button}

                               onKeyPress={this.EnterTx}
                               onChange={this.ChangeTx}
                               id="search"
                               label="Lookup Transaction by 24 word mnomonic phrase or BFTX code"
                               type="search"
                               fullWidth={true}
                               margin="normal"
                    />
                    <Button variant="raised" size="medium" color="primary" className={classes.button} onClick={this.New}>
                        New
                    </Button>
                    <Button className={classes.button} variant="raised" size="medium" color="primary" onClick={this.ScanTransactionQrCode} >
                        &nbsp;Camera Scan Transaction QR Code&nbsp;
                    </Button>




                </div>

            </div>
                <div>
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
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
const styles = theme => ({
    button: {
        margin: theme.spacing.unit,

    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});
Layout.propTypes = {
    classes: PropTypes.object.isRequired,
};



Layout = withTracker(props => {
    // Do all your reactive data access in this method.
    // Note that this subscription will get cleaned up when your component is unmounted
    const handle = Meteor.subscribe('transactions');

    return {
        //currentUser: Meteor.user(),
        listLoading: !handle.ready(),
        transactions: Transactions.find().fetch(),
    };
})(withStyles(styles)(Layout));
export default Layout