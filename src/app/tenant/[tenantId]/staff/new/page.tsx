'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Button, FormControl, FormLabel, Input, Heading, Checkbox, CheckboxGroup, Stack, useToast } from '@chakra-ui/react';
import { createStaff } from '@/services/staffService';

const POSSIBLE_PERMISSIONS = [
  'CREATE_ORDER',
  'READ_ORDER',
  'UPDATE_ORDER',
  'DELETE_ORDER',
  'ASSIGN_PERMISSION',
  // Add or remove your fine-grained perms
];

export default function CreateStaffPage() {
  const params = useParams(); 
  const router = useRouter();
  const tenantId = params.tenantId as string;

  const toast = useToast();

  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleCreateStaff(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createStaff({
        tenantId,
        employeeId,
        password,
        name,
        permissions
      });
      toast({
        title: 'Staff Created',
        description: `Staff ID: ${response.staffId}`,
        status: 'success',
      });
      router.push(`/tenant/${tenantId}`);
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
    <Box maxW="500px" mx="auto" mt={8}>
      <Heading mb={4}>Create Staff for Tenant {tenantId}</Heading>
      <form onSubmit={handleCreateStaff}>
        <FormControl mb={3} isRequired>
          <FormLabel>Employee ID</FormLabel>
          <Input
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </FormControl>

        <FormControl mb={3} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <FormControl mb={3}>
          <FormLabel>Staff Name</FormLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Permissions</FormLabel>
          <CheckboxGroup
            value={permissions}
            onChange={(vals) => setPermissions(vals as string[])}
          >
            <Stack spacing={2}>
              {POSSIBLE_PERMISSIONS.map((perm) => (
                <Checkbox key={perm} value={perm}>
                  {perm}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          isLoading={loading}
          loadingText="Creating..."
        >
          Create Staff
        </Button>
      </form>
    </Box>
  );
}
