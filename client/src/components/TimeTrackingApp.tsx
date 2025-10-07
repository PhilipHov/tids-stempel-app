import React from 'react';
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from '../pages/dashboard';
import History from '../pages/history';
import Profile from '../pages/profile';
import Settings from '../pages/settings';
import { Router, Route } from 'wouter';
import { queryClient } from "../lib/queryClient";

export default function TimeTrackingApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Route path="/" component={Dashboard} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/history" component={History} />
            <Route path="/profile" component={Profile} />
            <Route path="/settings" component={Settings} />
            <Toaster />
          </div>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
