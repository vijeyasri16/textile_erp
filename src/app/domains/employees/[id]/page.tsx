'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Heading, Text, Spinner, Alert, AlertIcon, Button, Flex } from '@chakra-ui/react';
import Link from 'next/link';

const EmployeeDetails: React.FC = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState<{ id: string, name: string, password: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:6660/employees/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Employee not found');
        return res.json();
      })
      .then(setEmployee)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <Spinner size="xl" color="blue.500" display="block" mx="auto" mt={8} />;
  }

  if (error) {
    return (
      <Alert status="error" mt={8}>
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Box maxW="500px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Employee Details</Heading>
      <Text fontSize="lg"><strong>Employee ID:</strong> {employee?.id}</Text>
      <Text fontSize="lg"><strong>Name:</strong> {employee?.name}</Text>
      <Text fontSize="lg"><strong>Password:</strong> {employee?.password}</Text>

      <Flex mt={6} justify="space-between">
        <Link href="/domains/employees" passHref>
          <Button colorScheme="gray">Back to List</Button>
        </Link>
        <Link href={`/domains/employees/${id}/edit`} passHref>
          <Button colorScheme="yellow">Edit Employee</Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default EmployeeDetails;
