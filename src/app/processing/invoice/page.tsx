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
  const [tax, setTax] = useState('0');
  const [details, setDetails] = useState([{ rate: '', weight: '', amount: 0 }]);

  const handleRateChange = (index: number, value: string) => {
    const newDetails = [...details];
    newDetails[index].rate = value;
    newDetails[index].amount = parseFloat(value) * parseFloat(newDetails[index].weight || '0');
    setDetails(newDetails);
  };

  const handleWeightChange = (index: number, value: string) => {
    const newDetails = [...details];
    newDetails[index].weight = value;
    newDetails[index].amount = parseFloat(value) * parseFloat(newDetails[index].rate || '0');
    setDetails(newDetails);
  };

  const subtotal = details.reduce((sum, item) => sum + item.amount, 0);
  const gstAmount = (subtotal * parseFloat(tax)) / 100;
  const grandTotal = subtotal + gstAmount;

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
      </Grid><br></br><br></br>
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

      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>S.No</Th>
            <Th>Rate</Th>
            <Th>Weight</Th>
            <Th>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {details.map((item, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td><Input type="number" value={item.rate} onChange={(e) => handleRateChange(index, e.target.value)} /></Td>
              <Td><Input type="number" value={item.weight} onChange={(e) => handleWeightChange(index, e.target.value)} /></Td>
              <Td>{item.amount.toFixed(2)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mt={4}>
      <Box mt={6}>
        <FormControl>
          <FormLabel>Tax:</FormLabel>
          <Select value={tax} onChange={(e) => setTax(e.target.value)}>
            <option value="0">0%</option>
            <option value="5">5%</option>
            <option value="12">12%</option>
            <option value="18">18%</option>
            <option value="28">28%</option>
          </Select>
        </FormControl>
      </Box>
      <Box mt={6}>
      <Heading size="md" mt={4}>Grand Total: {grandTotal.toFixed(2)}</Heading></Box></Grid>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mt={4}>
        <FormControl>
          <FormLabel>Payment Terms:</FormLabel>
          <Select value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)}>
            <option>Cash</option>
            <option>Credit</option>
            <option>Net 30</option>
          </Select>
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
        <Button colorScheme="teal">Save</Button>
        <Button colorScheme="teal">Clear</Button>
        <Button colorScheme="red" ml={2}>Delete</Button>
        <Link href="/processing" passHref>
          <Button colorScheme="teal" ml={2}>Exit</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default InvoicePage;
