import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { Mock } from 'vitest';

import { MonthView } from '../../../components/calendar/MonthView';
import { useCalendarView } from '../../../hooks/useCalendarView';
import { useEventOperations } from '../../../hooks/useEventOperations';

vi.mock('../../../hooks/useCalendarView');
vi.mock('../../../hooks/useEventOperations');

describe('월 뷰 컴포넌트', () => {
  beforeEach(() => {
    (useCalendarView as Mock).mockReturnValue({
      currentDate: new Date('2024-11-01'),
      holidays: {},
    });

    (useEventOperations as Mock).mockReturnValue({
      events: [],
    });
  });

  test('월 뷰가 렌더링된다', () => {
    render(
      <ChakraProvider>
        <MonthView />
      </ChakraProvider>
    );
    expect(screen.getByText('2024년 11월')).toBeInTheDocument();
  });
});
