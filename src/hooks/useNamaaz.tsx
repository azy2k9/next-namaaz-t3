import timetableData from '../data/september-2022.json';
import { timeToDateTime } from '../utils/helpers';

const useNamaaz = () => {
  const rd = new Date();
  const timetable = timetableData.Rows.map((r) => {
    const year = rd.getFullYear();
    const month = rd.getMonth();
    const date = Number(r.Date__15.value);
    const formattedDate = new Date(year, month, date);

    return {
      date: formattedDate.toDateString(),
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

  const todaysNamaaz = timetable.find(
    (namaaz) => namaaz.date === rd.toDateString()
  );

  return {
    current: {
      name: 'Fajr',
      time: todaysNamaaz?.fajr.toLocaleTimeString().substring(0, 5)
    },
    next: {
      name: 'Zuhr',
      time: todaysNamaaz?.zuhr.toLocaleTimeString().substring(0, 5)
    }
  };
};

export default useNamaaz;
