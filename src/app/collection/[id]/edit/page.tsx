"use client"

import type React from "react"
import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Grid,
  Select,
  Radio,
  RadioGroup,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  HStack,
  Divider,
  Container,
  useToast,
} from "@chakra-ui/react"
import { AddIcon, DeleteIcon } from "@chakra-ui/icons"
import Link from "next/link"

// Define the proper type for params in Next.js 15
type Params = Promise<{ id: string }>

interface CollectionEditProps {
  params: Params
}

const CollectionEditPage: React.FC<CollectionEditProps> = ({ params }) => {
  const router = useRouter()
  const toast = useToast()

  // Unwrap params and properly type it
  const unwrappedParams = use(params) as { id: string }
  const id = unwrappedParams.id

  // Main form fields
  const [cVNo, setCVNo] = useState("")
  const [cDate, setCDate] = useState("")
  const [cReference, setCReference] = useState("")
  const [cCustomer, setCCustomer] = useState("")
  const [cPaymentMode, setCPaymentMode] = useState("")
  const [cCashAmount, setCCashAmount] = useState("")

  // Payment-specific fields
  const [cChequeNo, setCChequeNo] = useState("")
  const [cChequeIssueDate, setCChequeIssueDate] = useState("")
  const [cChequeBankDetails, setCChequeBankDetails] = useState("")
  const [cChequeAmount, setCChequeAmount] = useState("")

  const [cNEFTTransactionId, setCNEFTTransactionId] = useState("")
  const [cNEFTTransferDate, setCNEFTTransferDate] = useState("")
  const [cNEFTBankDetails, setCNEFTBankDetails] = useState("")
  const [cNEFTAmount, setCNEFTAmount] = useState("")

  const [cDDNo, setCDDNo] = useState("")
  const [cDDIssueDate, setCDDIssueDate] = useState("")
  const [cDDBankDetails, setCDDBankDetails] = useState("")
  const [cDDAmount, setCDDAmount] = useState("")

  // Items section
  const [collectionItems, setCollectionItems] = useState([
    {
      cSNo: 1,
      cBillNo: "",
      cBillAmount: "",
      cPrevCollected: "0",
      cPrevBalance: "0",
      cCurAmount: "",
      cCurBalance: "",
    },
  ])

  // Additional fields
  const [cUnAdjustAmt, setCUnAdjustAmt] = useState("")
  const [cNarration, setCNarration] = useState("")

  // Loading state
  const [isLoading, setIsLoading] = useState(true)

  // Fetch existing collection data
  useEffect(() => {
    const fetchCollectionDetails = async () => {
      try {
        const response = await fetch(`http://localhost:6660/collection/collection/${id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch collection details")
        }

        const data = await response.json()

        // Add this right after getting the data
        console.log("API Response:", data)

        // Populate form fields
        setCVNo(data.cVNo)
        setCDate(data.cDate.split("T")[0]) // Ensure date is in YYYY-MM-DD format
        setCReference(data.cReference || "")
        setCCustomer(data.cCustomer)
        setCPaymentMode(data.cPaymentMode)

        // Populate payment mode specific fields
        switch (data.cPaymentMode) {
          case "cash":
            setCCashAmount(data.cCashAmount || "")
            break
          case "cheque":
            setCChequeNo(data.cChequeNo || "")
            setCChequeIssueDate(data.cChequeIssueDate ? data.cChequeIssueDate.split("T")[0] : "")
            setCChequeBankDetails(data.cChequeBankDetails || "")
            setCChequeAmount(data.cChequeAmount || "")
            break
          case "neft":
            setCNEFTTransactionId(data.cNEFTTransactionId || "")
            setCNEFTTransferDate(data.cNEFTTransferDate ? data.cNEFTTransferDate.split("T")[0] : "")
            setCNEFTBankDetails(data.cNEFTBankDetails || "")
            setCNEFTAmount(data.cNEFTAmount || "")
            break
          case "dd":
            setCDDNo(data.cDDNo || "")
            setCDDIssueDate(data.cDDIssueDate ? data.cDDIssueDate.split("T")[0] : "")
            setCDDBankDetails(data.cDDBankDetails || "")
            setCDDAmount(data.cDDAmount || "")
            break
        }

        // Populate collection items
        if (data.collectionItems && Array.isArray(data.collectionItems)) {
          setCollectionItems(
            /* eslint-disable @typescript-eslint/no-explicit-any */
            data.collectionItems.map((item: any, index: number) => ({
              ...item,
              cSNo: index + 1,
            })),
          )
        } else {
          // Set default empty array if collectionItems is missing
          setCollectionItems([
            {
              cSNo: 1,
              cBillNo: "",
              cBillAmount: "",
              cPrevCollected: "0",
              cPrevBalance: "0",
              cCurAmount: "",
              cCurBalance: "",
            },
          ])
          console.warn("Collection items data is missing or not an array")
        }

        setCUnAdjustAmt(data.cUnAdjustAmt || "")
        setCNarration(data.cNarration || "")

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
        router.push("/collection")
      }
    }

    fetchCollectionDetails()
  }, [id, router, toast])

  // Add new collection item row
  const addCollectionItem = () => {
    setCollectionItems([
      ...collectionItems,
      {
        cSNo: collectionItems.length + 1,
        cBillNo: "",
        cBillAmount: "",
        cPrevCollected: "0",
        cPrevBalance: "0",
        cCurAmount: "",
        cCurBalance: "",
      },
    ])
  }

  // Remove collection item row
  const removeCollectionItem = (index: number) => {
    const updatedCollectionItems = collectionItems.filter((_, i) => i !== index)
    // Update serial numbers
    const reindexedCollectionItems = updatedCollectionItems.map((item, i) => ({
      ...item,
      cSNo: i + 1,
    }))
    setCollectionItems(reindexedCollectionItems)
  }

  // Update collection item field
  const updateCollectionItem = async (index: number, field: string, value: string) => {
    const updatedCollectionItems = [...collectionItems]

    // If bill number is changed, check for previous records
    if (field === "cBillNo") {
      try {
        // Fetch previous bill details if bill number exists
        const response = await fetch(`http://localhost:6660/collection/getBillDetails?billNo=${value}`)
        if (response.ok) {
          const billDetails = await response.json()
          updatedCollectionItems[index] = {
            ...updatedCollectionItems[index],
            [field]: value,
            // Only overwrite bill amount if it's not already manually set
            ...(updatedCollectionItems[index].cBillAmount === "" && {
              cBillAmount: billDetails.billAmount || "",
            }),
            cPrevCollected: billDetails.prevCollected || "0",
            cPrevBalance: billDetails.prevBalance || "0",
          }
        } else {
          // If no previous record, reset to default
          updatedCollectionItems[index] = {
            ...updatedCollectionItems[index],
            [field]: value,
            // Keep the manually entered bill amount if it exists
            ...(updatedCollectionItems[index].cBillAmount === "" && {
              cBillAmount: "",
            }),
            cPrevCollected: "0",
            cPrevBalance: "0",
          }
        }
      } catch (error) {
        console.error("Error fetching bill details:", error)
      }
    } else if (field === "cBillAmount") {
      // Allow manual entry of bill amount
      updatedCollectionItems[index] = {
        ...updatedCollectionItems[index],
        [field]: value,
      }
    } else if (field === "cCurAmount") {
      // Calculate Current Balance
      const billAmount = Number.parseFloat(updatedCollectionItems[index].cBillAmount) || 0
      const prevCollected = Number.parseFloat(updatedCollectionItems[index].cPrevCollected) || 0
      const curAmount = Number.parseFloat(value) || 0

      updatedCollectionItems[index] = {
        ...updatedCollectionItems[index],
        [field]: value,
        cCurBalance: (billAmount - prevCollected - curAmount).toFixed(2),
      }
    } else {
      updatedCollectionItems[index] = {
        ...updatedCollectionItems[index],
        [field]: value,
      }
    }

    setCollectionItems(updatedCollectionItems)
  }

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const collectionData = {
        id: id,
        cVNo,
        cDate,
        cReference,
        cCustomer,
        cPaymentMode,
        ...(cPaymentMode === "cash" && { cCashAmount }),
        ...(cPaymentMode === "cheque" && {
          cChequeNo,
          cChequeIssueDate,
          cChequeBankDetails,
          cChequeAmount,
        }),
        ...(cPaymentMode === "neft" && {
          cNEFTTransactionId,
          cNEFTTransferDate,
          cNEFTBankDetails,
          cNEFTAmount,
        }),
        ...(cPaymentMode === "dd" && {
          cDDNo,
          cDDIssueDate,
          cDDBankDetails,
          cDDAmount,
        }),
        collectionItems,
        cUnAdjustAmt,
        cNarration,
      }

      const response = await fetch(`http://localhost:6660/collection/collection/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(collectionData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Collection record updated successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
        router.push(`/collection/${id}`)
      } else {
        throw new Error("Failed to update Collection record")
      }
    } catch (error) {
      console.error("Error updating Collection record:", error)
      toast({
        title: "Error",
        description: "Unable to update collection record",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  // Render loading state
  if (isLoading) {
    return (
      <Container maxW="container.xl" py={6} textAlign="center">
        <Box>Loading...</Box>
      </Container>
    )
  }

  return (
    <Container maxW="container.xl" py={6}>
      <Heading as="h1" mb={6}>
        Edit Collection Entry
      </Heading>

      <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
        {/* Main information section */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mb={6}>
          <FormControl>
            <FormLabel>V.No:</FormLabel>
            <Input type="text" value={cVNo} onChange={(e) => setCVNo(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Date:</FormLabel>
            <Input type="date" value={cDate} onChange={(e) => setCDate(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Reference:</FormLabel>
            <Input type="text" value={cReference} onChange={(e) => setCReference(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Customer:</FormLabel>
            <Select placeholder="Select customer" value={cCustomer} onChange={(e) => setCCustomer(e.target.value)}>
              <option value="customer1">Customer 1</option>
              <option value="customer2">Customer 2</option>
              <option value="customer3">Customer 3</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Payment Mode:</FormLabel>
            <RadioGroup value={cPaymentMode} onChange={(value) => setCPaymentMode(value)}>
              <Stack direction="row">
                <Radio value="cash">Cash</Radio>
                <Radio value="cheque">Cheque</Radio>
                <Radio value="neft">NEFT</Radio>
                <Radio value="dd">DD</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* Conditional Payment Details */}
        {cPaymentMode === "cash" && (
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mb={6}>
            <FormControl>
              <FormLabel>Cash Amount:</FormLabel>
              <Input type="number" value={cCashAmount} onChange={(e) => setCCashAmount(e.target.value)} />
            </FormControl>
          </Grid>
        )}

        {cPaymentMode === "cheque" && (
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mb={6}>
            <FormControl>
              <FormLabel>Cheque No:</FormLabel>
              <Input type="text" value={cChequeNo} onChange={(e) => setCChequeNo(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Issue Date:</FormLabel>
              <Input type="date" value={cChequeIssueDate} onChange={(e) => setCChequeIssueDate(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Bank Details:</FormLabel>
              <Input type="text" value={cChequeBankDetails} onChange={(e) => setCChequeBankDetails(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Amount:</FormLabel>
              <Input type="number" value={cChequeAmount} onChange={(e) => setCChequeAmount(e.target.value)} />
            </FormControl>
          </Grid>
        )}

        {cPaymentMode === "neft" && (
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mb={6}>
            <FormControl>
              <FormLabel>Transaction ID/UTR No:</FormLabel>
              <Input type="text" value={cNEFTTransactionId} onChange={(e) => setCNEFTTransactionId(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Transfer Date:</FormLabel>
              <Input type="date" value={cNEFTTransferDate} onChange={(e) => setCNEFTTransferDate(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Bank Details:</FormLabel>
              <Input type="text" value={cNEFTBankDetails} onChange={(e) => setCNEFTBankDetails(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Amount:</FormLabel>
              <Input type="number" value={cNEFTAmount} onChange={(e) => setCNEFTAmount(e.target.value)} />
            </FormControl>
          </Grid>
        )}

        {cPaymentMode === "dd" && (
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mb={6}>
            <FormControl>
              <FormLabel>DD No:</FormLabel>
              <Input type="text" value={cDDNo} onChange={(e) => setCDDNo(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>DD Issue Date:</FormLabel>
              <Input type="date" value={cDDIssueDate} onChange={(e) => setCDDIssueDate(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Bank Details:</FormLabel>
              <Input type="text" value={cDDBankDetails} onChange={(e) => setCDDBankDetails(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Amount:</FormLabel>
              <Input type="number" value={cDDAmount} onChange={(e) => setCDDAmount(e.target.value)} />
            </FormControl>
          </Grid>
        )}

        <Divider my={6} />

        {/* Items section */}
        <Heading as="h3" size="md" mb={4}>
          Collection Items
        </Heading>
        <Box overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>S.No</Th>
                <Th>Bill No</Th>
                <Th>Bill Amount</Th>
                <Th>Prev Collected</Th>
                <Th>Prev Balance</Th>
                <Th>Cur Amount</Th>
                <Th>Cur Balance</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {collectionItems.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.cSNo}</Td>
                  <Td>
                    <Input
                      size="sm"
                      value={item.cBillNo}
                      onChange={(e) => updateCollectionItem(index, "cBillNo", e.target.value)}
                    />
                  </Td>
                  <Td>
                    <Input
                      size="sm"
                      value={item.cBillAmount}
                      onChange={(e) => updateCollectionItem(index, "cBillAmount", e.target.value)}
                    />
                  </Td>
                  <Td>
                    <Input
                      size="sm"
                      value={item.cPrevCollected}
                      onChange={(e) => updateCollectionItem(index, "cPrevCollected", e.target.value)}
                      disabled
                    />
                  </Td>
                  <Td>
                    <Input
                      size="sm"
                      value={item.cPrevBalance}
                      onChange={(e) => updateCollectionItem(index, "cPrevBalance", e.target.value)}
                      disabled
                    />
                  </Td>
                  <Td>
                    <Input
                      size="sm"
                      value={item.cCurAmount}
                      onChange={(e) => updateCollectionItem(index, "cCurAmount", e.target.value)}
                    />
                  </Td>
                  <Td>
                    <Input
                      size="sm"
                      value={item.cCurBalance}
                      onChange={(e) => updateCollectionItem(index, "cCurBalance", e.target.value)}
                      disabled
                    />
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Remove collection item"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      onClick={() => removeCollectionItem(index)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Button leftIcon={<AddIcon />} colorScheme="blue" size="sm" mt={4} onClick={addCollectionItem}>
          Add Collection Item
        </Button>

        {/* Additional Fields */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} mt={6}>
          <FormControl>
            <FormLabel>Un Adjust Amt:</FormLabel>
            <Input type="number" value={cUnAdjustAmt} onChange={(e) => setCUnAdjustAmt(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Narration:</FormLabel>
            <Input type="text" value={cNarration} onChange={(e) => setCNarration(e.target.value)} />
          </FormControl>
        </Grid>

        {/* Submit buttons */}
        <HStack spacing={4} justifyContent="center" mt={8}>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Update Collection Record
          </Button>
          <Link href="/collection" passHref>
            <Button colorScheme="teal">Cancel</Button>
          </Link>
        </HStack>
      </Box>
    </Container>
  )
}

export default CollectionEditPage

