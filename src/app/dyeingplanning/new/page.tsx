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
  Container,
  Textarea,
  HStack,
  VStack,
  Divider,
  Radio,
  RadioGroup
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import Link from 'next/link';

const DyeingPlanningPage: React.FC = () => {
  const router = useRouter();
  
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

      const response = await fetch('http://localhost:6660/dyeingPlanning/dyeingPlanning', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dyeingPlanningData)
      });

      if (response.ok) {
        alert('Dyeing Planning record added successfully!');
        router.push('/dyeingplanning');
      } else {
        console.error('Failed to add Dyeing Planning record', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error adding Dyeing Planning record:', error);
    }
  };

  return (
    <Container maxW="container.xl" py={6}>
      <Heading as="h1" mb={6}>Create Dyeing Planning</Heading>
      
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
                <option key={rev} value={rev}>{rev}</option>
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
            Create Dyeing Planning Record
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
};

export default DyeingPlanningPage;