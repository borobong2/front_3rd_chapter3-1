import { ChakraProvider } from '@chakra-ui/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Mock } from 'vitest';

import { RepeatEventForm } from '../../../components/eventForm/RepeatEventForm';
import { useEventForm } from '../../../hooks/useEventForm';

vi.mock('../../../hooks/useEventForm');

describe('반복 이벤트 폼 컴포넌트', () => {
  beforeEach(() => {
    (useEventForm as Mock).mockReturnValue({
      isRepeating: false,
      setIsRepeating: vi.fn(),
      repeatType: '',
      setRepeatType: vi.fn(),
      repeatInterval: 0,
      setRepeatInterval: vi.fn(),
      repeatEndDate: '',
      setRepeatEndDate: vi.fn(),
    });
  });

  test('반복 이벤트 폼이 렌더링된다', () => {
    render(
      <ChakraProvider>
        <RepeatEventForm />
      </ChakraProvider>
    );
    expect(screen.getByLabelText('반복 설정')).toBeInTheDocument();
  });

  test('반복 체크박스 클릭 시 setIsRepeating이 호출된다', () => {
    render(
      <ChakraProvider>
        <RepeatEventForm />
      </ChakraProvider>
    );
    fireEvent.click(screen.getByLabelText('반복 일정'));
    expect(useEventForm().setIsRepeating).toHaveBeenCalledWith(true);
  });

  test('반복 유형 선택 시 setRepeatType이 호출된다', () => {
    (useEventForm as Mock).mockReturnValue({
      isRepeating: true,
      setIsRepeating: vi.fn(),
      repeatType: '',
      setRepeatType: vi.fn(),
      repeatInterval: 0,
      setRepeatInterval: vi.fn(),
      repeatEndDate: '',
      setRepeatEndDate: vi.fn(),
    });
    render(
      <ChakraProvider>
        <RepeatEventForm />
      </ChakraProvider>
    );
    fireEvent.change(screen.getByLabelText('반복 유형'), { target: { value: 'daily' } });
    expect(useEventForm().setRepeatType).toHaveBeenCalledWith('daily');
  });
});
