'use client';

import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, Table, Thead, Tbody, Tr, Th, Td, Textarea, Heading, Grid } from '@chakra-ui/react';
import { createDelivery, deleteDelivery, printDelivery, clearDeliveryForm, exitPage } from "@/services/delivery";
import Link from 'next/link';
export default function DeliveryPage() {
  const [vNo, setVNo] = useState('');
  const [date, setDate] = useState('');
  const [referenceType, setReferenceType] = useState('');
  const [customer, setCustomer] = useState('');
  const [deliveryTo, setDeliveryTo] = useState('');
  const [jobNo, setJobNo] = useState('');
  const [billingName, setBillingName] = useState('');
  const [narration, setNarration] = useState('');
  const [appxVal, setAppxVal] = useState('');
  const [formJJNo, setFormJJNo] = useState('');
  const [whoseVehicle, setWhoseVehicle] = useState('');
  const [vehicleNum, setVehicleNum] = useState('');
  const [driverName, setDriverName] = useState('');
  const [styleNo, setStyleNo] = useState('');

  const [deliveryDetails, setDeliveryDetails] = useState<{ inwNo: string; custOrdNo: string; custDCNo: string; jobCard: string; fabric: string; colour: string; greigeDia: string; finishRolls: string; weight: string; greigeWeightLoss: string; process: string }[]>([]);

  useEffect(() => {
    setDeliveryDetails([
      { inwNo: '123', custOrdNo: '456', custDCNo: '789', jobCard: 'JC001', fabric: 'Cotton', colour: 'White', greigeDia: '32', finishRolls: '10', weight: '200', greigeWeightLoss: '5%', process: 'Dyeing' }
    ]);
  }, []);

  // Button Handlers (Moved inside the component)
  const handleSave = async () => {
    try {
      await createDelivery({ vNo, date, referenceType, customer, deliveryTo, jobNo, billingName, narration, appxVal, formJJNo, whoseVehicle, vehicleNum, driverName, styleNo, deliveryDetails });
      alert("Delivery saved successfully");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleDelete = async () => {
    if (!vNo) return alert("Enter a valid delivery number to delete");
    try {
      await deleteDelivery(vNo);
      alert("Delivery deleted successfully");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handlePrint = () => {
    if (!vNo) return alert("Enter a valid delivery number to print");
    printDelivery(vNo);
  };

  const handleClear = () => {
    clearDeliveryForm({
      setVNo,
      setDate,
      setReferenceType,
      setCustomer,
      setDeliveryTo,
      setJobNo,
      setBillingName,
      setNarration,
      setAppxVal,
      setFormJJNo,
      setWhoseVehicle,
      setVehicleNum,
      setDriverName,
      setStyleNo,
    });
  };

  const handleExit = () => {
    exitPage();
  };

  return (
    <Box maxW="1200px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Delivery</Heading>
      
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
        <FormControl >
          <FormLabel>VNo.</FormLabel>
          <Input value={vNo} onChange={(e) => setVNo(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Date</FormLabel>
          <Input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
        </FormControl>
        <FormControl >
          <FormLabel>Reference Type</FormLabel>
          <Select placeholder="Select reference type" value={referenceType} onChange={(e) => setReferenceType(e.target.value)}>
            <option value="Type1">Type 1</option>
            <option value="Type2">Type 2</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Customer</FormLabel>
          <Input value={customer} onChange={(e) => setCustomer(e.target.value)} />
        </FormControl>
        <FormControl >
          <FormLabel>Delivery To</FormLabel>
          <Select placeholder="Select delivery to" value={deliveryTo} onChange={(e) => setDeliveryTo(e.target.value)}>
            <option value="Customer">Customer</option>
            <option value="Warehouse">Warehouse</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Job No</FormLabel>
          <Input value={jobNo} onChange={(e) => setJobNo(e.target.value)} />
        </FormControl>
      </Grid>
      
      <Heading size="md" my={4}>Delivery Details</Heading>
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>S.No</Th>
            <Th>Inw No</Th>
            <Th>Cust Ord No</Th>
            <Th>Cust DC No</Th>
            <Th>Job Card</Th>
            <Th>Fabric</Th>
            <Th>Colour</Th>
            <Th>Greige Dia</Th>
            <Th>Finish Rolls</Th>
            <Th>Weight</Th>
            <Th>Greige Weight Loss</Th>
            <Th>Process</Th>
          </Tr>
        </Thead>
        <Tbody>
          {deliveryDetails.map((detail, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{detail.inwNo}</Td>
              <Td>{detail.custOrdNo}</Td>
              <Td>{detail.custDCNo}</Td>
              <Td>{detail.jobCard}</Td>
              <Td>{detail.fabric}</Td>
              <Td>{detail.colour}</Td>
              <Td>{detail.greigeDia}</Td>
              <Td>{detail.finishRolls}</Td>
              <Td>{detail.weight}</Td>
              <Td>{detail.greigeWeightLoss}</Td>
              <Td>{detail.process}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mt={4}>
        <FormControl><FormLabel>Billing Name</FormLabel><Input value={billingName} onChange={(e) => setBillingName(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Narration</FormLabel><Textarea rows={2} value={narration} onChange={(e) => setNarration(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Appx Val</FormLabel><Input value={appxVal} onChange={(e) => setAppxVal(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Form JJ No.</FormLabel><Input value={formJJNo} onChange={(e) => setFormJJNo(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Whose Vehicle?</FormLabel><Select placeholder="Select" value={whoseVehicle} onChange={(e) => setWhoseVehicle(e.target.value)}><option value="Company">Company</option><option value="Third-party">Third-party</option></Select></FormControl>
        <FormControl><FormLabel>Vehicle Num</FormLabel><Input value={vehicleNum} onChange={(e) => setVehicleNum(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Driver Name</FormLabel><Input value={driverName} onChange={(e) => setDriverName(e.target.value)} /></FormControl>
        <FormControl><FormLabel>Style No</FormLabel><Input value={styleNo} onChange={(e) => setStyleNo(e.target.value)} /></FormControl>
      </Grid>
      <Box mt={6} textAlign="center">
        <Button colorScheme="blue" onClick={handleSave}>Save</Button>
        <Button colorScheme="red" onClick={handleDelete} ml={2}>Delete</Button>
        <Button colorScheme="green" onClick={handlePrint} ml={2}>Print</Button>
        <Button colorScheme="gray" onClick={handleClear} ml={2}>Clear</Button>
        <Link href="/processing" passHref>
          <Button colorScheme="teal" ml={2}>Exit</Button>
        </Link>
      </Box>
    </Box>
  );
}
