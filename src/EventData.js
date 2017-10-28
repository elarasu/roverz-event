/**
 * Style Guide
 */
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import { Text, AppColors, AppStyles } from 'roverz-chat';

// Components
import CalendarService from './CalendarService';

const styles = StyleSheet.create({
  // Tab Styles
  tabContainer: {
    flex: 1,
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
  txtTitle: {
    fontSize: 20,
    color: '#000',
    lineHeight: 24,
    fontWeight: '400',
    marginBottom: 20,
  },
  txtPara: {
    fontSize: 14,
    color: '#818181',
    fontWeight: '400',
    lineHeight: 18,
    marginVertical: 10,
  },
});

var { height, width } = Dimensions.get('window');

export default class EventData extends Component {
  static componentName = 'EventData';

  constructor(props) {
    super(props);
    const eventData = this.props.data;
    this.state = {
      eventData,
      layout: {
        height,
        width,
      },
      showAdd: true,
    };
  }

  componentDidMount() {
    // console.log('EventAgenda', eventTrans);
    this.cs = new CalendarService();
    this.cs.init();
    // // just temporary - for testing
    // const contacts = new ContactsService();
    // contacts.init();
  }

  _onLayout = (event) => {
    this.setState({
      layout: {
        height: event.nativeEvent.layout.height,
        width: event.nativeEvent.layout.width,
      },
    });
  }

  /**
    * On Change Tab
    */
  handleChangeTab = (index) => {
    this.setState({
      navigation: { ...this.state.navigation, index },
    });
  }

  addToAgenda = () => {
    console.log('addToAgenda');
    // this.cs.listAllEvents();
    const start = moment(this.state.eventData.rawSt.toString()).toISOString();
    const end = moment(this.state.eventData.rawEn.toString()).toISOString();
    // saveTest(title, location, notes, startDate, endDate)
    this.cs.saveToAgenda(
      this.state.eventData.title,
      this.state.eventData.location,
      this.state.eventData.description,
      start,
      end,
    );
  }

  renderAddButton() {
    if (this.state.showAdd) {
      return (
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 30,
            backgroundColor: AppColors.brand().fifth,
            borderWidth: 1,
            borderColor: '#FFF',
            borderRadius: 30,
          }}
          onPress={this.addToAgenda}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: '#FFF',
            }}
          >ADD TO MY AGENDA</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={{
          paddingVertical: 10,
          paddingHorizontal: 30,
          backgroundColor: '#17b546',
          borderWidth: 1,
          borderColor: '#FFF',
          borderRadius: 30,
        }}
        // onPress={this.addToAgenda}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: '400',
            color: '#FFF',
          }}
        >ADDED TO MY AGENDA</Text>
      </TouchableOpacity>
    );
  }

  /* eslint-enable global-require */

  render = () => (
    <View style={[styles.tabContainer, { paddingTop: 30 }]}>
      <View style={styles.tabContainer} onLayout={this._onLayout}>
        <View
          style={{
            position: 'absolute',
            bottom: 70,
            left: 0,
            right: 0,
            alignItems: 'center',
            zIndex: 999,
          }}
        >
          {this.renderAddButton()}
        </View>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          style={[AppStyles.windowWidth, {
            width: this.state.layout.width,
            paddingHorizontal: 20,
            paddingTop: 50,
          }]}
        >
          {/* @todo: react-native-htmlview to be added ? */}
          <Text style={[styles.txtTitle]}>
            {this.state.eventData.title}
          </Text>
          <Text style={{ fontSize: 12, color: AppColors.brand().fifth }}>TIME</Text>
          <Text style={[styles.txtPara, { fontSize: 16 }]}>
            {this.state.eventData.timeFull} - {this.state.eventData.endTime}
          </Text>
          <Text style={{ fontSize: 12, color: AppColors.brand().fifth }}>LOCATION</Text>
          <Text style={[styles.txtPara, { fontSize: 16 }]}>
            {this.state.eventData.location}
          </Text>
          {/* <Tile
            imageSrc={require('../../images/image.png')}
            imageContainerStyle={{
              width: this.state.layout.width - 40,
              marginBottom: 20 }}
            featured
          /> */}
          <Text style={[styles.txtPara]}>
            {this.state.eventData.description}
          </Text>
          <View style={{ marginBottom: 100 }} />
        </ScrollView>
      </View>
    </View>
  )
}

EventData.defaultProps = {
  data: {},
};

EventData.propTypes = {
  data: React.PropTypes.object,    // eslint-disable-line react/forbid-prop-types
};
