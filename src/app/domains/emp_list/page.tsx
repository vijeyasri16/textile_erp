'use client';

import React, { useState } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  Flex
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import Link from 'next/link';

interface Employee {
  id: string;
  name: string;
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 'E001', name: 'John Doe' },
    { id: 'E002', name: 'Jane Smith' },
  ]);

  // Function to delete an employee
  const handleDelete = (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this employee?');
    if (confirmed) {
      setEmployees(employees.filter((employee) => employee.id !== id));
    }
  };

  return (
    <Box maxW="700px" mx="auto" mt={8} p={6} boxShadow="lg" borderRadius="md" bg="white">
      <Heading size="lg" textAlign="center" mb={6}>Employee List</Heading>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Employee ID</Th>
            <Th>Name</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {employees.map((employee) => (
            <Tr key={employee.id}>
              <Td>{employee.id}</Td>
              <Td>{employee.name}</Td>
              <Td>
                <IconButton
                  aria-label="Delete employee"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDelete(employee.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box mt={6} textAlign="center">
        
        <Link href="/domains" passHref>
          <Button colorScheme="teal" ml={2}>Exit</Button>
        </Link>
      </Box>
      
    </Box>
  );
};

export default EmployeeList;
