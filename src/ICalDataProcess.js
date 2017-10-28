import ICAL from 'ical.js';
import moment from 'moment-timezone';

// import e3 from '@app/event';
// import e3 from '@app/uegw2017';

const ICalDataParser = {
  getEvents: () => ICalDataParser._events,
  loadEvents: (e3) => {
    const je1 = ICAL.parse(e3);
    const comp = new ICAL.Component(je1);
    const vevents = comp.getAllSubcomponents('vevent');
    const dateArray = {};
    const events = [];
    vevents.map((vevent) => {
      const event = new ICAL.Event(vevent);
      let dateGroup = event.startDate.toString();
      dateGroup = dateGroup.substring(0, dateGroup.lastIndexOf('T'));
      // console.log('event.summary', event.summary);
      if (!dateArray[dateGroup]) {
        dateArray[dateGroup] = [];
      }
      //    if (!this.groupSubsriptionMap.has(group)) {
      // console.log(dateGroup);
      // console.log(event.description);
      // console.log(event.attendees);
      // console.log(event.startDate.toString());
      // console.log(event.endDate.toString());
      // console.log(event.duration.toString());
      // console.log(event.location);
      // console.log(event.organizer);
      events.push({
        time: moment(event.startDate.toString()).format('lll'), // moment().format('LT');
        title: event.summary,
        description: event.description,
        location: event.location,
      });
      dateArray[dateGroup].push({
        timeFull: moment(event.startDate.toString()).tz('Africa/Abidjan').format('lll'),
        time: moment(event.startDate.toString()).tz('Africa/Abidjan').format('LT'),
        endTime: moment(event.endDate.toString()).tz('Africa/Abidjan').format('LT'),
        rawSt: event.startDate,
        rawEn: event.endDate,
        title: event.summary,
        description: event.description,
        location: event.location,
      });
      return null;
    });

    /* eslint-disable no-restricted-syntax */
    for (const dateVal in dateArray) {
      if (Object.prototype.hasOwnProperty.call(dateArray, dateVal)) {
        dateArray[dateVal].sort((a, b) => {
          var c = new Date(a.timeFull);
          var d = new Date(b.timeFull);
          return c - d;
        });
      }
    }
    /* eslint-enable no-restricted-syntax */

    // this.state.eventArray = dateArray;
    // this.state.dayEvents = this.state.eventArray['2017-10-28'];
    // console.log('ICalDataProcess', dateArray);
    console.log('ICalDataProcess called and loaded event array...');
    const eventTrans = [];
    Object.keys(dateArray)
      .sort()
      .forEach((v) => {
        // console.log(i, v, dateArray[v]);
        eventTrans.push(dateArray[v]);
      });
    ICalDataParser._events = eventTrans;
    return eventTrans;
    // console.log('ICalDataProcessy', Object.getOwnPropertyNames(dateArray));
    // console.log('ICalDataProcessy', eventTrans.length);
  },
};

export default ICalDataParser;
