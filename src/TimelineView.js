/**
 * Timeline List View
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import Timeline from 'react-native-timeline-listview';
import { Actions } from 'react-native-router-flux';
import { CachedImage } from 'react-native-img-cache';
import { AppStyles } from 'roverz-chat';
import eventTrans from './ICalDataProcess';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
    marginTop: 10,
  },
  title: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 0,
    marginBottom: 10,
  },
  descriptionContainer: {
    flexDirection: 'row',
    paddingRight: 55,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textDescription: {
    // marginLeft: 10,
    color: '#c4c4c4',
    fontFamily: 'OpenSans-Regular',
  },
});

/* eslint max-len: ["error", { "ignoreStrings": true }] */
export default class TimelineView extends Component {
  constructor(props) {
    super(props);
    this.onEventPress = this.onEventPress.bind(this);
    this.renderSelected = this.renderSelected.bind(this);
    this.renderDetail = this.renderDetail.bind(this);
    const dayIndex = this.props.dayIndex;
    this.state = {
      dayIndex,
      eventArray: {},
      dayEvents: [
        { time: '2017-06-30T17:00:00Z',
          title: 'Keynote by President',
          description: '',
        },
      ],
      calEvents: [],
    };
    this.dateArray = {};

    this.events = [];

    this.state = { selected: null };
  }
  /* eslint-enable global-require */

  componentWillMount() {
    // this.setState({ calEvents: this.eventTrans });
    // console.log('Will mount', this.state.dayData);
  }

  componentDidMount() {
    // console.log('Did mount', this.state.dayData);
    // this.setState({eventArray: {}});
  }

  onEventPress(data) {
    // this.setState({ selected: data });
    // console.log('onEventPress', data);
    Actions.eventDetails({ data });
  }

  eventData() {

  }

  renderSelected() {
    if (this.state.selected) {
      return (
        <Text style={{ marginTop: 10 }}>
          Selected event:
          {this.state.selected.title} at {this.state.selected.time}
        </Text>
      );
    }
  }

  renderTimeLine() {
    const events = eventTrans.getEvents();
    if (events) {
      return (
        <Timeline
          style={styles.list}
          data={events[this.props.dayIndex]}
          circleSize={10}
          circleColor="#7993E2"
          lineColor="#7993E2"
          timeContainerStyle={{ minWidth: 70, marginTop: -5 }}
          timeStyle={{ textAlign: 'right', backgroundColor: 'white', color: 'grey', marginTop: 3, fontSize: 14 }}
          descriptionStyle={{ color: 'gray', fontSize: 12 }}
          options={{
            style: { paddingTop: 5 },
          }}
          innerCircle={'icon'}
          onEventPress={this.onEventPress}
          renderDetail={this.renderDetail}
          detailContainerStyle={{
            paddingTop: 0, marginTop: -14, paddingBottom: 0 }}
          titleStyle={{ paddingTop: 0, fontSize: 10 }}
          separatorStyle={{ backgroundColor: '#E7E7E7' }}
          rowContainerStyle={{ paddingRight: 15 }}
          iconStyle={{ width: 20, height: 20 }}
        />
      );
    }
    return (
      <ActivityIndicator
        animating
        size={'large'}
        color={'#C1C5C8'}
        style={[AppStyles.windowSize, AppStyles.containerCentered]}
      />
    );
  }

  // renderDetail(rowData, sectionID, rowID) {
  renderDetail(rowData) {
    const title = <Text style={[styles.title]}>{rowData.title}</Text>;
    let desc = null;
    let loca = null;
    // console.log(rowID);
    if (rowData.description && rowData.imageUrl) {
      desc = (
        <View style={styles.descriptionContainer}>
          <CachedImage
            source={{ uri: rowData.imageUrl }}
            style={styles.image}
          />
          <Text style={[styles.textDescription]}>{rowData.description}</Text>
        </View>
      );
    }

    if (rowData.location) {
      loca = (
        <View style={styles.descriptionContainer}>
          <Text style={[styles.textDescription]}>{rowData.location}</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        {title}
        {desc}
        {loca}
      </View>
    );
  }
        //   innerCircle={'icon'}

  render() {
    // console.log('events', this.events);
    return (
      <View style={styles.container}>
        {this.renderSelected()}
        {this.renderTimeLine()}
      </View>
    );
  }
}

TimelineView.defaultProps = {
  dayIndex: 1,
};

TimelineView.propTypes = {
  dayIndex: React.PropTypes.number,
};
