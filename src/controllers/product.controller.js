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

exports.updateProductById = async (req, res) => {
  const { productname, type, cc, price } = req.body;
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { productname, type, cc, price },
      { new: true, runValdators: true }
    );
    return res.json({ updateProduct });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error al actualizar el producto",
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.status(200).json({ deleteProduct });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error al eliminar el producto",
      error: error.message,
    });
  }
};
