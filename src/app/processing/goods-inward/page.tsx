'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  Select, 
  Checkbox, 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  Heading,
   
  Grid,
  Textarea
} from '@chakra-ui/react';
import Link from 'next/link';

const GoodsInwardPage: React.FC = () => {
  const [inwNo, setInwNo] = useState('');
  const [date, setDate] = useState('');
  const [customer, setCustomer] = useState('');
  const [category, setCategory] = useState('');
  const [labApproved, setLabApproved] = useState(false);
  const [type, setType] = useState('');
  const [fabrics, setFabrics] = useState<{ id: number; fabric: string; color: string; gsm: string; dia: string; rolls: string; weight: string; machine: string; }[]>([]);
  const [processes, setProcesses] = useState<{ id: number; process: string; }[]>([]);

  // Function to add a new fabric row
  const addFabric = () => {
    setFabrics([
      ...fabrics,
      { id: fabrics.length + 1, fabric: '', color: '', gsm: '', dia: '', rolls: '', weight: '', machine: '' }
    ]);
  };

  // Function to add a new process row
  const addProcess = () => {
    setProcesses([
      ...processes,
      { id: processes.length + 1, process: '' }
    ]);
  };

  return (
    <Box maxW="1200px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Goods Inward</Heading>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
        <FormControl>
          <FormLabel>Inw No:</FormLabel>
          <Input type="text" value={inwNo} onChange={(e) => setInwNo(e.target.value)} />
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
          <FormLabel>Category:</FormLabel>
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Cotton">Cotton</option>
            <option value="Polyester">Polyester</option>
          </Select>
        </FormControl>
        <FormControl>
          <Checkbox isChecked={labApproved} onChange={(e) => setLabApproved(e.target.checked)}>Lab Approved</Checkbox>
        </FormControl>
        <FormControl>
          <FormLabel>Type:</FormLabel>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select Type</option>
            <option value="Knitted">Knitted</option>
            <option value="Woven">Woven</option>
          </Select>
        </FormControl>
      </Grid>

      <Heading size="md" my={4}>Fabrics</Heading>
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>S.No</Th>
            <Th>Fabric</Th>
            <Th>Color</Th>
            <Th>Greige GSM</Th>
            <Th>Greige DIA</Th>
            <Th>Finish Rolls</Th>
            <Th>Weight</Th>
            <Th>Machine</Th>
          </Tr>
        </Thead>
        <Tbody>
          {fabrics.map((fabric, index) => (
            <Tr key={fabric.id}>
              <Td>{index + 1}</Td>
              <Td><Input value={fabric.fabric} onChange={(e) => {
                const updatedFabrics = [...fabrics];
                updatedFabrics[index].fabric = e.target.value;
                setFabrics(updatedFabrics);
              }} /></Td>
              <Td><Input value={fabric.color} onChange={(e) => {
                const updatedFabrics = [...fabrics];
                updatedFabrics[index].color = e.target.value;
                setFabrics(updatedFabrics);
              }} /></Td>
              <Td><Input value={fabric.gsm} onChange={(e) => {
                const updatedFabrics = [...fabrics];
                updatedFabrics[index].gsm = e.target.value;
                setFabrics(updatedFabrics);
              }} /></Td>
              <Td><Input value={fabric.dia} onChange={(e) => {
                const updatedFabrics = [...fabrics];
                updatedFabrics[index].dia = e.target.value;
                setFabrics(updatedFabrics);
              }} /></Td>
              <Td><Input value={fabric.rolls} onChange={(e) => {
                const updatedFabrics = [...fabrics];
                updatedFabrics[index].rolls = e.target.value;
                setFabrics(updatedFabrics);
              }} /></Td>
              <Td><Input value={fabric.weight} onChange={(e) => {
                const updatedFabrics = [...fabrics];
                updatedFabrics[index].weight = e.target.value;
                setFabrics(updatedFabrics);
              }} /></Td>
              <Td><Input value={fabric.machine} onChange={(e) => {
                const updatedFabrics = [...fabrics];
                updatedFabrics[index].machine = e.target.value;
                setFabrics(updatedFabrics);
              }} /></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button mt={2} colorScheme="blue" onClick={addFabric}>Add Fabric</Button>

      <Heading size="md" my={4}>Processes</Heading>
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>S.No</Th>
            <Th>Process</Th>
          </Tr>
        </Thead>
        <Tbody>
          {processes.map((process, index) => (
            <Tr key={process.id}>
              <Td>{index + 1}</Td>
              <Td>
                <Select value={process.process} onChange={(e) => {
                  const updatedProcesses = [...processes];
                  updatedProcesses[index].process = e.target.value;
                  setProcesses(updatedProcesses);
                }}>
                  <option value="Dyeing">Dyeing</option>
                  <option value="Processing">Processing</option>
                  <option value="Finishing">Finishing</option>
                </Select>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button mt={2} colorScheme="blue" onClick={addProcess}>Add Process</Button>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mt={4}>
        <FormControl>
          <FormLabel>Cust DC No:</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>Date:</FormLabel>
          <Input type="date" />
        </FormControl>
        <FormControl>
          <FormLabel>Cust Ord No:</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>Veh No:</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>Style Ref No:</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>Greige Marking ID:</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>Marketing By:</FormLabel>
          <Select>
            <option value="">Select</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Prepared By:</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>Cust Ord Incharge:</FormLabel>
          <Select>
            <option value="">Select</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Old DO No:</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>Major Fabric:</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>Lab On:</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>Narration:</FormLabel>
          <Textarea></Textarea>
        </FormControl>
      </Grid>
      
      <Box mt={6} textAlign="center">
        <Button colorScheme="blue">Save</Button>
        <Button colorScheme="gray" ml={2}>Clear</Button>
        <Button colorScheme="red" ml={2}>Delete</Button>
        <Link href="/goods-inward" passHref>
          <Button colorScheme="teal" ml={2}>Exit</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default GoodsInwardPage;
