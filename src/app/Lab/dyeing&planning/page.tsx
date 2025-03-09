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
  Radio,
  RadioGroup,
  Stack,
  Heading,
  Grid,
} from '@chakra-ui/react';
import Link from 'next/link';

const DyeingPlanning: React.FC = () => {
  const [colourIdentification, setColourIdentification] = useState('Loaded');

  return (
    <Box maxW="1200px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Dyeing Planning</Heading>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
        <FormControl>
          <FormLabel>Job No:</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>Rev:</FormLabel>
          <Select>
            <option value="1">1</option>
            <option value="2">2</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Date:</FormLabel>
          <Input type="datetime-local" />
        </FormControl>
        <FormControl>
          <FormLabel>Card Weight:</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>Machine:</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>Fabric:</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>Colour:</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>Old Batch No:</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>CR Code:</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>CR Date:</FormLabel>
          <Input type="date" />
        </FormControl>
        <FormControl>
          <FormLabel>LR Code:</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>LR Date:</FormLabel>
          <Input type="date" />
        </FormControl>
        <FormControl>
          <FormLabel>LR Indep:</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>LR Indep Date:</FormLabel>
          <Input type="date" />
        </FormControl>
      </Grid>
      
      <Button mt={4} colorScheme="blue">Load Details</Button>

      <Heading size="md" mt={6}>Stage Details</Heading>
      <Table variant="simple" mt={2}>
        <Thead>
          <Tr>
            <Th>Stage</Th>
            <Th>MLR</Th>
            <Th>T Liquor</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td><Input type="text" /></Td>
            <Td><Input type="text" /></Td>
            <Td><Input type="text" /></Td>
          </Tr>
        </Tbody>
      </Table>

      <Heading size="md" mt={6}>Item Details</Heading>
      <Table variant="simple" mt={2}>
        <Thead>
          <Tr>
            <Th>Stage</Th>
            <Th>Item Name</Th>
            <Th>Value</Th>
            <Th>GPL/%</Th>
            <Th>Weight</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td><Input type="text" /></Td>
            <Td><Input type="text" /></Td>
            <Td><Input type="text" /></Td>
            <Td><Input type="text" /></Td>
            <Td><Input type="text" /></Td>
          </Tr>
        </Tbody>
      </Table>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mt={4}>
  <FormControl mt={4}> {/* Changed from mt={6} to mt={4} */}
    <FormLabel>Remarks:</FormLabel>
    <Textarea />
  </FormControl>

  <FormControl mt={4}> {/* Both now have mt={4} for alignment */}
    <FormLabel>Colour Identification:</FormLabel>
    <RadioGroup onChange={setColourIdentification} value={colourIdentification}>
      <Stack direction="row">
        <Radio value="Loaded">Loaded</Radio>
        <Radio value="Inserted">Inserted</Radio>
      </Stack>
    </RadioGroup>
  </FormControl>
</Grid>

      <Box mt={6} textAlign="center">
              <Button colorScheme="blue">Save</Button>
              <Button colorScheme="green" ml={2} >Print</Button>
              <Button colorScheme="gray" ml={2} >Clear</Button>
              <Button colorScheme="red" ml={2} >Delete</Button>
              <Link href="/Lab" passHref>
          <Button colorScheme="teal" ml={2}>Exit</Button>
        </Link>
            </Box>
    </Box>
  );
};

export default DyeingPlanning;
