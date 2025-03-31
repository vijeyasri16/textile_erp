'use client';

import React, { useState } from 'react';
import { Box, Flex, Heading, VStack, Button, IconButton, Text, Input } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Link from 'next/link';

export default function LabSectionsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [labEntryId, setLabEntryId] = useState('');
  const [dyeingPlanningId, setDyeingPlanningId] = useState('');
  const [jobCardId, setJobCardId] = useState('');


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Flex height="100vh" direction="column" position="relative">
      {/* Menu Button */}
      <Flex align="center" cursor="pointer" onClick={toggleSidebar} p={4} position="absolute" top={4} left={4} zIndex={20}>
        <IconButton aria-label="Toggle Menu" icon={<HamburgerIcon />} variant="ghost" />
        <Text ml={2} fontSize="lg" fontWeight="bold">Lab Menu</Text>
      </Flex>

      {/* Sidebar Overlay */}
      {isOpen && (
        <Box position="fixed" top={0} left={0} width="100vw" height="100vh" bg="rgba(0, 0, 0, 0.5)" zIndex={10} onClick={toggleSidebar} />
      )}

      {/* Sidebar with Scrollable Content */}
      {isOpen && (
        <Box position="fixed" top={0} left={0} width="250px" height="100vh" bg="gray.100" p={4} zIndex={20} overflowY="auto">
          <VStack spacing={4} align="stretch">
            {/* Lab Management Sections */}
            <Heading size="sm" mt={6} mb={2} color="gray.600">Lab Management</Heading>

            {/* Lab Entry Section */}
            <Heading size="xs" mt={4} mb={2} color="gray.500">Lab Entries</Heading>
            <Link href="/labentry" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start">Lab Entries List</Button>
            </Link>
            <Link href="/labentry/new" passHref>
              <Button width="full" colorScheme="green" justifyContent="flex-start">Create New Lab Entry</Button>
            </Link>
            <Input 
              placeholder="Enter Lab Entry ID"
              value={labEntryId}
              onChange={(e) => setLabEntryId(e.target.value)}
              size="sm"
            />
            <Link href={labEntryId ? `/labentry/${labEntryId}/edit` : '#'} passHref>
              <Button width="full" colorScheme="purple" justifyContent="flex-start" isDisabled={!labEntryId}>
                Edit Lab Entry
              </Button>
            </Link>

            {/* Dyeing Planning Section */}
            <Heading size="xs" mt={4} mb={2} color="gray.500">Dyeing Planning</Heading>
            <Link href="/dyeingplanning" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start">Dyeing Planning List</Button>
            </Link>
            <Link href="/dyeingplanning/new" passHref>
              <Button width="full" colorScheme="green" justifyContent="flex-start">Create New Dyeing Plan</Button>
            </Link>
            <Input 
              placeholder="Enter Dyeing Plan ID"
              value={dyeingPlanningId}
              onChange={(e) => setDyeingPlanningId(e.target.value)}
              size="sm"
            />
            <Link href={dyeingPlanningId ? `/dyeingplanning/${dyeingPlanningId}/edit` : '#'} passHref>
              <Button width="full" colorScheme="purple" justifyContent="flex-start" isDisabled={!dyeingPlanningId}>
                Edit Dyeing Plan
              </Button>
            </Link>

            {/* Job Card Section */}
            <Heading size="xs" mt={4} mb={2} color="gray.500">Job Card</Heading>
            <Link href="/jobcard" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start">Job Card List</Button>
            </Link>
            <Link href="/jobcard/new" passHref>
              <Button width="full" colorScheme="green" justifyContent="flex-start">Create New Job Card</Button>
            </Link>
            <Input 
              placeholder="Enter Job Card ID"
              value={jobCardId}
              onChange={(e) => setJobCardId(e.target.value)}
              size="sm"
            />
            <Link href={jobCardId ? `/jobcard/${jobCardId}/edit` : '#'} passHref>
              <Button width="full" colorScheme="purple" justifyContent="flex-start" isDisabled={!jobCardId}>
                Edit Job Card
              </Button>
            </Link>
            <Link href="/home" passHref>
              <Button width="full" colorScheme="blue" justifyContent="flex-start">Home</Button>
            </Link>

          </VStack>
        </Box>
      )}

      {/* Main Content */}
      <Flex flex={1} align="center" justify="center" bg="gray.50" height="100vh">
        <Heading size="2xl" color="gray.700">Lab Management System</Heading>
      </Flex>
    </Flex>
  );
}
