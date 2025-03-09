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

export default function GoodsReceivedNote() {
  const [grnNo, setGrnNo] = useState('');
  const [type, setType] = useState('Credit');
  const [stockPoint, setStockPoint] = useState('');
  const [date, setDate] = useState('');
  const [reference, setReference] = useState('');
  const [supplier, setSupplier] = useState('');
  const [against, setAgainst] = useState('');
  const [debitAc, setDebitAc] = useState('');
  const [creditAc, setCreditAc] = useState('');
  const [gst, setGst] = useState('');
  const [grandTotal, setGrandTotal] = useState('');
  const [billNo, setBillNo] = useState('');
  const [billDate, setBillDate] = useState('');
  const [narration, setNarration] = useState('');
  const [preparedBy, setPreparedBy] = useState('');

  return (
    <Box maxW="1200px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Goods Received Note</Heading>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
        <FormControl><FormLabel>GRN No</FormLabel><Input value={grnNo} onChange={(e) => setGrnNo(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Stock Point</FormLabel><Input value={stockPoint} onChange={(e) => setStockPoint(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Date</FormLabel><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></FormControl>
      </Grid>
      
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4} mt={4}>
        <FormControl><FormLabel>Reference</FormLabel><Input value={reference} onChange={(e) => setReference(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Supplier</FormLabel><Input value={supplier} onChange={(e) => setSupplier(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Against</FormLabel><Select placeholder="Select" value={against} onChange={(e) => setAgainst(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Debit A/c</FormLabel><Select placeholder="Select" value={debitAc} onChange={(e) => setDebitAc(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Credit A/c</FormLabel><Select placeholder="Select" value={creditAc} onChange={(e) => setCreditAc(e.target.value)} /></FormControl>
        <FormControl mt={4}>
        <FormLabel>Type</FormLabel>
        <RadioGroup onChange={setType} value={type}>
          <Stack direction="row">
            <Radio value="Credit">Credit</Radio>
            <Radio value="Cash">Cash</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      </Grid>
      
      <Heading size="md" my={4}>Items</Heading>
      <Box overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>PO No</Th>
              <Th>Item Group</Th>
              <Th>Dye Item</Th>
              <Th>Brand</Th>
              <Th>Batch No</Th>
              <Th>Drums</Th>
              <Th>HSN Code</Th>
              <Th>Rate</Th>
              <Th>Qty</Th>
              <Th>UOM</Th>
              <Th>Tax</Th>
              <Th>Amount</Th>
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
                    </Tr>
                  </Tbody>
                </Table></Box>

      <Heading size="md" my={4}>Discount</Heading>
      <Box overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Discount%</Th>
              <Th>Ass. Value</Th>
              <Th>Disc Amt</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
            <Td></Td><Td></Td><Td></Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      <Heading size="md" my={4}>Charges</Heading>
      <Box overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Other Charges(before tax)</Th>
              <Th>HSN code</Th>
              <Th>Tax</Th>
              <Th>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
            <Td></Td><Td></Td><Td></Td><Td></Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      <Heading size="md" my={4}>Charges after tax</Heading>
      <Box overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Other Charges</Th>
              <Th>Perct %</Th>
              <Th>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
            <Td></Td><Td></Td><Td></Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      <Heading size="md" my={4}>GST</Heading>
      <Box overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>GST</Th>
              <Th>Tax %</Th>
              <Th>Ass. Value</Th>
              <Th>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
            <Td></Td><Td></Td><Td></Td><Td></Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      
      <Heading size="md" my={4}></Heading>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
        <FormControl><FormLabel>GST</FormLabel><Select placeholder="Select" value={gst} onChange={(e) => setGst(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Grand Total</FormLabel><Input value={grandTotal} onChange={(e) => setGrandTotal(e.target.value)} /></FormControl>
      </Grid>
      
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mt={4}>
        <FormControl><FormLabel>Bill No</FormLabel><Input value={billNo} onChange={(e) => setBillNo(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Bill Date</FormLabel><Input type="date" value={billDate} onChange={(e) => setBillDate(e.target.value)} /></FormControl>
      </Grid>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mt={4}>
      <FormControl mt={4}><FormLabel>Narration</FormLabel><Textarea rows={2} value={narration} onChange={(e) => setNarration(e.target.value)} /></FormControl>
      <FormControl mt={4}><FormLabel>Prepared By</FormLabel><Input value={preparedBy} onChange={(e) => setPreparedBy(e.target.value)} /></FormControl>
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
