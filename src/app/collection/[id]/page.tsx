"use client"

import type React from "react"
import { useState, useEffect, use } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
  GridItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Spinner,
  useToast,
} from "@chakra-ui/react"
import { EditIcon, ArrowBackIcon } from "@chakra-ui/icons"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Define the proper type for params in Next.js 15
type Params = Promise<{ id: string }>

interface CollectionDetail {
  id: string
  cVNo: string
  cDate: string
  cReference: string
  cCustomer: string
  cPaymentMode: string
  cTotalAmount: number
  cUnAdjustAmt: number
  cNarration: string

  // Payment specific details
  cCashAmount?: number
  cChequeNo?: string
  cChequeIssueDate?: string
  cChequeBankDetails?: string
  cChequeAmount?: number

  cNEFTTransactionId?: string
  cNEFTTransferDate?: string
  cNEFTBankDetails?: string
  cNEFTAmount?: number

  cDDNo?: string
  cDDIssueDate?: string
  cDDBankDetails?: string
  cDDAmount?: number

  collectionItems: {
    cSNo: number
    cBillNo: string
    cBillAmount: number
    cPrevCollected: number
    cPrevBalance: number
    cCurAmount: number
    cCurBalance: number
  }[]
}

interface CollectionDetailPageProps {
  params: Params
}

const CollectionDetailPage: React.FC<CollectionDetailPageProps> = ({ params }) => {
  const [collection, setCollection] = useState<CollectionDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()
  const router = useRouter()

  // Unwrap params and properly type it
  const unwrappedParams = use(params) as { id: string }
  const id = unwrappedParams.id
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchCollectionDetail()
  }, [id])

  const fetchCollectionDetail = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`http://localhost:6660/collection/collection/${id}`)

      if (!response.ok) {
        throw new Error("Failed to fetch collection details")
      }

      const data = await response.json()

      // Add this right after getting the data
      console.log("API Response:", data)

      // Make sure collectionItems exists
      if (!data.collectionItems) {
        data.collectionItems = []
        console.warn("Collection items data is missing")
      }

      setCollection(data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching collection details:", error)
      toast({
        title: "Error",
        description: "Unable to fetch collection details",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      setIsLoading(false)
      router.push("/collection")
    }
  }

  const renderPaymentDetails = () => {
    if (!collection) return null

    switch (collection.cPaymentMode) {
      case "cash":
        return (
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <Text fontWeight="bold">Cash Amount:</Text>
              <Text>{collection.cCashAmount?.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</Text>
            </GridItem>
          </Grid>
        )
      case "cheque":
        return (
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <Text fontWeight="bold">Cheque No:</Text>
              <Text>{collection.cChequeNo}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Issue Date:</Text>
              <Text>
                {collection.cChequeIssueDate ? new Date(collection.cChequeIssueDate).toLocaleDateString() : "N/A"}
              </Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Bank Details:</Text>
              <Text>{collection.cChequeBankDetails}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Cheque Amount:</Text>
              <Text>{collection.cChequeAmount?.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</Text>
            </GridItem>
          </Grid>
        )
      case "neft":
        return (
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <Text fontWeight="bold">Transaction ID/UTR No:</Text>
              <Text>{collection.cNEFTTransactionId}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Transfer Date:</Text>
              <Text>
                {collection.cNEFTTransferDate ? new Date(collection.cNEFTTransferDate).toLocaleDateString() : "N/A"}
              </Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Bank Details:</Text>
              <Text>{collection.cNEFTBankDetails}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">NEFT Amount:</Text>
              <Text>{collection.cNEFTAmount?.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</Text>
            </GridItem>
          </Grid>
        )
      case "dd":
        return (
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <Text fontWeight="bold">DD No:</Text>
              <Text>{collection.cDDNo}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">DD Issue Date:</Text>
              <Text>{collection.cDDIssueDate ? new Date(collection.cDDIssueDate).toLocaleDateString() : "N/A"}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Bank Details:</Text>
              <Text>{collection.cDDBankDetails}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">DD Amount:</Text>
              <Text>{collection.cDDAmount?.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</Text>
            </GridItem>
          </Grid>
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={6} textAlign="center">
        <Spinner size="xl" />
      </Container>
    )
  }

  if (!collection) {
    return null
  }

  return (
    <Container maxW="container.xl" py={6}>
      <VStack spacing={6} align="stretch">
        <HStack justifyContent="space-between" alignItems="center">
          <Heading as="h1">Collection Details</Heading>
          <HStack>
            <Link href="/collection" passHref>
              <Button leftIcon={<ArrowBackIcon />} colorScheme="gray">
                Back to Collections
              </Button>
            </Link>
            <Link href={`/collection/edit/${collection.id}`} passHref>
              <Button leftIcon={<EditIcon />} colorScheme="blue">
                Edit Collection
              </Button>
            </Link>
          </HStack>
        </HStack>

        {/* Basic Collection Information */}
        <Box borderWidth="1px" borderRadius="lg" p={6}>
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            <GridItem>
              <Text fontWeight="bold">V.No:</Text>
              <Text>{collection.cVNo}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Date:</Text>
              <Text>{new Date(collection.cDate).toLocaleDateString()}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Reference:</Text>
              <Text>{collection.cReference || "N/A"}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Customer:</Text>
              <Text>{collection.cCustomer}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Payment Mode:</Text>
              <Text>{collection.cPaymentMode.toUpperCase()}</Text>
            </GridItem>
          </Grid>
        </Box>

        {/* Payment Details */}
        <Box borderWidth="1px" borderRadius="lg" p={6}>
          <Heading as="h3" size="md" mb={4}>
            Payment Details
          </Heading>
          {renderPaymentDetails()}
        </Box>

        {/* Collection Items */}
        <Box borderWidth="1px" borderRadius="lg" p={6}>
          <Heading as="h3" size="md" mb={4}>
            Collection Items
          </Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>S.No</Th>
                <Th>Bill No</Th>
                <Th>Bill Amount</Th>
                <Th>Prev Collected</Th>
                <Th>Prev Balance</Th>
                <Th>Cur Amount</Th>
                <Th>Cur Balance</Th>
              </Tr>
            </Thead>
            <Tbody>
              {collection.collectionItems && collection.collectionItems.length > 0 ? (
                collection.collectionItems.map((item) => (
                  <Tr key={item.cSNo}>
                    <Td>{item.cSNo}</Td>
                    <Td>{item.cBillNo}</Td>
                    <Td>{item.cBillAmount.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</Td>
                    <Td>{item.cPrevCollected.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</Td>
                    <Td>{item.cPrevBalance.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</Td>
                    <Td>{item.cCurAmount.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</Td>
                    <Td>{item.cCurBalance.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={7} textAlign="center">
                    No collection items found
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>

        {/* Additional Details */}
        <Box borderWidth="1px" borderRadius="lg" p={6}>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <Text fontWeight="bold">Un Adjust Amt:</Text>
              <Text>
                {collection.cUnAdjustAmt?.toLocaleString("en-IN", { style: "currency", currency: "INR" }) || "N/A"}
              </Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Narration:</Text>
              <Text>{collection.cNarration || "N/A"}</Text>
            </GridItem>
          </Grid>
        </Box>
      </VStack>
    </Container>
  )
}

export default CollectionDetailPage

