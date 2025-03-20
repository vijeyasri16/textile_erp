'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Heading, 
  FormControl, 
  FormLabel, 
  Input, 
  Select, 
  Button, 
  VStack, 
  HStack 
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Simulating an API call to fetch raw material details (replace with actual API logic)
const getRawMaterialById = (id: number) => {
  const rawMaterials = [
    { id: 1, name: 'Cotton Fabric', quantity: 50, unit: 'kg' },
    { id: 2, name: 'Dye Powder', quantity: 20, unit: 'g' },
    { id: 3, name: 'Polyester Yarn', quantity: 100, unit: 'm' },
    { id: 4, name: 'Chemical Agent', quantity: 10, unit: 'pcs' }
  ];
  return rawMaterials.find(material => material.id === id);
};

const EditRawMaterial: React.FC<{ params: { id: string } }> = ({ params }) => {
  const router = useRouter();
  const materialId = parseInt(params.id);
  const existingMaterial = getRawMaterialById(materialId);

  const [name, setName] = useState(existingMaterial?.name || '');
  const [quantity, setQuantity] = useState(existingMaterial?.quantity || '');
  const [unit, setUnit] = useState(existingMaterial?.unit || '');

  const handleSave = () => {
    // Here, you would send an API request to update the material
    console.log('Updated Raw Material:', { id: materialId, name, quantity, unit });
    router.push('/inventory/view-raw-materials'); // Redirect to view page after saving
  };

  return (
    <Box maxW="500px" mx="auto" mt={10} p={6} boxShadow="lg" borderRadius="md" bg="white">
      <Heading size="lg" textAlign="center" mb={6}>Edit Raw Material</Heading>
      
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter material name" 
          />
        </FormControl>

        <FormControl>
          <FormLabel>Quantity</FormLabel>
          <Input 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            placeholder="Enter quantity" 
          />
        </FormControl>

        <FormControl>
          <FormLabel>Unit of Measure</FormLabel>
          <Select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="m">m</option>
            <option value="pcs">pcs</option>
          </Select>
        </FormControl>
      </VStack>

      {/* Action Buttons */}
      <HStack mt={6} justify="center">
        <Button colorScheme="blue" onClick={handleSave}>Save Changes</Button>
        <Link href="/Inventory" passHref>
          <Button colorScheme="teal">Exit</Button>
        </Link>
      </HStack>
    </Box>
  );
};

export default EditRawMaterial;
