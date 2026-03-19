"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  FileText, 
  Settings, 
  LayoutDashboard, 
  PlusCircle, 
  Download,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Student {
  id: string;
  name: string;
  email: string;
  contact: string | null;
  whatsapp: string | null;
  createdAt: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  useEffect(() => {
    if (activeTab === "students") {
      fetchStudents();
    }
  }, [activeTab]);

  const fetchStudents = async () => {
    setLoadingStudents(true);
    try {
      const res = await fetch("/api/admin/students");
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
      }
    } catch (error) {
      console.error("Failed to fetch students", error);
    } finally {
      setLoadingStudents(false);
    }
  };

  const sidebarItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "students", label: "Manage Students", icon: Users },
    { id: "paragraphs", label: "Typing Paragraphs", icon: FileText },
    { id: "branding", label: "Institute Branding", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 relative">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-6 space-y-8 transform transition-transform duration-300 lg:relative lg:translate-x-0 h-full",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold text-xs" />
            <h2 className="font-bold text-lg">Admin Panel</h2>
          </div>
          <button className="lg:hidden text-zinc-500 hover:text-brand-primary" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-sm",
                activeTab === item.id 
                  ? "bg-brand-primary/10 text-brand-primary" 
                  : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 overflow-x-hidden p-6 md:p-10 w-full">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden p-2 rounded-lg bg-white border border-zinc-200 text-zinc-600 hover:text-brand-primary"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
              <div>
                <h1 className="text-3xl font-bold capitalize">{activeTab}</h1>
                <p className="text-zinc-500 text-sm md:text-base">Manage your institute and students here.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 self-end md:self-auto">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-bold shadow-sm">
                <Download size={16} />
                Export CSV
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-primary text-white text-sm font-bold shadow-lg shadow-orange-500/20">
                <PlusCircle size={16} />
                Add Student
              </button>
            </div>
          </header>

          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden min-h-[500px]">
            {activeTab === "overview" && (
              <div className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                  <StatCard label="Total Students" value={students.length > 0 ? students.length.toString() : "Loading..."} />
                  <StatCard label="Avg. WPM" value="42.5" />
                  <StatCard label="Tests Completed" value="1,892" />
                </div>
                
                <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 hidden sm:block" />
                        <div>
                          <p className="font-bold text-sm sm:text-base">Student Name #{i}</p>
                          <p className="text-xs text-zinc-500">English Typing Test • 2 mins ago</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-bold text-brand-primary text-sm sm:text-base">45 WPM</p>
                        <p className="text-[10px] uppercase font-bold text-zinc-400">98% Acc</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === "students" && (
              <div className="p-0 sm:p-2 sm:p-8">
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="border-b border-zinc-200 dark:border-zinc-800 text-sm uppercase tracking-widest text-zinc-400">
                        <th className="px-6 py-4 font-black">Student Name</th>
                        <th className="px-6 py-4 font-black">Email</th>
                        <th className="px-6 py-4 font-black">Contact</th>
                        <th className="px-6 py-4 font-black">WhatsApp</th>
                        <th className="px-6 py-4 font-black">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loadingStudents ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-zinc-500 font-medium">Loading students...</td>
                        </tr>
                      ) : students.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-zinc-500 font-medium">No students registered yet.</td>
                        </tr>
                      ) : (
                        students.map((student) => (
                          <tr key={student.id} className="border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                            <td className="px-6 py-4 font-bold text-zinc-800 dark:text-zinc-200">{student.name}</td>
                            <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{student.email}</td>
                            <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{student.contact || "-"}</td>
                            <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{student.whatsapp || "-"}</td>
                            <td className="px-6 py-4 text-sm text-zinc-500">
                               {new Date(student.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{label}</p>
      <div className="text-3xl font-black">{value}</div>
    </div>
  );
}
