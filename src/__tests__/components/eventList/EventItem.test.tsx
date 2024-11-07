import { ChakraProvider } from '@chakra-ui/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Mock } from 'vitest';

import { EventItem } from '../../../components/eventList/EventItem';
import { useEventForm } from '../../../hooks/useEventForm';
import { useEventOperations } from '../../../hooks/useEventOperations';
import { useNotifications } from '../../../hooks/useNotifications';
import { Event } from '../../../types';

vi.mock('../../../hooks/useEventForm');
vi.mock('../../../hooks/useEventOperations');
vi.mock('../../../hooks/useNotifications');

describe('이벤트 아이템 컴포넌트', () => {
  const mockEvent: Event = {
    id: '1',
    title: 'Test Event',
    date: '2023-10-01',
    startTime: '10:00',
    endTime: '11:00',
    description: 'Test Description',
    location: 'Test Location',
    category: 'Test Category',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 0,
  };

  beforeEach(() => {
    (useEventForm as Mock).mockReturnValue({
      editEvent: vi.fn(),
    });

    (useEventOperations as Mock).mockReturnValue({
      deleteEvent: vi.fn(),
    });

    (useNotifications as Mock).mockReturnValue({
      notifiedEvents: [],
    });
  });

  test('이벤트 아이템이 렌더링된다', () => {
    render(
      <ChakraProvider>
        <EventItem event={mockEvent} />
      </ChakraProvider>
    );
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('2023-10-01')).toBeInTheDocument();
    expect(screen.getByText('10:00 - 11:00')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Location')).toBeInTheDocument();
    expect(screen.getByText('카테고리: Test Category')).toBeInTheDocument();
  });

  test('편집 버튼 클릭 시 editEvent가 호출된다', () => {
    const { editEvent } = useEventForm();
    render(
      <ChakraProvider>
        <EventItem event={mockEvent} />
      </ChakraProvider>
    );
    fireEvent.click(screen.getByLabelText('Edit event'));
    expect(editEvent).toHaveBeenCalledWith(mockEvent);
  });

  test('삭제 버튼 클릭 시 deleteEvent가 호출된다', () => {
    const { deleteEvent } = useEventOperations(false);
    render(
      <ChakraProvider>
        <EventItem event={mockEvent} />
      </ChakraProvider>
    );
    fireEvent.click(screen.getByLabelText('Delete event'));
    expect(deleteEvent).toHaveBeenCalledWith(mockEvent.id);
  });
});
