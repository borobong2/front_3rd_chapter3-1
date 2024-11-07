import { ChakraProvider } from '@chakra-ui/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Mock } from 'vitest';

import { BasicEventForm } from '../../../components/eventForm/BasicEventForm';
import { useEventForm } from '../../../hooks/useEventForm';

vi.mock('../../../hooks/useEventForm');

describe('기본 이벤트 폼 컴포넌트', () => {
  beforeEach(() => {
    (useEventForm as Mock).mockReturnValue({
      title: '',
      setTitle: vi.fn(),
      date: '',
      setDate: vi.fn(),
      startTime: '',
      endTime: '',
      description: '',
      setDescription: vi.fn(),
      location: '',
      setLocation: vi.fn(),
      category: '',
      setCategory: vi.fn(),
      startTimeError: false,
      endTimeError: false,
      handleStartTimeChange: vi.fn(),
      handleEndTimeChange: vi.fn(),
    });
  });

  test('기본 이벤트 폼이 렌더링된다', () => {
    render(
      <ChakraProvider>
        <BasicEventForm />
      </ChakraProvider>
    );
    expect(screen.getByLabelText('제목')).toBeInTheDocument();
    expect(screen.getByLabelText('날짜')).toBeInTheDocument();
    expect(screen.getByLabelText('시작 시간')).toBeInTheDocument();
    expect(screen.getByLabelText('종료 시간')).toBeInTheDocument();
    expect(screen.getByLabelText('설명')).toBeInTheDocument();
    expect(screen.getByLabelText('위치')).toBeInTheDocument();
    expect(screen.getByLabelText('카테고리')).toBeInTheDocument();
  });

  test('제목 입력 시 setTitle이 호출된다', () => {
    render(
      <ChakraProvider>
        <BasicEventForm />
      </ChakraProvider>
    );
    fireEvent.change(screen.getByLabelText('제목'), { target: { value: 'Test Event' } });
    expect(useEventForm().setTitle).toHaveBeenCalledWith('Test Event');
  });
});
