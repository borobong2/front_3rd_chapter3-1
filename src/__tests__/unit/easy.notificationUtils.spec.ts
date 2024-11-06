import { Event } from '../../types';
import { createNotificationMessage, getUpcomingEvents } from '../../utils/notificationUtils';

describe('getUpcomingEvents', () => {
  const event: Event = {
    id: '1',
    title: '테스트 이벤트',
    date: '2024-07-01',
    startTime: '14:00',
    endTime: '15:00',
    description: '테스트',
    location: '회의실',
    category: 'meeting',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 30,
  };

  it('알림 시간이 정확히 도래한 이벤트를 반환한다', () => {
    const events = [event];
    const now = new Date('2024-07-01T13:30:00');
    const notifiedEvents: string[] = [];

    const result = getUpcomingEvents(events, now, notifiedEvents);

    expect(result).toEqual([event]);
  });

  it('이미 알림이 간 이벤트는 제외한다', () => {
    const events = [event];
    const now = new Date('2024-07-01T13:30:00');
    const notifiedEvents: string[] = [event.id];

    const result = getUpcomingEvents(events, now, notifiedEvents);

    expect(result).toEqual([]);
  });

  it('알림 시간이 아직 도래하지 않은 이벤트는 반환하지 않는다', () => {
    const events = [event];
    const now = new Date('2024-07-01T13:20:00');
    const notifiedEvents: string[] = [];

    const result = getUpcomingEvents(events, now, notifiedEvents);

    expect(result).toEqual([]);
  });

  it('알림 시간이 지난 이벤트는 반환하지 않는다', () => {
    const events = [event];
    const now = new Date('2024-07-04T13:40:00');
    const notifiedEvents: string[] = [];

    const result = getUpcomingEvents(events, now, notifiedEvents);

    expect(result).toEqual([]);
  });
});

describe('createNotificationMessage', () => {
  it('올바른 알림 메시지를 생성해야 한다', () => {
    const event: Event = {
      id: '1',
      title: '테스트 이벤트',
      date: '2024-07-01',
      startTime: '14:00',
      endTime: '15:00',
      description: '테스트',
      location: '회의실',
      category: 'meeting',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 30,
    };
    const result = createNotificationMessage(event);

    expect(result).toBe('30분 후 테스트 이벤트 일정이 시작됩니다.');
  });
});
