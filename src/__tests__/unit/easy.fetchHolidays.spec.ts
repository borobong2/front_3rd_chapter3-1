import { fetchHolidays } from '../../apis/fetchHolidays';

describe('fetchHolidays', () => {
  it('주어진 월의 공휴일만 반환한다', () => {
    const date = new Date('2024-05-01');
    const result = fetchHolidays(date);

    expect(result).toEqual({
      '2024-05-05': '어린이날',
    });
  });

  it('공휴일이 없는 월에 대해 빈 객체를 반환한다', () => {
    const date = new Date('2024-04-01');
    const result = fetchHolidays(date);

    expect(result).toEqual({});
    expect(Object.keys(result)).toHaveLength(0);
  });

  it('여러 공휴일이 있는 월에 대해 모든 공휴일을 반환한다', () => {
    const date = new Date('2024-02-01');
    const result = fetchHolidays(date);

    expect(result).toEqual({
      '2024-02-09': '설날',
      '2024-02-10': '설날',
      '2024-02-11': '설날',
    });
    expect(Object.keys(result)).toHaveLength(3);
  });
});
