// http://localhost:3000/components/productmanagement/inventorytransaction
'use client'

import React, { useState } from 'react';

const InventoryTransactions = () => {
  const [transactionDate, setTransactionDate] = useState('');
  const [transactionTime, setTransactionTime] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [transactionQuantity, setTransactionQuantity] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddTransaction = () => {
    const newTransaction = {
      date: transactionDate,
      time: transactionTime,
      product: selectedProduct,
      quantity: transactionQuantity,
    };

    if (isEditing) {
      // Si estamos en modo de edición, actualiza la transacción existente
      const updatedTransactions = transactions.map((transaction) =>
        transaction === editTransaction ? newTransaction : transaction
      );
      setTransactions(updatedTransactions);
      setIsEditing(false);
      setEditTransaction(null);
    } else {
      // Agrega una nueva transacción
      setTransactions([...transactions, newTransaction]);
    }

    // Limpiar los campos del formulario
    setTransactionDate('');
    setTransactionTime('');
    setSelectedProduct('');
    setTransactionQuantity('');
  };

  const handleEditTransaction = (transaction) => {
    // Llena el formulario con los datos de la transacción para editar
    setTransactionDate(transaction.date);
    setTransactionTime(transaction.time);
    setSelectedProduct(transaction.product);
    setTransactionQuantity(transaction.quantity);

    // Establece el modo de edición y rastrea la transacción a editar
    setIsEditing(true);
    setEditTransaction(transaction);
  };

  const handleDeleteTransaction = (transaction) => {
    // Elimina la transacción seleccionada
    const updatedTransactions = transactions.filter((t) => t !== transaction);
    setTransactions(updatedTransactions);

    // Si la transacción en modo de edición se elimina, sal de modo de edición
    if (editTransaction === transaction) {
      setIsEditing(false);
      setEditTransaction(null);
    }
  };

  const renderTransactionTable = () => {
    return (
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="p-2 border">Fecha</th>
            <th className="p-2 border">Hora</th>
            <th className="p-2 border">Producto</th>
            <th className="p-2 border">Cantidad</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td className="p-2 border">{transaction.date}</td>
              <td className="p-2 border">{transaction.time}</td>
              <td className="p-2 border">{transaction.product}</td>
              <td className="p-2 border">{transaction.quantity}</td>
              <td className="p-2 border">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded mr-2"
                  onClick={() => handleEditTransaction(transaction)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded"
                  onClick={() => handleDeleteTransaction(transaction)}
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
        {isEditing ? 'Editar Transacción' : 'Transacciones de Inventario'}
      </h1>
      <form className="mb-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            placeholder="Fecha"
            className="border p-2 bg-gray-600"
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
          />
          <input
            type="time"
            placeholder="Hora"
            className="border p-2 bg-gray-600"
            value={transactionTime}
            onChange={(e) => setTransactionTime(e.target.value)}
          />
          <select
            className="border p-2 bg-gray-600"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">Selecciona un producto</option>
            {/* Aquí puedes generar opciones dinámicas basadas en tus productos */}
            <option value="producto1">Producto 1</option>
            <option value="producto2">Producto 2</option>
            {/* ... */}
          </select>
          <input
            type="number"
            placeholder="Cantidad"
            className="border p-2 bg-gray-600"
            value={transactionQuantity}
            onChange={(e) => setTransactionQuantity(e.target.value)}
          />
          <button
            type="button"
            className={`${
              isEditing ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
            } text-white font-semibold py-2 px-4 rounded`}
            onClick={handleAddTransaction}
          >
            {isEditing ? 'Guardar Cambios' : 'Agregar Transacción'}
          </button>
        </div>
      </form>
      {renderTransactionTable()}
    </div>
  );
};

export default InventoryTransactions;
