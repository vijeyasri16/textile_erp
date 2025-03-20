'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Heading, 
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  VStack, 
  Select, 
  NumberInput, 
  NumberInputField, 
  HStack 
} from '@chakra-ui/react';
import Link from 'next/link';

const AddRawMaterial: React.FC = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');

  return (
    <Box 
      maxW="500px" 
      mx="auto" 
      mt={20} 
      p={6} 
      boxShadow="lg" 
      borderRadius="md" 
      bg="white"
    >
      <Heading size="lg" textAlign="center" mb={6}>Add Raw Material</Heading>
      
      <VStack spacing={4}>
        {/* Raw Material Name */}
        <FormControl isRequired>
          <FormLabel>Raw Material Name</FormLabel>
          <Input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter raw material name" 
          />
        </FormControl>

        {/* Initial Quantity */}
        <FormControl isRequired>
          <FormLabel>Initial Quantity</FormLabel>
          <NumberInput min={0}>
            <NumberInputField 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)} 
              placeholder="Enter quantity" 
            />
          </NumberInput>
        </FormControl>

        {/* Unit of Measure */}
        <FormControl isRequired>
          <FormLabel>Unit of Measure</FormLabel>
          <Select 
            placeholder="Select unit" 
            value={unit} 
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="kg">Kilograms (kg)</option>
            <option value="g">Grams (g)</option>
            <option value="m">Meters (m)</option>
            <option value="pcs">Pieces (pcs)</option>
          </Select>
        </FormControl>
      </VStack>

      {/* Buttons Section */}
      <HStack mt={6} spacing={4} justify="center">
        <Button colorScheme="blue" width="full">Add Raw Material</Button>
        <Link href="/Inventory" passHref>
          <Button colorScheme="red" width="full">Exit</Button>
        </Link>
      </HStack>
    </Box>
  );
};

export default AddRawMaterial;
