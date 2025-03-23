'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Heading, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';

const EditEmployee: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const toast = useToast();

  const [employee, setEmployee] = useState({ id: '', name: '', password: '' });

  useEffect(() => {
    fetch(`http://localhost:6660/employees/${id}`)
      .then(res => res.json())
      .then(setEmployee)
      .catch(console.error);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:6660/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
      });
      toast({ title: 'Employee updated!', status: 'success', duration: 3000, isClosable: true });
      router.push('/domains/employees');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box maxW="500px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Edit Employee</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mb={4}>
          <FormLabel>Employee ID:</FormLabel>
          <Input name="id" value={employee.id} onChange={handleChange} isDisabled />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Name:</FormLabel>
          <Input name="name" value={employee.name} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Password:</FormLabel>
          <Input name="password" type="password" value={employee.password} onChange={handleChange} />
        </FormControl>
        <Button type="submit" colorScheme="blue">Update</Button>
      </form>
    </Box>
  );
};

export default EditEmployee;
