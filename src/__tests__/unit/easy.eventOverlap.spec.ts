import { Event } from '../../types';
import {
  convertEventToDateRange,
  findOverlappingEvents,
  isOverlapping,
  parseDateTime,
} from '../../utils/eventOverlap';

describe('parseDateTime', () => {
  it('2024-07-01 14:30을 정확한 Date 객체로 변환한다', () => {
    const date = '2024-07-01';
    const time = '14:30';
    const result = parseDateTime(date, time);

    expect(result).toBeInstanceOf(Date);
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(6);
    expect(result.getDate()).toBe(1);
    expect(result.getHours()).toBe(14);
    expect(result.getMinutes()).toBe(30);
    expect(result.getTime()).not.toBeNaN();
  });

  it('잘못된 날짜 형식에 대해 Invalid Date를 반환한다', () => {
    const invalidDate = '2024-13-45';
    const time = '14:30';
    const result = parseDateTime(invalidDate, time);

    expect(result.getTime()).toBeNaN();
    expect(result.toString()).toBe('Invalid Date');
  });

  it('잘못된 시간 형식에 대해 Invalid Date를 반환한다', () => {
    const date = '2024-07-04';
    const invalidTime = '25:30';
    const result = parseDateTime(date, invalidTime);

    expect(result.getTime()).toBeNaN();
    expect(result.toString()).toBe('Invalid Date');
  });

  it('날짜 문자열이 비어있을 때 Invalid Date를 반환한다', () => {
    const emptyDate = '';
    const time = '14:30';
    const result = parseDateTime(emptyDate, time);

    expect(result.getTime()).toBeNaN();
    expect(result.toString()).toBe('Invalid Date');
  });
});

describe('convertEventToDateRange', () => {
  it('일반적인 이벤트를 올바른 시작 및 종료 시간을 가진 객체로 변환한다', () => {
    const event: Event = {
      id: '1',
      title: '팀 미팅',
      date: '2024-07-01',
      startTime: '14:30',
      endTime: '16:00',
      description: '프로젝트 논의',
      location: '회의실 A',
      category: 'meeting',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 30,
    };
    const result = convertEventToDateRange(event);

    expect(result).toEqual({
      start: new Date('2024-07-01T14:30'),
      end: new Date('2024-07-01T16:00'),
    });
  });

  it('잘못된 날짜 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const event: Event = {
      id: '1',
      title: '잘못된 이벤트',
      date: '2024-13-45',
      startTime: '14:30',
      endTime: '16:00',
      description: '프로젝트 논의',
      location: '회의실 A',
      category: 'meeting',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 30,
    };
    const result = convertEventToDateRange(event);

    expect(result.start.toString()).toBe('Invalid Date');
    expect(result.end.toString()).toBe('Invalid Date');
  });

  it('잘못된 시간 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const event: Event = {
      id: '1',
      title: '잘못된 이벤트',
      date: '2024-07-04',
      startTime: '25:30',
      endTime: '29:00',
      description: '프로젝트 논의',
      location: '회의실 A',
      category: 'meeting',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 30,
    };
    const result = convertEventToDateRange(event);

    expect(result.start.toString()).toBe('Invalid Date');
    expect(result.end.toString()).toBe('Invalid Date');
  });
});

describe('isOverlapping', () => {
  it('두 이벤트가 겹치는 경우 true를 반환한다', () => {});

  it('두 이벤트가 겹치지 않는 경우 false를 반환한다', () => {});
});

describe('findOverlappingEvents', () => {
  it('새 이벤트와 겹치는 모든 이벤트를 반환한다', () => {});

  it('겹치는 이벤트가 없으면 빈 배열을 반환한다', () => {});
});
