import { Event } from '../../types';
import {
  fillZero,
  formatDate,
  formatMonth,
  formatWeek,
  getDaysInMonth,
  getEventsForDay,
  getWeekDates,
  getWeeksAtMonth,
  isDateInRange,
} from '../../utils/dateUtils';

describe('getDaysInMonth', () => {
  it('1월은 31일 수를 반환한다', () => {
    const result = getDaysInMonth(2024, 1);
    expect(result).toBe(31);
  });

  it('4월은 30일 일수를 반환한다', () => {
    const result = getDaysInMonth(2024, 4);
    expect(result).toBe(30);
  });

  it('윤년의 2월에 대해 29일을 반환한다', () => {
    const result = getDaysInMonth(2024, 2);
    expect(result).toBe(29);
  });

  it('평년의 2월에 대해 28일을 반환한다', () => {
    const result = getDaysInMonth(2023, 2);
    expect(result).toBe(28);
  });

  it('13월은 다음 해 1월로 처리되어 31일을 반환한다', () => {
    const invalidMonthResult13 = getDaysInMonth(2024, 13);
    expect(invalidMonthResult13).toBe(31);
  });

  it('0월은 이전 해 12월로 처리되어 31일을 반환한다', () => {
    const invalidMonthResult0 = getDaysInMonth(2024, 0);
    expect(invalidMonthResult0).toBe(31);
  });
});

describe('getWeekDates', () => {
  it('주중의 날짜(수요일)에 대해 올바른 주의 날짜들을 반환한다', () => {
    const wednesday = new Date('2024-11-06');
    const weekDates = getWeekDates(wednesday);
    const startDayOfWeek = weekDates[0].getDate();
    const endDayOfWeek = weekDates[6].getDate();

    expect(weekDates).toHaveLength(7);
    expect(startDayOfWeek).toBe(3);
    expect(endDayOfWeek).toBe(9);
  });

  it('주의 시작(월요일)에 대해 올바른 주의 날짜들을 반환한다', () => {
    const monday = new Date('2024-11-04');
    const weekDates = getWeekDates(monday);
    const startDayOfWeek = weekDates[0].getDate();
    const endDayOfWeek = weekDates[6].getDate();

    expect(weekDates).toHaveLength(7);
    expect(startDayOfWeek).toBe(3);
    expect(endDayOfWeek).toBe(9);
  });

  it('주의 끝(일요일)에 대해 올바른 주의 날짜들을 반환한다', () => {
    const sunday = new Date('2024-11-10');
    const weekDates = getWeekDates(sunday);
    const startDayOfWeek = weekDates[0].getDate();
    const endDayOfWeek = weekDates[6].getDate();

    expect(weekDates).toHaveLength(7);
    expect(startDayOfWeek).toBe(10);
    expect(endDayOfWeek).toBe(16);
  });

  it('연도를 넘어가는 주의 날짜를 정확히 처리한다 (연말)', () => {
    const endOfYear = new Date('2024-12-31');
    const weekDates = getWeekDates(endOfYear);
    const startDayOfWeek = weekDates[0].getDate();
    const endDayOfWeek = weekDates[6].getDate();

    expect(weekDates).toHaveLength(7);
    expect(startDayOfWeek).toBe(29);
    expect(endDayOfWeek).toBe(4);
  });

  it('연도를 넘어가는 주의 날짜를 정확히 처리한다 (연초)', () => {
    const startOfYear = new Date('2024-01-01');
    const weekDates = getWeekDates(startOfYear);
    const startFullDate = weekDates[0].toISOString().slice(0, 10);
    const endFullDate = weekDates[6].toISOString().slice(0, 10);

    expect(weekDates).toHaveLength(7);
    expect(startFullDate).toBe('2023-12-31');
    expect(endFullDate).toBe('2024-01-06');
  });

  it('윤년의 2월 29일을 포함한 주를 올바르게 처리한다', () => {
    const leapDay = new Date('2024-02-29');
    const weekDates = getWeekDates(leapDay);
    const startFullDate = weekDates[0].toISOString().slice(0, 10);
    const endFullDate = weekDates[6].toISOString().slice(0, 10);

    expect(weekDates).toHaveLength(7);
    expect(startFullDate).toBe('2024-02-25');
    expect(endFullDate).toBe('2024-03-02');
  });

  it('월의 마지막 날짜를 포함한 주를 올바르게 처리한다', () => {
    const lastDayOfMonth = new Date('2024-11-30');
    const weekDates = getWeekDates(lastDayOfMonth);
    const startFullDate = weekDates[0].toISOString().slice(0, 10);
    const endFullDate = weekDates[6].toISOString().slice(0, 10);

    expect(weekDates).toHaveLength(7);
    expect(startFullDate).toBe('2024-11-24');
    expect(endFullDate).toBe('2024-11-30');
  });
});

