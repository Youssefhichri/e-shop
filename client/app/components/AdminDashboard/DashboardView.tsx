import React from "react";
import BarChart from "./BarChart";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

type Customer = {
  email: string;
  name: string;
  address: string;
};

type Customers = {
  buyers: Customer[];
  sellers: Customer[];
};

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
};

type Order = {
  id: string;
  product: string;
  customer: string;
  quantity: number;
  total: number;
};

interface DashboardViewProps {
  customers: Customers;
  products: Product[];
  numberOfProducts: number;
  orders: Order[];
  handleViewChange: (view: string) => void;
}

const aggregateProductsByCategory = (products: Product[]) => {
  const categoryCount: { [key: string]: number } = {};

  products.forEach((product) => {
    if (categoryCount[product.category]) {
      categoryCount[product.category]++;
    } else {
      categoryCount[product.category] = 1;
    }
  });

  return categoryCount;
};

// Define DashboardView component
const DashboardView = ({
  customers,
  products,
  numberOfProducts,
  orders,
  handleViewChange,
}: DashboardViewProps) => {



  const totalCustomers = customers.buyers.length + customers.sellers.length;
  const totalOrders = orders.length;

  const topProductsByStock = products.sort((a, b) => b.stock - a.stock).slice(0, 5);

  const productCategories = aggregateProductsByCategory(products);
  const categoryLabels = Object.keys(productCategories);
  const categoryData = Object.values(productCategories);

  const barChartData = {
    labels: categoryLabels,
    datasets: [
      {
        
        data: categoryData,
        backgroundColor: "rgba(179, 178, 109)",
        borderColor: "rgba(179, 178, 109)",
        borderWidth: 1,
      },
    ],
  };

  const pieData = [
    { name: "Buyers", value: customers.buyers.length },
    { name: "Sellers", value: customers.sellers.length },
  ];
  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <>
      <header className="admin-header-dashboard">
        <h1 className="admin-main-title">Dashboard</h1>
        <div className="admin-stats">
          <div className="admin-stat-container">
            <h3>{totalCustomers}</h3>
            <p>Customers</p>
          </div>
          <div className="admin-stat-container">
            <h3>{numberOfProducts}</h3>
            <p>Products</p>
          </div>
          <div className="admin-stat-container">
            <h3>{totalOrders}</h3>
            <p>Orders</p>
          </div>
        </div>
      </header>
      <section className="admin-main-section">
        <div className="admin-top-stock">
          <div className="admin-top-stock-header">
            <h2 className="admin-red-title">Stock Leaders</h2>
            <button
              className="admin-see-more-button"
              onClick={() => handleViewChange("products")}
              style={{ marginLeft: 'auto' }}
            >
              See More
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>ID</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {topProductsByStock.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.id}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
        <section className="admin-role-stats-chart">
          <div className="admin-role-stats-header">
            <h3 className="admin-red-title">Role Stats</h3>
            <button
              className="admin-see-more-button admin-edge"
              onClick={() => handleViewChange("customers")}
            >
              See More
            </button>
          </div>
          <PieChart width={200} height={200}>
            <Pie
              data={pieData}
              cx={100}
              cy={100}
              innerRadius={50}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </section>
        <section className="admin-role-stats-chart">
          <div className="admin-role-stats-header">
            <h3 className="admin-red-title">Product Categories</h3>
          </div>
          <BarChart chartData={barChartData} chartTitle="Product Categories" />
        </section>
      </section>
    </>
  );
};

export default DashboardView;
