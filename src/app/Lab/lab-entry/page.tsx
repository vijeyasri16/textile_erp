'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Heading,
  Grid,
  Textarea,
} from '@chakra-ui/react';
import Link from 'next/link';

export default function LabEntry() {
  const [labNo, setLabNo] = useState('');
  const [date, setDate] = useState('');
  const [reference, setReference] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [customer, setCustomer] = useState('');
  const [canceled, setCanceled] = useState(false);

  return (
    <Box maxW="1200px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Lab Entry</Heading>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
        <FormControl><FormLabel>Lab No</FormLabel><Input value={labNo} onChange={(e) => setLabNo(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Date</FormLabel><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Reference</FormLabel><Input value={reference} onChange={(e) => setReference(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Contact Person</FormLabel><Input value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Customer</FormLabel><Input value={customer} onChange={(e) => setCustomer(e.target.value)} /></FormControl>
      </Grid>
      
      <Heading size="md" my={4}>Lab Details</Heading>
      <Box overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Colour</Th>
              <Th>Pantone No</Th>
              <Th>Job No</Th>
              <Th>Fabric</Th>
              <Th>Light Source</Th>
              <Th>Fastness</Th>
              <Th>Approval By</Th>
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
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>

      <FormControl mt={4}>
        <Checkbox isChecked={canceled} onChange={(e) => setCanceled(e.target.checked)}>Canceled</Checkbox>
      </FormControl>
      
      <Box mt={6} textAlign="center">
        <Button colorScheme="blue">Save</Button>
        <Button colorScheme="gray" ml={2}>Clear</Button>
        <Button colorScheme="red" ml={2}>Delete</Button>
        <Link href="/Lab" passHref>
          <Button colorScheme="teal" ml={2}>Exit</Button>
        </Link>
      </Box>
    </Box>
  );
}
