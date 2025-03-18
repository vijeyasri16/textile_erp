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
} from '@chakra-ui/react';
import Link from 'next/link';

// Define TypeScript interface for table rows
interface LabDetailRow {
  id: number;
  colour: string;
  pantoneNo: string;
  jobNo: string;
  fabric: string;
  lightSource: string;
  fastness: string;
  approvalBy: string;
  remarks: string;
}

export default function LabEntry() {
  const [labNo, setLabNo] = useState('');
  const [date, setDate] = useState('');
  const [reference, setReference] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [customer, setCustomer] = useState('');
  const [canceled, setCanceled] = useState(false);

  // Table row state
  const [rows, setRows] = useState<LabDetailRow[]>([
    { id: 1, colour: '', pantoneNo: '', jobNo: '', fabric: '', lightSource: '', fastness: '', approvalBy: '', remarks: '' }
  ]);

  // Handle input change in table rows
  const handleInputChange = (index: number, field: keyof LabDetailRow, value: string) => {
    const updatedRows = [...rows];
    updatedRows[index] = { ...updatedRows[index], [field]: value };
    setRows(updatedRows);
  };

  // Add new row
  const addRow = () => {
    setRows([...rows, { id: rows.length + 1, colour: '', pantoneNo: '', jobNo: '', fabric: '', lightSource: '', fastness: '', approvalBy: '', remarks: '' }]);
  };

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
            {rows.map((row, index) => (
              <Tr key={row.id}>
                <Td>{index + 1}</Td>
                <Td><Input value={row.colour} onChange={(e) => handleInputChange(index, 'colour', e.target.value)} /></Td>
                <Td><Input value={row.pantoneNo} onChange={(e) => handleInputChange(index, 'pantoneNo', e.target.value)} /></Td>
                <Td><Input value={row.jobNo} onChange={(e) => handleInputChange(index, 'jobNo', e.target.value)} /></Td>
                <Td><Input value={row.fabric} onChange={(e) => handleInputChange(index, 'fabric', e.target.value)} /></Td>
                <Td><Input value={row.lightSource} onChange={(e) => handleInputChange(index, 'lightSource', e.target.value)} /></Td>
                <Td><Input value={row.fastness} onChange={(e) => handleInputChange(index, 'fastness', e.target.value)} /></Td>
                <Td><Input value={row.approvalBy} onChange={(e) => handleInputChange(index, 'approvalBy', e.target.value)} /></Td>
                <Td><Input value={row.remarks} onChange={(e) => handleInputChange(index, 'remarks', e.target.value)} /></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Button colorScheme="blue" mt={4} onClick={addRow}>Add Row</Button>

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