describe('getWeeksAtMonth', () => {
  let date: Date;
  let weeks: (number | null)[][];

  beforeEach(() => {
    date = new Date('2024-07-01');
    weeks = getWeeksAtMonth(date);
  });

  it('7월은 5주로 구성되어야 한다', () => {
    expect(weeks).toHaveLength(5);
  });

  it('첫째 주는 월요일이 null이고 1일은 화요일이어야 한다', () => {
    const expectedFirstWeek = [null, 1, 2, 3, 4, 5, 6];
    const firstWeek = weeks[0];

    expect(firstWeek).toEqual(expectedFirstWeek);
  });

  it('둘째 주는 7일부터 13일까지여야 한다', () => {
    const expectedSecondWeek = [7, 8, 9, 10, 11, 12, 13];
    const secondWeek = weeks[1];

    expect(secondWeek).toEqual(expectedSecondWeek);
  });

  it('셋째 주는 14일부터 20일까지여야 한다', () => {
    const expectedThirdWeek = [14, 15, 16, 17, 18, 19, 20];
    const thirdWeek = weeks[2];

    expect(thirdWeek).toEqual(expectedThirdWeek);
  });

  it('넷째 주는 21일부터 27일까지여야 한다', () => {
    const expectedFourthWeek = [21, 22, 23, 24, 25, 26, 27];
    const fourthWeek = weeks[3];

    expect(fourthWeek).toEqual(expectedFourthWeek);
  });

  it('마지막 주는 28일부터 31일까지이고 나머지는 null이어야 한다', () => {
    const expectedLastWeek = [28, 29, 30, 31, null, null, null];
    const lastWeek = weeks[4];

    expect(lastWeek).toEqual(expectedLastWeek);
  });
});

describe('getEventsForDay', () => {
  it('특정 날짜(1일)에 해당하는 이벤트만 정확히 반환한다', () => {});

  it('해당 날짜에 이벤트가 없을 경우 빈 배열을 반환한다', () => {});

  it('날짜가 0일 경우 빈 배열을 반환한다', () => {});

  it('날짜가 32일 이상인 경우 빈 배열을 반환한다', () => {});
});

describe('formatWeek', () => {
  it('월의 중간 날짜에 대해 올바른 주 정보를 반환한다', () => {
    const middleDate = new Date('2024-07-15');
    const result = formatWeek(middleDate);
    expect(result).toBe('2024년 7월 3주');
  });

  it('월의 첫 주에 대해 올바른 주 정보를 반환한다', () => {
    const firstWeekDate = new Date('2024-07-02');
    const result = formatWeek(firstWeekDate);
    expect(result).toBe('2024년 7월 1주');
  });

  it('월의 마지막 주에 대해 올바른 주 정보를 반환한다', () => {
    const lastWeekDate = new Date('2024-07-28');
    const result = formatWeek(lastWeekDate);
    expect(result).toBe('2024년 7월 5주');
  });

  it('연도가 바뀌는 주에 대해 올바른 주 정보를 반환한다', () => {
    const yearEndDate = new Date('2024-12-31');
    const result = formatWeek(yearEndDate);
    expect(result).toBe('2025년 1월 1주');
  });

  it('윤년 2월의 마지막 주에 대해 올바른 주 정보를 반환한다', () => {
    const leapYearDate = new Date('2024-02-29');
    const result = formatWeek(leapYearDate);
    expect(result).toBe('2024년 2월 5주');
  });

  it('평년 2월의 마지막 주에 대해 올바른 주 정보를 반환한다', () => {
    const normalYearDate = new Date('2023-02-28');
    const result = formatWeek(normalYearDate);
    expect(result).toBe('2023년 2월 4주');
  });
});

