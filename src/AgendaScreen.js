import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import { Agenda } from 'react-native-calendars';
import { AppColors } from 'roverz-chat';
import CalendarService from './CalendarService';

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {
        '2017-10-28': [],
      },
    };
    this.cs = new CalendarService();
    this.cs.init();
    this._listEventsCallback = this._listEventsCallback.bind(this);
  }

  componentWillMount() {
    // const newItems = this.cs.listAllEvents();
    // console.log('calStatus newItems', newItems);
    /* if (newItems) {
      this.setState({
        items: newItems,
      });
      console.log('this.state.items', this.state.items);
    } */
  }

  componentDidMount() {
    this.cs.listAllEvents(this._listEventsCallback);
  }

  _listEventsCallback(msg, data) {
    console.log('calStatus _listEventsCallback');
    const _su = this;
    if (msg === 'SUCCESS') {
      _su.setState({
        items: data,
      });
      console.log('calStatus _listEventsCallback', _su.state.items);
    } else {
      console.log('calStatus _listEventsCallback err');
    }
  }

  selectedDate() {
    if (this.state.items === {}) {
      this.setState({
        items: { '2017-10-28': [] },
      });
      return '2017-10-28';
    }
    const items = this.state.items;
    console.log(items[Object.keys(items)[0]]);
    return items[Object.keys(items)[0]];
  }

  loadItems = (/* day */) => {
    // setTimeout(() => {
    //   for (let i = -15; i < 85; i += 1) {
    //     const time = day.timestamp + (i * 24 * 60 * 60 * 1000);
    //     const strTime = this.timeToString(time);
    //     if (!this.state.items[strTime]) {
    //       this.state.items[strTime] = [];
    //       const numItems = Math.floor(Math.random() * 5);
    //       for (let j = 0; j < numItems; j += 1) {
    //         this.state.items[strTime].push({
    //           title: `Item for ${strTime}`,
    //           height: Math.max(50, Math.floor(Math.random() * 150)),
    //         });
    //       }
    //     }
    //   }
    //   // console.log(this.state.items);
    //   const newItems = {};
    //   Object.keys(this.state.items).forEach((key) => { newItems[key] = this.state.items[key]; });
    //   this.setState({
    //     items: newItems,
    //   });
    // }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  renderItem(item) {
    return (
      <View style={[styles.item]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name="access-time"
            type="MaterialIcons"
            size={24}
            color={AppColors.brand().third}
            style={{ width: 40, alignItems: 'center' }}
          />
          <Text style={{
            fontFamily: 'OpenSans-Regular',
            fontSize: 18,
            fontWeight: '300',
            color: AppColors.brand().third,
            marginBottom: 5,
            flex: 1,
            justifyContent: 'center',
          }}
          >{`${moment(item.startDate).format('LT')} - ${moment(item.endDate).format('LT')}`}</Text>
        </View>
        <View style={{ height: 1, backgroundColor: '#eaeaea', marginVertical: 10 }} />
        <View style={{ flexDirection: 'row' }}>
          <Icon
            name="event-note"
            type="MaterialIcons"
            size={20}
            color={'#eaeaea'}
            style={{ width: 40, justifyContent: 'flex-start', alignItems: 'center' }}
          />
          <Text style={{
            fontFamily: 'OpenSans-Regular',
            fontSize: 14,
            color: '#666666',
            marginBottom: 5,
            flex: 1,
          }}
          >{item.title}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Icon
            name="location-on"
            type="MaterialIcons"
            size={20}
            color={'#eaeaea'}
            style={{ width: 40, justifyContent: 'flex-start', alignItems: 'center' }}
          />
          <Text style={{
            fontFamily: 'OpenSans-Regular',
            fontSize: 12,
            // color: '#9b9b9b',
            color: '#666666',
            marginBottom: 5,
            flex: 1,
          }}
          >{item.location ? item.location : 'N/A'}</Text>
        </View>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={[styles.item, { height: 20 }]}>
        <Text style={{ fontSize: 14, color: '#9b9b9b', marginBottom: 5 }}>Add events from Schedule to My Agenda!</Text>
      </View>
    );
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems}
        selected={'2017-10-28'}
        renderItem={this.renderItem.bind(// eslint-disable-line react/jsx-no-bind
        this)}
        renderEmptyDate={this.renderEmptyDate.bind(// eslint-disable-line react/jsx-no-bind
        this)}
        rowHasChanged={this.rowHasChanged.bind(// eslint-disable-line react/jsx-no-bind
        this)}
        onDayPress={(day) => {
          const oldItems = this.state.items;
          if (!oldItems[day.dateString]) {
            oldItems[day.dateString] = [];
            this.setState({
              items: oldItems,
            });
          }
        }}
      />
    );
  }
}
