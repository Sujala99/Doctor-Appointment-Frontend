import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import Sidebar from "../../../components/sidebar";

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Admin = () => {
  const [stats, setStats] = useState({
      patients: 0,
      doctors: 0,
      admins: 0,
  });
  const [genderStats, setGenderStats] = useState({
      male: 0,
      female: 0,
      other: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchStats = async () => {
          try {
              const statsResponse = await axios.get("http://localhost:4000/dashboard/dashboard/stats");
              const genderResponse = await axios.get("http://localhost:4000/dashboard/dashboard/genderbasis");

              setStats(statsResponse.data);
              setGenderStats(genderResponse.data);
          } catch (error) {
              setError("Error fetching stats");
              console.error("Error fetching stats", error);
          } finally {
              setLoading(false);
          }
      };
      fetchStats();
  }, []);

  const pieData = {
      labels: ["Patients", "Doctors", "Admins"],
      datasets: [
          {
              data: [stats.patients, stats.doctors, stats.admins],
              backgroundColor: ["#36A2EB", "#FF5733", "#FFBD33"],
          },
      ],
  };

  const barData = {
      labels: ["Patients", "Doctors", "Admins", "Male", "Female", "Other"],
      datasets: [
          {
              label: "User Count",
              data: [
                  stats.patients,
                  stats.doctors,
                  stats.admins,
                  genderStats.male,
                  genderStats.female,
                  genderStats.other,
              ],
              backgroundColor: [
                  "#FF5733", "#FF5733", "#FF5733", // Existing user roles
                  "#36A2EB", "#FFBD33", "#FF6F61", // Gender categories
              ],
              borderColor: [
                  "#FF5733", "#FF5733", "#FF5733", // Existing user roles
                  "#36A2EB", "#FFBD33", "#FF6F61", // Gender categories
              ],
              borderWidth: 1,
          },
      ],
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
      <div style={{ display: "flex", minHeight: "100vh", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row" }}>
          {/* Sidebar */}
          <div style={{ width: "250px", height: "100vh", backgroundColor: "#333", color: "#fff", padding: "20px", position: "fixed" }}>
              {/* Sidebar Content */}
              <Sidebar />
          </div>

          {/* Main Dashboard Content */}
          <div style={{ marginLeft: "250px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", width: "calc(100% - 250px)" }}>
              <h2>Dashboard</h2>

              {/* Pie Chart */}
              <div style={{ maxWidth: "500px", marginBottom: "30px" }}>
                  <h3>User Roles Distribution (Pie Chart)</h3>
                  <Pie data={pieData} />
              </div>

              {/* Bar Chart */}
              <div style={{ maxWidth: "700px", marginBottom: "30px" }}>
                  <h3>User Roles & Gender Count (Bar Graph)</h3>
                  <Bar data={barData} />
              </div>
          </div>
      </div>
  );
};

export default Admin;