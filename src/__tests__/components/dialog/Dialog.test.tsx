import { ChakraProvider } from '@chakra-ui/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Mock } from 'vitest';

import { Dialog } from '../../../components/dialog/Dialog';
import { useDialog } from '../../../hooks/useDialog';
import { useEventForm } from '../../../hooks/useEventForm';
import { useEventOperations } from '../../../hooks/useEventOperations';

vi.mock('../../../hooks/useEventForm');
vi.mock('../../../hooks/useDialog');
vi.mock('../../../hooks/useEventOperations');

describe('다이얼로그 컴포넌트', () => {
  beforeEach(() => {
    (useEventForm as Mock).mockReturnValue({
      title: 'Test Event',
      date: '2023-10-01',
      startTime: '10:00',
      endTime: '11:00',
      description: '',
      location: '',
      category: '',
      isRepeating: false,
      repeatType: '',
      repeatInterval: 0,
      repeatEndDate: null,
      notificationTime: 0,
      editingEvent: null,
    });

    (useDialog as Mock).mockReturnValue({
      isOverlapDialogOpen: true,
      setIsOverlapDialogOpen: vi.fn(),
      overlappingEvents: [
        {
          id: 1,
          title: 'Overlapping Event',
          date: '2023-10-01',
          startTime: '09:00',
          endTime: '10:00',
        },
      ],
    });

    (useEventOperations as Mock).mockReturnValue({
      events: [],
      saveEvent: vi.fn(),
    });
  });

  test('겹치는 일정이 있는 다이얼로그가 렌더링된다', () => {
    render(
      <ChakraProvider>
        <Dialog />
      </ChakraProvider>
    );
    expect(screen.getByText('일정 겹침 경고')).toBeInTheDocument();
    expect(screen.getByText('Overlapping Event (2023-10-01 09:00-10:00)')).toBeInTheDocument();
  });

  test('취소 버튼 클릭 시 다이얼로그가 닫힌다', () => {
    const { setIsOverlapDialogOpen } = useDialog();
    render(
      <ChakraProvider>
        <Dialog />
      </ChakraProvider>
    );
    fireEvent.click(screen.getByText('취소'));
    expect(setIsOverlapDialogOpen).toHaveBeenCalledWith(false);
  });
});
