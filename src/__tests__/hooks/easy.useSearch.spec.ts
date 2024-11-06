import { act, renderHook } from '@testing-library/react';

import { useSearch } from '../../hooks/useSearch.ts';
import { Event } from '../../types.ts';

describe('useSearch', () => {
  const events: Event[] = [
    {
      id: '1',
      title: '팀 회의',
      description: '프로젝트 진행상황 공유',
      location: '회의실 A',
      date: '2024-07-01',
      startTime: '10:00',
      endTime: '11:00',
      category: 'meeting',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 30,
    },
    {
      id: '2',
      title: '점심 식사',
      description: '팀 회식',
      location: '식당',
      date: '2024-07-01',
      startTime: '12:00',
      endTime: '13:00',
      category: 'meal',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 30,
    },
    {
      id: '3',
      title: '고객 미팅',
      description: '신규 계약 논의',
      location: '회의실 B',
      date: '2024-07-15',
      startTime: '14:00',
      endTime: '15:00',
      category: 'meeting',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 30,
    },
  ];

  it('검색어가 비어있을 때 모든 이벤트를 반환해야 한다', () => {
    const { result } = renderHook(() => useSearch(events, new Date('2024-07-01'), 'month'));

    expect(result.current.filteredEvents).toEqual(events);
  });

  it('검색어에 맞는 이벤트만 필터링해야 한다', () => {
    const { result } = renderHook(() => useSearch(events, new Date('2024-07-01'), 'month'));

    act(() => {
      result.current.setSearchTerm('회의');
    });

    expect(result.current.filteredEvents).toEqual([events[0], events[2]]);
  });

  it('검색어가 제목, 설명, 위치 중 하나라도 일치하면 해당 이벤트를 반환해야 한다', () => {
    const { result } = renderHook(() => useSearch(events, new Date('2024-07-01'), 'month'));

    act(() => {
      result.current.setSearchTerm('회');
    });

    const expected = [events[0], events[1], events[2]];
    expect(result.current.filteredEvents).toEqual(expected);
  });

  it('현재 뷰(주간/월간)에 해당하는 이벤트만 반환해야 한다', () => {
    const { result } = renderHook(() => useSearch(events, new Date('2024-07-01'), 'week'));

    const expected = [events[0], events[1]];
    expect(result.current.filteredEvents).toEqual(expected);
  });

  it("검색어를 '회의'에서 '점심'으로 변경하면 필터링된 결과가 즉시 업데이트되어야 한다", () => {
    const { result } = renderHook(() => useSearch(events, new Date('2024-07-01'), 'month'));

    act(() => {
      result.current.setSearchTerm('회의');
    });
    expect(result.current.filteredEvents).toEqual([events[0], events[2]]);

    act(() => {
      result.current.setSearchTerm('점심');
    });
    expect(result.current.filteredEvents).toEqual([events[1]]);
  });
});
