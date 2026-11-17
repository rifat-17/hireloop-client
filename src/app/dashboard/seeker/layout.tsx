import { requireRole } from '@/lib/core/session';
import React from 'react';

const SeekerDashboardLayoutPage = async ({ children }: { children: React.ReactNode })=> {
    
    await requireRole('seeker');
    
        return children;
};

export default SeekerDashboardLayoutPage;