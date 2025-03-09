'use client';
import { createGoodsInward } from '@/services/goodsInward';
import { deleteGoodsInward } from '@/services/goodsInward';
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
  Heading,
  Textarea,
  Grid,
} from '@chakra-ui/react';
import Link from 'next/link';

export default function GoodsInwardPage() {
  const [itemNo, setItemNo] = useState('');
  const [date, setDate] = useState('');
  const [customer, setCustomer] = useState('');
  const [category, setCategory] = useState('');
  const [goodsFrom, setGoodsFrom] = useState('');
  const [labApproved, setLabApproved] = useState('');
  const [type, setType] = useState('');
  const handleSubmit = async () => {
    try {
      const payload = {
        itemNo,
        date,
        customer,
        category,
        goodsFrom,
        labApproved,
        type,
        fabricDetails,
        processDetails
      };
  
      const response = await createGoodsInward(payload);
      alert(response.message || 'Goods Inward saved successfully!');
    } catch (error) {
      alert((error as any).message || 'Failed to save Goods Inward');
    }
  };
  
  // Fabric details state
  const [fabricDetails, setFabricDetails] = useState<{ fabric: string; colour: string; greigeGSM: string; greigeDia: string; finishRolls: string; weight: string; machine: string }[]>([]);
  const [newFabric, setNewFabric] = useState({
    fabric: '',
    colour: '',
    greigeGSM: '',
    greigeDia: '',
    finishRolls: '',
    weight: '',
    machine: '',
  });

  // Process details state
  const [processDetails, setProcessDetails] = useState<{ process: string }[]>([]);
  const [newProcess, setNewProcess] = useState({ process: '' });

  // Function to add a fabric entry
  const addFabricDetail = () => {
    if (newFabric.fabric && newFabric.colour) {
      setFabricDetails([...fabricDetails, newFabric]);
      setNewFabric({ fabric: '', colour: '', greigeGSM: '', greigeDia: '', finishRolls: '', weight: '', machine: '' });
    }
  };

  // Function to add a process entry
  const addProcessDetail = () => {
    if (newProcess.process) {
      setProcessDetails([...processDetails, newProcess]);
      setNewProcess({ process: '' });
    }
  };
  const handlePrint = () => {
    window.print();
  };
  const clearForm = () => {
    setItemNo('');
    setDate('');
    setCustomer('');
    setCategory('');
    setGoodsFrom('');
    setLabApproved('');
    setType('');
    setFabricDetails([]);
    setNewFabric({ fabric: '', colour: '', greigeGSM: '', greigeDia: '', finishRolls: '', weight: '', machine: '' });
    setProcessDetails([]);
    setNewProcess({ process: '' });
  };


const handleDelete = async () => {
  if (!itemNo) {
    alert('Please enter Inw No to delete');
    return;
  }
  try {
    await deleteGoodsInward(itemNo);
    alert('Entry deleted successfully');
    clearForm();
  } catch (error) {
    alert('Error deleting entry');
  }
};


  return (
    <Box maxW="1200px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Goods Inward</Heading>

      {/* First Section: Basic Information */}
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
        <FormControl >
          <FormLabel>Inw No</FormLabel>
          <Input value={itemNo} onChange={(e) => setItemNo(e.target.value)} />
        </FormControl>
        <FormControl >
          <FormLabel>Date</FormLabel>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </FormControl>
        <FormControl >
          <FormLabel>Customer</FormLabel>
          <Input value={customer} onChange={(e) => setCustomer(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Category</FormLabel>
          <Select placeholder="Select category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Category1">Category 1</option>
            <option value="Category2">Category 2</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Goods From</FormLabel>
          <Input value={goodsFrom} onChange={(e) => setGoodsFrom(e.target.value)} />
        </FormControl>
        <FormControl >
          <FormLabel>Lab Approved</FormLabel>
          <Input value={labApproved} onChange={(e) => setLabApproved(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Type</FormLabel>
          <Select placeholder="Select type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Type1">Type 1</option>
            <option value="Type2">Type 2</option>
          </Select>
        </FormControl>
      </Grid>


      {/* Fabric Details Table */}
      <Heading size="md" my={4}>Fabric Details</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>S.No</Th>
            <Th>Fabric</Th>
            <Th>Colour</Th>
            <Th>Greige GSM</Th>
            <Th>Greige Dia</Th>
            <Th>Finish Rolls</Th>
            <Th>Weight</Th>
            <Th>Machine</Th>
          </Tr>
        </Thead>
        <Tbody>
          {fabricDetails.map((detail, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{detail.fabric}</Td>
              <Td>{detail.colour}</Td>
              <Td>{detail.greigeGSM}</Td>
              <Td>{detail.greigeDia}</Td>
              <Td>{detail.finishRolls}</Td>
              <Td>{detail.weight}</Td>
              <Td>{detail.machine}</Td>
            </Tr>
          ))}
          <Tr>
            <Td>{fabricDetails.length + 1}</Td>
            <Td><Input value={newFabric.fabric} onChange={(e) => setNewFabric({ ...newFabric, fabric: e.target.value })} /></Td>
            <Td><Input value={newFabric.colour} onChange={(e) => setNewFabric({ ...newFabric, colour: e.target.value })} /></Td>
            <Td><Input value={newFabric.greigeGSM} onChange={(e) => setNewFabric({ ...newFabric, greigeGSM: e.target.value })} /></Td>
            <Td><Input value={newFabric.greigeDia} onChange={(e) => setNewFabric({ ...newFabric, greigeDia: e.target.value })} /></Td>
            <Td><Input value={newFabric.finishRolls} onChange={(e) => setNewFabric({ ...newFabric, finishRolls: e.target.value })} /></Td>
            <Td><Input value={newFabric.weight} onChange={(e) => setNewFabric({ ...newFabric, weight: e.target.value })} /></Td>
            <Td><Input value={newFabric.machine} onChange={(e) => setNewFabric({ ...newFabric, machine: e.target.value })} /></Td>
          </Tr>
        </Tbody>
      </Table>
      <Button mt={2} colorScheme="blue" onClick={addFabricDetail}>Add Fabric</Button>

      {/* Process Table */}
      <Heading size="md" my={4}>Process</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>S.No</Th>
            <Th>Process</Th>
          </Tr>
        </Thead>
        <Tbody>
          {processDetails.map((proc, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{proc.process}</Td>
            </Tr>
          ))}
          <Tr>
            <Td>{processDetails.length + 1}</Td>
            <Td><Input value={newProcess.process} onChange={(e) => setNewProcess({ ...newProcess, process: e.target.value })} /></Td>
          </Tr>
        </Tbody>
      </Table>
      <Button mt={2} colorScheme="blue" onClick={addProcessDetail}>Add Process</Button>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4} mt={4}>
        <FormControl><FormLabel>Cust DC No</FormLabel><Input /></FormControl>
        <FormControl><FormLabel>Dtd</FormLabel><Input type="date" /></FormControl>
        <FormControl><FormLabel>Cust Ord No</FormLabel><Input /></FormControl>
        <FormControl><FormLabel>Veh No</FormLabel><Input /></FormControl>
        <FormControl><FormLabel>Style Ref No</FormLabel><Input /></FormControl>
        <FormControl><FormLabel>Greige Marking ID</FormLabel><Input /></FormControl>
        <FormControl><FormLabel>Marketing By</FormLabel><Select><option value="">Select</option></Select></FormControl>
        <FormControl><FormLabel>Prepared By</FormLabel><Input /></FormControl>
        <FormControl><FormLabel>Cust Ord Incharge</FormLabel><Select><option value="">Select</option></Select></FormControl>
        <FormControl><FormLabel>Old Do No</FormLabel><Input /></FormControl>
        <FormControl><FormLabel>Major Fabric</FormLabel><Input /></FormControl>
        <FormControl><FormLabel>Lab No.</FormLabel><Input /></FormControl>
      </Grid>
      {/* Narration */}
      <FormControl mt={4}>
        <FormLabel>Narration</FormLabel>
        <Textarea rows={3} />
      </FormControl>

      {/* Action Buttons */}
      <Box mt={6} textAlign="center">
        <Button colorScheme="blue" mr={2} onClick={handleSubmit}>Save</Button>
        <Button colorScheme="gray" mr={2} onClick={handlePrint}>Print</Button>
        <Button colorScheme="yellow" mr={2} onClick={clearForm}>Clear</Button>
        <Button colorScheme="red" mr={2}  onClick={handleDelete}>Delete</Button>
        <Link href="/processing" passHref>
                  <Button colorScheme="teal" ml={2}>Exit</Button>
                </Link>
      </Box>
    </Box>
  );
}