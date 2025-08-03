import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

interface WorkStatusData {
  isWorking: boolean;
  activeSession: {
    id: string;
    clockInTime: string;
  } | null;
}

export default function WorkStatus() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());

  const { data: workStatus } = useQuery<WorkStatusData>({
    queryKey: ['/api/work-status'],
    refetchInterval: 5000
  });

  const { data: todaySessions = [] } = useQuery({
    queryKey: ['/api/work-sessions/today'],
    refetchInterval: 5000
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setCurrentDate(now);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateTodayHours = () => {
    let totalMinutes = 0;
    
    todaySessions.forEach((session: any) => {
      const clockIn = new Date(session.clockInTime);
      const clockOut = session.clockOutTime ? new Date(session.clockOutTime) : new Date();
      const duration = clockOut.getTime() - clockIn.getTime();
      totalMinutes += duration / (1000 * 60);
    });

    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    
    if (hours === 0 && minutes === 0) return "0 timer";
    if (hours === 0) return `${minutes} min`;
    if (minutes === 0) return `${hours} timer`;
    return `${hours}t ${minutes}m`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('da-DK', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('da-DK', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="px-5 mb-6">
      <div className="bg-light-green rounded-lg p-4 mb-4">
        <h3 className="text-lg font-medium text-dark-gray mb-2">Arbejdsstatus</h3>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-text-gray">Status:</span>
            <div className="flex items-center mt-1">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                workStatus?.isWorking ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className="font-medium text-dark-gray">
                {workStatus?.isWorking ? 'På arbejde' : 'Ikke på arbejde'}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm text-text-gray">I dag</span>
            <div className="font-medium text-dark-gray">
              {calculateTodayHours()}
            </div>
          </div>
        </div>
      </div>

      {/* Current Time Display */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-semibold text-dark-gray mb-1">
            {formatTime(currentTime)}
          </div>
          <div className="text-sm text-text-gray">
            {formatDate(currentDate)}
          </div>
        </div>
      </div>
    </div>
  );
}
