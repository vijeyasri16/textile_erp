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
  Grid,
} from '@chakra-ui/react';
import Link from 'next/link';

const JobCard: React.FC = () => {
  return (
    <Box maxW="1200px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Job-Card</Heading>
      
      <Heading size="md" mt={6}>Shift and Operation Details</Heading><br></br>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
        <FormControl><FormLabel>Date:</FormLabel><Input type="date" /></FormControl>
        <FormControl><FormLabel>Shift:</FormLabel><Select><option>Morning</option><option>Evening</option></Select></FormControl>
        <FormControl><FormLabel>Load Time:</FormLabel><Input type="text" /></FormControl>
        <FormControl><FormLabel>Unload Time:</FormLabel><Input type="text" /></FormControl>
        <FormControl><FormLabel>Idle Hours:</FormLabel><Input type="text" /></FormControl>
        <FormControl><FormLabel>Run Hours:</FormLabel><Input type="text" /></FormControl>
        <FormControl><FormLabel>Rope Length:</FormLabel><Input type="number" /></FormControl>
        <FormControl><FormLabel>Speed:</FormLabel><Input type="number" /></FormControl>
      </Grid>

      <Heading size="md" mt={6}>MLR Details</Heading><br></br>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
        <FormControl><FormLabel>Pre-Treatment:</FormLabel><Input type="number" /></FormControl>
        <FormControl><FormLabel>Dye Bath:</FormLabel><Input type="number" /></FormControl>
        <FormControl><FormLabel>Dyes:</FormLabel><Input type="number" /></FormControl>
        <FormControl><FormLabel>Alkali:</FormLabel><Input type="number" /></FormControl>
        <FormControl><FormLabel>After Treatment:</FormLabel><Input type="number" /></FormControl>
      </Grid>

      <Heading size="md" mt={6}>Batch and Customer Details</Heading><br></br>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
        <FormControl><FormLabel>SL Date:</FormLabel><Input type="date" /></FormControl>
        <FormControl><FormLabel>Customer:</FormLabel><Input type="text" /></FormControl>
        <FormControl><FormLabel>Colour:</FormLabel><Input type="text" /></FormControl>
        <FormControl><FormLabel>Batch No:</FormLabel><Input type="text" /></FormControl>
        <FormControl><FormLabel>Lot No:</FormLabel><Input type="text" /></FormControl>
        <FormControl><FormLabel>FRN No.:</FormLabel><Input type="text" /></FormControl>
        <FormControl><FormLabel>Machine No.:</FormLabel><Select><option>Machine 1</option><option>Machine 2</option></Select></FormControl>
        <FormControl><FormLabel>Customer DC No.:</FormLabel><Input type="text" /></FormControl>
        <FormControl><FormLabel>Weight:</FormLabel><Input type="number" /></FormControl>
        <FormControl><FormLabel>MLR:</FormLabel><Input type="number" /></FormControl>
        <FormControl><FormLabel>Roll:</FormLabel><Input type="number" /></FormControl>
        <FormControl><FormLabel>Fabric Type:</FormLabel><Input type="text" /></FormControl>
        <FormControl><FormLabel>Lab No.:</FormLabel><Input type="text" /></FormControl>
        <FormControl><FormLabel>GSM:</FormLabel><Input type="number" /></FormControl>
      </Grid>

      <Heading size="md" mt={6}>Pre-Treatment Details</Heading><br></br>
      <Table variant="simple" mt={2}>
        <Thead>
          <Tr>
            <Th>Pre-treatment</Th>
            <Th>Item</Th>
            <Th>Required Qty</Th>
            <Th>Temperature</Th>
            <Th>Time</Th>
            <Th>Start Time</Th>
            <Th>Finish Time</Th>
            <Th>Dosing & Steam Time</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td><Input type="text" /></Td>
            <Td><Input type="text" /></Td>
            <Td><Input type="number" /></Td>
            <Td><Input type="number" /></Td>
            <Td><Input type="number" /></Td>
            <Td><Input type="time" /></Td>
            <Td><Input type="time" /></Td>
            <Td><Input type="text" /></Td>
          </Tr>
        </Tbody>
      </Table>
      <Button colorScheme="blue" mt={2}>Add</Button>

      <Heading size="md" mt={6}>pH and Process Parameters</Heading><br></br>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
        <FormControl><FormLabel>Scour Bath pH:</FormLabel><Input type="number" /></FormControl>
        <FormControl><FormLabel>Res H₂O₂:</FormLabel><Input type="text" /></FormControl>
        <FormControl><FormLabel>Start Bath pH:</FormLabel><Input type="number" /></FormControl>
        <FormControl><FormLabel>Alkali Bath pH:</FormLabel><Input type="number" /></FormControl>
        <FormControl><FormLabel>Soaping pH:</FormLabel><Input type="number" /></FormControl>
        <FormControl><FormLabel>Dye Fixing pH:</FormLabel><Input type="number" /></FormControl>
        <FormControl><FormLabel>Final Bath pH:</FormLabel><Input type="number" /></FormControl>
      </Grid>

      <Heading size="md" mt={6}>Volume and Dosage</Heading><br></br>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
        <FormControl><FormLabel>Dye Start Volume:</FormLabel><Input type="number" /></FormControl>
        <FormControl><FormLabel>Dosage Volume:</FormLabel><Input type="number" /></FormControl>
      </Grid>
      <br></br>
      <Checkbox mt={4}>Job-Card Completion</Checkbox>
      <Checkbox mt={4} ml={4}>Job-Card Issue</Checkbox>
      
      <Box mt={6} textAlign="center">
        <Button colorScheme="blue">Save</Button>
        <Button colorScheme="gray" ml={2}>Clear</Button>
        <Button colorScheme="red" ml={2}>Delete</Button>
        <Link href="/dyeing" passHref>
          <Button colorScheme="teal" ml={2}>Exit</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default JobCard;
