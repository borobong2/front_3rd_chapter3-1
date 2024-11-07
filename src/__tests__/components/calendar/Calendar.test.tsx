import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { Mock } from 'vitest';

import { Calendar } from '../../../components/calendar/Calendar';
import { useCalendarView } from '../../../hooks/useCalendarView';

vi.mock('../../../hooks/useCalendarView');

describe('캘린더 컴포넌트', () => {
  beforeEach(() => {
    (useCalendarView as Mock).mockReturnValue({
      view: 'month',
      currentDate: new Date('2024-11-01'),
      holidays: {}, // holidays를 빈 객체로 설정
    });
  });

  test('캘린더가 렌더링된다', () => {
    render(
      <ChakraProvider>
        <Calendar />
      </ChakraProvider>
    );
    expect(screen.getByText('일정 보기')).toBeInTheDocument();
  });
});
