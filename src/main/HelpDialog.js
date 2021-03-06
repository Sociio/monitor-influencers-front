import React, { Component } from "react";
import {
  Button,
  Icon,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

import { envDetails, hiUser } from "fn";

var registerServiceWorker = require("../registerServiceWorker.js");

const waitFunction = async ms => {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
};

export default class HelpDialog extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleReload = async () => {
    registerServiceWorker.unregister();
    await waitFunction(300);
    registerServiceWorker.default();
    await waitFunction(300);
    window.location.assign("/?c=" + new Date().getTime() + Math.random());
  };

  render() {
    return (
      <div>
        <IconButton className="w-64 h-64" onClick={this.handleClickOpen}>
          <Icon>live_help</Icon>
        </IconButton>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Contact Support</DialogTitle>
          <DialogContent>
            <DialogContentText className={"mb-16"}>
              <strong>Need assistance?</strong> Please email hello@beaux.media and we'll get you the help you need.
              Please include the details below in your request to help our team process your request.
            </DialogContentText>
            <pre className={"language-markup"}>
              Version: {envDetails.version}; Build: {envDetails.build}; Session: {hiUser().baTokenReference}
            </pre>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleReload} color="secondary">
              Reload Appplication
              <Icon>refresh</Icon>
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
