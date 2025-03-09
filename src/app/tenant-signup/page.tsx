'use client';

import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation'; 
import { createTenant } from '@/services/tenantService';

export default function TenantSignupPage() {
  const toast = useToast();
  const router = useRouter();
  const [tenantName, setTenantName] = useState('');
  const [adminEmployeeId, setAdminEmployeeId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminName, setAdminName] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createTenant({
        tenantName,
        adminEmployeeId,
        adminPassword,
        adminName,
      });
      toast({
        title: 'Tenant created!',
        description: `Tenant ID: ${response.tenantId}`,
        status: 'success',
      });
      // Redirect to the new tenant's dashboard
      router.push(`/tenant/${response.tenantId}`);
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box maxW="400px" mx="auto" mt="50px">
      <Heading mb={4}>Tenant Signup</Heading>
      <form onSubmit={handleSignup}>
        <FormControl mb={3} isRequired>
          <FormLabel>Tenant Name</FormLabel>
          <Input
            value={tenantName}
            onChange={(e) => setTenantName(e.target.value)}
          />
        </FormControl>
        <FormControl mb={3} isRequired>
          <FormLabel>Admin Employee ID</FormLabel>
          <Input
            value={adminEmployeeId}
            onChange={(e) => setAdminEmployeeId(e.target.value)}
          />
        </FormControl>
        <FormControl mb={3} isRequired>
          <FormLabel>Admin Password</FormLabel>
          <Input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Admin Name</FormLabel>
          <Input
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />
        </FormControl>
        <Button
          type="submit"
          colorScheme="blue"
          isLoading={loading}
          loadingText="Creating..."
        >
          Create Tenant
        </Button>
      </form>
    </Box>
  );
}
