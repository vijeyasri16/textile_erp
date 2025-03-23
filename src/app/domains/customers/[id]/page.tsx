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

const CustomerDetail: React.FC = () => {
  const { id } = useParams(); // Get customer ID from URL
  const [customer, setCustomer] = useState<{ name: string; phone: string; deliveryAddress: string } | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`http://localhost:6660/customers/${id}`);
        if (!response.ok) {
          throw new Error('Customer not found');
        }
        const data = await response.json();
        setCustomer(data);
      } catch (error) {
        console.error('Error fetching customer:', error);
      }
    };

    if (id) {
      fetchCustomer();
    }
  }, [id]);

  if (!customer) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>{customer.name}</Heading>
      <Text><strong>Phone:</strong> {customer.phone}</Text>
      <Text><strong>Address:</strong> {customer.deliveryAddress}</Text>

      <Box mt={6}>
        <Link href={`/customers/${id}/edit`} passHref>
          <Button colorScheme="blue" mr={2}>Edit</Button>
        </Link>
        <Link href="/customers" passHref>
          <Button colorScheme="teal">Back</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default CustomerDetail;
