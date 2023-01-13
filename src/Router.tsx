import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Campaigns from '../src/components/campaigns/Campaigns';
import CampaignsLayout from './components/campaigns/CampaignsLayout';
import Schedules from '../src/components/campaigns/Schedules';
import PageNotFound from './components/campaigns/PageNotFound';
import Shows from './components/campaigns/Shows';

export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route element={<Navigate to="/campaigns" />} index />
        <Route element={<CampaignsLayout />} path="campaigns">
          <Route element={<Campaigns />} index />
          <Route element={<Schedules />} path="schedules" />
          <Route element={<Shows />} path="shows" />
        </Route>
      </Route>
      <Route element={<PageNotFound />} path="*" />
    </Routes>
  </BrowserRouter>
);
