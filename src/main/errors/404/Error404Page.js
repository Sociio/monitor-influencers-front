import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import { Typography } from "@material-ui/core";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { FuseAnimate } from "@fuse";

const styles = theme => ({
  root: {},
  searchWrapper: {
    width: "100%",
    height: 56,
    padding: 18,
    display: "flex",
    alignItems: "center"
  },
  search: {
    paddingLeft: 16
  }
});

class Error404Page extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classNames(classes.root, "flex flex-col flex-1 items-center justify-center p-16")}>
        <div className="max-w-768 text-center">
          <FuseAnimate animation="transition.expandIn" delay={100}>
            <Typography variant="display4" color="inherit" className="font-medium mb-16">
              O...
            </Typography>
          </FuseAnimate>
          <FuseAnimate delay={500}>
            <Typography variant="headline" color="textSecondary" className="mb-16">
              This content isn't available at the moment.
            </Typography>
          </FuseAnimate>
          <FuseAnimate delay={700}>
            <Typography variant="Subheading" color="textSecondary" className="mb-16">
              The link you followed may have expired, or the content may not be available for you.
            </Typography>
          </FuseAnimate>
          <Link className="font-medium" to="/index">
            Go back to main page
          </Link>{" "}
          ·{" "}
          <Link className="font-medium" to="/support">
            Contact support.
          </Link>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Error404Page);
