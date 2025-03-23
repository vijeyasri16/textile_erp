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

const FabricDetail: React.FC = () => {
  const { id } = useParams();
  const [fabric, setFabric] = useState<{ name: string; composition: string } | null>(null);

  useEffect(() => {
    fetch(`http://localhost:6660/fabrics/${id}`)
      .then(res => res.json())
      .then(setFabric)
      .catch(console.error);
  }, [id]);

  if (!fabric) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>{fabric.name}</Heading>
      <Text><strong>Composition:</strong> {fabric.composition}</Text>

      <Box mt={6}>
        <Link href={`/domains/fabrics/${id}/edit`} passHref>
          <Button colorScheme="blue" mr={2}>Edit</Button>
        </Link>
        <Link href="/domains/fabrics" passHref>
          <Button colorScheme="teal">Back</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default FabricDetail;
