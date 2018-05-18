import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// import AccessingVineyard from '../../../ui/pages/clientSide/AccessingVineyard';
//import {composeWithTracker} from 'react-komposer';
import {compose} from "react-komposer";//'meteor/nicocrm:react-komposer-tracker'
import {Transactions} from '/imports/api/lib/collections';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
const Instascan = require('instascan');
class Decrypt extends React.Component {
    constructor(p){
        super(p)
        this.props = p;
    }
    Decrypt = () =>
    {

    }
    Print = () =>
    {
        window.print();
    }
    Send = () =>
    {
        location.href="mailto:?subject=Transaction:" + this.transaction.Id + "&body="+location.href
    }
    Pdf = () =>
    {
        alert("todo: Download PDF")
    }
    Done = () =>
    {
        FlowRouter.go("/")
    }
    componentWillUnmount()
    {
        this.scanner.stop()
    }

    componentDidMount()
    {
        let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
        this.scanner = scanner;
        scanner.addListener('scan', function (content) {
            if(!content.startsWith("BFT"))
            {
                alert("Not a transaction")
                return;
            }
            FlowRouter.go("/t/"+content);
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
    render() {
        //const { classes } = this.props;

        return (
            <div className="wrapper">
                <h1>Scan Secret/Private Key</h1>
                <video className="preview" id="preview"></video>
            </div>
        );
    }
}

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,

    },
});
Decrypt.propTypes = {
    classes: PropTypes.object.isRequired,
};
// export default withTracker(props => {
//
// })(withStyles(styles)(Scan));
export default Decrypt