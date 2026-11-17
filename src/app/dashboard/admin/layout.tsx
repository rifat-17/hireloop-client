import { requireRole } from '@/lib/core/session';
import React from 'react';

const AdminDashboardLayoutPage = async ({ children }: { children: React.ReactNode }) => {

    await requireRole('admin');

    return children;
};

export default AdminDashboardLayoutPage;