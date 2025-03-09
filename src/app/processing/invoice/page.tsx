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
  Grid 
} from '@chakra-ui/react';
import Link from 'next/link';

const InvoicePage: React.FC = () => {
  const [invoiceNo, setInvoiceNo] = useState('');
  const [date, setDate] = useState('');
  const [customer, setCustomer] = useState('');
  const [billType, setBillType] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('');
  const [creditDays, setCreditDays] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [narration, setNarration] = useState('');
  const [reference, setReference] = useState('');
  const [dcNo, setDcNo] = useState('');
  const [tax, setTax] = useState('');

  return (
    <Box maxW="1200px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Invoice</Heading>
      
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
        <FormControl>
          <FormLabel>Invoice No:</FormLabel>
          <Input type="text" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>DC No:</FormLabel>
          <Input type="text" value={dcNo} onChange={(e) => setDcNo(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Date:</FormLabel>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Customer:</FormLabel>
          <Input type="text" value={customer} onChange={(e) => setCustomer(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Bill Type:</FormLabel>
          <Select value={billType} onChange={(e) => setBillType(e.target.value)}>
            <option>Type 1</option>
            <option>Type 2</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Reference:</FormLabel>
          <Input type="text" value={reference} onChange={(e) => setReference(e.target.value)} />
        </FormControl>
      </Grid>
      
      <Heading size="md" my={4}>Details</Heading>
      <Box overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>DC No</Th>
              <Th>Date</Th>
              <Th>Inw No</Th>
              <Th>Cust DC No</Th>
              <Th>Date</Th>
              <Th>Cust Drd No</Th>
              <Th>Style No</Th>
              <Th>Fabric</Th>
              <Th>Colour</Th>
              <Th>Process</Th>
              <Th>Rolls</Th>
              <Th>Weight</Th>
              <Th>Rate</Th>
              <Th>Amount</Th>
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
          <Td></Td>
          <Td></Td></Tr>
          </Tbody>
        </Table>
      </Box>

      <Heading size="md" my={4}>Tax Details</Heading>
      <Box overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Tax%</Th>
              <Th>Ass amt</Th>
              <Th>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Subtotal</Td>
              <Td></Td>
              <Td></Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Round Off</Td>
              <Td></Td>
              <Td></Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Grand Total</Td>
              <Td></Td>
              <Td></Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
<br></br>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mt={4}>
        <FormControl>
          <FormLabel>Payment Terms:</FormLabel>
          <Input type="text" value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Credit Days:</FormLabel>
          <Input type="text" value={creditDays} onChange={(e) => setCreditDays(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Due Date:</FormLabel>
          <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Narration:</FormLabel>
          <Textarea value={narration} onChange={(e) => setNarration(e.target.value)} />
        </FormControl>
      </Grid>

      <Box mt={6} textAlign="center">
        <Button colorScheme="blue">View Invoice</Button>
        <Button colorScheme="green" ml={2}>Consolidate Invoice</Button>
        <Button colorScheme="purple" ml={2}>Order Summary</Button>
        <Button colorScheme="yellow" ml={2}>Generate e-Invoice</Button>
        <Button colorScheme="red" ml={2}>Cancel e-Invoice</Button>
      </Box>

      <Box mt={6} textAlign="center">
        <Box display="flex" justifyContent="center" alignItems="center" gap={4} flexWrap="wrap">
        <Box display="flex" alignItems="center">
        <FormLabel mb="0" mr={2}>Tax:</FormLabel>
          <Select value={tax} onChange={(e) => setTax(e.target.value)} width="100px">
            <option>GST</option>
          </Select>
      </Box>
    
    <Button colorScheme="teal">Save</Button>
    <Button colorScheme="gray">Print</Button>
    <Button colorScheme="gray">Clear</Button>
    <Button colorScheme="red">Delete</Button>
    <Link href="/processing" passHref>
      <Button colorScheme="teal">Exit</Button>
    </Link>
  </Box>
</Box>

    </Box>
  );
};

export default InvoicePage;
