"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConfirmationWindow from './ConfirmationWindow';

interface Order {
  id: string;
  username: string;
  nameOfproduct: string;
  category: string;
  total: number;
  status: string; // added status field to handle order confirmation
}

const OrdersView = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchCustomer, setSearchCustomer] = useState<string>('');
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalMessage, setModalMessage] = useState<string>('');
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/cart/orders', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const confirmOrder = async (orderId: string) => {
    try {
      await axios.patch(`http://localhost:8080/api/cart/orders/${orderId}/confirm`, {}, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      fetchOrders();
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  const rejectOrder = async (orderId: string) => {
    try {
      await axios.patch(`http://localhost:8080/api/cart/orders/${orderId}/reject`, {}, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      fetchOrders();
    } catch (error) {
      console.error('Error rejecting order:', error);
    }
  };

  const handleConfirmClick = (orderId: string) => {
    setModalTitle('Confirmation Window');
    setModalMessage('Are you sure you want to confirm this order?');
    setConfirmAction(() => () => {
      confirmOrder(orderId);
      setModalShow(false);
    });
    setModalShow(true);
  };

  const handleRejectClick = (orderId: string) => {
    setModalTitle('Confirmation Window');
    setModalMessage('Are you sure you want to reject this order?');
    setConfirmAction(() => () => {
      rejectOrder(orderId);
      setModalShow(false);
    });
    setModalShow(true);
  };

  const filteredOrders = orders.filter((order) =>
    order.username.toLowerCase().includes(searchCustomer.toLowerCase())
  );

  return (
    <div className="admin-orders-section">
      <h1>Orders</h1>
      <input
        type="text"
        placeholder="Search by customer name"
        value={searchCustomer}
        onChange={(e) => setSearchCustomer(e.target.value)}
        className="admin-orders-search-bar"
      />
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Category</th>
            <th>Total Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>
                <button
                  className="confirm-button"
                  onClick={() => handleConfirmClick(order.id)}
                >
                  Confirm
                </button>
                <button
                  className="reject-button"
                  onClick={() => handleRejectClick(order.id)}
                >
                  Reject
                </button>
              </td>
              <td>{order.username}</td>
              <td>{order.nameOfproduct}</td>
              <td>{order.category}</td>
              <td>{order.total}</td>
              <td>{order.status}</td>
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
    </div>
  );
};

export default OrdersView;
