import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface WorkStatusData {
  isWorking: boolean;
  activeSession: {
    id: string;
    clockInTime: string;
  } | null;
}

export default function ClockActions() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: workStatus } = useQuery<WorkStatusData>({
    queryKey: ['/api/work-status']
  });

  const { data: sessions = [] } = useQuery({
    queryKey: ['/api/work-sessions']
  });

  const clockInMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/clock-in'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/work-status'] });
      queryClient.invalidateQueries({ queryKey: ['/api/work-sessions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/work-sessions/today'] });
      toast({
        title: "Stemplet ind",
        description: "Du er nu på arbejde",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Fejl",
        description: error.message || "Kunne ikke stemple ind",
        variant: "destructive"
      });
    }
  });

  const clockOutMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/clock-out'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/work-status'] });
      queryClient.invalidateQueries({ queryKey: ['/api/work-sessions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/work-sessions/today'] });
      toast({
        title: "Stemplet ud",
        description: "Din arbejdsdag er afsluttet",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Fejl",
        description: error.message || "Kunne ikke stemple ud",
        variant: "destructive"
      });
    }
  });

  const getLastClockIn = () => {
    if (!sessions.length) return "Ikke registreret";
    const lastSession = sessions[0];
    return new Date(lastSession.clockInTime).toLocaleString('da-DK');
  };

  const getLastClockOut = () => {
    const lastCompletedSession = sessions.find((session: any) => session.clockOutTime);
    if (!lastCompletedSession) return "Ikke registreret";
    return new Date(lastCompletedSession.clockOutTime).toLocaleString('da-DK');
  };

  return (
    <div className="px-5 mb-8">
      {/* Clock In Button */}
      <Button
        className="w-full bg-primary-green hover:bg-primary-green/90 text-white py-4 px-6 rounded-lg font-medium text-lg mb-4 h-auto"
        onClick={() => clockInMutation.mutate()}
        disabled={workStatus?.isWorking || clockInMutation.isPending}
      >
        <LogIn className="mr-2 h-5 w-5" />
        Stemple ind på arbejde
      </Button>

      {/* Clock Out Button */}
      <Button
        className="w-full bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-lg font-medium text-lg mb-6 h-auto disabled:bg-gray-400"
        onClick={() => clockOutMutation.mutate()}
        disabled={!workStatus?.isWorking || clockOutMutation.isPending}
      >
        <LogOut className="mr-2 h-5 w-5" />
        Stemple ud fra arbejde
      </Button>

      {/* Last Activity */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-dark-gray mb-2">Seneste aktivitet</h4>
        <div className="text-sm text-text-gray">
          <div className="mb-1">
            <span className="font-medium">Sidste ind-stempling:</span>
            <span className="ml-1">{getLastClockIn()}</span>
          </div>
          <div>
            <span className="font-medium">Sidste ud-stempling:</span>
            <span className="ml-1">{getLastClockOut()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
