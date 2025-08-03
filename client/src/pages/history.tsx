import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, TrendingUp, Crown } from "lucide-react";
import BottomNavigation from "@/components/bottom-navigation";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, subWeeks, subMonths, startOfQuarter, endOfQuarter } from "date-fns";
import { da } from "date-fns/locale";
import { WorkSession } from "@shared/schema";

export default function History() {
  const { data: sessions = [] } = useQuery<WorkSession[]>({
    queryKey: ['/api/work-sessions']
  });

  const calculateWeeklyHours = (weekStart: Date) => {
    const weekEnd = endOfWeek(weekStart, { locale: da });
    
    const weekSessions = sessions.filter((session) => {
      const clockInDate = new Date(session.clockInTime);
      return clockInDate >= weekStart && clockInDate <= weekEnd;
    });

    return weekSessions.reduce((total: number, session) => {
      const start = new Date(session.clockInTime);
      const end = session.clockOutTime ? new Date(session.clockOutTime) : new Date();
      const duration = end.getTime() - start.getTime();
      return total + (duration / (1000 * 60 * 60));
    }, 0);
  };

  const calculateMonthlyHours = (monthStart: Date) => {
    const monthEnd = endOfMonth(monthStart);
    
    const monthSessions = sessions.filter((session) => {
      const clockInDate = new Date(session.clockInTime);
      return clockInDate >= monthStart && clockInDate <= monthEnd;
    });

    return monthSessions.reduce((total: number, session) => {
      const start = new Date(session.clockInTime);
      const end = session.clockOutTime ? new Date(session.clockOutTime) : new Date();
      const duration = end.getTime() - start.getTime();
      return total + (duration / (1000 * 60 * 60));
    }, 0);
  };

  const calculateQuarterlyOvertime = () => {
    const quarterStart = startOfQuarter(new Date());
    const quarterEnd = endOfQuarter(new Date());
    
    const quarterSessions = sessions.filter((session) => {
      const clockInDate = new Date(session.clockInTime);
      return clockInDate >= quarterStart && clockInDate <= quarterEnd;
    });

    const totalHours = quarterSessions.reduce((total: number, session) => {
      const start = new Date(session.clockInTime);
      const end = session.clockOutTime ? new Date(session.clockOutTime) : new Date();
      const duration = end.getTime() - start.getTime();
      return total + (duration / (1000 * 60 * 60));
    }, 0);

    // Assuming 37 hours per week, roughly 12 weeks per quarter = 444 expected hours
    const expectedHours = 444;
    return totalHours - expectedHours;
  };

  const formatHours = (hours: number) => {
    if (hours < 1) {
      return `${Math.round(hours * 60)} min`;
    }
    return `${hours.toFixed(1)} timer`;
  };

  const getOvertimeText = (hours: number, expectedHours: number) => {
    const overtime = hours - expectedHours;
    if (overtime > 0) {
      return `(${overtime.toFixed(1)} timers overarbejde)`;
    } else if (overtime < 0) {
      return `(${Math.abs(overtime).toFixed(1)} timers manglende arbejde)`;
    }
    return "";
  };

  // Get last 4 weeks
  const weeks = Array.from({ length: 4 }, (_, i) => {
    const weekStart = startOfWeek(subWeeks(new Date(), i), { locale: da });
    return {
      start: weekStart,
      hours: calculateWeeklyHours(weekStart)
    };
  });

  // Get last 6 months  
  const months = Array.from({ length: 6 }, (_, i) => {
    const monthStart = startOfMonth(subMonths(new Date(), i));
    const hours = calculateMonthlyHours(monthStart);
    const expectedHours = 148; // Roughly 37 hours * 4 weeks
    return {
      start: monthStart,
      hours,
      expectedHours
    };
  });

  const quarterlyOvertime = calculateQuarterlyOvertime();

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="pt-8 pb-6 text-center bg-white sticky top-0 z-10 border-b border-gray-100">
        <div className="mb-4">
          <Crown className="w-10 h-10 text-dark-gray mx-auto" />
        </div>
        <h1 className="text-2xl font-medium text-black mb-2">Historik</h1>
      </div>

      <div className="px-5 pb-24 overflow-y-auto">
        {/* Quarterly Summary */}
        <div className="bg-light-green rounded-lg p-4 mb-6">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-5 h-5 text-primary-green mr-2" />
            <h3 className="font-medium text-dark-gray">Kvartal oversigt</h3>
          </div>
          <div className="text-center">
            <p className="text-sm text-text-gray mb-1">Optjent merarbejde dette kvartal</p>
            <p className={`text-xl font-semibold ${quarterlyOvertime >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              {quarterlyOvertime >= 0 ? '+' : ''}{quarterlyOvertime.toFixed(1)} timer
            </p>
          </div>
        </div>

        {/* Weekly Overview */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-dark-gray mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Sidste 4 uger
          </h3>
          <div className="space-y-3">
            {weeks.map((week, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-dark-gray">
                      Uge {format(week.start, 'w', { locale: da })}
                    </div>
                    <div className="text-sm text-text-gray">
                      {format(week.start, 'd. MMM', { locale: da })} - {format(endOfWeek(week.start, { locale: da }), 'd. MMM', { locale: da })}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-dark-gray">
                      {formatHours(week.hours)}
                    </div>
                    <div className="text-sm text-text-gray">
                      {week.hours >= 37 ? 'Normal' : 'Under normal'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Overview */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-dark-gray mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Månedlige totaler
          </h3>
          <div className="space-y-3">
            {months.map((month, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-dark-gray capitalize">
                      {format(month.start, 'MMMM yyyy', { locale: da })}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-dark-gray">
                      {formatHours(month.hours)}
                    </div>
                    <div className={`text-sm ${
                      month.hours >= month.expectedHours ? 'text-green-600' : 'text-red-500'
                    }`}>
                      {getOvertimeText(month.hours, month.expectedHours)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation currentPage="history" />
    </div>
  );
}