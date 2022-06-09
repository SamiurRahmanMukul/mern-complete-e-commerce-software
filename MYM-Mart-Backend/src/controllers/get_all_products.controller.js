const getAllProductsController = (req, res) => {
  res.status(200).json({ message: "Get all products successfully." });
};

module.exports = getAllProductsController;
