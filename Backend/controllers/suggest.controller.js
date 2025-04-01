import { suggestModel } from "../models/suggest.model.js";

export const addSuggest = async (req, res) => {
    try {
        
        const {userId,title} = req.body

        const newItem = new suggestModel({
            userId,
            title
        })

        await newItem.save()

        res.status(201).json({
            message: "Rquest added",
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getUserSuggest = async (req, res) => {
    try {
        const { userId } = req.params; // Ensure userId is extracted from params

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const suggestions = await suggestModel.find({ userId }).sort({ createdAt: -1 })

        if (suggestions.length === 0) {
            return res.status(404).json({ success: false, message: "No suggestions found for this user" });
        }

        res.status(200).json({ success: true, message: "Suggestions found", data: suggestions });

    } catch (error) {
        console.error("Error fetching user suggestions:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const getSuggest = async (req, res) => {
    try {
        
        const suggestions = await suggestModel.find().sort({ createdAt: -1 })

        if(!suggestions){
            return res.json({
                message:"not found!"
            })
        }

        res.status(200).json({
            data: suggestions,
            success: true
        })

    } catch (error) {
        console.error("Error fetching user suggestions:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

export const deleteSuggest = async (req, res) => {
  try {
    const { itemId } = req.body;

    const suggest = await suggestModel.findByIdAndDelete(itemId);

    if (!suggest) {
      res.json({
        success: false,
        error: true,
        message: "suggest not found!",
      });
    }

    res.json({
      success: true,
      message: "suggest deleted",
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
