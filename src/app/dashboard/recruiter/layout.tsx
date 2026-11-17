import { requireRole } from '@/lib/core/session';
import React from 'react';

const RecruiterDashboardLaout = async ({ children }: { children: React.ReactNode }) => {
    
    await requireRole('recruiter');

    return children;
};

export default RecruiterDashboardLaout;