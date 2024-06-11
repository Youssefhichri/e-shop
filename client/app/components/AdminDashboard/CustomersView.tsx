"use client";
import React, { useState } from "react";
import ConfirmationWindow from "./ConfirmationWindow";

type Customer = {
  email: string;
  name: string;
  address: string;
  dateJoined: string;
};

type Customers = {
  buyers: Customer[];
  sellers: Customer[];
};

interface CustomersViewProps {
  customers: Customers;
  filter: string;
  setFilter: (filter: string) => void;
  searchEmail: string;
  setSearchEmail: (email: string) => void;
  deleteCustomer: (email: string) => void;
  switchUserRole: (email: string, newRole: string) => void;
}

const CustomersView = ({
  customers,
  filter,
  setFilter,
  searchEmail,
  setSearchEmail,
  deleteCustomer,
  switchUserRole,
}: CustomersViewProps) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchEmail(event.target.value);
  };

  const filteredCustomers = () => {
    const filteredSellers = customers.sellers.filter((seller) =>
      seller.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
    const filteredBuyers = customers.buyers.filter((buyer) =>
      buyer.email.toLowerCase().includes(searchEmail.toLowerCase())
    );

    switch (filter) {
      case "sellers":
        return { buyers: [], sellers: filteredSellers };
      case "buyers":
        return { buyers: filteredBuyers, sellers: [] };
      default:
        return { buyers: filteredBuyers, sellers: filteredSellers };
    }
  };

  const displayedCustomers = filteredCustomers();

  const handleDeleteClick = (email: string) => {
    setModalTitle("Confirmation Window");
    setModalMessage("Are you sure you want to delete this customer?");
    setConfirmAction(() => () => {
      deleteCustomer(email);
      setModalShow(false);
    });
    setModalShow(true);
  };

  const handleSwitchClick = (email: string, newRole: string) => {
    setModalTitle("Confirmation Window");
    setModalMessage(`Are you sure you want to switch this customer to ${newRole}?`);
    setConfirmAction(() => () => {
      switchUserRole(email, newRole);
      setModalShow(false);
    });
    setModalShow(true);
  };

  return (
    <section className="admin-customers-section">
      <h2>Customers</h2>
      <div className="admin-filters">
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="sellers">Sellers</option>
          <option value="buyers">Buyers</option>
        </select>
        <input
          type="text"
          placeholder="Search by email"
          value={searchEmail}
          onChange={handleSearchChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th style={{ width: "200px" }}>Action</th>
            <th>Role</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {displayedCustomers.sellers.map((seller) => (
            <tr key={seller.email}>
              <td className="action-buttons">
                <button onClick={() => handleDeleteClick(seller.email)}>
                  Delete
                </button>
                <button
                  className="switch-role"
                  onClick={() => handleSwitchClick(seller.email, "buyer")}
                >
                  Switch
                </button>
              </td>
              <td>Seller</td>
              <td>{seller.name}</td>
              <td>{seller.email}</td>
              <td>{seller.address}</td>
            </tr>
          ))}
          {displayedCustomers.buyers.map((buyer) => (
            <tr key={buyer.email}>
              <td className="action-buttons">
                <button onClick={() => handleDeleteClick(buyer.email)}>
                  Delete
                </button>
                <button
                  className="switch-role"
                  onClick={() => handleSwitchClick(buyer.email, "seller")}
                >
                  Switch
                </button>
              </td>
              <td>Buyer</td>
              <td>{buyer.name}</td>
              <td>{buyer.email}</td>
              <td>{buyer.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmationWindow
        show={modalShow}
        handleClose={() => setModalShow(false)}
        handleConfirm={confirmAction}
        title={modalTitle}
        message={modalMessage}
      />
    </section>
  );
};

export default CustomersView;
