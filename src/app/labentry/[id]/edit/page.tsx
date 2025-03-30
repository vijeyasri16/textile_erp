'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
  Text,
  VStack
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import Link from 'next/link';

interface LabDetailItem {
  lSNo: number;
  lColour: string;
  lPantoneNo: string;
  lJobNo: string;
  lFabricLight: string;
  lFastness: string;
  lApprovalBy: string;
  lRemarks: string;
}

interface LabEntryDetail {
  id: string;
  lLabNo: string;
  lDate: string;
  lReference: string;
  lContactPerson: string;
  lCustomer: string;
  lCancelled: boolean;
  labDetails: LabDetailItem[];
}

const EditLabEntryPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  
  // Main form fields
  const [lLabNo, setLLabNo] = useState('');
  const [lDate, setLDate] = useState('');
  const [lReference, setLReference] = useState('');
  const [lContactPerson, setLContactPerson] = useState('');
  const [lCustomer, setLCustomer] = useState('');
  const [lCancelled, setLCancelled] = useState(false);

  // Lab Details section
  const [labDetails, setLabDetails] = useState<LabDetailItem[]>([]);

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing lab entry details
  useEffect(() => {
    const fetchLabEntryDetails = async () => {
      try {
        const response = await fetch(`http://localhost:6660/labEntry/getLabEntry/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch lab entry details');
        }
        const data: LabEntryDetail = await response.json();
        
        // Populate form fields
        setLLabNo(data.lLabNo);
        setLDate(data.lDate.split('T')[0]); // Ensure date is in YYYY-MM-DD format
        setLReference(data.lReference);
        setLContactPerson(data.lContactPerson);
        setLCustomer(data.lCustomer);
        setLCancelled(data.lCancelled);
        setLabDetails(data.labDetails);
        
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchLabEntryDetails();
    }
  }, [params.id]);

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

      const response = await fetch(`http://localhost:6660/labEntry/updateLabEntry/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(labEntryData)
      });

      if (response.ok) {
        alert('Lab Entry record updated successfully!');
        router.push('/labentry');
      } else {
        console.error('Failed to update Lab Entry record', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error updating Lab Entry record:', error);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <Container maxW="container.xl" py={6}>
        <Text>Loading lab entry details...</Text>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container maxW="container.xl" py={6}>
        <VStack spacing={4}>
          <Text color="red.500">Error: {error}</Text>
          <Link href="/labentry" passHref>
            <Button colorScheme="blue">
              Back to Lab Entries
            </Button>
          </Link>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={6}>
      <Heading as="h1" mb={6}>Edit Lab Entry</Heading>
      
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
            Update Lab Entry Record
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

export default EditLabEntryPage;