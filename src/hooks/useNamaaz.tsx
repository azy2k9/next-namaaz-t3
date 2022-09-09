import moment from 'moment';
import timetableData from '../data/september-2022.json';
import { timeToDateTime } from '../utils/helpers';

const useNamaaz = () => {
  const timetable = timetableData.Rows.map((r) => {
    const year = moment().get('year');
    const month = moment().get('month');
    const date = Number(r.Date__15.value);

    const formattedDate = moment(new Date(year, month, date));

    return {
      date: formattedDate.format('ddd MMM DD YYYY'),
      fajr: timeToDateTime({
        time: (r['Ends & Fair Sahari__12'].value + ' am') as Time,
        rd: formattedDate
      }),
      sunrise: timeToDateTime({
        time: (r.Sunrise__11.value + ' am') as Time,
        rd: formattedDate
      }),
      zuhr: timeToDateTime({
        time: (r.Zuhr__10.value + ' pm') as Time,
        rd: formattedDate
      }),
      asr: timeToDateTime({
        time: (r.Asr__9.value + ' pm') as Time,
        rd: formattedDate
      }),
      maghrib: timeToDateTime({
        time: (r.Sunset__8.value + ' pm') as Time,
        rd: formattedDate
      }),
      isha: timeToDateTime({
        time: (r.Isha__7.value + ' pm') as Time,
        rd: formattedDate
      })
    };
  });

  const today = timetable.find(
    (namaaz) => namaaz.date === moment().format('ddd MMM DD YYYY')
  );

  console.log("Todays namaaz: ", today);

  const tomorrow = timetable.find(
    (namaaz) =>
      namaaz.date === moment().add(1, 'days').format('ddd MMM DD YYYY')
  );

  const inFajr =
    moment().isSameOrAfter(today?.fajr) && moment().isBefore(today?.sunrise);
  const betweenFajrAndZuhr =
    moment().isSameOrAfter(today?.sunrise) && moment().isBefore(today?.zuhr);
  const inZuhr =
    moment().isSameOrAfter(today?.zuhr) && moment().isBefore(today?.asr);
  const inAsr =
    moment().isSameOrAfter(today?.asr) && moment().isBefore(today?.maghrib);
  const inMaghrib =
    moment().isSameOrAfter(today?.maghrib) && moment().isBefore(today?.isha);
  const inIsha =
    moment().isSameOrAfter(today?.isha) && moment().isBefore(tomorrow?.fajr);

  console.log({
    inFajr, betweenFajrAndZuhr, inZuhr, inAsr, inMaghrib, inIsha
  });

  if (today) {
    if (inFajr) {
      return {
        current: {
          name: 'Fajr',
          time: today.fajr
        },
        next: {
          name: 'Sunrise',
          time: today.sunrise
        }
      };
    }

    if (betweenFajrAndZuhr) {
      return {
        current: {
          name: 'No Namaaz Right Now',
          time: moment()
        },
        next: {
          name: 'Zuhr',
          time: today.zuhr
        }
      };
    }

    if (inZuhr) {
      return {
        current: {
          name: 'Zuhr',
          time: today.zuhr
        },
        next: {
          name: 'Zuhr',
          time: today.zuhr
        }
      };
    }

    if (inAsr) {
      return {
        current: {
          name: 'Asr',
          time: today.asr
        },
        next: {
          name: 'Zuhr',
          time: today.zuhr
        }
      };
    }

    if (inMaghrib) {
      return {
        current: {
          name: 'Maghrib',
          time: today.maghrib
        },
        next: {
          name: 'Isha',
          time: today.isha
        }
      };
    }

    if (inIsha) {
      let fajr = today.fajr;
      if (tomorrow?.fajr) {
        fajr = tomorrow.fajr;
      }

      return {
        current: {
          name: 'Isha',
          time: today.isha
        },
        next: {
          name: 'Fajr',
          time: fajr
        }
      };
    }
  }

  return {
    current: {
      name: 'ERROR - DO NOT USE',
      time: moment()
    },
    next: {
      name: 'ERROR - DO NOT USE',
      time: moment()
    }
  };
};

export default useNamaaz;
