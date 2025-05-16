"use client";
import { useState, useEffect } from "react";
import Navbar from "@/app/components/navbar";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from 'chart.js';

ChartJS.register(
    ArcElement, Tooltip, Legend,
    CategoryScale, LinearScale, PointElement, LineElement
);

export default function SystemHealth() {
    const [healthData, setHealthData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHealth = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/system-health');
                const data = await res.json();
                setHealthData(data);
            } catch (error) {
                toast.error("Failed to fetch system health");
            } finally {
                setLoading(false);
            }
        };

        fetchHealth();
        const interval = setInterval(fetchHealth, 10000);
        return () => clearInterval(interval);
    }, []);

    const cpuData = {
        labels: healthData?.cpuUsageHistory?.map((_, i) => `${i}s`) || [],
        datasets: [
            {
                label: 'CPU Usage %',
                data: healthData?.cpuUsageHistory || [],
                borderColor: '#00ff9d',
                backgroundColor: '#00ff9d33',
                tension: 0.3,
                fill: true,
                pointRadius: 0,
            }
        ]
    };

    const memoryData = {
        labels: ['Used', 'Free'],
        datasets: [
            {
                data: healthData ? [healthData.memory.used, healthData.memory.free] : [],
                backgroundColor: ['#ff4d4d', '#00ff9d'],
                borderWidth: 1,
                borderColor: '#1a1f2c',
            }
        ]
    };

    return (
        <div className="min-h-screen bg-[#1a1f2c] text-gray-100 font-sans">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Navbar />

            <main className="p-6 md:p-8 max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-8 text-center text-[#00ff9d] tracking-wide drop-shadow-md">
                    System Health Monitor
                </h1>

                {loading ? (
                    <p className="text-gray-400 text-center text-lg">Loading system data...</p>
                ) : !healthData ? (
                    <p className="text-red-500 text-center text-lg font-semibold">Failed to load health metrics.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                        <section className="p-6 border border-gray-700 rounded-lg bg-[#2c3e50] shadow-lg flex flex-col">
                            <h2 className="text-2xl mb-5 text-[#00ff9d] font-semibold drop-shadow-sm">
                                CPU Usage Over Time
                            </h2>
                            <Line data={cpuData} options={{
                                responsive: true,
                                plugins: {
                                    legend: { labels: { color: '#00ff9d' } },
                                    tooltip: { mode: 'index', intersect: false },
                                },
                                scales: {
                                    x: { ticks: { color: '#a0f0b0' }, grid: { color: '#2c3e50' } },
                                    y: {
                                        min: 0,
                                        max: 100,
                                        ticks: { color: '#a0f0b0', stepSize: 20 },
                                        grid: { color: '#2c3e50' },
                                    },
                                },
                            }} />
                        </section>

                        <section className="p-6 border border-gray-700 rounded-lg bg-[#2c3e50] shadow-lg flex flex-col items-center">
                            <h2 className="text-2xl mb-5 text-[#00ff9d] font-semibold drop-shadow-sm">
                                Memory Usage
                            </h2>
                            <div style={{ width: '200px', height: '200px' }}>
                                <Pie
                                    data={memoryData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: 'bottom',
                                                labels: { color: '#00ff9d', font: { size: 14 } },
                                            },
                                            tooltip: { enabled: true }
                                        }
                                    }}
                                />
                            </div>
                            <p className="mt-6 text-gray-400 text-center text-sm md:text-base leading-relaxed">
                                <strong>Total:</strong> {(healthData.memory.total / (1024 * 1024)).toFixed(2)} MB<br />
                                <strong>Used:</strong> {(healthData.memory.used / (1024 * 1024)).toFixed(2)} MB<br />
                                <strong>Free:</strong> {(healthData.memory.free / (1024 * 1024)).toFixed(2)} MB
                            </p>
                        </section>


                        <section className="p-6 border border-gray-700 rounded-lg bg-[#2c3e50] shadow-lg md:col-span-2">
                            <h2 className="text-2xl mb-5 text-[#00ff9d] font-semibold drop-shadow-sm">
                                Server Info
                            </h2>
                            <ul className="space-y-3 text-gray-300 text-lg md:text-xl">
                                <li><span className="font-medium text-[#00ff9d]">Uptime:</span> {healthData.uptime}13 seconds</li>
                                <li><span className="font-medium text-[#00ff9d]">CPU Cores:</span> {healthData.cores || healthData.cpuCores || 1}</li>
                                <li><span className="font-medium text-[#00ff9d]">Platform:</span> Linux</li>
                                <li><span className="font-medium text-[#00ff9d]">Disk Usage:</span> {healthData.disk.used} / {healthData.disk.total} GB</li>
                            </ul>
                        </section>

                    </div>
                )}
            </main>
        </div>
    );
}
