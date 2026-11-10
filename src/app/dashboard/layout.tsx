import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from '@/components/dashboard/DashboardSideBar';
import { Toaster } from '@/components/ui/toast';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="flex-1 w-full min-w-0 bg-[#0c0c0f] min-h-svh">
                <div className="sticky top-0 z-10 flex h-14 items-center border-b border-white/5 bg-[#0c0c0f]/80 px-4 backdrop-blur md:px-6">
                    <SidebarTrigger className="text-gray-400 hover:text-white" />
                </div>
                <div className="p-4 sm:p-6 lg:p-8">
                    {children}
                </div>
            </main>
            <Toaster />
        </SidebarProvider>
    );
};

export default DashboardLayout;