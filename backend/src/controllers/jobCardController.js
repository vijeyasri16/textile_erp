import * as jobCardModel from "../models/jobCardModel.js"

// Create a controller object with all the functions
const jobCardController = {
  // Get all job cards
  getAllJobCards: async (req, res) => {
    try {
      const jobCards = await jobCardModel.getAllJobCards();
      
      // Transform IDs to strings for frontend compatibility
      const formattedJobCards = jobCards.map(card => ({
        ...card,
        id: card.id.toString()
      }));
      
      res.status(200).json(formattedJobCards);
    } catch (error) {
      console.error('Error in getAllJobCards controller:', error);
      res.status(500).json({ message: 'Failed to fetch job cards', error: error.message });
    }
  },

  // Get a single job card by ID
  getJobCardById: async (req, res) => {
    try {
      const { id } = req.params;
      const jobCard = await jobCardModel.getJobCardById(id);
      
      if (!jobCard) {
        return res.status(404).json({ message: `Job card with ID ${id} not found` });
      }
      
      // Transform IDs to strings for frontend compatibility
      const formattedJobCard = {
        ...jobCard,
        id: jobCard.id.toString(),
        jcPreTreatmentDetails: jobCard.pretreatmentDetails.map(detail => ({
          ...detail,
          id: detail.id.toString()
        }))
      };
      
      res.status(200).json(formattedJobCard);
    } catch (error) {
      console.error(`Error in getJobCardById controller for ID ${req.params.id}:`, error);
      res.status(500).json({ message: 'Failed to fetch job card', error: error.message });
    }
  },

  createJobCard: async (req, res) => {
    try {
      const jobCardData = req.body;
      const newJobCard = await jobCardModel.createJobCard(jobCardData);
      
      // Transform IDs to strings for frontend compatibility
      const formattedJobCard = {
        ...newJobCard,
        id: newJobCard.id.toString(),
        jcPreTreatmentDetails: newJobCard.pretreatmentDetails.map(detail => ({
          ...detail,
          id: detail.id.toString()
        }))
      };
      
      res.status(201).json(formattedJobCard);
    } catch (error) {
      console.error('Error in createJobCard controller:', error);
      res.status(500).json({ message: 'Failed to create job card', error: error.message });
    }
  },

  // Update an existing job card
  updateJobCard: async (req, res) => {
    try {
      const { id } = req.params;
      const jobCardData = req.body;
      
      const updatedJobCard = await jobCardModel.updateJobCard(id, jobCardData);
      
      // Transform IDs to strings for frontend compatibility
      const formattedJobCard = {
        ...updatedJobCard,
        id: updatedJobCard.id.toString(),
        jcPreTreatmentDetails: updatedJobCard.pretreatmentDetails.map(detail => ({
          ...detail,
          id: detail.id.toString()
        }))
      };
      
      res.status(200).json(formattedJobCard);
    } catch (error) {
      console.error(`Error in updateJobCard controller for ID ${req.params.id}:`, error);
      res.status(500).json({ message: 'Failed to update job card', error: error.message });
    }
  },

  deleteJobCard: async (req, res) => {
    try {
      const { id } = req.params;
      await jobCardModel.deleteJobCard(id);
      res.status(200).json({ message: `Job card with ID ${id} deleted successfully` });
    } catch (error) {
      console.error(`Error in deleteJobCard controller for ID ${req.params.id}:`, error);
      res.status(500).json({ message: 'Failed to delete job card', error: error.message });
    }
  }
};

// Export the controller object
export { jobCardController };