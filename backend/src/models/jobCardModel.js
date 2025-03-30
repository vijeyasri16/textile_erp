import prisma from "../config/db.js";

// Get all job cards
export const getAllJobCards = async () => {
  try {
    const jobCards = await prisma.jobCard.findMany({
      select: {
        id: true,
        jcDate: true,
        jcCustomer: true,
        jcBatchNo: true,
        jcJobCardCompletion: true,
        jcJobCardIssued: true
      }
    });
    return jobCards;
  } catch (error) {
    console.error('Error fetching job cards:', error);
    throw error;
  }
};

// Get a single job card by ID
export const getJobCardById = async (id) => {
  try {
    const jobCard = await prisma.jobCard.findUnique({
      where: { id: parseInt(id) },
      include: {
        pretreatmentDetails: {
          orderBy: {
            jcSNo: 'asc'
          }
        }
      }
    });
    return jobCard;
  } catch (error) {
    console.error(`Error fetching job card with ID ${id}:`, error);
    throw error;
  }
};

// Create a new job card
export const createJobCard = async (jobCardData) => {
  try {
    const { jcPreTreatmentDetails, ...jobCardInfo } = jobCardData;
    
    const newJobCard = await prisma.jobCard.create({
      data: {
        ...jobCardInfo,
        pretreatmentDetails: {
          create: jcPreTreatmentDetails.map(detail => ({
            jcSNo: detail.jcSNo,
            jcPretreatment: detail.jcPretreatment,
            jcItem: detail.jcItem,
            jcRequiredQty: detail.jcRequiredQty,
            jcTemperature: detail.jcTemperature,
            jcTime: detail.jcTime,
            jcStartTime: detail.jcStartTime,
            jcFinishTime: detail.jcFinishTime,
            jcDosingAndSteamTime: detail.jcDosingAndSteamTime
          }))
        }
      },
      include: {
        pretreatmentDetails: true
      }
    });
    
    return newJobCard;
  } catch (error) {
    console.error('Error creating job card:', error);
    throw error;
  }
};

// Update an existing job card
export const updateJobCard = async (id, jobCardData) => {
  try {
    const { jcPreTreatmentDetails, ...jobCardInfo } = jobCardData;
    
    // First, delete all existing pretreatment details for this job card
    await prisma.preTreatmentDetail.deleteMany({
      where: { jobCardId: parseInt(id) }
    });
    
    // Then update the job card and create new pretreatment details
    const updatedJobCard = await prisma.jobCard.update({
      where: { id: parseInt(id) },
      data: {
        ...jobCardInfo,
        pretreatmentDetails: {
          create: jcPreTreatmentDetails.map(detail => ({
            jcSNo: detail.jcSNo,
            jcPretreatment: detail.jcPretreatment,
            jcItem: detail.jcItem,
            jcRequiredQty: detail.jcRequiredQty,
            jcTemperature: detail.jcTemperature,
            jcTime: detail.jcTime,
            jcStartTime: detail.jcStartTime,
            jcFinishTime: detail.jcFinishTime,
            jcDosingAndSteamTime: detail.jcDosingAndSteamTime
          }))
        }
      },
      include: {
        pretreatmentDetails: true
      }
    });
    
    return updatedJobCard;
  } catch (error) {
    console.error(`Error updating job card with ID ${id}:`, error);
    throw error;
  }
};

// Delete a job card
export const deleteJobCard = async (id) => {
  try {
    // The pretreatment details will be automatically deleted due to the cascade delete
    const deletedJobCard = await prisma.jobCard.delete({
      where: { id: parseInt(id) }
    });
    
    return deletedJobCard;
  } catch (error) {
    console.error(`Error deleting job card with ID ${id}:`, error);
    throw error;
  }
};