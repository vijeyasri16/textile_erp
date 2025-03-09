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
  Textarea,
  Heading,
  Grid,
} from '@chakra-ui/react';
import Link from 'next/link';
export default function AdHocInPage() {
  const [no, setNo] = useState('');
  const [date, setDate] = useState('');
  const [reference, setReference] = useState('');
  const [receivedFrom, setReceivedFrom] = useState('');
  const [name, setName] = useState('');
  const [partyRefNo, setPartyRefNo] = useState('');
  const [type, setType] = useState('');
  const [dcNo, setDcNo] = useState('');
  const [stockPoint, setStockPoint] = useState('');
  const [narration, setNarration] = useState('');
  const [preparedBy, setPreparedBy] = useState('');

  return (
    <Box maxW="1200px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Ad-Hoc Stock-In</Heading>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
        <FormControl><FormLabel>No</FormLabel><Input value={no} onChange={(e) => setNo(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Date</FormLabel><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Reference</FormLabel><Input value={reference} onChange={(e) => setReference(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Rcvd. From</FormLabel><Select placeholder="Select" value={receivedFrom} onChange={(e) => setReceivedFrom(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Name</FormLabel><Input value={name} onChange={(e) => setName(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Party Ref No</FormLabel><Input value={partyRefNo} onChange={(e) => setPartyRefNo(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Type</FormLabel><Select placeholder="Select" value={type} onChange={(e) => setType(e.target.value)} /></FormControl>
        <FormControl><FormLabel>DC No</FormLabel><Select placeholder="Select" value={dcNo} onChange={(e) => setDcNo(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Stock Point</FormLabel><Input value={stockPoint} onChange={(e) => setStockPoint(e.target.value)} /></FormControl>
      </Grid>
      
      <Heading size="md" my={4}>Items</Heading>
      <Box overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Item Group</Th>
              <Th>Dye Item</Th>
              <Th>Brand</Th>
              <Th>BatchNo</Th>
              <Th>Drums</Th>
              <Th>Rate</Th>
              <Th>Qty</Th>
              <Th>UOM</Th>
              <Th>Amount</Th>
              <Th>Due Date</Th>
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
              <Td></Td>
              <Td></Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mt={4}>
        <FormControl><FormLabel>Narration</FormLabel><Textarea rows={2} value={narration} onChange={(e) => setNarration(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Prepared By</FormLabel><Input value={preparedBy} onChange={(e) => setPreparedBy(e.target.value)} /></FormControl>
      </Grid>
      
      <Box mt={6} textAlign="center">
        <Button colorScheme="blue">Save</Button>
        <Button colorScheme="green" ml={2}>Print</Button>
        <Button colorScheme="gray" ml={2}>Clear</Button>
        <Button colorScheme="red" ml={2}>Delete</Button>
        <Link href="/Inventory" passHref>
          <Button colorScheme="teal" ml={2}>Exit</Button>
        </Link>
      </Box>
    </Box>
  );
}
