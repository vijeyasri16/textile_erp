'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  VStack,
  Button,
  IconButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Link from 'next/link';

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      setIsLoggedIn(true);
      setUserName(sessionStorage.getItem('employeeName') || '');
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('employeeId');
    sessionStorage.removeItem('employeeName');
    setIsLoggedIn(false);
    setUserName('');
  };

  return (
    <Flex height="100vh" direction="column" position="relative">
      <Box pt={16} px={6} flex={1} bg="gray.50">

        {isLoggedIn ? (
          <Text fontSize="xl">Welcome to your dashboard, {userName}!</Text>
        ) : (
          <Flex direction="column" align="center" justify="center" pt={12}>
            <Heading size="lg" mb={6} color="gray.600" textAlign="center">
              Welcome to the ERP System
            </Heading>
            <Text fontSize="xl" mb={10} textAlign="center" maxW="700px">
              Please log in as an admin or employee to access your dashboard.
            </Text>
            <Flex direction={{ base: "column", md: "row" }} gap={4}>
              <Link href="/login/adminlogin" passHref>
                <Button size="lg" colorScheme="blue" width={{ base: "full", md: "auto" }}>Admin Login</Button>
              </Link>
              <Link href="/login/emplogin" passHref>
                <Button size="lg" colorScheme="green" width={{ base: "full", md: "auto" }}>Employee Login</Button>
              </Link>
            </Flex>
          </Flex>
        )}
      </Box>
    </Flex>
  );
}
