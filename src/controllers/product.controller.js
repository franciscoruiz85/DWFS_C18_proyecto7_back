const Product = require("../models/product.model");
const stripe = require('stripe')(process.env.STRIPE_KEY);

exports.createProduct = async (req, res) => {
  const { productname, type, cc, price, description, image, currency, slug } = req.body;
  try {
    const stripeProduct = await stripe.products.create({
      name: productname,
      description,
      images: [image],
      metadata: {
        productDescription: description,
        slug
      }
    })

    const stripePrice = await stripe.prices.create({
      unit_amount: price,
      currency,
      product: stripeProduct.id
    })

    const newProduct = await Product.create({
      idProd: stripeProduct.id,
      priceID: stripePrice.id,
      productname,
      type,
      cc,
      price,
      description,
      image,
      slug,
      currency
    });
    return res.json({ newProduct });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error al crear el producto",
      error: error.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const Products = await Product.find({});
    return res.json({ Products });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error al consultar los productos",
      error: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Usar req.params.id
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.json(product);
  } catch (error) {
    console.log(error);
    return;
  }
};

exports.updateProductById = async (req, res) => {
  const { productname, type, cc, price, description, image, currency, slug } = req.body;
  try {
    await Product.findByIdAndUpdate(
      req.body.id,
      { productname, type, cc, price, description, image, currency, slug },
      { new: true }
    );
    return res.json({ msg: "Producto actualizado correctamente." });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error al actualizar el producto.",
      error: error.message
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ msg: "Producto no encontrado." });
    }
    return res.status(200).json({ msg: "Producto eliminado correctamente." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hubo un error al eliminar el producto.",
      error: error.message,
    });
  }
};
