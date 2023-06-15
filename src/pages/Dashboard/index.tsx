import React from 'react';
import { NavBar } from '../../components/menu/NavBar';

export function DashboardPage() {
  return (
    <div className="w-max-[1483px] flex h-[100%] flex-col overflow-x-hidden bg-blue-dark opacity-90">
      <NavBar home={false} />
      <h1 className="m-auto text-center text-3xl text-white">Dashboard</h1>
    </div>
  );
}
