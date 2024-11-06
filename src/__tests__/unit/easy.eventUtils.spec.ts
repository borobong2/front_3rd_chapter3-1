import { Event } from '../../types';
import { getFilteredEvents } from '../../utils/eventUtils';

describe('getFilteredEvents', () => {
  const event: Event = {
    id: '1',
    title: '이벤트 1',
    date: '2024-07-01',
    startTime: '10:00',
    endTime: '11:00',
    description: '테스트',
    location: '회의실',
    category: 'meeting',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 30,
  };
  const events: Event[] = [
    { ...event },
    {
      ...event,
      title: '이벤트 2',
      id: '2',
      date: '2024-07-03',
      startTime: '14:00',
      endTime: '15:00',
    },
    {
      ...event,
      title: '이벤트 3',
      id: '3',
      date: '2024-07-15',
      startTime: '16:00',
      endTime: '17:00',
    },
  ];

  it("검색어 '이벤트 2'에 맞는 이벤트만 반환한다", () => {
    const result = getFilteredEvents(events, '이벤트 2', new Date('2024-07-01'), 'month');
    expect(result).toEqual([events[1]]);
  });

  it('주간 뷰에서 2024-07-01 주의 이벤트만 반환한다', () => {
    const result = getFilteredEvents(events, '', new Date('2024-07-01'), 'week');
    expect(result).toEqual([events[0], events[1]]);
  });

  it('월간 뷰에서 2024년 7월의 모든 이벤트를 반환한다', () => {
    const result = getFilteredEvents(events, '', new Date('2024-07-01'), 'month');
    expect(result).toEqual(events);
  });

  it("검색어 '이벤트'와 주간 뷰 필터링을 동시에 적용한다", () => {
    const result = getFilteredEvents(events, '이벤트', new Date('2024-07-01'), 'week');
    expect(result).toEqual([events[0], events[1]]);
  });

  it('검색어가 없을 때 모든 이벤트를 반환한다', () => {
    const result = getFilteredEvents(events, '', new Date('2024-07-01'), 'month');
    expect(result).toEqual(events);
  });

  it('검색어가 대소문자를 구분하지 않고 작동한다', () => {
    const result = getFilteredEvents(events, '이벤트 3', new Date('2024-07-01'), 'month');
    expect(result).toEqual([events[2]]);
  });

  it('월의 경계에 있는 이벤트를 올바르게 필터링한다', () => {
    const eventsAtMonthBoundary: Event[] = [
      {
        ...events[0],
        date: '2024-06-30',
      },
      {
        ...events[1],
        date: '2024-07-01',
      },
    ];
    const result = getFilteredEvents(eventsAtMonthBoundary, '', new Date('2024-07-01'), 'month');
    expect(result).toEqual([eventsAtMonthBoundary[1]]);
  });

  it('빈 이벤트 리스트에 대해 빈 배열을 반환한다', () => {
    const result = getFilteredEvents([], '', new Date('2024-07-01'), 'month');
    expect(result).toEqual([]);
  });
});
