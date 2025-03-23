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
  Textarea,
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
  VStack,
  Divider,
  Container,
  Card,
  CardHeader,
  CardBody,
  Text,
  Checkbox
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import Link from 'next/link';

const GoodsInward: React.FC = () => {
  const router = useRouter();
  
  // Main form state
  const [inwNo, setInwNo] = useState('');
  const [date, setDate] = useState('');
  const [customer, setCustomer] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [custDcNo, setCustDcNo] = useState('');
  const [dcDate, setDcDate] = useState('');
  const [custOrdNo, setCustOrdNo] = useState('');
  const [vehNo, setVehNo] = useState('');
  const [styleRefNo, setStyleRefNo] = useState('');
  const [greigeMarkingId, setGreigeMarkingId] = useState('');
  const [marketingBy, setMarketingBy] = useState('');
  const [preparedBy, setPreparedBy] = useState('');
  const [custOrdIncharge, setCustOrdIncharge] = useState('');
  const [oldDoNo, setOldDoNo] = useState('');
  const [majorFabric, setMajorFabric] = useState('');
  const [labNo, setLabNo] = useState('');
  const [narration, setNarration] = useState('');
  const [isLabApproved, setIsLabApproved] = useState(false);

  // Fabrics section state
  const [fabrics, setFabrics] = useState([
    { id: 1, fabric: '', color: '', greigeGsm: '', greigeDia: '', finishRolls: '', weight: '', machine: '' }
  ]);

  // Processes section state
  const [processes, setProcesses] = useState([
    { id: 1, process: '' }
  ]);

  // Add new fabric row
  const handleAddFabric = () => {
    const newId = fabrics.length > 0 ? Math.max(...fabrics.map(f => f.id)) + 1 : 1;
    setFabrics([...fabrics, { 
      id: newId, 
      fabric: '', 
      color: '', 
      greigeGsm: '', 
      greigeDia: '', 
      finishRolls: '', 
      weight: '', 
      machine: '' 
    }]);
  };

  // Remove fabric row
  const handleRemoveFabric = (id: number) => {
    setFabrics(fabrics.filter(fabric => fabric.id !== id));
  };

  // Update fabric fields
  const handleFabricChange = (id: number, field: string, value: string) => {
    setFabrics(fabrics.map(fabric => 
      fabric.id === id ? { ...fabric, [field]: value } : fabric
    ));
  };

  // Add new process row
  const handleAddProcess = () => {
    const newId = processes.length > 0 ? Math.max(...processes.map(p => p.id)) + 1 : 1;
    setProcesses([...processes, { id: newId, process: '' }]);
  };

  // Remove process row
  const handleRemoveProcess = (id: number) => {
    setProcesses(processes.filter(process => process.id !== id));
  };

  // Update process fields
  const handleProcessChange = (id: number, value: string) => {
    setProcesses(processes.map(process => 
      process.id === id ? { ...process, process: value } : process
    ));
  };

  // Submit form handler
  const handleSubmit = async () => {
    try {
      const formData = {
        inwNo,
        date,
        customer,
        category,
        type,
        custDcNo,
        dcDate,
        custOrdNo,
        vehNo,
        styleRefNo,
        greigeMarkingId,
        marketingBy,
        preparedBy,
        custOrdIncharge,
        oldDoNo,
        majorFabric,
        labNo,
        isLabApproved,
        narration,
        fabrics,
        processes
      };

      const response = await fetch('http://localhost:6660/goodsinward', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Goods inward record added successfully!');
        router.push('/domains/goodsinward'); // Redirect to goods inward list
      } else {
        console.error('Failed to add goods inward record');
      }
    } catch (error) {
      console.error('Error adding goods inward record:', error);
    }
  };

  return (
    <Container maxW="container.xl" py={5}>
      <Box as="form" shadow="md" borderWidth="1px" p={6} borderRadius="md">
        <Heading size="lg" mb={6}>Add Goods Inward</Heading>
        
        {/* Main details - first row */}
        <Grid templateColumns="repeat(4, 1fr)" gap={4} mb={6}>
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
            <Select placeholder="Select category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </Select>
          </FormControl>
        </Grid>
        
        {/* Main details - second row */}
        <Grid templateColumns="repeat(4, 1fr)" gap={4} mb={6}>
          <FormControl>
            <FormLabel>Type:</FormLabel>
            <Select placeholder="Select type" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="type1">Type 1</option>
              <option value="type2">Type 2</option>
              <option value="type3">Type 3</option>
            </Select>
          </FormControl>
          
          <FormControl>
            <FormLabel>Cust DC No:</FormLabel>
            <Input type="text" value={custDcNo} onChange={(e) => setCustDcNo(e.target.value)} />
          </FormControl>
          
          <FormControl>
            <FormLabel>DC Date:</FormLabel>
            <Input type="date" value={dcDate} onChange={(e) => setDcDate(e.target.value)} />
          </FormControl>
          
          <FormControl>
            <FormLabel>Cust Ord No:</FormLabel>
            <Input type="text" value={custOrdNo} onChange={(e) => setCustOrdNo(e.target.value)} />
          </FormControl>
        </Grid>

        {/* Main details - third row */}
        <Grid templateColumns="repeat(4, 1fr)" gap={4} mb={6}>
          <FormControl>
            <FormLabel>Veh No:</FormLabel>
            <Input type="text" value={vehNo} onChange={(e) => setVehNo(e.target.value)} />
          </FormControl>
          
          <FormControl>
            <FormLabel>Style Ref No:</FormLabel>
            <Input type="text" value={styleRefNo} onChange={(e) => setStyleRefNo(e.target.value)} />
          </FormControl>
          
          <FormControl>
            <FormLabel>Greige Marking ID:</FormLabel>
            <Input type="text" value={greigeMarkingId} onChange={(e) => setGreigeMarkingId(e.target.value)} />
          </FormControl>
          
          <FormControl>
            <FormLabel>Marketing By:</FormLabel>
            <Select placeholder="Select marketing person" value={marketingBy} onChange={(e) => setMarketingBy(e.target.value)}>
              <option value="person1">Person 1</option>
              <option value="person2">Person 2</option>
              <option value="person3">Person 3</option>
            </Select>
          </FormControl>
        </Grid>

        {/* Main details - fourth row */}
        <Grid templateColumns="repeat(4, 1fr)" gap={4} mb={6}>
          <FormControl>
            <FormLabel>Prepared By:</FormLabel>
            <Input type="text" value={preparedBy} onChange={(e) => setPreparedBy(e.target.value)} />
          </FormControl>
          
          <FormControl>
            <FormLabel>Cust Ord Incharge:</FormLabel>
            <Select placeholder="Select incharge" value={custOrdIncharge} onChange={(e) => setCustOrdIncharge(e.target.value)}>
              <option value="incharge1">Incharge 1</option>
              <option value="incharge2">Incharge 2</option>
              <option value="incharge3">Incharge 3</option>
            </Select>
          </FormControl>
          
          <FormControl>
            <FormLabel>Old DO No:</FormLabel>
            <Input type="text" value={oldDoNo} onChange={(e) => setOldDoNo(e.target.value)} />
          </FormControl>
          
          <FormControl>
            <FormLabel>Major Fabric:</FormLabel>
            <Input type="text" value={majorFabric} onChange={(e) => setMajorFabric(e.target.value)} />
          </FormControl>
        </Grid>

        {/* Main details - fifth row */}
        <Grid templateColumns="repeat(4, 1fr)" gap={4} mb={6}>
          <FormControl>
            <FormLabel>Lab No:</FormLabel>
            <Input type="text" value={labNo} onChange={(e) => setLabNo(e.target.value)} />
          </FormControl>
          
          <FormControl>
            <Checkbox 
              isChecked={isLabApproved} 
              onChange={(e) => setIsLabApproved(e.target.checked)}
              colorScheme="green"
              size="md"
              mt={8}
            >
              Lab Approved
            </Checkbox>
          </FormControl>
          
          <FormControl gridColumn="span 2">
            <FormLabel>Narration:</FormLabel>
            <Textarea value={narration} onChange={(e) => setNarration(e.target.value)} />
          </FormControl>
        </Grid>

        <Divider my={6} />

        {/* Fabrics Section */}
        <Card mb={6}>
          <CardHeader>
            <HStack justifyContent="space-between">
              <Heading size="md">Fabrics</Heading>
              <Button leftIcon={<AddIcon />} colorScheme="blue" size="sm" onClick={handleAddFabric}>
                Add Fabric
              </Button>
            </HStack>
          </CardHeader>
          <CardBody>
            <Table variant="simple" size="sm">
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
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {fabrics.map((fabric, index) => (
                  <Tr key={fabric.id}>
                    <Td>{index + 1}</Td>
                    <Td>
                      <Input 
                        size="sm" 
                        value={fabric.fabric} 
                        onChange={(e) => handleFabricChange(fabric.id, 'fabric', e.target.value)} 
                      />
                    </Td>
                    <Td>
                      <Input 
                        size="sm" 
                        value={fabric.color} 
                        onChange={(e) => handleFabricChange(fabric.id, 'color', e.target.value)} 
                      />
                    </Td>
                    <Td>
                      <Input 
                        size="sm" 
                        value={fabric.greigeGsm} 
                        onChange={(e) => handleFabricChange(fabric.id, 'greigeGsm', e.target.value)} 
                      />
                    </Td>
                    <Td>
                      <Input 
                        size="sm" 
                        value={fabric.greigeDia} 
                        onChange={(e) => handleFabricChange(fabric.id, 'greigeDia', e.target.value)} 
                      />
                    </Td>
                    <Td>
                      <Input 
                        size="sm" 
                        value={fabric.finishRolls} 
                        onChange={(e) => handleFabricChange(fabric.id, 'finishRolls', e.target.value)} 
                      />
                    </Td>
                    <Td>
                      <Input 
                        size="sm" 
                        value={fabric.weight} 
                        onChange={(e) => handleFabricChange(fabric.id, 'weight', e.target.value)} 
                      />
                    </Td>
                    <Td>
                      <Input 
                        size="sm" 
                        value={fabric.machine} 
                        onChange={(e) => handleFabricChange(fabric.id, 'machine', e.target.value)} 
                      />
                    </Td>
                    <Td>
                      <IconButton
                        aria-label="Delete fabric"
                        icon={<DeleteIcon />}
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleRemoveFabric(fabric.id)}
                        isDisabled={fabrics.length === 1}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        {/* Processes Section */}
        <Card mb={6}>
          <CardHeader>
            <HStack justifyContent="space-between">
              <Heading size="md">Processes</Heading>
              <Button leftIcon={<AddIcon />} colorScheme="blue" size="sm" onClick={handleAddProcess}>
                Add Process
              </Button>
            </HStack>
          </CardHeader>
          <CardBody>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>S.No</Th>
                  <Th>Process</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {processes.map((process, index) => (
                  <Tr key={process.id}>
                    <Td>{index + 1}</Td>
                    <Td>
                      <Input 
                        size="sm" 
                        value={process.process} 
                        onChange={(e) => handleProcessChange(process.id, e.target.value)} 
                      />
                    </Td>
                    <Td>
                      <IconButton
                        aria-label="Delete process"
                        icon={<DeleteIcon />}
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleRemoveProcess(process.id)}
                        isDisabled={processes.length === 1}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        {/* Form action buttons */}
        <Box mt={6} textAlign="right">
          <Button colorScheme="blue" onClick={handleSubmit} mr={3}>Save Goods Inward</Button>
          <Link href="/domains/goodsinward" passHref>
            <Button colorScheme="teal">Cancel</Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default GoodsInward;