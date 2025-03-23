'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Grid,
  Stack,
  Tag,
  TagLabel,
  TagCloseButton
} from '@chakra-ui/react';
import Link from 'next/link';

const MachinePage: React.FC = () => {
  const [name, setName] = useState('');
  const [process, setProcess] = useState('');
  const [processes, setProcesses] = useState<string[]>([]);

  const handleAddProcess = () => {
    if (process.trim() !== '' && !processes.includes(process)) {
      setProcesses([...processes, process]);
      setProcess(''); // Clear input field
    }
  };

  const handleRemoveProcess = (index: number) => {
    setProcesses(processes.filter((_, i) => i !== index));
  };

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Add Machine</Heading>

      <Grid templateColumns="1fr" gap={4}>
        <FormControl>
          <FormLabel>Name:</FormLabel>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Process Linked:</FormLabel>
          <Grid templateColumns="3fr auto" gap={2}>
            <Input type="text" value={process} onChange={(e) => setProcess(e.target.value)} />
          
          </Grid>
        </FormControl>

        {/* Display Added Processes */}
        <Stack direction="row" wrap="wrap" mt={2}>
          {processes.map((proc, index) => (
            <Tag key={index} colorScheme="blue" size="lg">
              <TagLabel>{proc}</TagLabel>
              <TagCloseButton onClick={() => handleRemoveProcess(index)} />
            </Tag>
          ))}
        </Stack>
      </Grid>

      <Box mt={6} textAlign="center">
        <Button colorScheme="blue">Add Machine</Button>
        <Link href="/domains" passHref>
                  <Button colorScheme="teal" ml={2}>Exit</Button>
                </Link>
      </Box>
    </Box>
  );
};

export default MachinePage;
