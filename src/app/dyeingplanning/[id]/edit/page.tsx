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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Container,
  Textarea,
  HStack,
  VStack,
  Divider,
  Radio,
  RadioGroup,
  Spinner,
  Text
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import Link from 'next/link';

interface DyeingPlanningData {
  dlJobNo: string;
  dlRev: string;
  dlDate: string;
  dlCardWeight: string;
  dlMachine: string;
  dlFabric: string;
  dlColour: string;
  dlOldBatchNo: string;
  dlCRCode: string;
  dlCRDate: string;
  dlLRCode: string;
  dlLRDate: string;
  dlLRIndep: string;
  dlLRIndepDate: string;
  dlRemarks: string;
  dlColourIdentification: string;
  stageDetails: Array<{
    dlSNo: number;
    dlStage: string;
    dlMLR: string;
    dlTLiquor: string;
  }>;
  itemDetails: Array<{
    dlSNo: number;
    dlStage: string;
    dlItemName: string;
    dlValue: string;
    dlGPLPercentage: string;
    dlWeight: string;
  }>;
}

export default function DyeingPlanningEditPage() {
  const router = useRouter();
  const params = useParams();
  const dyeingPlanningId = params.id as string;

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Main form fields
  const [dlJobNo, setDlJobNo] = useState('');
  const [dlRev, setDlRev] = useState('');
  const [dlDate, setDlDate] = useState('');
  const [dlCardWeight, setDlCardWeight] = useState('');
  const [dlMachine, setDlMachine] = useState('');
  const [dlFabric, setDlFabric] = useState('');
  const [dlColour, setDlColour] = useState('');
  const [dlOldBatchNo, setDlOldBatchNo] = useState('');
  const [dlCRCode, setDlCRCode] = useState('');
  const [dlCRDate, setDlCRDate] = useState('');
  const [dlLRCode, setDlLRCode] = useState('');
  const [dlLRDate, setDlLRDate] = useState('');
  const [dlLRIndep, setDlLRIndep] = useState('');
  const [dlLRIndepDate, setDlLRIndepDate] = useState('');
  const [dlRemarks, setDlRemarks] = useState('');
  const [dlColourIdentification, setDlColourIdentification] = useState('');

  // Stage Details section
  const [stageDetails, setStageDetails] = useState([
    { dlSNo: 1, dlStage: '', dlMLR: '', dlTLiquor: '' }
  ]);

  // Item Details section
  const [itemDetails, setItemDetails] = useState([
    { dlSNo: 1, dlStage: '', dlItemName: '', dlValue: '', dlGPLPercentage: '', dlWeight: '' }
  ]);

  // Fetch existing dyeing planning data
  useEffect(() => {
    const fetchDyeingPlanningData = async () => {
      try {
        const response = await fetch(`http://localhost:6660/dyeingPlanning/dyeingPlanning/${dyeingPlanningId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch dyeing planning data');
        }
        
        const data: DyeingPlanningData = await response.json();
        
        // Populate main form fields
        setDlJobNo(data.dlJobNo);
        setDlRev(data.dlRev);
        setDlDate(data.dlDate);
        setDlCardWeight(data.dlCardWeight);
        setDlMachine(data.dlMachine);
        setDlFabric(data.dlFabric);
        setDlColour(data.dlColour);
        setDlOldBatchNo(data.dlOldBatchNo);
        setDlCRCode(data.dlCRCode);
        setDlCRDate(data.dlCRDate);
        setDlLRCode(data.dlLRCode);
        setDlLRDate(data.dlLRDate);
        setDlLRIndep(data.dlLRIndep);
        setDlLRIndepDate(data.dlLRIndepDate);
        setDlRemarks(data.dlRemarks);
        setDlColourIdentification(data.dlColourIdentification);

        // Populate stage details
        setStageDetails(data.stageDetails.length > 0 
          ? data.stageDetails 
          : [{ dlSNo: 1, dlStage: '', dlMLR: '', dlTLiquor: '' }]
        );

        // Populate item details
        setItemDetails(data.itemDetails.length > 0 
          ? data.itemDetails 
          : [{ dlSNo: 1, dlStage: '', dlItemName: '', dlValue: '', dlGPLPercentage: '', dlWeight: '' }]
        );

        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching dyeing planning data:', err);
        setError('Failed to load dyeing planning data');
        setIsLoading(false);
      }
    };

    if (dyeingPlanningId) {
      fetchDyeingPlanningData();
    }
  }, [dyeingPlanningId]);

  // Add new stage detail row
  const addStageDetail = () => {
    setStageDetails([
      ...stageDetails,
      { 
        dlSNo: stageDetails.length + 1, 
        dlStage: '', 
        dlMLR: '', 
        dlTLiquor: '' 
      }
    ]);
  };

  // Remove stage detail row
  const removeStageDetail = (index: number) => {
    const updatedStageDetails = stageDetails.filter((_, i) => i !== index);
    const reindexedStageDetails = updatedStageDetails.map((detail, i) => ({
      ...detail,
      dlSNo: i + 1
    }));
    setStageDetails(reindexedStageDetails);
  };

  // Add new item detail row
  const addItemDetail = () => {
    setItemDetails([
      ...itemDetails,
      { 
        dlSNo: itemDetails.length + 1, 
        dlStage: '', 
        dlItemName: '', 
        dlValue: '', 
        dlGPLPercentage: '', 
        dlWeight: '' 
      }
    ]);
  };

  // Remove item detail row
  const removeItemDetail = (index: number) => {
    const updatedItemDetails = itemDetails.filter((_, i) => i !== index);
    const reindexedItemDetails = updatedItemDetails.map((detail, i) => ({
      ...detail,
      dlSNo: i + 1
    }));
    setItemDetails(reindexedItemDetails);
  };

  // Update stage detail field
  const updateStageDetail = (index: number, field: string, value: string) => {
    const updatedStageDetails = [...stageDetails];
    updatedStageDetails[index] = { ...updatedStageDetails[index], [field]: value };
    setStageDetails(updatedStageDetails);
  };

  // Update item detail field
  const updateItemDetail = (index: number, field: string, value: string) => {
    const updatedItemDetails = [...itemDetails];
    updatedItemDetails[index] = { ...updatedItemDetails[index], [field]: value };
    setItemDetails(updatedItemDetails);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const dyeingPlanningData = {
        dlJobNo,
        dlRev,
        dlDate,
        dlCardWeight,
        dlMachine,
        dlFabric,
        dlColour,
        dlOldBatchNo,
        dlCRCode,
        dlCRDate,
        dlLRCode,
        dlLRDate,
        dlLRIndep,
        dlLRIndepDate,
        dlRemarks,
        dlColourIdentification,
        stageDetails,
        itemDetails
      };

      const response = await fetch(`http://localhost:6660/dyeingPlanning/dyeingPlanning/${dyeingPlanningId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dyeingPlanningData)
      });

      if (response.ok) {
        alert('Dyeing Planning record updated successfully!');
        router.push('/dyeingplanning');
      } else {
        console.error('Failed to update Dyeing Planning record', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error updating Dyeing Planning record:', error);
    }
  };

  // Loading and error handling
  if (isLoading) {
    return (
      <Container centerContent>
        <Spinner size="xl" />
        <Text mt={4}>Loading Dyeing Planning Data...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent>
        <Text color="red.500" fontSize="xl">{error}</Text>
        <Link href="/dyeingplanning">
          <Button mt={4} colorScheme="blue">Go Back</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={6}>
      <Heading as="h1" mb={6}>Edit Dyeing Planning</Heading>
      
      <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
        {/* Main Information Section */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mb={6}>
          <FormControl>
            <FormLabel>Job No:</FormLabel>
            <Input 
              type="text" 
              value={dlJobNo} 
              onChange={(e) => setDlJobNo(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Rev:</FormLabel>
            <Select 
              placeholder="Select Revision" 
              value={dlRev}
              onChange={(e) => setDlRev(e.target.value)}
            >
              {[1, 2, 3, 4, 5].map(rev => (
                <option key={rev} value={rev.toString()}>{rev}</option>
              ))}
            </Select>
          </FormControl>
          
          <FormControl>
            <FormLabel>Date:</FormLabel>
            <Input 
              type="date" 
              value={dlDate} 
              onChange={(e) => setDlDate(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Card Weight:</FormLabel>
            <Input 
              type="text" 
              value={dlCardWeight} 
              onChange={(e) => setDlCardWeight(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Machine:</FormLabel>
            <Input 
              type="text" 
              value={dlMachine} 
              onChange={(e) => setDlMachine(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Fabric:</FormLabel>
            <Input 
              type="text" 
              value={dlFabric} 
              onChange={(e) => setDlFabric(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Colour:</FormLabel>
            <Input 
              type="text" 
              value={dlColour} 
              onChange={(e) => setDlColour(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Old Batch No:</FormLabel>
            <Input 
              type="text" 
              value={dlOldBatchNo} 
              onChange={(e) => setDlOldBatchNo(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>CR Code:</FormLabel>
            <Input 
              type="text" 
              value={dlCRCode} 
              onChange={(e) => setDlCRCode(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>CR Date:</FormLabel>
            <Input 
              type="date" 
              value={dlCRDate} 
              onChange={(e) => setDlCRDate(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>LR Code:</FormLabel>
            <Input 
              type="text" 
              value={dlLRCode} 
              onChange={(e) => setDlLRCode(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>LR Date:</FormLabel>
            <Input 
              type="date" 
              value={dlLRDate} 
              onChange={(e) => setDlLRDate(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>LR Indep:</FormLabel>
            <Input 
              type="text" 
              value={dlLRIndep} 
              onChange={(e) => setDlLRIndep(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>LR Indep Date:</FormLabel>
            <Input 
              type="date" 
              value={dlLRIndepDate} 
              onChange={(e) => setDlLRIndepDate(e.target.value)} 
            />
          </FormControl>
        </Grid>
        
        <Divider my={6} />
        
        {/* Stage Details Section */}
        <Heading as="h3" size="md" mb={4}>Stage Details</Heading>
        <Box overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>S.No</Th>
                <Th>Stage</Th>
                <Th>MLR</Th>
                <Th>T Liquor</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {stageDetails.map((detail, index) => (
                <Tr key={index}>
                  <Td>{detail.dlSNo}</Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={detail.dlStage} 
                      onChange={(e) => updateStageDetail(index, 'dlStage', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={detail.dlMLR} 
                      onChange={(e) => updateStageDetail(index, 'dlMLR', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={detail.dlTLiquor} 
                      onChange={(e) => updateStageDetail(index, 'dlTLiquor', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Remove stage detail"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      onClick={() => removeStageDetail(index)}
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
          onClick={addStageDetail}
        >
          Add Stage Detail
        </Button>
        
        <Divider my={6} />
        
        {/* Item Details Section */}
        <Heading as="h3" size="md" mb={4}>Item Details</Heading>
        <Box overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>S.No</Th>
                <Th>Stage</Th>
                <Th>Item Name</Th>
                <Th>Value</Th>
                <Th>GPL %</Th>
                <Th>Weight</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {itemDetails.map((detail, index) => (
                <Tr key={index}>
                  <Td>{detail.dlSNo}</Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={detail.dlStage} 
                      onChange={(e) => updateItemDetail(index, 'dlStage', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={detail.dlItemName} 
                      onChange={(e) => updateItemDetail(index, 'dlItemName', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={detail.dlValue} 
                      onChange={(e) => updateItemDetail(index, 'dlValue', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={detail.dlGPLPercentage} 
                      onChange={(e) => updateItemDetail(index, 'dlGPLPercentage', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={detail.dlWeight} 
                      onChange={(e) => updateItemDetail(index, 'dlWeight', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Remove item detail"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      onClick={() => removeItemDetail(index)}
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
          onClick={addItemDetail}
        >
          Add Item Detail
        </Button>
        
        <Divider my={6} />
        
        {/* Remarks and Colour Identification */}
        <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={4} mb={6}>
          <FormControl>
            <FormLabel>Remarks:</FormLabel>
            <Textarea 
              value={dlRemarks} 
              onChange={(e) => setDlRemarks(e.target.value)} 
              rows={4}
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Colour Identification:</FormLabel>
            <RadioGroup 
              value={dlColourIdentification} 
              onChange={setDlColourIdentification}
            >
              <VStack align="start">
                <Radio value="Loaded">Loaded</Radio>
                <Radio value="Inserted">Inserted</Radio>
              </VStack>
            </RadioGroup>
          </FormControl>
        </Grid>
        
        {/* Submit buttons */}
        <HStack spacing={4} justifyContent="center" mt={8}>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Update Dyeing Planning Record
          </Button>
          <Link href="/dyeingplanning" passHref>
            <Button colorScheme="teal">
              Cancel
            </Button>
          </Link>
        </HStack>
      </Box>
    </Container>
  );
}