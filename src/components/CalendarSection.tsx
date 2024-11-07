import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  VStack,
  Heading,
  HStack,
  IconButton,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { useCalendarView } from '../hooks/useCalendarView';
import { useEventOperations } from '../hooks/useEventOperations';
import {
  formatDate,
  formatMonth,
  formatWeek,
  getEventsForDay,
  getWeekDates,
  getWeeksAtMonth,
} from '../utils/dateUtils';

export function CalendarSection() {
  const { view, setView, currentDate, holidays, navigate } = useCalendarView();
  const { events } = useEventOperations(false);

  const renderWeekView = () => {
    const weekDates = getWeekDates(currentDate);
    return (
      <VStack data-testid="week-view" align="stretch" w="full" spacing={4}>
        <Heading size="md">{formatWeek(currentDate)}</Heading>
        <Table>
          <Thead>
            <Tr>
              {weekDates.map((date) => (
                <Th key={date.toISOString()}>{formatDate(date)}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              {weekDates.map((date) => {
                const dayEvents = getEventsForDay(events, date.getDate());
                const dateString = formatDate(date);
                const holiday = holidays[dateString];
                return (
                  <Td key={date.toISOString()} height="150px" verticalAlign="top">
                    {holiday && <Text color="red.500">{holiday}</Text>}
                    {dayEvents.map((event) => (
                      <Text key={event.id} fontSize="sm" noOfLines={1}>
                        {event.title}
                      </Text>
                    ))}
                  </Td>
                );
              })}
            </Tr>
          </Tbody>
        </Table>
      </VStack>
    );
  };

  const renderMonthView = () => {
    const weeks = getWeeksAtMonth(currentDate);
    return (
      <VStack data-testid="month-view" align="stretch" w="full" spacing={4}>
        <Heading size="md">{formatMonth(currentDate)}</Heading>
        <Table>
          <Thead>
            <Tr>
              {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                <Th key={day}>{day}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {weeks.map((week, weekIndex) => (
              <Tr key={weekIndex}>
                {week.map((day, dayIndex) => {
                  const dateString = day ? formatDate(currentDate, day) : '';
                  const holiday = holidays[dateString];
                  return (
                    <Td key={`${weekIndex}-${dayIndex}`} height="100px" verticalAlign="top">
                      {day && (
                        <>
                          <Text>{day}</Text>
                          {holiday && <Text color="red.500">{holiday}</Text>}

                          {getEventsForDay(events, day).map((event) => (
                            <Text
                              key={event.id}
                              fontSize="sm"
                              noOfLines={1}
                              bg="gray.100"
                              p={1}
                              my={1}
                              borderRadius="sm"
                              isTruncated
                            >
                              {event.title}
                            </Text>
                          ))}
                        </>
                      )}
                    </Td>
                  );
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    );
  };

  return (
    <VStack flex={1} spacing={5} align="stretch">
      <Heading>일정 보기</Heading>
      <HStack mx="auto" justifyContent="space-between">
        <IconButton
          aria-label="Previous"
          icon={<ChevronLeftIcon />}
          onClick={() => navigate('prev')}
        />
        <Select
          aria-label="view"
          value={view}
          onChange={(e) => setView(e.target.value as 'week' | 'month')}
        >
          <option value="week">Week</option>
          <option value="month">Month</option>
        </Select>
        <IconButton
          aria-label="Next"
          icon={<ChevronRightIcon />}
          onClick={() => navigate('next')}
        />
      </HStack>
      {view === 'week' && renderWeekView()}
      {view === 'month' && renderMonthView()}
    </VStack>
  );
}
