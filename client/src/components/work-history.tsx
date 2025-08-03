import { useQuery } from "@tanstack/react-query";

export default function WorkHistory() {
  const { data: sessions = [] } = useQuery({
    queryKey: ['/api/work-sessions']
  });

  const formatDuration = (clockIn: string, clockOut: string | null) => {
    const start = new Date(clockIn);
    const end = clockOut ? new Date(clockOut) : new Date();
    const duration = end.getTime() - start.getTime();
    const hours = duration / (1000 * 60 * 60);
    
    if (hours < 1) {
      const minutes = Math.floor(duration / (1000 * 60));
      return `${minutes} min`;
    }
    
    return `${hours.toFixed(1)} timer`;
  };

  const formatTimeRange = (clockIn: string, clockOut: string | null) => {
    const start = new Date(clockIn).toLocaleTimeString('da-DK', {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    if (!clockOut) return `${start} - Pågår`;
    
    const end = new Date(clockOut).toLocaleTimeString('da-DK', {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    return `${start} - ${end}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString('da-DK', { weekday: 'long' });
    const dayMonth = date.toLocaleDateString('da-DK', { 
      day: 'numeric', 
      month: 'long' 
    });
    
    return { dayName, dayMonth };
  };

  // Group sessions by date
  const groupedSessions = sessions.reduce((groups: any, session: any) => {
    const dateKey = new Date(session.clockInTime).toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(session);
    return groups;
  }, {});

  return (
    <div className="px-5 mb-20">
      <h3 className="text-lg font-medium text-dark-gray mb-4">Seneste dage</h3>
      
      {Object.keys(groupedSessions).length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-text-gray">Ingen arbejdssessioner endnu</div>
        </div>
      ) : (
        Object.entries(groupedSessions)
          .slice(0, 7) // Show last 7 days
          .map(([dateKey, daySessions]: [string, any]) => {
            const firstSession = daySessions[0];
            const { dayName, dayMonth } = formatDate(firstSession.clockInTime);
            
            // Calculate total hours for the day
            const totalDuration = daySessions.reduce((total: number, session: any) => {
              const start = new Date(session.clockInTime);
              const end = session.clockOutTime ? new Date(session.clockOutTime) : new Date();
              return total + (end.getTime() - start.getTime());
            }, 0);
            
            const totalHours = (totalDuration / (1000 * 60 * 60)).toFixed(1);
            
            // Get time range for the day
            const dayStart = new Date(Math.min(...daySessions.map((s: any) => new Date(s.clockInTime).getTime())));
            const completedSessions = daySessions.filter((s: any) => s.clockOutTime);
            const dayEnd = completedSessions.length > 0 
              ? new Date(Math.max(...completedSessions.map((s: any) => new Date(s.clockOutTime).getTime())))
              : null;
            
            return (
              <div key={dateKey} className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-dark-gray capitalize">{dayName}</div>
                    <div className="text-sm text-text-gray">{dayMonth}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-dark-gray">{totalHours} timer</div>
                    <div className="text-sm text-text-gray">
                      {formatTimeRange(dayStart.toISOString(), dayEnd?.toISOString() || null)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
      )}
    </div>
  );
}
