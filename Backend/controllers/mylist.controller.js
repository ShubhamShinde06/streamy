import { listModel } from "../models/mylist.model.js";

export const addToList = async (req, res) => {
  try {
    const { userId, itemId, itemType } = req.body;

    // Validate itemType
    if (!["movie", "web_series"].includes(itemType)) {
      return res
        .status(400)
        .json({ message: "Invalid item type. Use 'movie' or 'web_series'." });
    }

    // Check if the item already exists in the user's list
    const existingItem = await listModel.findOne({ userId, itemId });
    if (existingItem) {
      return res
        .status(400)
        .json({ message: "Item already exists in your list." });
    }

    // Add item to the list
    const newItem = new listModel({
      userId,
      itemId,
      itemType,
    });

    await newItem.save();
    res
      .status(201)
      .json({ message: "Item added to list successfully", data: newItem });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getToList = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await listModel.find({ userId }).populate("itemId");

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User found", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteToList = async (req, res) => {
  try {
    const { saveId, userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find and delete the list item that matches both `id` and `userId`
    const list = await listModel.findOneAndDelete({ _id: saveId, userId });

    if (!list) {
      return res.status(404).json({
        success: false,
        message: "List not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "List deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting list:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
