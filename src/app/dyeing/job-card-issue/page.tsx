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
import { 
  createJobIssue, 
  deleteJobIssue, 
  printJobIssue, 
  clearJobIssueForm, 
  exitPage 
} from "@/services/job-issue";

import Link from 'next/link';
export default function JobCardPage() {
  // State variables for form inputs
  const [machine, setMachine] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [colour, setColour] = useState('');
  const [jobNo, setJobNo] = useState('');
  const [date, setDate] = useState('');
  const [reference, setReference] = useState('');
  const [LoadingDateandTime, setLoadingDateandTime] = useState('');
 
    const [inwardDetails, setInwardDetails] = useState<{ inwNo: string; customer: string; custDCNo: string; custOrdNo: string }[]>([]);
    const [processDetails, setProcessDetails] = useState<{ process: string }[]>([]);
// Button Handlers (Moved inside the component)
const handleSave = async () => {
    try {
      await createJobIssue({ 
        machine, 
        type, 
        category, 
        colour, 
        jobNo, 
        date, 
        reference, 
        LoadingDateandTime,
        inwardDetails, 
        processDetails 
      });
      alert("Job card saved successfully");
    } catch (error: any) {
      alert(error.message);
    }
  };
  
  const handleDelete = async () => {
    if (!jobNo) return alert("Enter a valid job number to delete");
    try {
      await deleteJobIssue(jobNo);
      alert("Job card deleted successfully");
    } catch (error: any) {
      alert(error.message);
    }
  };
  
  const handlePrint = () => {
    if (!jobNo) return alert("Enter a valid job number to print");
    printJobIssue(jobNo);
  };
  
  const handleClear = () => {
    clearJobIssueForm({
      setMachine,
      setType,
      setCategory,
      setColour,
      setJobNo,
      setDate,
      setReference,
      setLoadingDateandTime,

    });
  };
 
  

  return (
    <Box maxW="1200px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Job Card Issue</Heading>
      
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
        <FormControl isRequired>
          <FormLabel>Job No</FormLabel>
          <Input value={jobNo} onChange={(e) => setJobNo(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Type</FormLabel>
          <Select placeholder="Select Type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Type1">Type 1</option>
            <option value="Type2">Type 2</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Category</FormLabel>
          <Select placeholder="Select Category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Category1">Category 1</option>
            <option value="Category2">Category 2</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Colour</FormLabel>
          <Input value={colour} onChange={(e) => setColour(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Machine</FormLabel>
          <Input value={machine} onChange={(e) => setMachine(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Date</FormLabel>
          <Input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Reference</FormLabel>
          <Input value={reference} onChange={(e) => setReference(e.target.value)} />
        </FormControl>

      </Grid>

      <Heading size="md" my={4}>Fabric Details</Heading>
      <Box overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Inw No</Th>
              <Th>Fabric</Th>
              <Th>Colour</Th>
              <Th>Greige GSM</Th>
              <Th>Greige Dia</Th>
              <Th>Finish</Th>
              <Th>Found Dia</Th>
              <Th>Rolls</Th>
              <Th>Weight</Th>
              <Th>Fin GSM</Th>
              <Th>Fin Dia</Th>
              <Th>Length</Th>
              <Th>Mtrs Per Kg</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>    
              <Td>11</Td>
              <Td>Cotton</Td>
              <Td>White</Td>
              <Td>180</Td>
              <Td>30</Td>
              <Td>Soft</Td>
              <Td>28</Td>
              <Td>10</Td>
              <Td>200</Td>
              <Td>190</Td>
              <Td>29</Td>
              <Td>50</Td>
              <Td>4</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>

     <Heading size="md" my={4}>Process Details</Heading>
     <Box overflowX="auto">
       <Table variant="simple" size="md">
         <Thead>
           <Tr>
             <Th>S.No</Th>
             <Th>Process Name</Th>
           </Tr>
         </Thead>
         <Tbody>
           <Tr>
             <Td>1</Td>
             <Td>Initial Check</Td>
           </Tr>
         </Tbody>
       </Table>
     </Box>
     <Heading size="md" my={4}>Inward Details</Heading>
     <Box overflowX="auto">
       <Table variant="simple" size="md">
         <Thead>
           <Tr>
             <Th>Inw no</Th>
             <Th>Customer</Th>
             <Th>Cust DC No</Th>
             <Th>Cust Ord No</Th>
           </Tr>
         </Thead>
         <Tbody>
           <Tr>
             <Td>1</Td>
             <Td></Td>
             <Td></Td>
             <Td></Td>
           </Tr>
         </Tbody>
       </Table>
     </Box>
       <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mt={4}>
       <FormControl isRequired>
          <FormLabel>Loading Date and Time</FormLabel>
          <Input type="datetime-local" value={date} onChange={(e) => setLoadingDateandTime(e.target.value)} />
       </FormControl>
       </Grid>
     <Box mt={6} textAlign="center">
        <Button colorScheme="blue">Save</Button>
        <Button colorScheme="green" ml={2} onClick={handlePrint}>Print</Button>
        <Button colorScheme="gray" ml={2} onClick={handleClear}>Clear</Button>
        <Button colorScheme="red" ml={2} onClick={handleDelete}>Delete</Button>
        <Button colorScheme="orange" ml={2} >Processing Details</Button>
        <Link href="/dyeing" passHref>
                  <Button colorScheme="teal" ml={2}>Exit</Button>
                </Link>
      </Box>
</Box>
  
  );
}

