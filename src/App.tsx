import { Box, Flex } from '@chakra-ui/react';

import { AlertSection } from './components/AlertSection';
import { CalendarSection } from './components/CalendarSection';
import { EventFormSection } from './components/EventFormSection';
import { EventListSection } from './components/EventListSection';

function App() {
  return (
    <Box w="full" h="100vh" m="auto" p={5}>
      <Flex gap={6} h="full">
        <EventFormSection />
        <CalendarSection />
        <EventListSection />
      </Flex>
      <AlertSection />
    </Box>
  );
}

export default App;
