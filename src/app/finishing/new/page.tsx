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

const FinishingPage: React.FC = () => {
  const router = useRouter();
  
  // Main form fields
  const [fMachine, setFMachine] = useState('');
  const [fDate, setFDate] = useState('');
  const [fShift, setFShift] = useState('');
  const [fSupervisor, setFSupervisor] = useState('');
  const [fOperator, setFOperator] = useState('');

  // Production Details section
  const [productionDetails, setProductionDetails] = useState([
    { 
      fSNo: 1, 
      fProdType: '', 
      fProcess: '', 
      fWeight: '', 
      fRemarks: '' 
    }
  ]);

  // Add new production details row
  const addProductionDetail = () => {
    setProductionDetails([
      ...productionDetails,
      { 
        fSNo: productionDetails.length + 1, 
        fProdType: '', 
        fProcess: '', 
        fWeight: '', 
        fRemarks: '' 
      }
    ]);
  };

  // Remove production details row
  const removeProductionDetail = (index: number) => {
    const updatedProductionDetails = productionDetails.filter((_, i) => i !== index);
    // Update serial numbers
    const reindexedProductionDetails = updatedProductionDetails.map((detail, i) => ({
      ...detail,
      fSNo: i + 1
    }));
    setProductionDetails(reindexedProductionDetails);
  };

  // Update production detail field
  const updateProductionDetail = (index: number, field: string, value: string) => {
    const updatedProductionDetails = [...productionDetails];
    updatedProductionDetails[index] = { ...updatedProductionDetails[index], [field]: value };
    setProductionDetails(updatedProductionDetails);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const finishingData = {
        fMachine,
        fDate,
        fShift,
        fSupervisor,
        fOperator,
        productionDetails
      };

      const response = await fetch('http://localhost:6660/finishing/finishingEntry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(finishingData)
      });

      if (response.ok) {
        alert('Finishing record added successfully!');
        router.push('/finishing');
      } else {
        console.error('Failed to add Finishing record', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error adding Finishing record:', error);
    }
  };

  return (
    <Container maxW="container.xl" py={6}>
      <Heading as="h1" mb={6}>Create Finishing Entry</Heading>
      
      <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
        {/* Main information section */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mb={6}>
          <FormControl>
            <FormLabel>Machine:</FormLabel>
            <Select 
              placeholder="Select Machine" 
              value={fMachine}
              onChange={(e) => setFMachine(e.target.value)}
            >
              <option value="machine1">Machine 1</option>
              <option value="machine2">Machine 2</option>
              <option value="machine3">Machine 3</option>
            </Select>
          </FormControl>
          
          <FormControl>
            <FormLabel>Date:</FormLabel>
            <Input 
              type="date" 
              value={fDate} 
              onChange={(e) => setFDate(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Shift:</FormLabel>
            <Select 
              placeholder="Select Shift" 
              value={fShift}
              onChange={(e) => setFShift(e.target.value)}
            >
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="night">Night</option>
            </Select>
          </FormControl>
          
          <FormControl>
            <FormLabel>Supervisor:</FormLabel>
            <Input 
              type="text" 
              value={fSupervisor} 
              onChange={(e) => setFSupervisor(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Operator:</FormLabel>
            <Input 
              type="text" 
              value={fOperator} 
              onChange={(e) => setFOperator(e.target.value)} 
            />
          </FormControl>
        </Grid>
        
        <Divider my={6} />
        
        {/* Production Details section */}
        <Heading as="h3" size="md" mb={4}>Production Details</Heading>
        <Box overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>S.No</Th>
                <Th>Prod Type</Th>
                <Th>Process</Th>
                <Th>Weight</Th>
                <Th>Remarks</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {productionDetails.map((detail, index) => (
                <Tr key={index}>
                  <Td>{detail.fSNo}</Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={detail.fProdType} 
                      onChange={(e) => updateProductionDetail(index, 'fProdType', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={detail.fProcess} 
                      onChange={(e) => updateProductionDetail(index, 'fProcess', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      type="number"
                      value={detail.fWeight} 
                      onChange={(e) => updateProductionDetail(index, 'fWeight', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={detail.fRemarks} 
                      onChange={(e) => updateProductionDetail(index, 'fRemarks', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Remove production detail"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      onClick={() => removeProductionDetail(index)}
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
          onClick={addProductionDetail}
        >
          Add Production Detail
        </Button>
        
        {/* Submit buttons */}
        <HStack spacing={4} justifyContent="center" mt={8}>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Create Finishing Entry Record
          </Button>
          <Link href="/finishing" passHref>
            <Button colorScheme="teal">
              Cancel
            </Button>
          </Link>
        </HStack>
      </Box>
    </Container>
  );
};

export default FinishingPage;