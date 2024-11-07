import { ChakraProvider } from '@chakra-ui/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Mock } from 'vitest';

import { CalendarHeader } from '../../../components/calendar/CalendarHeader';
import { useCalendarView } from '../../../hooks/useCalendarView';

vi.mock('../../../hooks/useCalendarView');

describe('캘린더 헤더 컴포넌트', () => {
  beforeEach(() => {
    (useCalendarView as Mock).mockReturnValue({
      view: 'month',
      setView: vi.fn(),
      navigate: vi.fn(),
    });
  });

  test('캘린더 헤더가 렌더링된다', () => {
    render(
      <ChakraProvider>
        <CalendarHeader />
      </ChakraProvider>
    );
    expect(screen.getByLabelText('Previous')).toBeInTheDocument();
    expect(screen.getByLabelText('Next')).toBeInTheDocument();
    expect(screen.getByLabelText('view')).toBeInTheDocument();
  });

  test('뷰 변경 시 setView가 호출된다', () => {
    const { setView } = useCalendarView();
    render(
      <ChakraProvider>
        <CalendarHeader />
      </ChakraProvider>
    );
    fireEvent.change(screen.getByLabelText('view'), { target: { value: 'week' } });
    expect(setView).toHaveBeenCalledWith('week');
  });
});
