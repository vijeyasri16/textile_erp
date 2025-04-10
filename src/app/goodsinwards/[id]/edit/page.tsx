'use client';

import React, { useState, useEffect, use } from 'react';
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
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import Link from 'next/link';

interface Fabric {
  gSNo: number;
  gFabric: string;
  gColor: string;
  gGreigeGSM: string;
  gGreigeDIA: string;
  gFinishRolls: string;
  gWeight: string;
  gMachine: string;
}

interface Process {
  gSNo: number;
  gProcess: string;
}

interface GoodsInwardsData {
  gInwNo: string;
  gDate: string;
  gCustomer: string;
  gCategory: string;
  gType: string;
  gLabApproved: boolean;
  gCustDCNo: string;
  gCustDCDate: string;
  gCustOrdNo: string;
  gVehNo: string;
  gStyleRefNo: string;
  gGreigeMarkingID: string;
  gMarketingBy: string;
  gPreparedBy: string;
  gCustOrdIncharge: string;
  gOldDONo: string;
  gMajorFabric: string;
  gLabNo: string;
  gNarration: string;
  fabrics: Fabric[];
  processes: Process[];
}

interface PageProps {
  params: {
    id: string;
  };
}

const EditGoodsInwardsPage: React.FC<PageProps> = ({ params }) => {
  const router = useRouter();
  const { id } = use(params);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Main form fields
  const [gInwNo, setGInwNo] = useState('');
  const [gDate, setGDate] = useState('');
  const [gCustomer, setGCustomer] = useState('');
  const [gCategory, setGCategory] = useState('');
  const [gType, setGType] = useState('');
  const [gLabApproved, setGLabApproved] = useState(false);
  const [gCustDCNo, setGCustDCNo] = useState('');
  const [gCustDCDate, setGCustDCDate] = useState('');
  const [gCustOrdNo, setGCustOrdNo] = useState('');
  const [gVehNo, setGVehNo] = useState('');
  const [gStyleRefNo, setGStyleRefNo] = useState('');
  const [gGreigeMarkingID, setGGreigeMarkingID] = useState('');
  const [gMarketingBy, setGMarketingBy] = useState('');
  const [gPreparedBy, setGPreparedBy] = useState('');
  const [gCustOrdIncharge, setGCustOrdIncharge] = useState('');
  const [gOldDONo, setGOldDONo] = useState('');
  const [gMajorFabric, setGMajorFabric] = useState('');
  const [gLabNo, setGLabNo] = useState('');
  const [gNarration, setGNarration] = useState('');

  // Fabric section
  const [fabrics, setFabrics] = useState<Fabric[]>([
    { gSNo: 1, gFabric: '', gColor: '', gGreigeGSM: '', gGreigeDIA: '', gFinishRolls: '', gWeight: '', gMachine: '' }
  ]);

  // Process section
  const [processes, setProcesses] = useState<Process[]>([
    { gSNo: 1, gProcess: '' }
  ]);

  // Fetch goods inwards data by ID
  useEffect(() => {
    const fetchGoodsInwards = async () => {
      try {
        const response = await fetch(`http://localhost:6660/goodsInwards/goodsInwards/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch goods inwards data');
        }
        
        const data: GoodsInwardsData = await response.json();
        
        // Populate form with fetched data
        setGInwNo(data.gInwNo);
        setGDate(data.gDate);
        setGCustomer(data.gCustomer);
        setGCategory(data.gCategory);
        setGType(data.gType);
        setGLabApproved(data.gLabApproved);
        setGCustDCNo(data.gCustDCNo);
        setGCustDCDate(data.gCustDCDate);
        setGCustOrdNo(data.gCustOrdNo);
        setGVehNo(data.gVehNo);
        setGStyleRefNo(data.gStyleRefNo);
        setGGreigeMarkingID(data.gGreigeMarkingID);
        setGMarketingBy(data.gMarketingBy);
        setGPreparedBy(data.gPreparedBy);
        setGCustOrdIncharge(data.gCustOrdIncharge);
        setGOldDONo(data.gOldDONo);
        setGMajorFabric(data.gMajorFabric);
        setGLabNo(data.gLabNo);
        setGNarration(data.gNarration);
        
        // Set fabrics and processes data
        if (data.fabrics && data.fabrics.length > 0) {
          setFabrics(data.fabrics);
        }
        
        if (data.processes && data.processes.length > 0) {
          setProcesses(data.processes);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching goods inwards data:', error);
        setError('Failed to load goods inwards data. Please try again.');
        setLoading(false);
      }
    };

    fetchGoodsInwards();
  }, [id]);

  // Add new fabric row
  const addFabric = () => {
    setFabrics([
      ...fabrics,
      { gSNo: fabrics.length + 1, gFabric: '', gColor: '', gGreigeGSM: '', gGreigeDIA: '', gFinishRolls: '', gWeight: '', gMachine: '' }
    ]);
  };

  // Remove fabric row
  const removeFabric = (index: number) => {
    const updatedFabrics = fabrics.filter((_, i) => i !== index);
    // Update serial numbers
    const reindexedFabrics = updatedFabrics.map((fabric, i) => ({
      ...fabric,
      gSNo: i + 1
    }));
    setFabrics(reindexedFabrics);
  };

  // Add new process row
  const addProcess = () => {
    setProcesses([
      ...processes,
      { gSNo: processes.length + 1, gProcess: '' }
    ]);
  };

  // Remove process row
  const removeProcess = (index: number) => {
    const updatedProcesses = processes.filter((_, i) => i !== index);
    // Update serial numbers
    const reindexedProcesses = updatedProcesses.map((process, i) => ({
      ...process,
      gSNo: i + 1
    }));
    setProcesses(reindexedProcesses);
  };

  // Update fabric field
  const updateFabric = (index: number, field: string, value: string) => {
    const updatedFabrics = [...fabrics];
    updatedFabrics[index] = { ...updatedFabrics[index], [field]: value };
    setFabrics(updatedFabrics);
  };

  // Update process field
  const updateProcess = (index: number, field: string, value: string) => {
    const updatedProcesses = [...processes];
    updatedProcesses[index] = { ...updatedProcesses[index], [field]: value };
    setProcesses(updatedProcesses);
  };

  // Handle form submission for update
  const handleUpdate = async () => {
    try {
      const goodsInwardsData = {
        gInwNo,
        gDate,
        gCustomer,
        gCategory,
        gType,
        gLabApproved,
        gCustDCNo,
        gCustDCDate,
        gCustOrdNo,
        gVehNo,
        gStyleRefNo,
        gGreigeMarkingID,
        gMarketingBy,
        gPreparedBy,
        gCustOrdIncharge,
        gOldDONo,
        gMajorFabric,
        gLabNo,
        gNarration,
        fabrics,
        processes
      };

      const response = await fetch(`http://localhost:6660/goodsInwards/goodsInwards/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(goodsInwardsData)
      });

      if (response.ok) {
        alert('Goods Inwards record updated successfully!');
        router.push('/goodsinwards');
      } else {
        console.error('Failed to update Goods Inwards record');
        setError('Failed to update Goods Inwards record. Please try again.');
      }
    } catch (error) {
      console.error('Error updating Goods Inwards record:', error);
      setError('An error occurred while updating. Please try again.');
    }
  };

  if (loading) {
    return (
      <Container maxW="container.xl" py={6} centerContent>
        <Spinner size="xl" my={8} />
        <Heading size="md">Loading Goods Inwards data...</Heading>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={6}>
        <Alert status="error" mb={6}>
          <AlertIcon />
          {error}
        </Alert>
        <Button onClick={() => router.push('/goodsinwards')}>Back to List</Button>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={6}>
      <Heading as="h1" mb={6}>Edit Goods Inwards #{id}</Heading>
      
      <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
        {/* Main information section */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mb={6}>
          <FormControl>
            <FormLabel>Inw No:</FormLabel>
            <Input 
              type="text" 
              value={gInwNo} 
              onChange={(e) => setGInwNo(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Date:</FormLabel>
            <Input 
              type="date" 
              value={gDate} 
              onChange={(e) => setGDate(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Customer:</FormLabel>
            <Input 
              type="text" 
              value={gCustomer} 
              onChange={(e) => setGCustomer(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Category:</FormLabel>
            <Select 
              placeholder="Select category" 
              value={gCategory}
              onChange={(e) => setGCategory(e.target.value)}
            >
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </Select>
          </FormControl>
          
          <FormControl>
            <FormLabel>Type:</FormLabel>
            <Select 
              placeholder="Select type" 
              value={gType}
              onChange={(e) => setGType(e.target.value)}
            >
              <option value="type1">Type 1</option>
              <option value="type2">Type 2</option>
              <option value="type3">Type 3</option>
            </Select>
          </FormControl>
          
          <FormControl>
            <FormLabel>&nbsp;</FormLabel>
            <Checkbox 
              isChecked={gLabApproved} 
              onChange={(e) => setGLabApproved(e.target.checked)}
              mt={2}
            >
              Lab Approved
            </Checkbox>
          </FormControl>
        </Grid>
        
        <Divider my={6} />
        
        {/* Fabrics section */}
        <Heading as="h3" size="md" mb={4}>Fabrics</Heading>
        <Box overflowX="auto">
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
                <Tr key={index}>
                  <Td>{fabric.gSNo}</Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={fabric.gFabric} 
                      onChange={(e) => updateFabric(index, 'gFabric', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={fabric.gColor} 
                      onChange={(e) => updateFabric(index, 'gColor', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={fabric.gGreigeGSM} 
                      onChange={(e) => updateFabric(index, 'gGreigeGSM', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={fabric.gGreigeDIA} 
                      onChange={(e) => updateFabric(index, 'gGreigeDIA', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={fabric.gFinishRolls} 
                      onChange={(e) => updateFabric(index, 'gFinishRolls', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={fabric.gWeight} 
                      onChange={(e) => updateFabric(index, 'gWeight', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={fabric.gMachine} 
                      onChange={(e) => updateFabric(index, 'gMachine', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Remove fabric"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      onClick={() => removeFabric(index)}
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
          onClick={addFabric}
        >
          Add Fabric
        </Button>
        
        <Divider my={6} />
        
        {/* Processes section */}
        <Heading as="h3" size="md" mb={4}>Processes</Heading>
        <Box overflowX="auto">
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
                <Tr key={index}>
                  <Td>{process.gSNo}</Td>
                  <Td>
                    <Input 
                      size="sm" 
                      value={process.gProcess} 
                      onChange={(e) => updateProcess(index, 'gProcess', e.target.value)} 
                    />
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Remove process"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      onClick={() => removeProcess(index)}
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
          onClick={addProcess}
        >
          Add Process
        </Button>
        
        <Divider my={6} />
        
        {/* Additional information fields */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mb={6}>
          <FormControl>
            <FormLabel>Cust DC No:</FormLabel>
            <Input 
              type="text" 
              value={gCustDCNo} 
              onChange={(e) => setGCustDCNo(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Date:</FormLabel>
            <Input 
              type="date" 
              value={gCustDCDate} 
              onChange={(e) => setGCustDCDate(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Cust Ord No:</FormLabel>
            <Input 
              type="text" 
              value={gCustOrdNo} 
              onChange={(e) => setGCustOrdNo(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Veh No:</FormLabel>
            <Input 
              type="text" 
              value={gVehNo} 
              onChange={(e) => setGVehNo(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Style Ref No:</FormLabel>
            <Input 
              type="text" 
              value={gStyleRefNo} 
              onChange={(e) => setGStyleRefNo(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Greige Marking ID:</FormLabel>
            <Input 
              type="text" 
              value={gGreigeMarkingID} 
              onChange={(e) => setGGreigeMarkingID(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Marketing By:</FormLabel>
            <Select 
              placeholder="Select marketing person" 
              value={gMarketingBy}
              onChange={(e) => setGMarketingBy(e.target.value)}
            >
              <option value="person1">Person 1</option>
              <option value="person2">Person 2</option>
              <option value="person3">Person 3</option>
            </Select>
          </FormControl>
          
          <FormControl>
            <FormLabel>Prepared By:</FormLabel>
            <Input 
              type="text" 
              value={gPreparedBy} 
              onChange={(e) => setGPreparedBy(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Cust Ord Incharge:</FormLabel>
            <Select 
              placeholder="Select incharge" 
              value={gCustOrdIncharge}
              onChange={(e) => setGCustOrdIncharge(e.target.value)}
            >
              <option value="incharge1">Incharge 1</option>
              <option value="incharge2">Incharge 2</option>
              <option value="incharge3">Incharge 3</option>
            </Select>
          </FormControl>
          
          <FormControl>
            <FormLabel>Old DO No:</FormLabel>
            <Input 
              type="text" 
              value={gOldDONo} 
              onChange={(e) => setGOldDONo(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Major Fabric:</FormLabel>
            <Input 
              type="text" 
              value={gMajorFabric} 
              onChange={(e) => setGMajorFabric(e.target.value)} 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Lab No:</FormLabel>
            <Input 
              type="text" 
              value={gLabNo} 
              onChange={(e) => setGLabNo(e.target.value)} 
            />
          </FormControl>
        </Grid>
        
        <FormControl mb={6}>
          <FormLabel>Narration:</FormLabel>
          <Textarea 
            value={gNarration} 
            onChange={(e) => setGNarration(e.target.value)} 
            rows={4}
          />
        </FormControl>
        
        {/* Submit buttons */}
        <HStack spacing={4} justifyContent="center" mt={8}>
          <Button colorScheme="blue" onClick={handleUpdate}>
            Update Goods Inwards Record
          </Button>
          <Link href="/goodsinwards" passHref>
            <Button colorScheme="teal">
              Cancel
            </Button>
          </Link>
        </HStack>
      </Box>
    </Container>
  );
};

export default EditGoodsInwardsPage;