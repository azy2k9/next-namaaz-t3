import moment, { Moment } from 'moment';

interface TimeToDate {
  time: Time;
  rd?: Moment;
}

export const timeToDateTime = ({ time, rd = moment() }: TimeToDate): Moment => {
  const meridiem = time.split('.')[1]?.split(' ')[1] as Meridiem;

  let hours = Number(time.split('.')[0]);

  if (meridiem === 'pm') {
    hours = hours + 12;
  }

  const mins = Number(time.split('.')[1]?.split(' ')[0]);

  return moment(
    new Date(rd.get('year'), rd.get('month'), rd.get('date'), hours, mins)
  );
};
