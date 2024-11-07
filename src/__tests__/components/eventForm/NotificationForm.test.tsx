import { ChakraProvider } from '@chakra-ui/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Mock } from 'vitest';

import { NotificationForm } from '../../../components/eventForm/NotificationForm';
import { useEventForm } from '../../../hooks/useEventForm';

vi.mock('../../../hooks/useEventForm');

describe('알림 폼 컴포넌트', () => {
  beforeEach(() => {
    (useEventForm as Mock).mockReturnValue({
      notificationTime: 0,
      setNotificationTime: vi.fn(),
    });
  });

  test('알림 폼이 렌더링된다', () => {
    render(
      <ChakraProvider>
        <NotificationForm />
      </ChakraProvider>
    );
    expect(screen.getByLabelText('알림 설정')).toBeInTheDocument();
  });

  test('알림 선택 시 setNotificationTime이 호출된다', () => {
    render(
      <ChakraProvider>
        <NotificationForm />
      </ChakraProvider>
    );
    fireEvent.change(screen.getByLabelText('알림 설정'), { target: { value: '1' } });
    expect(useEventForm().setNotificationTime).toHaveBeenCalledWith(1);
  });
});
