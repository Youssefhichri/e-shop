import React, { useState } from "react";

interface ProductsViewProps {
  products: {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
  }[];
  searchProductId: string;
  setSearchProductId: React.Dispatch<any>; 
  deleteProduct: (productName: string) => void;
}

const ProductsView = ({
  products,
  searchProductId,
  setSearchProductId,
  deleteProduct,
}: ProductsViewProps) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProductId(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.id.toString().toLowerCase().includes(searchProductId.toLowerCase())
  );

  return (
    <section className="admin-products-section">
      <h2>Products</h2>
      <input
        type="text"
        placeholder="Search by product ID"
        value={searchProductId}
        onChange={handleSearchChange}
        className="admin-products-search-bar"
      />
      <table>
        <thead>
          <tr>
            <th style={{ width: "100px" }}>Action</th>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <button onClick={() => deleteProduct(product.name)}>
                  Delete
                </button>
              </td>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ProductsView;
