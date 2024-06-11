"use client"
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import DashboardView from './DashboardView';
import CustomersView from './CustomersView';
import ProductsView from './ProductsView';
import OrdersView from './OrdersView';
import ConfirmationWindow from './ConfirmationWindow';
import '../../CSS/adminDashboard.css';
import BarChart from "./BarChart";

type Customer = {
  email: string;
  role: string;
};

type Customers = {
  buyers: Customer[];
  sellers: Customer[];
};

type Product = {
  name: string;
  id: string;
};

type Order = {
  id: string;
  products: Product[];
};

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'customers' | 'products' | 'orders'>('dashboard');
  const [customers, setCustomers] = useState<Customers>({ buyers: [], sellers: [] });
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [searchEmail, setSearchEmail] = useState<string>('');
  const [searchProductId, setSearchProductId] = useState<string>('');
  const [numberOfProducts, setNumberOfProducts] = useState<number>(0);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalMessage, setModalMessage] = useState<string>('');
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

  const handleViewChange = (view: 'dashboard' | 'customers' | 'products' | 'orders') => {
    setCurrentView(view);
    if (view === 'customers') {
      fetchCustomers();
    } else if (view === 'products') {
      fetchProducts();
    } else if (view === 'orders') {
      fetchOrders();
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users/getAll', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("couldn't retrieve customers list", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products/getAll', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      setProducts(data);
      setNumberOfProducts(data.length);
    } catch (error) {
      console.error("couldn't retrieve products list", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/cart/orders', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("couldn't retrieve orders list", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
    fetchOrders();
  }, []);

  const deleteCustomer = async (email: string) => {
    try {
      await fetch(`http://localhost:8080/api/users/delete/${email}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const deleteProduct = async (name: string) => {
    try {
      await fetch(`http://localhost:8080/api/products/del/${name}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const switchUserRole = async (email: string, newRole: string) => {
    try {
      await fetch('http://localhost:8080/api/users/change-role', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({ email, newRole }),
      });
      fetchCustomers();
    } catch (error) {
      console.error('Error switching user role:', error);
    }
  };

  const handleDeleteClick = (email: string) => {
    setModalTitle('Confirmation Window');
    setModalMessage('Are you sure you want to delete this customer?');
    setConfirmAction(() => () => {
      deleteCustomer(email);
      setModalShow(false);
    });
    setModalShow(true);
  };

  const handleSwitchClick = (email: string, newRole: string) => {
    setModalTitle('Confirmation Window');
    setModalMessage(`Are you sure you want to switch this customer to ${newRole}?`);
    setConfirmAction(() => () => {
      switchUserRole(email, newRole);
      setModalShow(false);
    });
    setModalShow(true);
  };

  const handleDeleteProductClick = (name: string) => {
    setModalTitle('Confirmation Window');
    setModalMessage('Are you sure you want to delete this product?');
    setConfirmAction(() => () => {
      deleteProduct(name);
      setModalShow(false);
    });
    setModalShow(true);
  };

  // added logout function in the admin dashboard 
  const logOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    
    <div className="admin-dashboard">
     
      <Sidebar handleViewChange={handleViewChange} />
      
      <main className="admin-main-content">
      <div className="admin-logout-button" onClick={logOut}> 
        Logout
      </div>
        {currentView === 'dashboard' && (
          <DashboardView
            customers={customers}
            products={products}
            numberOfProducts={numberOfProducts}
            orders={orders}
            handleViewChange={handleViewChange}
          />
        )}
        {currentView === 'customers' && (
          <CustomersView
            customers={customers}
            filter={filter}
            setFilter={setFilter}
            searchEmail={searchEmail}
            setSearchEmail={setSearchEmail}
            deleteCustomer={handleDeleteClick}
            switchUserRole={handleSwitchClick}
          />
        )}
        {currentView === 'products' && (
          <ProductsView
            products={products}
            searchProductId={searchProductId}
            setSearchProductId={setSearchProductId}
            deleteProduct={handleDeleteProductClick}
          />
        )}
        {currentView === 'orders' && (
          <OrdersView orders={orders} />
        )}
      </main>
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

export default AdminDashboard;
