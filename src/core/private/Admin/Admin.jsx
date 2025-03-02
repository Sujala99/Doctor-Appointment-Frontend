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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get("http://localhost:4000/dashboard/dashboard/stats");
                setStats(response.data);
            } catch (error) {
                setError("Error fetching stats");
                console.error("Error fetching stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    // Pie chart data
    const pieData = {
        labels: ["Patients", "Doctors", "Admins"],
        datasets: [
            {
                data: [stats.patients, stats.doctors, stats.admins],
                backgroundColor: ["#36A2EB", "#FF5733", "#FFBD33"],
            },
        ],
    };

    // Bar chart data
    const barData = {
        labels: ["Patients", "Doctors", "Admins"],
        datasets: [
            {
                label: "User Count",
                data: [stats.patients, stats.doctors, stats.admins],
                backgroundColor: "#FF5733",
                borderColor: "#FF5733",
                borderWidth: 1,
            },
        ],
    };

    // Loading and error handling
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            {/* Sidebar */}
            <div style={{ width: "250px", height: "100vh", backgroundColor: "#333", color: "#fff", padding: "20px", position: "fixed" }}>
                {/* Sidebar Content */}
                <Sidebar />
            </div>

            {/* Main Dashboard Content */}
            <div style={{ flex: 1, marginLeft: "250px", padding: "20px" }}>
                <h2>Dashboard</h2>

                {/* Pie Chart */}
                <div style={{ maxWidth: "400px", marginBottom: "30px" }}>
                    <h3>User Roles Distribution (Pie Chart)</h3>
                    <Pie data={pieData} />
                </div>

                {/* Bar Chart */}
                <div style={{ maxWidth: "600px", marginBottom: "30px" }}>
                    <h3>User Roles Count (Bar Graph)</h3>
                    <Bar data={barData} />
                </div>
            </div>
        </div>
    );
};

export default Admin;
