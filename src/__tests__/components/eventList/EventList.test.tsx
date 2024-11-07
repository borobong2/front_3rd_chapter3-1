import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { Mock } from 'vitest';

import { EventList } from '../../../components/eventList/EventList';
import { useCalendarView } from '../../../hooks/useCalendarView';
import { useEventOperations } from '../../../hooks/useEventOperations';
import { useSearch } from '../../../hooks/useSearch';

vi.mock('../../../hooks/useEventOperations');
vi.mock('../../../hooks/useCalendarView');
vi.mock('../../../hooks/useSearch');

describe('이벤트 리스트 컴포넌트', () => {
  beforeEach(() => {
    (useEventOperations as Mock).mockReturnValue({
      events: [
        {
          id: 1,
          title: 'Test Event',
          date: '2023-10-01',
          startTime: '10:00',
          endTime: '11:00',
          description: 'Test Description',
          location: 'Test Location',
          category: 'Test Category',
          repeat: { type: 'none', interval: 0, endDate: null },
          notificationTime: 0,
        },
      ],
    });

    (useCalendarView as Mock).mockReturnValue({
      currentDate: new Date(),
      view: 'month',
    });

    (useSearch as Mock).mockReturnValue({
      filteredEvents: [
        {
          id: 1,
          title: 'Test Event',
          date: '2023-10-01',
          startTime: '10:00',
          endTime: '11:00',
          description: 'Test Description',
          location: 'Test Location',
          category: 'Test Category',
          repeat: { type: 'none', interval: 0, endDate: null },
          notificationTime: 0,
        },
      ],
    });
  });

  test('이벤트 리스트가 렌더링된다', () => {
    render(
      <ChakraProvider>
        <EventList />
      </ChakraProvider>
    );
    expect(screen.getByText('Test Event')).toBeInTheDocument();
  });

  test('검색 결과가 없을 때 메시지가 표시된다', () => {
    (useSearch as Mock).mockReturnValue({
      filteredEvents: [],
    });
    render(
      <ChakraProvider>
        <EventList />
      </ChakraProvider>
    );
    expect(screen.getByText('검색 결과가 없습니다.')).toBeInTheDocument();
  });
});
