import RNCalendarEvents from 'react-native-calendar-events';
import moment from 'moment';

/*
 * This class would be a wrapper to native calendar events. We will directly wire calendar events to
 * device calendar.
*/
class CalendarService {

  init() {
    // setup access
    RNCalendarEvents.authorizationStatus()
    .then((status) => {
      // handle status
      console.log('calStatus', status);
      if (status !== 'authorized') {
        RNCalendarEvents.authorizeEventStore()
        .then((status1) => {
          console.log('calStatus', status1);
        })
        .catch((error) => {
         // handle error
          console.log('calStatus', error);
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
    // test: list calendars
    RNCalendarEvents.findCalendars()
    .then((calendars) => {
      // handle calendars
      console.log('calStatus calendars', calendars);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  saveToAgenda(title, location, notes, startDate, endDate) {
    RNCalendarEvents.saveEvent(title, {
      location,
      notes,
      startDate,
      endDate,
    })
    .then((id) => {
      // handle success
      console.log('calStatus', id);
    })
    .catch((error) => {
      // handle error
      console.log('calStatus', error);
    });
  }

  listAllEvents(callbackFn) {
    const returnEvents = {};
    RNCalendarEvents.fetchAllEvents('2017-10-19T19:26:00.000Z', '2017-11-19T19:26:00.000Z')
    .then((events) => {
      // handle events
      console.log('calStatus fetchAllEvents', events);
      /*
      {
        recurrence: '',
        location: 'Hall 6, Fira Gran Via, Barcelona, Spain',
        allDay: false,
        endDate: '2017-10-28T10:30:00.000Z',
        startDate: '2017-10-28T09:00:00.000Z',
        title: 'Early management of acute pancreatitis',
        calendar: {
          allowsModifications: false,
          isPrimary: false,
          title: '#contacts@group.v.calendar.google.com',
          source: 'email',
          id: '1'
        },
        description: 'Common mistakes in the initial ...the complicated case ',
        id: '10'
      }
      */
      events.forEach((value) => {
        // console.log('calStatus', value);
        const date = moment(value.startDate).format('YYYY-MM-DD');
        const eventArr = returnEvents[date] ? returnEvents[date] : [];
        eventArr.push(value);
        returnEvents[date] = eventArr;
      });
      if (!returnEvents['2017-10-28']) {
        returnEvents['2017-10-28'] = [];
      }
      console.log('calStatus forEach', returnEvents);
      callbackFn('SUCCESS', returnEvents);
    })
    .catch((error) => {
      // handle error
      console.log('calStatus fetchAllEvents err', error);
      callbackFn('ERROR', error);
    });
  }

}

export default CalendarService;
