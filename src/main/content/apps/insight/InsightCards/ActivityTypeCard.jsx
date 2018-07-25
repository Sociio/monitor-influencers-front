import React, { Component } from 'react';
import Widget from '../widgets/Widget7';
import dataParser from './data/activityTypeData';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CircularProgress, Card } from '@material-ui/core';
import * as Actions from '../store/actions';

class ActivityTypeCard extends Component {
  // componentDidMount() {
  //   if (!(this.props.data.length > 0)) {
  //     const { from, to } = this.props;
  //     this.props.getData('42ig8yrfd5jhwrmy83', from, to);
  //   }
  // }

  render() {
    const { loading, data, size } = this.props;
    const options = {
      popovertext: data.message,
      data: dataParser(data.data),
      title: 'activities Types'
    };

    return (
      <React.Fragment>
        {loading ? (
          <Card style={{ textAlign: 'center' }}>
            <CircularProgress className="my-16" />
          </Card>
        ) : (
          <Widget {...options} size={size} />
        )}
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getData: Actions.getActivityData
    },
    dispatch
  );
}

function mapStateToProps({ insightApp }) {
  return {
    data: insightApp.insight.activityData,
    loading: insightApp.insight.activityFetching
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityTypeCard);
