'use client';

import React, { useEffect, useState } from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, Flex } from '@chakra-ui/react';
import Link from 'next/link';

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<{ id: string, name: string }[]>([]);

  useEffect(() => {
    fetch('http://localhost:6660/employees')
      .then(res => res.json())
      .then(setEmployees)
      .catch(console.error);
  }, []);

  return (
    <Box maxW="800px" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Employee List</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Employee ID</Th>
            <Th>Name</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {employees.map(employee => (
            <Tr key={employee.id}>
              <Td>{employee.id}</Td>
              <Td>{employee.name}</Td>
              <Td>
                <Link href={`/domains/employees/${employee.id}/edit`} passHref>
                  <Button colorScheme="yellow" size="sm" mr={2}>Edit</Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex justify="flex-end" mt={4}>
        <Link href="/domains/employees/new" passHref>
          <Button colorScheme="green">Add Employee</Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default EmployeeList;
