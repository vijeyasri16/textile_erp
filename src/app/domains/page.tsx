'use client';

import React, { useState } from 'react';
import { Box, Flex, Heading, VStack, Button, IconButton, Text, Input } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Link from 'next/link';

export default function DomainsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const [machineId, setMachineId] = useState('');
  const [fabricId, setFabricId] = useState('');
  const [employeeId, setEmployeeId] = useState(''); // State for Employee ID input

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Flex height="100vh" direction="column" position="relative">
      {/* Menu Button */}
      <Flex align="center" cursor="pointer" onClick={toggleSidebar} p={4} position="absolute" top={4} left={4} zIndex={20}>
        <IconButton aria-label="Toggle Menu" icon={<HamburgerIcon />} variant="ghost" />
        <Text ml={2} fontSize="lg" fontWeight="bold">Menu</Text>
      </Flex>

      {/* Sidebar Overlay */}
      {isOpen && (
        <Box position="fixed" top={0} left={0} width="100vw" height="100vh" bg="rgba(0, 0, 0, 0.5)" zIndex={10} onClick={toggleSidebar} />
      )}

      {/* Sidebar with Scrollable Content */}
      {isOpen && (
        <Box position="fixed" top={0} left={0} width="250px" height="100vh" bg="gray.100" p={4} zIndex={20} overflowY="auto">
          <VStack spacing={4} align="stretch">
            
            {/* Customer Management */}
            <Heading size="sm" mb={2} color="gray.600">Customer Management</Heading>
            <Link href="domains/customers" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start">Customer List</Button>
            </Link>
            <Link href="domains/customers/new" passHref>
              <Button width="full" colorScheme="green" justifyContent="flex-start">Add Customer</Button>
            </Link>
            <Input 
              placeholder="Enter Customer ID"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              size="sm"
            />
            <Link href={customerId ? `domains/customers/${customerId}/edit` : '#'} passHref>
              <Button width="full" colorScheme="yellow" justifyContent="flex-start" isDisabled={!customerId}>
                Update Customer
              </Button>
            </Link>

            {/* Supplier Management */}
            <Heading size="sm" mt={6} mb={2} color="gray.600">Supplier Management</Heading>
            <Link href="domains/suppliers" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start">Supplier List</Button>
            </Link>
            <Link href="domains/suppliers/new" passHref>
              <Button width="full" colorScheme="green" justifyContent="flex-start">Add Supplier</Button>
            </Link>
            <Input 
              placeholder="Enter Supplier ID"
              value={supplierId}
              onChange={(e) => setSupplierId(e.target.value)}
              size="sm"
            />
            <Link href={supplierId ? `domains/suppliers/${supplierId}/edit` : '#'} passHref>
              <Button width="full" colorScheme="yellow" justifyContent="flex-start" isDisabled={!supplierId}>
                Update Supplier
              </Button>
            </Link>

            {/* Machine Management */}
            <Heading size="sm" mt={6} mb={2} color="gray.600">Machine Management</Heading>
            <Link href="domains/machines" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start">Machine List</Button>
            </Link>
            <Link href="domains/machines/new" passHref>
              <Button width="full" colorScheme="green" justifyContent="flex-start">Add Machine</Button>
            </Link>
            <Input 
              placeholder="Enter Machine ID"
              value={machineId}
              onChange={(e) => setMachineId(e.target.value)}
              size="sm"
            />
            <Link href={machineId ? `domains/machines/${machineId}/edit` : '#'} passHref>
              <Button width="full" colorScheme="yellow" justifyContent="flex-start" isDisabled={!machineId}>
                Update Machine
              </Button>
            </Link>

            {/* Fabric Management */}
            <Heading size="sm" mt={6} mb={2} color="gray.600">Fabric Management</Heading>
            <Link href="domains/fabrics" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start">Fabric List</Button>
            </Link>
            <Link href="domains/fabrics/new" passHref>
              <Button width="full" colorScheme="green" justifyContent="flex-start">Add Fabric</Button>
            </Link>
            <Input 
              placeholder="Enter Fabric ID"
              value={fabricId}
              onChange={(e) => setFabricId(e.target.value)}
              size="sm"
            />
            <Link href={fabricId ? `domains/fabrics/${fabricId}/edit` : '#'} passHref>
              <Button width="full" colorScheme="yellow" justifyContent="flex-start" isDisabled={!fabricId}>
                Update Fabric
              </Button>
            </Link>

            {/* Employee Management */}
            <Heading size="sm" mt={6} mb={2} color="gray.600">Employee Management</Heading>
            <Link href="domains/employees" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start">Employee List</Button>
            </Link>
            <Link href="domains/employees/new" passHref>
              <Button width="full" colorScheme="green" justifyContent="flex-start">Add Employee</Button>
            </Link>
            <Input 
              placeholder="Enter Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              size="sm"
            />
            <Link href={employeeId ? `domains/employees/${employeeId}/edit` : '#'} passHref>
              <Button width="full" colorScheme="yellow" justifyContent="flex-start" isDisabled={!employeeId}>
                Update Employee
              </Button>
            </Link>

          </VStack>
        </Box>
      )}

      {/* Main Content */}
      <Flex flex={1} align="center" justify="center" bg="gray.50" height="100vh">
        <Heading size="2xl" color="gray.700">Domains Navigation</Heading>
      </Flex>
    </Flex>
  );
}
