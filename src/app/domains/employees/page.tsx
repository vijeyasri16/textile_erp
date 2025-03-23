'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import Link from 'next/link';

interface Employee {
  id: number;
  name: string;
  password: string;
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:6660/employees')
      .then((res) => res.json())
      .then(setEmployees)
      .catch(console.error);
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      try {
        const response = await fetch(`http://localhost:6660/employees/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setEmployees(employees.filter((employee) => employee.id !== id));
          toast({
            title: 'Employee deleted!',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        } else {
          console.error('Failed to delete employee');
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  return (
    <Box maxW="800px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Employee List</Heading>

      <Button colorScheme="blue" mb={4}>
        <Link href="/domains/employees/new">Add New Employee</Link>
      </Button>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {employees.map((employee) => (
            <Tr key={employee.id}>
              <Td>{employee.id}</Td>
              <Td>
                <Link href={`/domains/employees/${employee.id}`} passHref>
                  <Button variant="link" colorScheme="blue">{employee.name}</Button>
                </Link>
              </Td>
              <Td>
                <Link href={`/domains/employees/${employee.id}/edit`} passHref>
                  <Button colorScheme="yellow" size="sm" mr={2}>Edit</Button>
                </Link>
                <IconButton
                  aria-label="Delete Employee"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDelete(employee.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default EmployeeList;