describe('formatMonth', () => {
  it("2024년 7월 10일을 '2024년 7월'로 반환한다", () => {
    const date = new Date('2024-07-10');
    const result = formatMonth(date);
    expect(result).toBe('2024년 7월');
  });
});

describe('isDateInRange', () => {
  const rangeStart = new Date('2024-07-01');
  const rangeEnd = new Date('2024-07-31');

  it('범위 내의 날짜 2024-07-10에 대해 true를 반환한다', () => {
    const targetDate = new Date('2024-07-10');
    const result = isDateInRange(targetDate, rangeStart, rangeEnd);
    expect(result).toBe(true);
  });

  it('범위의 시작일 2024-07-01에 대해 true를 반환한다', () => {
    const targetDate = new Date('2024-07-01');
    const result = isDateInRange(targetDate, rangeStart, rangeEnd);
    expect(result).toBe(true);
  });

  it('범위의 종료일 2024-07-31에 대해 true를 반환한다', () => {
    const targetDate = new Date('2024-07-31');
    const result = isDateInRange(targetDate, rangeStart, rangeEnd);
    expect(result).toBe(true);
  });

  it('범위 이전의 날짜 2024-06-30에 대해 false를 반환한다', () => {
    const targetDate = new Date('2024-06-30');
    const result = isDateInRange(targetDate, rangeStart, rangeEnd);
    expect(result).toBe(false);
  });

  it('범위 이후의 날짜 2024-08-01에 대해 false를 반환한다', () => {
    const targetDate = new Date('2024-08-01');
    const result = isDateInRange(targetDate, rangeStart, rangeEnd);
    expect(result).toBe(false);
  });

  it('시작일이 종료일보다 늦은 경우 모든 날짜에 대해 false를 반환한다', () => {
    const invalidRangeStart = new Date('2024-07-31');
    const invalidRangeEnd = new Date('2024-07-01');

    const testDates = [new Date('2024-07-01'), new Date('2024-07-15'), new Date('2024-07-31')];

    testDates.forEach((date) => {
      const result = isDateInRange(date, invalidRangeStart, invalidRangeEnd);
      expect(result).toBe(false);
    });
  });
});

describe('fillZero', () => {
  test("5를 2자리로 변환하면 '05'를 반환한다", () => {
    const result = fillZero(5);
    expect(result).toBe('05');
  });

  test("10을 2자리로 변환하면 '10'을 반환한다", () => {
    const result = fillZero(10);
    expect(result).toBe('10');
  });

  test("3을 3자리로 변환하면 '003'을 반환한다", () => {
    const result = fillZero(3, 3);
    expect(result).toBe('003');
  });

  test("100을 2자리로 변환하면 '100'을 반환한다", () => {
    const result = fillZero(100, 2);
    expect(result).toBe('100');
  });

  test("0을 2자리로 변환하면 '00'을 반환한다", () => {
    const result = fillZero(0);
    expect(result).toBe('00');
  });

  test("1을 5자리로 변환하면 '00001'을 반환한다", () => {
    const result = fillZero(1, 5);
    expect(result).toBe('00001');
  });

  test("소수점이 있는 3.14를 5자리로 변환하면 '03.14'를 반환한다", () => {
    const result = fillZero(3.14, 5);
    expect(result).toBe('03.14');
  });

  test('size 파라미터를 생략하면 기본값 2를 사용한다', () => {
    const result = fillZero(7);
    expect(result).toBe('07');
  });

  test('value가 지정된 size보다 큰 자릿수를 가지면 원래 값을 그대로 반환한다', () => {
    const result = fillZero(123, 2);
    expect(result).toBe('123');
  });
});

describe('formatDate', () => {
  it('날짜를 YYYY-MM-DD 형식으로 포맷팅한다', () => {});

  it('day 파라미터가 제공되면 해당 일자로 포맷팅한다', () => {});

  it('월이 한 자리 수일 때 앞에 0을 붙여 포맷팅한다', () => {});

  it('일이 한 자리 수일 때 앞에 0을 붙여 포맷팅한다', () => {});
});
