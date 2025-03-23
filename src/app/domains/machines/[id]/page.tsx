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

const MachineDetail: React.FC = () => {
  const { id } = useParams(); // Get machine ID from URL
  const [machine, setMachine] = useState<{ name: string; processLinked: string } | null>(null);

  useEffect(() => {
    const fetchMachine = async () => {
      try {
        const response = await fetch(`http://localhost:6660/machines/${id}`);
        if (!response.ok) {
          throw new Error('Machine not found');
        }
        const data = await response.json();
        setMachine(data);
      } catch (error) {
        console.error('Error fetching machine:', error);
      }
    };

    if (id) {
      fetchMachine();
    }
  }, [id]);

  if (!machine) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>{machine.name}</Heading>
      <Text><strong>Process Linked:</strong> {machine.processLinked}</Text>

      <Box mt={6}>
        <Link href={`/machines/${id}/edit`} passHref>
          <Button colorScheme="blue" mr={2}>Edit</Button>
        </Link>
        <Link href="/machines" passHref>
          <Button colorScheme="teal">Back</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default MachineDetail;
