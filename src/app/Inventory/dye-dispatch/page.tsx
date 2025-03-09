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

export default function DyesDispatchPage() {
  // State variables for form inputs
  const [vNo, setVNo] = useState('');
  const [date, setDate] = useState('');
  const [reference, setReference] = useState('');
  const [type, setType] = useState('');
  const [jobCard, setJobCard] = useState('');
  const [against, setAgainst] = useState('');
  const [batchWeight, setBatchWeight] = useState('');
  const [machine, setMachine] = useState('');
  const [shift, setShift] = useState('');
  const [process, setProcess] = useState('');
  const [stockPoint, setStockPoint] = useState('');
  const [employee, setEmployee] = useState('');
  const [department, setDepartment] = useState('');
  const [narration, setNarration] = useState('');
  const [otherCharges, setOtherCharges] = useState('');
  const [preparedBy, setPreparedBy] = useState('');
  
  return (
    <Box maxW="1200px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Dyes Dispatch</Heading>
      
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
        <FormControl><FormLabel>V. No</FormLabel><Input value={vNo} onChange={(e) => setVNo(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Date</FormLabel><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Reference</FormLabel><Input value={reference} onChange={(e) => setReference(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Type</FormLabel><Select value={type} onChange={(e) => setType(e.target.value)}><option>Job Card</option></Select></FormControl>
        <FormControl><FormLabel>Job Card</FormLabel><Input value={jobCard} onChange={(e) => setJobCard(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Against</FormLabel><Select value={against} onChange={(e) => setAgainst(e.target.value)}><option>Option 1</option></Select></FormControl>
        <FormControl><FormLabel>Batch Weight</FormLabel><Input value={batchWeight} onChange={(e) => setBatchWeight(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Machine</FormLabel><Input value={machine} onChange={(e) => setMachine(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Shift</FormLabel><Select value={shift} onChange={(e) => setShift(e.target.value)}><option>Morning</option><option>Evening</option></Select></FormControl>
        <FormControl><FormLabel>Process</FormLabel><Input value={process} onChange={(e) => setProcess(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Stock Point</FormLabel><Input value={stockPoint} onChange={(e) => setStockPoint(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Employee</FormLabel><Input value={employee} onChange={(e) => setEmployee(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Department</FormLabel><Input value={department} onChange={(e) => setDepartment(e.target.value)} /></FormControl>
      </Grid>
      
      <Heading size="md" my={4}>Stage Details</Heading>
      <Table variant="simple" size="md">
        <Thead><Tr><Th>Stage</Th><Th>MLR</Th><Th>T.Liquor</Th></Tr></Thead>
        <Tbody><Tr><Td></Td><Td></Td><Td></Td></Tr></Tbody>
      </Table>
      
      <Heading size="md" my={4}>Dispatch Details</Heading>
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>S.No</Th><Th>Stage</Th><Th>Item Group</Th><Th>Items</Th><Th>Brand</Th><Th>Batch No</Th>
            <Th>Value</Th><Th>GPL/%</Th><Th>Rate</Th><Th>Qty</Th><Th>UOM</Th><Th>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td><Td></Td><Td></Td><Td></Td><Td></Td><Td></Td>
            <Td></Td><Td></Td><Td></Td><Td></Td><Td></Td><Td></Td>
          </Tr>
        </Tbody>
      </Table>
      
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mt={4}>
        <FormControl><FormLabel>Narration</FormLabel><Textarea rows={2} value={narration} onChange={(e) => setNarration(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Other Charges</FormLabel><Input value={otherCharges} onChange={(e) => setOtherCharges(e.target.value)} /></FormControl>
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
