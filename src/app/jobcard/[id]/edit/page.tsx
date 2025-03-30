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
  Spinner,
  useToast
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import Link from 'next/link';

const JobCardEditPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const toast = useToast();
  const jobCardId = params.id as string;

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Main form fields
  const [jcDate, setJcDate] = useState('');
  const [jcShift, setJcShift] = useState('');
  const [jcLoadTime, setJcLoadTime] = useState('');
  const [jcUnloadTime, setJcUnloadTime] = useState('');
  const [jcIdleHours, setJcIdleHours] = useState('');
  const [jcRunHours, setJcRunHours] = useState('');
  const [jcRopeLength, setJcRopeLength] = useState('');
  const [jcSpeed, setJcSpeed] = useState('');
  const [jcPreTreatment, setJcPreTreatment] = useState('');
  const [jcDyeBath, setJcDyeBath] = useState('');
  const [jcDyes, setJcDyes] = useState('');
  const [jcAlkali, setJcAlkali] = useState('');
  const [jcAfterTreatment, setJcAfterTreatment] = useState('');
  const [jcSLDate, setJcSLDate] = useState('');
  const [jcCustomer, setJcCustomer] = useState('');
  const [jcColour, setJcColour] = useState('');
  const [jcBatchNo, setJcBatchNo] = useState('');
  const [jcLotNo, setJcLotNo] = useState('');
  const [jcFRNNo, setJcFRNNo] = useState('');
  const [jcMachineNo, setJcMachineNo] = useState('');
  const [jcCustomerDCNo, setJcCustomerDCNo] = useState('');
  const [jcWeight, setJcWeight] = useState('');
  const [jcMLR, setJcMLR] = useState('');
  const [jcRoll, setJcRoll] = useState('');
  const [jcFabricType, setJcFabricType] = useState('');
  const [jcLabNo, setJcLabNo] = useState('');
  const [jcGSM, setJcGSM] = useState('');
  const [jcScourBathPH, setJcScourBathPH] = useState('');
  const [jcResH2O2, setJcResH2O2] = useState('');
  const [jcStartBathPH, setJcStartBathPH] = useState('');
  const [jcAlkaliBathPH, setJcAlkaliBathPH] = useState('');
  const [jcSoapingPH, setJcSoapingPH] = useState('');
  const [jcDyeFixingPH, setJcDyeFixingPH] = useState('');
  const [jcFinalBathPH, setJcFinalBathPH] = useState('');
  const [jcDyeStartVolume, setJcDyeStartVolume] = useState('');
  const [jcDosageVolume, setJcDosageVolume] = useState('');

  // Pre-Treatment Details section
  const [jcPreTreatmentDetails, setJcPreTreatmentDetails] = useState([
    { 
      jcSNo: 1, 
      jcPretreatment: '', 
      jcItem: '', 
      jcRequiredQty: '', 
      jcTemperature: '', 
      jcTime: '', 
      jcStartTime: '', 
      jcFinishTime: '', 
      jcDosingAndSteamTime: '' 
    }
  ]);

  // Job Card Status
  const [jcJobCardCompletion, setJcJobCardCompletion] = useState(false);
  const [jcJobCardIssued, setJcJobCardIssued] = useState(false);

  // Fetch job card details on component mount
  useEffect(() => {
    const fetchJobCard = async () => {
      try {
        const response = await fetch(`http://localhost:6660/jobCard/jobCard/${jobCardId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch job card');
        }
        
        const jobCardData = await response.json();
        
        // Populate form fields
        setJcDate(jobCardData.jcDate || '');
        setJcShift(jobCardData.jcShift || '');
        setJcLoadTime(jobCardData.jcLoadTime || '');
        setJcUnloadTime(jobCardData.jcUnloadTime || '');
        setJcIdleHours(jobCardData.jcIdleHours || '');
        setJcRunHours(jobCardData.jcRunHours || '');
        setJcRopeLength(jobCardData.jcRopeLength || '');
        setJcSpeed(jobCardData.jcSpeed || '');
        setJcPreTreatment(jobCardData.jcPreTreatment || '');
        setJcDyeBath(jobCardData.jcDyeBath || '');
        setJcDyes(jobCardData.jcDyes || '');
        setJcAlkali(jobCardData.jcAlkali || '');
        setJcAfterTreatment(jobCardData.jcAfterTreatment || '');
        setJcSLDate(jobCardData.jcSLDate || '');
        setJcCustomer(jobCardData.jcCustomer || '');
        setJcColour(jobCardData.jcColour || '');
        setJcBatchNo(jobCardData.jcBatchNo || '');
        setJcLotNo(jobCardData.jcLotNo || '');
        setJcFRNNo(jobCardData.jcFRNNo || '');
        setJcMachineNo(jobCardData.jcMachineNo || '');
        setJcCustomerDCNo(jobCardData.jcCustomerDCNo || '');
        setJcWeight(jobCardData.jcWeight || '');
        setJcMLR(jobCardData.jcMLR || '');
        setJcRoll(jobCardData.jcRoll || '');
        setJcFabricType(jobCardData.jcFabricType || '');
        setJcLabNo(jobCardData.jcLabNo || '');
        setJcGSM(jobCardData.jcGSM || '');
        setJcScourBathPH(jobCardData.jcScourBathPH || '');
        setJcResH2O2(jobCardData.jcResH2O2 || '');
        setJcStartBathPH(jobCardData.jcStartBathPH || '');
        setJcAlkaliBathPH(jobCardData.jcAlkaliBathPH || '');
        setJcSoapingPH(jobCardData.jcSoapingPH || '');
        setJcDyeFixingPH(jobCardData.jcDyeFixingPH || '');
        setJcFinalBathPH(jobCardData.jcFinalBathPH || '');
        setJcDyeStartVolume(jobCardData.jcDyeStartVolume || '');
        setJcDosageVolume(jobCardData.jcDosageVolume || '');

        // Populate pre-treatment details
        setJcPreTreatmentDetails(
          jobCardData.jcPreTreatmentDetails && jobCardData.jcPreTreatmentDetails.length > 0
            ? jobCardData.jcPreTreatmentDetails
            : [{ 
                jcSNo: 1, 
                jcPretreatment: '', 
                jcItem: '', 
                jcRequiredQty: '', 
                jcTemperature: '', 
                jcTime: '', 
                jcStartTime: '', 
                jcFinishTime: '', 
                jcDosingAndSteamTime: '' 
              }]
        );

        // Set job card status
        setJcJobCardCompletion(jobCardData.jcJobCardCompletion || false);
        setJcJobCardIssued(jobCardData.jcJobCardIssued || false);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching job card:', error);
        toast({
          title: 'Error',
          description: 'Failed to load job card details',
          status: 'error',
          duration: 3000,
          isClosable: true
        });
        router.push('/jobcard');
      }
    };

    fetchJobCard();
  }, [jobCardId, router, toast]);

  // Add new pre-treatment detail row
  const addPreTreatmentDetail = () => {
    setJcPreTreatmentDetails([
      ...jcPreTreatmentDetails,
      { 
        jcSNo: jcPreTreatmentDetails.length + 1, 
        jcPretreatment: '', 
        jcItem: '', 
        jcRequiredQty: '', 
        jcTemperature: '', 
        jcTime: '', 
        jcStartTime: '', 
        jcFinishTime: '', 
        jcDosingAndSteamTime: '' 
      }
    ]);
  };

  // Remove pre-treatment detail row
  const removePreTreatmentDetail = (index: number) => {
    const updatedDetails = jcPreTreatmentDetails.filter((_, i) => i !== index);
    // Update serial numbers
    const reindexedDetails = updatedDetails.map((detail, i) => ({
      ...detail,
      jcSNo: i + 1
    }));
    setJcPreTreatmentDetails(reindexedDetails);
  };

  // Update pre-treatment detail field
  const updatePreTreatmentDetail = (index: number, field: string, value: string) => {
    const updatedDetails = [...jcPreTreatmentDetails];
    updatedDetails[index] = { ...updatedDetails[index], [field]: value };
    setJcPreTreatmentDetails(updatedDetails);
  };

  // Handle form submission for updating job card
  const handleSubmit = async () => {
    try {
      const jobCardData = {
        jcDate,
        jcShift,
        jcLoadTime,
        jcUnloadTime,
        jcIdleHours,
        jcRunHours,
        jcRopeLength,
        jcSpeed,
        jcPreTreatment,
        jcDyeBath,
        jcDyes,
        jcAlkali,
        jcAfterTreatment,
        jcSLDate,
        jcCustomer,
        jcColour,
        jcBatchNo,
        jcLotNo,
        jcFRNNo,
        jcMachineNo,
        jcCustomerDCNo,
        jcWeight,
        jcMLR,
        jcRoll,
        jcFabricType,
        jcLabNo,
        jcGSM,
        jcScourBathPH,
        jcResH2O2,
        jcStartBathPH,
        jcAlkaliBathPH,
        jcSoapingPH,
        jcDyeFixingPH,
        jcFinalBathPH,
        jcDyeStartVolume,
        jcDosageVolume,
        jcPreTreatmentDetails,
        jcJobCardCompletion,
        jcJobCardIssued
      };

      const response = await fetch(`http://localhost:6660/jobCard/jobCard/${jobCardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobCardData)
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Job Card updated successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true
        });
        router.push('/jobcard');
      } else {
        throw new Error('Failed to update job card');
      }
    } catch (error) {
      console.error('Error updating Job Card record:', error);
      toast({
        title: 'Error',
        description: 'Failed to update job card',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  // If data is loading, show a spinner
  if (isLoading) {
    return (
      <Container centerContent>
        <Spinner size="xl" />
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={6}>
      <Heading as="h1" mb={6}>Edit Job Card</Heading>
      
      <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
        {/* Main information section */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mb={6}>
          <FormControl>
            <FormLabel>Date:</FormLabel>
            <Input 
              type="date" 
              value={jcDate} 
              onChange={(e) => setJcDate(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Shift:</FormLabel>
            <Select 
              placeholder="Select shift" 
              value={jcShift}
              onChange={(e) => setJcShift(e.target.value)}
            >
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="night">Night</option>
            </Select>
          </FormControl>
          
          <FormControl>
            <FormLabel>Load Time:</FormLabel>
            <Input 
              type="time" 
              value={jcLoadTime} 
              onChange={(e) => setJcLoadTime(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Unload Time:</FormLabel>
            <Input 
              type="time" 
              value={jcUnloadTime} 
              onChange={(e) => setJcUnloadTime(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Idle Hours:</FormLabel>
            <Input 
              type="number" 
              value={jcIdleHours} 
              onChange={(e) => setJcIdleHours(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Run Hours:</FormLabel>
            <Input 
              type="number" 
              value={jcRunHours} 
              onChange={(e) => setJcRunHours(e.target.value)} 
            />
          </FormControl>
        </Grid>
        
        <Divider my={6} />
        
        {/* Additional Main Information */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mb={6}>
          <FormControl>
            <FormLabel>Rope Length:</FormLabel>
            <Input 
              type="text" 
              value={jcRopeLength} 
              onChange={(e) => setJcRopeLength(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Speed:</FormLabel>
            <Input 
              type="text" 
              value={jcSpeed} 
              onChange={(e) => setJcSpeed(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Pre-Treatment:</FormLabel>
            <Input 
              type="text" 
              value={jcPreTreatment} 
              onChange={(e) => setJcPreTreatment(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Dye Bath:</FormLabel>
            <Input 
              type="text" 
              value={jcDyeBath} 
              onChange={(e) => setJcDyeBath(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Dyes:</FormLabel>
            <Input 
              type="text" 
              value={jcDyes} 
              onChange={(e) => setJcDyes(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Alkali:</FormLabel>
            <Input 
              type="text" 
              value={jcAlkali} 
              onChange={(e) => setJcAlkali(e.target.value)} 
            />
          </FormControl>
        </Grid>
        
        <Divider my={6} />
        
        {/* Pre-Treatment Details section */}
        <Heading as="h3" size="md" mb={4}>Pre-Treatment Details</Heading>
        <Box overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>S.No</Th>
                <Th>Pre-treatment</Th>
                <Th>Item</Th>
                <Th>Required Qty</Th>
                <Th>Temperature</Th>
                <Th>Time</Th>
                <Th>Start Time</Th>
                <Th>Finish Time</Th>
                <Th>Dosing & Steam Time</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {jcPreTreatmentDetails.map((detail, index) => (
                <Tr key={index}>
                  <Td>{detail.jcSNo}</Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={detail.jcPretreatment} 
                      onChange={(e) => updatePreTreatmentDetail(index, 'jcPretreatment', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={detail.jcItem} 
                      onChange={(e) => updatePreTreatmentDetail(index, 'jcItem', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={detail.jcRequiredQty} 
                      onChange={(e) => updatePreTreatmentDetail(index, 'jcRequiredQty', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={detail.jcTemperature} 
                      onChange={(e) => updatePreTreatmentDetail(index, 'jcTemperature', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={detail.jcTime} 
                      onChange={(e) => updatePreTreatmentDetail(index, 'jcTime', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      type="time"
                      value={detail.jcStartTime} 
                      onChange={(e) => updatePreTreatmentDetail(index, 'jcStartTime', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      type="time"
                      value={detail.jcFinishTime} 
                      onChange={(e) => updatePreTreatmentDetail(index, 'jcFinishTime', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={detail.jcDosingAndSteamTime} 
                      onChange={(e) => updatePreTreatmentDetail(index, 'jcDosingAndSteamTime', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Remove pre-treatment detail"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      onClick={() => removePreTreatmentDetail(index)}
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
          onClick={addPreTreatmentDetail}
        >
          Add Pre-Treatment Detail
        </Button>
        
        <Divider my={6} />
        
        {/* Remaining Fields */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mb={6}>
          <FormControl>
            <FormLabel>SL Date:</FormLabel>
            <Input 
              type="date" 
              value={jcSLDate} 
              onChange={(e) => setJcSLDate(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Customer:</FormLabel>
            <Input 
              type="text" 
              value={jcCustomer} 
              onChange={(e) => setJcCustomer(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Colour:</FormLabel>
            <Input 
              type="text" 
              value={jcColour} 
              onChange={(e) => setJcColour(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Batch No:</FormLabel>
            <Input 
              type="text" 
              value={jcBatchNo} 
              onChange={(e) => setJcBatchNo(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Lot No:</FormLabel>
            <Input 
              type="text" 
              value={jcLotNo} 
              onChange={(e) => setJcLotNo(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>FRN No.:</FormLabel>
            <Input 
              type="text" 
              value={jcFRNNo} 
              onChange={(e) => setJcFRNNo(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Machine No.:</FormLabel>
            <Input 
              type="text" 
              value={jcMachineNo} 
              onChange={(e) => setJcMachineNo(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Customer DC No.:</FormLabel>
            <Input 
              type="text" 
              value={jcCustomerDCNo} 
              onChange={(e) => setJcCustomerDCNo(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Weight:</FormLabel>
            <Input 
              type="text" 
              value={jcWeight} 
              onChange={(e) => setJcWeight(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>MLR:</FormLabel>
            <Input 
              type="text" 
              value={jcMLR} 
              onChange={(e) => setJcMLR(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Roll:</FormLabel>
            <Input 
              type="text" 
              value={jcRoll} 
              onChange={(e) => setJcRoll(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Fabric Type:</FormLabel>
            <Input 
              type="text" 
              value={jcFabricType} 
              onChange={(e) => setJcFabricType(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Lab No.:</FormLabel>
            <Input 
              type="text" 
              value={jcLabNo} 
              onChange={(e) => setJcLabNo(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>GSM:</FormLabel>
            <Input 
              type="text" 
              value={jcGSM} 
              onChange={(e) => setJcGSM(e.target.value)} 
            />
          </FormControl>
        </Grid>
        
        <Divider my={6} />
        
        {/* pH and Volume Details */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mb={6}>
          <FormControl>
            <FormLabel>Scour Bath pH:</FormLabel>
            <Input 
              type="text" 
              value={jcScourBathPH} 
              onChange={(e) => setJcScourBathPH(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Res H₂O₂:</FormLabel>
            <Input 
              type="text" 
              value={jcResH2O2} 
              onChange={(e) => setJcResH2O2(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Start Bath pH:</FormLabel>
            <Input 
              type="text" 
              value={jcStartBathPH} 
              onChange={(e) => setJcStartBathPH(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Alkali Bath pH:</FormLabel>
            <Input 
              type="text" 
              value={jcAlkaliBathPH} 
              onChange={(e) => setJcAlkaliBathPH(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Soaping pH:</FormLabel>
            <Input 
              type="text" 
              value={jcSoapingPH} 
              onChange={(e) => setJcSoapingPH(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Dye Fixing pH:</FormLabel>
            <Input 
              type="text" 
              value={jcDyeFixingPH} 
              onChange={(e) => setJcDyeFixingPH(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Final Bath pH:</FormLabel>
            <Input 
              type="text" 
              value={jcFinalBathPH} 
              onChange={(e) => setJcFinalBathPH(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Dye Start Volume:</FormLabel>
            <Input 
              type="text" 
              value={jcDyeStartVolume} 
              onChange={(e) => setJcDyeStartVolume(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Dosage Volume:</FormLabel>
            <Input 
              type="text" 
              value={jcDosageVolume} 
              onChange={(e) => setJcDosageVolume(e.target.value)} 
            />
          </FormControl>
        </Grid>
        
        <Divider my={6} />
        
        {/* Job Card Status Checkboxes */}
        <HStack spacing={4} mb={6}>
          <Checkbox 
            isChecked={jcJobCardCompletion} 
            onChange={(e) => setJcJobCardCompletion(e.target.checked)}
          >
            Job Card Completion
          </Checkbox>
          
          <Checkbox 
            isChecked={jcJobCardIssued} 
            onChange={(e) => setJcJobCardIssued(e.target.checked)}
          >
            Job Card Issued
          </Checkbox>
        </HStack>
        
        {/* Submit buttons */}
        <HStack spacing={4} justifyContent="center" mt={8}>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Update Job Card Record
          </Button>
          <Link href="/jobcard" passHref>
            <Button colorScheme="teal">
              Cancel
            </Button>
          </Link>
        </HStack>
      </Box>
    </Container>
  );
};

export default JobCardEditPage;