import React from 'react';


export default class Layout extends React.Component {
    render() {
        return (

            <div className="wrapper">
                <img src="/images/blockfreight_logo_grey.svg" width="300px" /> Explorer
                <div className="app2">
                    {this.props.main}
                </div>
            </div>

        );
    }
}