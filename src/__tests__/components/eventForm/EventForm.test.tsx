import { ChakraProvider } from '@chakra-ui/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Mock } from 'vitest';

import { EventForm } from '../../../components/eventForm/EventForm';
import { useDialog } from '../../../hooks/useDialog';
import { useEventForm } from '../../../hooks/useEventForm';
import { useEventOperations } from '../../../hooks/useEventOperations';

vi.mock('../../../hooks/useEventForm');
vi.mock('../../../hooks/useEventOperations');
vi.mock('../../../hooks/useDialog');

describe('이벤트 폼 컴포넌트', () => {
  beforeEach(() => {
    (useEventForm as Mock).mockReturnValue({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      description: '',
      location: '',
      category: '',
      isRepeating: false,
      repeatType: '',
      repeatInterval: 0,
      repeatEndDate: null,
      notificationTime: 0,
      resetForm: vi.fn(),
    });

    (useEventOperations as Mock).mockReturnValue({
      saveEvent: vi.fn(),
      events: [],
    });

    (useDialog as Mock).mockReturnValue({
      setIsOverlapDialogOpen: vi.fn(),
      setOverlappingEvents: vi.fn(),
    });
  });

  test('이벤트 폼이 렌더링된다', () => {
    render(
      <ChakraProvider>
        <EventForm />
      </ChakraProvider>
    );
    expect(screen.getByText('제목')).toBeInTheDocument();
    expect(screen.getByText('날짜')).toBeInTheDocument();
    expect(screen.getByText('시작 시간')).toBeInTheDocument();
    expect(screen.getByText('종료 시간')).toBeInTheDocument();
    expect(screen.getByText('설명')).toBeInTheDocument();
    expect(screen.getByText('위치')).toBeInTheDocument();
    expect(screen.getByText('카테고리')).toBeInTheDocument();
    expect(screen.getByText('알림 설정')).toBeInTheDocument();
  });

  test('필수 정보가 없을 때 알림이 표시된다', async () => {
    const { saveEvent } = useEventOperations(false);
    render(
      <ChakraProvider>
        <EventForm />
      </ChakraProvider>
    );

    fireEvent.click(screen.getByTestId('event-submit-button'));
    expect(await screen.findByText('필수 정보를 모두 입력해주세요.')).toBeInTheDocument();
    expect(saveEvent).not.toHaveBeenCalled();
  });

  test('이벤트가 저장될 때 saveEvent가 호출된다', async () => {
    const { saveEvent } = useEventOperations(false);
    (useEventForm as Mock).mockReturnValue({
      title: 'Test Event',
      date: '2023-10-01',
      startTime: '10:00',
      endTime: '11:00',
      description: 'Test Description',
      location: 'Test Location',
      category: 'Test Category',
      isRepeating: false,
      repeatType: '',
      repeatInterval: 0,
      repeatEndDate: null,
      notificationTime: 0,
      resetForm: vi.fn(),
    });

    render(
      <ChakraProvider>
        <EventForm />
      </ChakraProvider>
    );

    fireEvent.click(screen.getByTestId('event-submit-button'));
    expect(saveEvent).toHaveBeenCalled();
  });
});
