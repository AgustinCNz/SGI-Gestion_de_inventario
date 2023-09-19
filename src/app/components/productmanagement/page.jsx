// http://localhost:3000/components/productmanagement
'use client'
import React, { useState } from 'react';
import InventoryTransactions from './inventorytransaction/page';

const ProductManagement = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [initialStock, setInitialStock] = useState('');
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null); // Estado para rastrear el producto en modo de edición
  const [isEditing, setIsEditing] = useState(false);

  const handleAddProduct = () => {
    const newProduct = {
      name: productName,
      description: productDescription,
      purchasePrice: purchasePrice,
      salePrice: salePrice,
      initialStock: initialStock,
    };

    if (isEditing) {
      // Si estamos en modo de edición, actualiza el producto existente
      const updatedProducts = products.map((product) =>
        product === editProduct ? newProduct : product
      );
      setProducts(updatedProducts);
      setIsEditing(false);
      setEditProduct(null);
    } else {
      // Agrega un nuevo producto
      setProducts([...products, newProduct]);
    }

    // Limpiar los campos del formulario
    setProductName('');
    setProductDescription('');
    setPurchasePrice('');
    setSalePrice('');
    setInitialStock('');
  };

  const handleEditProduct = (product) => {
    // Llena el formulario con los datos del producto para editar
    setProductName(product.name);
    setProductDescription(product.description);
    setPurchasePrice(product.purchasePrice);
    setSalePrice(product.salePrice);
    setInitialStock(product.initialStock);

    // Establece el modo de edición y rastrea el producto a editar
    setIsEditing(true);
    setEditProduct(product);
  };

  const handleDeleteProduct = (product) => {
    // Elimina el producto seleccionado
    const updatedProducts = products.filter((p) => p !== product);
    setProducts(updatedProducts);

    // Si el producto en modo de edición se elimina, sal de modo de edición
    if (editProduct === product) {
      setIsEditing(false);
      setEditProduct(null);
    }
  };

  const renderProductTable = () => {
    return (

      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Descripción</th>
            <th className="p-2 border">Precio de Compra</th>
            <th className="p-2 border">Precio de Venta</th>
            <th className="p-2 border">Stock Inicial</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td className="p-2 border">{product.name}</td>
              <td className="p-2 border">{product.description}</td>
              <td className="p-2 border">{product.purchasePrice}</td>
              <td className="p-2 border">{product.salePrice}</td>
              <td className="p-2 border">{product.initialStock}</td>
              <td className="p-2 border">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded mr-2"
                  onClick={() => handleEditProduct(product)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded"
                  onClick={() => handleDeleteProduct(product)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">
        {isEditing ? 'Editar Producto' : 'Gestión de Productos'}
      </h1>
      <form className="mb-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre del producto"
            className="border p-2 bg-gray-600"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descripción"
            className="border p-2 bg-gray-600"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Precio de Compra"
            className="border p-2 bg-gray-600"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Precio de Venta"
            className="border p-2 bg-gray-600"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Stock Inicial"
            className="border p-2 bg-gray-600"
            value={initialStock}
            onChange={(e) => setInitialStock(e.target.value)}
          />
          <button
            type="button"
            className={`${
              isEditing ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
            } text-white font-semibold py-2 px-4 rounded`}
            onClick={handleAddProduct}
          >
            {isEditing ? 'Guardar Cambios' : 'Agregar Producto'}
          </button>
        </div>
      </form>
      {renderProductTable()}
    </div>
  );
};

export default ProductManagement;
