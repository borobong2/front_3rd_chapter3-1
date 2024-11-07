import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { Mock } from 'vitest';

import { SearchBar } from '../../../components/eventList/SearchBar';
import { useCalendarView } from '../../../hooks/useCalendarView';
import { useEventOperations } from '../../../hooks/useEventOperations';
import { useSearch } from '../../../hooks/useSearch';

vi.mock('../../../hooks/useEventOperations');
vi.mock('../../../hooks/useCalendarView');
vi.mock('../../../hooks/useSearch');

describe('검색 바 컴포넌트', () => {
  beforeEach(() => {
    (useEventOperations as Mock).mockReturnValue({
      events: [],
    });

    (useCalendarView as Mock).mockReturnValue({
      currentDate: new Date(),
      view: 'month',
    });

    (useSearch as Mock).mockReturnValue({
      searchTerm: '',
      setSearchTerm: vi.fn(),
    });
  });

  test('검색 바가 렌더링된다', () => {
    render(
      <ChakraProvider>
        <SearchBar />
      </ChakraProvider>
    );
    expect(screen.getByLabelText('일정 검색')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('검색어를 입력하세요')).toBeInTheDocument();
  });
});
