/**
 * Style Guide
 */
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import moment from 'moment';
// import moment from 'moment-timezone';
import {
  Text,
  AppColors,
  AppStyles,
} from 'roverz-chat';

// import ContactsService from '@containers/contacts/ContactsService';
import TimelineView from './TimelineView';
import eventTrans from './ICalDataProcess';
// import CalendarService from './CalendarService';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  // Tab Styles
  tabContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabbar: {
    backgroundColor: AppColors.brand().secondary,
  },
  tabbarIndicator: {
    backgroundColor: AppColors.brand().secondary,
  },
  tabbar_text: {
    color: '#FFF',
  },

  container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
    marginTop: 20,
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
    marginLeft: 10,
    color: 'gray',
    fontFamily: 'OpenSans-Regular',
  },
});

/* Component ==================================================================== */
class EventAgenda extends Component {
  static componentName = 'EventAgenda';

  constructor(props) {
    super(props);
    let events = null;
    if (props.ical) {
      eventTrans.loadEvents(props.ical);
    }
    events = eventTrans.getEvents();
    this.state = {
      navigation: {
        index: 0,
        routes: [
          { key: '0', title: 'Day1' },
          { key: '1', title: 'Day2' },
          { key: '2', title: 'Day3' },
          { key: '3', title: 'Day4' },
          { key: '4', title: 'Day5' },
        ],
      },
      eventTrans: events,
    };
  }

  /**
    * On Change Tab
    */
  handleChangeTab = (index) => {
    this.setState({
      navigation: { ...this.state.navigation, index },
    });
  }

  renderDate(date) {
    return (
      <View
        style={{
          marginHorizontal: 15,
          marginVertical: 10,
          backgroundColor: '#E2E2E2',
          borderRadius: 3,
          padding: 5,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: '#222',
            fontFamily: 'OpenSans-Regular',
            fontWeight: '200',
          }}
        >{moment(date).format('ddd, MMM Do YYYY')}</Text>
      </View>
    );
  }

  /**
    * Which component to show
    */
  renderScene = ({ route }) => {
    // console.log('renderScene', this.state.eventTrans);

    if (this.state.eventTrans) {
      switch (route.key) {
        case '0' :
          return (
            <View style={styles.tabContainer}>
              {this.renderDate(this.state.eventTrans[0][0].timeFull)}
              <ScrollView
                automaticallyAdjustContentInsets={false}
                style={[AppStyles.windowWidth, { backgroundColor: '#fff' }]}
              >
                <TimelineView dayIndex={0} />
              </ScrollView>
            </View>
          );
        case '1' :
          return (
            <View style={styles.tabContainer}>
              {this.renderDate(this.state.eventTrans[1][0].timeFull)}
              <ScrollView
                automaticallyAdjustContentInsets={false}
                style={[AppStyles.windowWidth, { backgroundColor: '#fff' }]}
              >
                <TimelineView dayIndex={1} />
              </ScrollView>
            </View>
          );
        case '2' :
          return (
            <View style={styles.tabContainer}>
              {this.renderDate(this.state.eventTrans[2][0].timeFull)}
              <ScrollView
                automaticallyAdjustContentInsets={false}
                style={[AppStyles.windowWidth, { backgroundColor: '#fff' }]}
              >
                <TimelineView dayIndex={2} />
              </ScrollView>
            </View>
          );
        case '3' :
          return (
            <View style={styles.tabContainer}>
              {this.renderDate(this.state.eventTrans[3][0].timeFull)}
              <ScrollView
                automaticallyAdjustContentInsets={false}
                style={[AppStyles.windowWidth, { backgroundColor: '#fff' }]}
              >
                <TimelineView dayIndex={3} />
              </ScrollView>
            </View>
          );
        case '4' :
          return (
            <View style={styles.tabContainer}>
              {this.renderDate(this.state.eventTrans[4][0].timeFull)}
              <ScrollView
                automaticallyAdjustContentInsets={false}
                style={[AppStyles.windowWidth, { backgroundColor: '#fff' }]}
              >
                <TimelineView dayIndex={4} />
              </ScrollView>
            </View>
          );
        default :
          return null;
      }
    }
  }

  /**
    * Header Component
    */
  renderHeader = props => (
    <View>
      <TabBar
        {...props}
        style={[styles.tabbar, {
          height: 32,
          // borderWidth: 1,
          paddingHorizontal: 10,
        }]}
        indicatorStyle={[styles.tabbarIndicator, {
          borderColor: 'white',
          borderWidth: 1,
          height: 30,
          borderRadius: 15,
        }]}
        tabStyle={{
          height: 30,
          marginHorizontal: 5,
          alignItems: 'stretch',
          padding: 0,
        }}
        labelStyle={{

        }}
        renderLabel={scene => (
          <View
            style={{
              borderColor: '#FFF',
              borderWidth: scene.focused ? 1 : 0,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 15,
              paddingHorizontal: 0,
            }}
          >
            <Text
              style={[{
                color: 'white',
                fontSize: 12,
              }]}
              numberOfLines={1}
            >{scene.route.title.toUpperCase()}</Text>
          </View>
          )
        }
        renderIndicator={() => (null)}
        /*
        renderIndicator={(scene) => {
          console.log('scene');
          console.log(scene);
          const { width, position } = props;
          const translateX = Animated.multiply(
            Animated.multiply(position, width),
            I18nManager.isRTL ? -1 : 1,
          );
          return (
            <Animated.View
              style={[{
                backgroundColor: '#ffeb3b',
                position: 'absolute',
                left: 0,
                bottom: 0,
                right: 0,
                height: 2,
              },
                { width, transform: [{ translateX }] },
              ]}
            />
          );
        }}
        */
      />
      <View
        style={{
          height: 10,
          backgroundColor: AppColors.brand().secondary,
        }}
      />
    </View>
  )

  render = () => (
    <TabViewAnimated
      style={[styles.tabContainer]}
      renderScene={this.renderScene}
      renderHeader={this.renderHeader}
      navigationState={this.state.navigation}
      onIndexChange={this.handleChangeTab}
    />
  )
}

EventAgenda.defaultProps = {
  ical: null,
};

EventAgenda.propTypes = {
  ical: React.PropTypes.object,    // eslint-disable-line react/forbid-prop-types
};

/* Export Component ==================================================================== */
export default EventAgenda;
