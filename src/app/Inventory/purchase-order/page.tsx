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
  Radio,
  Stack,
} from '@chakra-ui/react';
import Link from 'next/link';

export default function PurchaseOrder() {
  const [poNo, setPoNo] = useState('');
  const [supplier, setSupplier] = useState('');
  const [against, setAgainst] = useState('');
  const [taxType, setTaxType] = useState('');
  const [date, setDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [narration, setNarration] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('');
  const [preparedBy, setPreparedBy] = useState('');
  const [status, setStatus] = useState('Completed');

  return (
    <Box maxW="1200px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Purchase Order</Heading>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
        <FormControl><FormLabel>PO No</FormLabel><Input value={poNo} onChange={(e) => setPoNo(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Supplier</FormLabel><Input value={supplier} onChange={(e) => setSupplier(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Against</FormLabel><Select placeholder="Select" value={against} onChange={(e) => setAgainst(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Tax Type</FormLabel><Select placeholder="Select" value={taxType} onChange={(e) => setTaxType(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Date</FormLabel><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Delivery Date</FormLabel><Input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} /></FormControl>
      </Grid>

      <Heading size="md" my={4}>Items</Heading>
      <Box overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Item Group</Th>
              <Th>Dye Item</Th>
              <Th>Brand</Th>
              <Th>HSN Code</Th>
              <Th>Rate</Th>
              <Th>Qty</Th>
              <Th>UOM</Th>
              <Th>Tax</Th>
              <Th>Amount</Th>
              <Th>Tax%</Th>
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
            </Tr>
          </Tbody>
        </Table>
      </Box>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mt={4}>
        <FormControl><FormLabel>Narration</FormLabel><Textarea rows={2} value={narration} onChange={(e) => setNarration(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Payment Terms</FormLabel><Textarea rows={2} value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Prepared By</FormLabel><Input value={preparedBy} onChange={(e) => setPreparedBy(e.target.value)} /></FormControl>
      

      <FormControl><FormLabel>Status</FormLabel>
      <RadioGroup onChange={setStatus} value={status}>
        <Stack direction="row">
          <Radio value="Completed">Completed</Radio>
          <Radio value="Short closed">Short Closed</Radio>
          <Radio value="Cancelled">Cancelled</Radio>
        </Stack>
      </RadioGroup></FormControl></Grid>

      <Heading size="md" my={4}>Summary</Heading>
      <Box overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
            <Th>Disc%</Th>
            <Th>Ass. Value</Th>
            <Th>Amount</Th>
            <Th>GST</Th>
            <Th>Tax%</Th>
            <Th>Ass. Value</Th>
            <Th>Amount</Th>
            <Th>Other Charges</Th>
            <Th>Perct(%)</Th>
            <Th>Amount</Th>
            <Th>Round Off</Th>
            <Th>Grand Total</Th>
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
            </Tr>
          </Tbody>
        </Table>
      </Box>



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
