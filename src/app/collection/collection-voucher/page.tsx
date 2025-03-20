'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  Radio, 
  RadioGroup, 
  Stack, 
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

// Define the type for rows
interface Row {
  billNo: string;
  billAmount: string;
  prevCollected: string;
  prevBalance: string;
  curAmount: string;
  curBalance: string;
}

const CollectionVoucherPage: React.FC = () => {
  const [voucherNo, setVoucherNo] = useState('');
  const [date, setDate] = useState('');
  const [reference, setReference] = useState('');
  const [customer, setCustomer] = useState('');
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [chequeNo, setChequeNo] = useState('');
  const [chequeDate, setChequeDate] = useState('');
  const [bankDetails, setBankDetails] = useState('');
  const [amount, setAmount] = useState('');
  const [unAdjustAmt, setUnAdjustAmt] = useState('');
  const [narration, setNarration] = useState('');

  // Move useState inside the component
  const [rows, setRows] = useState<Row[]>([
    { billNo: '', billAmount: '', prevCollected: '', prevBalance: '', curAmount: '', curBalance: '' }
  ]);

  // Fix handleInputChange
  const handleInputChange = (index: number, field: keyof Row, value: string) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };
    setRows(newRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { billNo: '', billAmount: '', prevCollected: '', prevBalance: '', curAmount: '', curBalance: '' }]);
  };

  return (
    <Box maxW="1200px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Collection Voucher</Heading>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
        <FormControl>
          <FormLabel>V.No:</FormLabel>
          <Input type="text" value={voucherNo} onChange={(e) => setVoucherNo(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Date:</FormLabel>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Reference:</FormLabel>
          <Input type="text" value={reference} onChange={(e) => setReference(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Customer:</FormLabel>
          <Input type="text" value={customer} onChange={(e) => setCustomer(e.target.value)} />
        </FormControl>
      </Grid>

      <Heading size="md" mt={6}>Payment Mode</Heading><br />
      <RadioGroup onChange={setPaymentMode} value={paymentMode}>
        <Stack direction="row">
          <Radio value="Cash">Cash</Radio>
          <Radio value="Cheque">Cheque</Radio>
          <Radio value="DD">DD</Radio>
          <Radio value="NEFT">NEFT</Radio>
        </Stack>
      </RadioGroup>

      {paymentMode !== 'Cash' && (
        <Box mt={4}>
          <Heading size="md">Cheque Details</Heading><br />
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
            <FormControl>
              <FormLabel>No:</FormLabel>
              <Input type="text" value={chequeNo} onChange={(e) => setChequeNo(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Date:</FormLabel>
              <Input type="date" value={chequeDate} onChange={(e) => setChequeDate(e.target.value)} />
            </FormControl>
          </Grid>
          <FormControl mt={4}>
            <FormLabel>Bank Details:</FormLabel>
            <Textarea value={bankDetails} onChange={(e) => setBankDetails(e.target.value)} />
          </FormControl>
        </Box>
      )}

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mt={4}>
        <FormControl>
          <FormLabel>Amount:</FormLabel>
          <Input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <Button colorScheme="blue" mt={2}>Auto Fill</Button>
        </FormControl>
      </Grid>

      <Heading size="md" my={4}>Items</Heading>
      <Box overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Bill No</Th>
              <Th>Bill Amount</Th>
              <Th>Prev Collected</Th>
              <Th>Prev Balance</Th>
              <Th>Cur Amount</Th>
              <Th>Cur Balance</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rows.map((row, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                {Object.keys(row).map((field, i) => (
                  <Td key={i}>
                    <Input
                      value={row[field as keyof Row]}
                      onChange={(e) => handleInputChange(index, field as keyof Row, e.target.value)}
                    />
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button colorScheme="teal" mt={4} onClick={handleAddRow}>Add Row</Button>
      </Box>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mt={4}>
        <FormControl mt={4}>
          <FormLabel>Un Adjust Amt:</FormLabel>
          <Input type="text" value={unAdjustAmt} onChange={(e) => setUnAdjustAmt(e.target.value)} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Narration:</FormLabel>
          <Textarea value={narration} onChange={(e) => setNarration(e.target.value)} />
        </FormControl>
      </Grid>

      <Box mt={6} textAlign="center">
        <Button colorScheme="blue">Save</Button>
        <Button colorScheme="gray" ml={2}>Clear</Button>
        <Button colorScheme="red" ml={2}>Delete</Button>
        <Link href="/collection" passHref>
          <Button colorScheme="teal" ml={2}>Exit</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default CollectionVoucherPage;
