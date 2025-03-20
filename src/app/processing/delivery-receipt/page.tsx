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
  Checkbox, 
  Heading, 
  Grid 
} from '@chakra-ui/react';
import Link from 'next/link';

const DeliveryReceipt: React.FC = () => {
  const [vno, setVno] = useState('');
  const [date, setDate] = useState('');
  const [reference, setReference] = useState('');
  const [type, setType] = useState('');
  const [deliveryTo, setDeliveryTo] = useState('');
  const [jobNo, setJobNo] = useState('');
  const [billingName, setBillingName] = useState('');
  const [narration, setNarration] = useState('');
  const [vehicleNum, setVehicleNum] = useState('');
  const [driverName, setDriverName] = useState('');
  const [rcptNo, setRcptNo] = useState('');
  const [qty, setQty] = useState('');
  const [rcptDate, setRcptDate] = useState('');
  const [rolls, setRolls] = useState('');
  const [by, setBy] = useState('');

  return (
    <Box maxW="1200px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Delivery Receipt</Heading>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
        <FormControl>
          <FormLabel>VNO:</FormLabel>
          <Input type="text" value={vno} onChange={(e) => setVno(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Date:</FormLabel>
          <Input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Reference:</FormLabel>
          <Input type="text" value={reference} onChange={(e) => setReference(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Select Type:</FormLabel>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option>Type 1</option>
            <option>Type 2</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Delivery To:</FormLabel>
          <Select value={deliveryTo} onChange={(e) => setDeliveryTo(e.target.value)}>
            <option>Customer A</option>
            <option>Customer B</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Job No:</FormLabel>
          <Input type="text" value={jobNo} onChange={(e) => setJobNo(e.target.value)} />
        </FormControl>
      </Grid>
      
      <Heading size="md" my={4}>Details</Heading>
            <Box overflowX="auto">
              <Table variant="simple" size="md">
                <Thead>
                  <Tr>
                  <Th>S.No</Th>
                  <Th>Inw No</Th>
                  <Th>Cust Ord No</Th>
                  <Th>Cust DC No</Th>
                  <Th>Job Card</Th>
                  <Th>Fabric</Th>
                  <Th>Colour</Th>
                  <Th>Greige Dia</Th>
                  <Th>Finish Rolls</Th>
                  
                  <Th>Weight</Th>
                  <Th>Greige Weight</Th>
                  <Th>Loss %</Th>
                  <Th>Process</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
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
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
      
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mt={4}>
        <FormControl>
          <FormLabel>Billing Name:</FormLabel>
          <Input type="text" value={billingName} onChange={(e) => setBillingName(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Narration:</FormLabel>
          <Textarea value={narration} onChange={(e) => setNarration(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Vehicle Num:</FormLabel>
          <Input type="text" value={vehicleNum} onChange={(e) => setVehicleNum(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Driver Name:</FormLabel>
          <Input type="text" value={driverName} onChange={(e) => setDriverName(e.target.value)} />
        </FormControl>
      </Grid>
      
      <Box mt={4} p={4} borderWidth={1} borderRadius="md">
        <Checkbox>Delivery Receipt</Checkbox>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mt={2}>
          <FormControl>
            <FormLabel>Rcpt No:</FormLabel>
            <Input type="text" value={rcptNo} onChange={(e) => setRcptNo(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Qty:</FormLabel>
            <Input type="text" value={qty} onChange={(e) => setQty(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Date:</FormLabel>
            <Input type="date" value={rcptDate} onChange={(e) => setRcptDate(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Rolls:</FormLabel>
            <Input type="text" value={rolls} onChange={(e) => setRolls(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>By:</FormLabel>
            <Input type="text" value={by} onChange={(e) => setBy(e.target.value)} />
          </FormControl>
        </Grid>
      </Box>
      
      <Box mt={6} textAlign="center">
        <Button colorScheme="blue">Save</Button>
        <Button colorScheme="gray" ml={2}>Clear</Button>
        <Button colorScheme="red" ml={2}>Delete</Button>
        <Link href="/processing" passHref>
                  <Button colorScheme="teal" ml={2}>Exit</Button>
                </Link>
      </Box>
    </Box>
  );
};

export default DeliveryReceipt;
