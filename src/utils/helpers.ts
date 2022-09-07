interface TimeToDate {
  time: Time;
  rd?: Date;
}

export const timeToDateTime = ({ time, rd = new Date() }: TimeToDate): Date => {
  const meridiem = time.split('.')[1]?.split(' ')[1] as Meridiem;

  let hours = Number(time.split('.')[0]);

  if (meridiem === 'pm') {
    hours = hours + 12;
  }

  const mins = Number(time.split('.')[1]?.split(' ')[0]);
  return new Date(rd.getFullYear(), rd.getMonth(), rd.getDate(), hours, mins);
};
