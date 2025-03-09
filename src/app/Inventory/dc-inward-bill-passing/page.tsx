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
  RadioGroup,
  Stack,
  Radio,
} from '@chakra-ui/react';
import Link from 'next/link';

export default function DCInwardBillPassing() {
  const [no, setNo] = useState('');
  const [date, setDate] = useState('');
  const [reference, setReference] = useState('');
  const [supplier, setSupplier] = useState('');
  const [billNo, setBillNo] = useState('');
  const [billDate, setBillDate] = useState('');
  const [debitAccount, setDebitAccount] = useState('');
  const [creditAccount, setCreditAccount] = useState('');
  const [paymentType, setPaymentType] = useState('Credit');
  const [narration, setNarration] = useState('');
  const [preparedBy, setPreparedBy] = useState('');
  const [discount, setDiscount] = useState('');
  const [beforeTax, setBeforeTax] = useState('');
  const [tax, setTax] = useState('');
  const [afterTax, setAfterTax] = useState('');
  const [grandTotal, setGrandTotal] = useState('');
  const [gst, setGst] = useState('');


  return (
    <Box maxW="1200px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>DC Inward Bill Passing</Heading>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
        <FormControl><FormLabel>No</FormLabel><Input value={no} onChange={(e) => setNo(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Date</FormLabel><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Reference</FormLabel><Input value={reference} onChange={(e) => setReference(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Supplier</FormLabel><Input value={supplier} onChange={(e) => setSupplier(e.target.value)} /></FormControl>
      
      <FormControl mt={4}>
              <FormLabel>Type</FormLabel>
      <RadioGroup onChange={setPaymentType} value={paymentType} mt={2}>
        <Stack direction="row">
          <Radio value="Credit">Credit</Radio>
          <Radio value="Cash">Cash</Radio>
        </Stack>
      </RadioGroup>
      </FormControl></Grid>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mt={4}>
        <FormControl><FormLabel>Bill No</FormLabel><Input value={billNo} onChange={(e) => setBillNo(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Bill Date</FormLabel><Input type="date" value={billDate} onChange={(e) => setBillDate(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Debit A/c</FormLabel><Select placeholder="Select" value={debitAccount} onChange={(e) => setDebitAccount(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Credit A/c</FormLabel><Select placeholder="Select" value={creditAccount} onChange={(e) => setCreditAccount(e.target.value)} /></FormControl>
      </Grid>

      <Heading size="md" my={4}>Details</Heading>
      <Box overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Inward No</Th>
              <Th>PO No</Th>
              <Th>Item Group</Th>
              <Th>Dye Item</Th>
              <Th>Brand</Th>
              <Th>BatchNo</Th>
              <Th>HSN Code</Th>
              <Th>Rate</Th>
              <Th>Qty</Th>
              <Th>UOM</Th>
              <Th>Tax</Th>
              <Th>Amount</Th>
              <Th>Tax%</Th>
              <Th>Disc%</Th>
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
              <Td></Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      <Heading size="md" my={4}>Total Calculation</Heading>
      <Box overflowX="auto">
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>Disc%</Th>
            <Th>Ass. Value</Th>
            <Th>Disc Amt</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Th>Disc Total</Th>
            <Td colSpan={2}></Td>
          </Tr>
        </Tbody>
      </Table></Box>

      {/* Other Charges Table */}
      <Heading size="md" my={4}>Other Charges (Before Tax)</Heading>
      <Box overflowX="auto">
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>Other Charges (Before Tax)</Th>
            <Th>HSN Code</Th>
            <Th>Tax</Th>
            <Th>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </Tr>
        </Tbody>
      </Table></Box>

      {/* GST Table */}
      <Heading size="md" my={4}>GST Calculation</Heading>
      <Box overflowX="auto">
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>GST</Th>
            <Th>Tax%</Th>
            <Th>Ass. Value</Th>
            <Th>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Th>Tax Total</Th>
            <Td colSpan={3}></Td>
          </Tr>
        </Tbody>
      </Table></Box>

      {/* Other Charges After Tax */}
      <Heading size="md" my={4}>Other Charges (After Tax)</Heading>
      <Box overflowX="auto">
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>Other Charges (After Tax)</Th>
            <Th>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td></Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Th>Round Off</Th>
            <Td></Td>
          </Tr>
          <Tr>
            <Th>Net Bill Amt</Th>
            <Td></Td>
          </Tr>
        </Tbody>
      </Table></Box>

      {/* Expenses Table */}
      <Heading size="md" my={4}>Expenses</Heading>
      <Box overflowX="auto">
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>Expenses</Th>
            <Th>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td></Td>
            <Td></Td>
          </Tr>
        </Tbody>
      </Table></Box>
<br></br>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
        <FormControl><FormLabel>Discount</FormLabel><Input value={discount} onChange={(e) => setDiscount(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Before Tax</FormLabel><Input value={beforeTax} onChange={(e) => setBeforeTax(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Tax</FormLabel><Input value={tax} onChange={(e) => setTax(e.target.value)} /></FormControl>
        <FormControl><FormLabel>After Tax</FormLabel><Input value={afterTax} onChange={(e) => setAfterTax(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Grand Total</FormLabel><Input value={grandTotal} onChange={(e) => setGrandTotal(e.target.value)} /></FormControl>
        <FormControl><FormLabel></FormLabel><Select placeholder="GST" value={gst} onChange={(e) => setGst(e.target.value)} /></FormControl>
      </Grid>
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
