import { useQuery } from "@tanstack/react-query";
import { Crown } from "lucide-react";
import WorkStatus from "@/components/work-status";
import ClockActions from "@/components/clock-actions";
import WorkHistory from "@/components/work-history";
import BottomNavigation from "@/components/bottom-navigation";
import Chatbot from "@/components/chatbot";
import { User } from "@shared/schema";

export default function Dashboard() {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['/api/user']
  });

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-green"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="pt-8 pb-6 text-center">
        <div className="mb-4">
          <Crown className="w-10 h-10 text-dark-gray mx-auto" />
        </div>
        <h1 className="text-sm text-text-gray mb-1">VELKOMMEN</h1>
        <h2 className="text-2xl font-medium text-black">
          {user?.name || 'Philip'}
        </h2>
      </div>

      <WorkStatus />
      <ClockActions />
      <WorkHistory />
      <BottomNavigation currentPage="home" />
      <Chatbot />
    </div>
  );
}
