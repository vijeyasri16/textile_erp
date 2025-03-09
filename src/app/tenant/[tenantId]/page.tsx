'use client';

import { useParams } from 'next/navigation';
import { Box, Heading, Text } from '@chakra-ui/react';

export default function TenantDashboardPage() {
  const params = useParams();
  const tenantId = params.tenantId; 

  return (
    <Box p={8}>
      <Heading mb={4}>Tenant Dashboard</Heading>
      <Text>Tenant ID: {tenantId}</Text>
      <Text mt={2}>
        This is the tenant dashboard page. You could list staff here, show stats, etc.
      </Text>
    </Box>
  );
}
