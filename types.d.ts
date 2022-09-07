type Namaaz = {
  date: Date;
  fajr: string;
  sunrise: string;
  zuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
};

type Timetable = Namaaz[];

type Time = `${number}.${number}${number} ${'am' | 'pm'}`;

type Meridiem = 'am' | 'pm';
