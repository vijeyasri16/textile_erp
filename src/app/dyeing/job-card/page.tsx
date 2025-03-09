'use client';
import { createJobCard, deleteJobCard, printJobCard, clearJobCardForm, exitPage } from "@/services/job-card";
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

export default function JobCardPage() {
  // State variables for form inputs
  const [machine, setMachine] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [colour, setColour] = useState('');
  const [jobNo, setJobNo] = useState('');
  const [date, setDate] = useState('');
  const [reference, setReference] = useState('');
  const [ports, setPorts] = useState('');
  const [ropeLength, setRopeLength] = useState('');
  const [instructions, setInstructions] = useState('');
  const [required, setRequired] = useState('');
  const [actQty, setActQty] = useState('');
  const [labNo, setLabNo] = useState('');
  const [labApproved, setLabApproved] = useState('');
  const [lightSource, setLightSource] = useState('');
  const [narration, setNarration] = useState('');
    const [inwardDetails, setInwardDetails] = useState<{ inwNo: string; customer: string; custDCNo: string; custOrdNo: string }[]>([]);
    const [processDetails, setProcessDetails] = useState<{ process: string }[]>([]);
// Button Handlers (Moved inside the component)
const handleSave = async () => {
    try {
      await createJobCard({ 
        machine, 
        type, 
        category, 
        colour, 
        jobNo, 
        date, 
        reference, 
        ports, 
        ropeLength, 
        instructions, 
        required, 
        actQty, 
        labNo, 
        labApproved, 
        lightSource, 
        narration, 
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
      await deleteJobCard(jobNo);
      alert("Job card deleted successfully");
    } catch (error: any) {
      alert(error.message);
    }
  };
  
  const handlePrint = () => {
    if (!jobNo) return alert("Enter a valid job number to print");
    printJobCard(jobNo);
  };
  
  const handleClear = () => {
    clearJobCardForm({
      setMachine,
      setType,
      setCategory,
      setColour,
      setJobNo,
      setDate,
      setReference,
      setPorts,
      setRopeLength,
      setInstructions,
      setRequired,
      setActQty,
      setLabNo,
      setLabApproved,
      setLightSource,
      setNarration,
    });
  };
  
  const handleExit = () => {
    exitPage();
  };
  

  return (
    <Box maxW="1200px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Job Card</Heading>
      
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
        <FormControl >
          <FormLabel>Machine</FormLabel>
          <Select placeholder="Select Machine" value={machine} onChange={(e) => setMachine(e.target.value)}>
            <option value="1TA 120">1TA 120</option>
          </Select>
        </FormControl>
        <FormControl >
          <FormLabel>Type</FormLabel>
          <Select placeholder="Select Type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Type1">Type 1</option>
            <option value="Type2">Type 2</option>
          </Select>
        </FormControl>
        <FormControl>
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
          <FormLabel>Job No</FormLabel>
          <Input value={jobNo} onChange={(e) => setJobNo(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Date</FormLabel>
          <Input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Reference</FormLabel>
          <Input value={reference} onChange={(e) => setReference(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Lab No</FormLabel>
          <Input value={labNo} onChange={(e) => setLabNo(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Lab Approved</FormLabel>
          <Select placeholder="Select" value={labApproved} onChange={(e) => setLabApproved(e.target.value)}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Select>
        </FormControl>
      </Grid>

      <Heading size="md" my={4}>Fabric Details</Heading>
      <Box overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>S.No</Th>
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
        <FormControl><FormLabel>Ports</FormLabel><Input value={ports} onChange={(e) => setPorts(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Rope Length/Port</FormLabel><Input value={ropeLength} onChange={(e) => setRopeLength(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Instructions</FormLabel><Textarea rows={2} value={instructions} onChange={(e) => setInstructions(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Required</FormLabel><Select placeholder="Select" value={required} onChange={(e) => setRequired(e.target.value)}><option value="Yes">Yes</option><option value="No">No</option></Select></FormControl>
        <FormControl><FormLabel>Act Qty</FormLabel><Input value={actQty} onChange={(e) => setActQty(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Lab No</FormLabel><Input value={labNo} onChange={(e) => setLabNo(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Light Source</FormLabel><Input value={lightSource} onChange={(e) => setLightSource(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Narration</FormLabel><Textarea rows={2} value={narration} onChange={(e) => setNarration(e.target.value)} /></FormControl>
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

