'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Box,
  Heading,
  Text,
  Button
} from '@chakra-ui/react';
import Link from 'next/link';

const RawMaterialDetail: React.FC = () => {
  const { id } = useParams();
  const [rawMaterial, setRawMaterial] = useState<{ name: string; quantity: number; unitOfMeasure: string } | null>(null);

  useEffect(() => {
    const fetchRawMaterial = async () => {
      try {
        const response = await fetch(`http://localhost:6660/rawmaterials/${id}`);
        if (!response.ok) throw new Error('Raw material not found');
        const data = await response.json();
        setRawMaterial(data);
      } catch (error) {
        console.error('Error fetching raw material:', error);
      }
    };

    if (id) {
      fetchRawMaterial();
    }
  }, [id]);

  if (!rawMaterial) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>{rawMaterial.name}</Heading>
      <Text><strong>Quantity:</strong> {rawMaterial.quantity}</Text>
      <Text><strong>Unit of Measure:</strong> {rawMaterial.unitOfMeasure}</Text>

      <Box mt={6}>
        <Link href={`/Inventory/rawmaterials/${id}/edit`} passHref>
          <Button colorScheme="blue" mr={2}>Edit</Button>
        </Link>
        <Link href="/Inventory/rawmaterials" passHref>
          <Button colorScheme="teal">Back</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default RawMaterialDetail;
