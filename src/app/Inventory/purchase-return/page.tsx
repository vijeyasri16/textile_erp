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
  Checkbox,
} from '@chakra-ui/react';
import Link from 'next/link';

export default function PurchaseReturn() {
  const [vNo, setVNo] = useState('');
  const [date, setDate] = useState('');
  const [supplier, setSupplier] = useState('');
  const [creditAcct, setCreditAcct] = useState('');
  const [reference, setReference] = useState('');
  const [stockPoint, setStockPoint] = useState('');
  const [debitAcct, setDebitAcct] = useState('');
  const [narration, setNarration] = useState('');
  const [grandTotal, setGrandTotal] = useState('');
  const [isVAT, setIsVAT] = useState(false);

  return (
    <Box maxW="1200px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Purchase Return</Heading>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
        <FormControl><FormLabel>V. No.</FormLabel><Input value={vNo} onChange={(e) => setVNo(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Date</FormLabel><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Supplier</FormLabel><Input value={supplier} onChange={(e) => setSupplier(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Credit Acct</FormLabel><Select placeholder="Select" value={creditAcct} onChange={(e) => setCreditAcct(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Reference</FormLabel><Input value={reference} onChange={(e) => setReference(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Stock Point</FormLabel><Input value={stockPoint} onChange={(e) => setStockPoint(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Debit Acct</FormLabel><Select placeholder="Select" value={debitAcct} onChange={(e) => setDebitAcct(e.target.value)} /></FormControl>
      </Grid>

      <Heading size="md" my={4}>Items</Heading>
      <Box overflowX="auto">
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>S.No</Th>
            <Th>GRN No</Th>
            <Th>Dye Item</Th>
            <Th>Brand</Th>
            <Th>Batch</Th>
            <Th>Drums</Th>
            <Th>Rate</Th>
            <Th>Qty</Th>
            <Th>UOM</Th>
            <Th>HSN Code</Th>
            <Th>Tax Desc</Th>
            <Th>Amount</Th>
            <Th>Tax%</Th>
            <Th>Disc%</Th>
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
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </Tr>
        </Tbody>
      </Table></Box>

      <Heading size="md" my={4}>Discount Details</Heading>
      <Box overflowX="auto">
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>Discount</Th>
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
        </Tbody>
      </Table></Box>

      <Heading size="md" my={4}>VAT Details</Heading>
      <Box overflowX="auto">
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>VAT%</Th>
            <Th>Ass. Value</Th>
            <Th>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </Tr>
        </Tbody>
      </Table></Box>
       <Heading size="md" my={4}>Charges</Heading>
            <Box overflowX="auto">
            <Table variant="simple" size="md">
              <Thead>
                <Tr>
                  <Th>Other Charges</Th>
                  <Th>Perct %</Th>
                  <Th>Ass. Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td colSpan={3}></Td>
                </Tr>
                <Tr>
                  <Td>Round off</Td>
                  <Td colSpan={2}></Td>
                </Tr>
              </Tbody>
            </Table></Box>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mt={4}>
        <FormControl><FormLabel>Narration</FormLabel><Textarea rows={2} value={narration} onChange={(e) => setNarration(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Grand Total</FormLabel><Input value={grandTotal} onChange={(e) => setGrandTotal(e.target.value)} /></FormControl>
      </Grid>

      <Checkbox my={4} isChecked={isVAT} onChange={(e) => setIsVAT(e.target.checked)}>Is VAT</Checkbox>

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