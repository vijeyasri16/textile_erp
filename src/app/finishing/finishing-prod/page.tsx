'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Grid,
} from '@chakra-ui/react';
import Link from 'next/link';
export default function FinishingProduction() {
  const [machine, setMachine] = useState('');
  const [date, setDate] = useState('');
  const [shift, setShift] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [operator, setOperator] = useState('');

  return (
    <Box maxW="1200px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Finishing Production</Heading>
      
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
        <FormControl>
          <FormLabel>Machine</FormLabel>
          <Select placeholder="Select Machine" value={machine} onChange={(e) => setMachine(e.target.value)}>
            <option value="Machine 1">Machine 1</option>
            <option value="Machine 2">Machine 2</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Date</FormLabel>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Shift</FormLabel>
          <Select placeholder="Select Shift" value={shift} onChange={(e) => setShift(e.target.value)}>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </Select>
        </FormControl>
      </Grid>

      <Heading size="md" my={4}>Production Details</Heading>
      <Box overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Prod Type</Th>
              <Th>Process</Th>
              <Th>Weight</Th>
              <Th>Remarks</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mt={4}>
        <FormControl>
          <FormLabel>Supervisor</FormLabel>
          <Input value={supervisor} onChange={(e) => setSupervisor(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Operator</FormLabel>
          <Input value={operator} onChange={(e) => setOperator(e.target.value)} />
        </FormControl>
      </Grid>

      <Box mt={6} textAlign="center">
        <Button colorScheme="blue">Save</Button>
        <Button colorScheme="red" ml={2}>Delete</Button>
        <Button colorScheme="gray" ml={2}>Clear</Button>
        <Link href="/finishing" passHref>
          <Button colorScheme="teal" ml={2}>Exit</Button>
        </Link>
      </Box>
    </Box>
  );
}
