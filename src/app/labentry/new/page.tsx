'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Grid,
  Select,
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  HStack,
  Divider,
  Container,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import Link from 'next/link';

const LabEntryPage: React.FC = () => {
  const router = useRouter();
  
  // Main form fields
  const [lLabNo, setLLabNo] = useState('');
  const [lDate, setLDate] = useState('');
  const [lReference, setLReference] = useState('');
  const [lContactPerson, setLContactPerson] = useState('');
  const [lCustomer, setLCustomer] = useState('');
  const [lCancelled, setLCancelled] = useState(false);

  // Lab Details section
  const [labDetails, setLabDetails] = useState([
    { 
      lSNo: 1, 
      lColour: '', 
      lPantoneNo: '', 
      lJobNo: '', 
      lFabricLight: '', 
      lFastness: '', 
      lApprovalBy: '', 
      lRemarks: '' 
    }
  ]);

  // Add new lab details row
  const addLabDetail = () => {
    setLabDetails([
      ...labDetails,
      { 
        lSNo: labDetails.length + 1, 
        lColour: '', 
        lPantoneNo: '', 
        lJobNo: '', 
        lFabricLight: '', 
        lFastness: '', 
        lApprovalBy: '', 
        lRemarks: '' 
      }
    ]);
  };

  // Remove lab details row
  const removeLabDetail = (index: number) => {
    const updatedLabDetails = labDetails.filter((_, i) => i !== index);
    // Update serial numbers
    const reindexedLabDetails = updatedLabDetails.map((detail, i) => ({
      ...detail,
      lSNo: i + 1
    }));
    setLabDetails(reindexedLabDetails);
  };

  // Update lab detail field
  const updateLabDetail = (index: number, field: string, value: string) => {
    const updatedLabDetails = [...labDetails];
    updatedLabDetails[index] = { ...updatedLabDetails[index], [field]: value };
    setLabDetails(updatedLabDetails);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const labEntryData = {
        lLabNo,
        lDate,
        lReference,
        lContactPerson,
        lCustomer,
        lCancelled,
        labDetails
      };

      const response = await fetch('http://localhost:6660/labEntry/labEntry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(labEntryData)
      });

      if (response.ok) {
        alert('Lab Entry record added successfully!');
        router.push('/labentry');
      } else {
        console.error('Failed to add Lab Entry record', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error adding Lab Entry record:', error);
    }
  };

  return (
    <Container maxW="container.xl" py={6}>
      <Heading as="h1" mb={6}>Create Lab Entry</Heading>
      
      <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
        {/* Main information section */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mb={6}>
          <FormControl>
            <FormLabel>Lab No:</FormLabel>
            <Input 
              type="text" 
              value={lLabNo} 
              onChange={(e) => setLLabNo(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Date:</FormLabel>
            <Input 
              type="date" 
              value={lDate} 
              onChange={(e) => setLDate(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Reference:</FormLabel>
            <Input 
              type="text" 
              value={lReference} 
              onChange={(e) => setLReference(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Contact Person:</FormLabel>
            <Input 
              type="text" 
              value={lContactPerson} 
              onChange={(e) => setLContactPerson(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Customer:</FormLabel>
            <Select 
              placeholder="Select customer" 
              value={lCustomer}
              onChange={(e) => setLCustomer(e.target.value)}
            >
              <option value="customer1">Customer 1</option>
              <option value="customer2">Customer 2</option>
              <option value="customer3">Customer 3</option>
            </Select>
          </FormControl>
          
          <FormControl>
            <FormLabel>&nbsp;</FormLabel>
            <Checkbox 
              isChecked={lCancelled} 
              onChange={(e) => setLCancelled(e.target.checked)}
              mt={2}
            >
              Cancelled
            </Checkbox>
          </FormControl>
        </Grid>
        
        <Divider my={6} />
        
        {/* Lab Details section */}
        <Heading as="h3" size="md" mb={4}>Lab Details</Heading>
        <Box overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>S.No</Th>
                <Th>Colour</Th>
                <Th>Pantone No</Th>
                <Th>Job No</Th>
                <Th>Fabric Light Source</Th>
                <Th>Fastness</Th>
                <Th>Approval By</Th>
                <Th>Remarks</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {labDetails.map((detail, index) => (
                <Tr key={index}>
                  <Td>{detail.lSNo}</Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={detail.lColour} 
                      onChange={(e) => updateLabDetail(index, 'lColour', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={detail.lPantoneNo} 
                      onChange={(e) => updateLabDetail(index, 'lPantoneNo', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={detail.lJobNo} 
                      onChange={(e) => updateLabDetail(index, 'lJobNo', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={detail.lFabricLight} 
                      onChange={(e) => updateLabDetail(index, 'lFabricLight', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={detail.lFastness} 
                      onChange={(e) => updateLabDetail(index, 'lFastness', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={detail.lApprovalBy} 
                      onChange={(e) => updateLabDetail(index, 'lApprovalBy', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={detail.lRemarks} 
                      onChange={(e) => updateLabDetail(index, 'lRemarks', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Remove lab detail"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      onClick={() => removeLabDetail(index)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        
        <Button 
          leftIcon={<AddIcon />} 
          colorScheme="blue" 
          size="sm" 
          mt={4} 
          onClick={addLabDetail}
        >
          Add Lab Detail
        </Button>
        
        {/* Submit buttons */}
        <HStack spacing={4} justifyContent="center" mt={8}>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Create Lab Entry Record
          </Button>
          <Link href="/labentry" passHref>
            <Button colorScheme="teal">
              Cancel
            </Button>
          </Link>
        </HStack>
      </Box>
    </Container>
  );
};

export default LabEntryPage;