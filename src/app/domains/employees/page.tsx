'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Box, 
  Heading, 
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  Flex, 
  useToast, 
  IconButton 
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

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

  // Function to delete employee
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this employee?')) {
      try {
        const response = await fetch(`http://localhost:6660/employees/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast({ title: 'Employee deleted!', status: 'error', duration: 3000, isClosable: true });
          router.push('/domains/employees');
        } else {
          console.error('Failed to delete employee');
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
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
        <Flex justify="space-between">
          <Button type="submit" colorScheme="blue">Update</Button>
          <IconButton
            aria-label="Delete Employee"
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={handleDelete}
          />
        </Flex>
      </form>
    </Box>
  );
};

export default EditEmployee;
