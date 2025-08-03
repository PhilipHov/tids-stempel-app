import { useQuery } from "@tanstack/react-query";
import { User, Settings, Crown } from "lucide-react";
import BottomNavigation from "@/components/bottom-navigation";
import { User as UserType } from "@shared/schema";

export default function Profile() {
  const { data: user, isLoading } = useQuery<UserType>({
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
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="pt-8 pb-6 text-center bg-white sticky top-0 z-10 border-b border-gray-100">
        <div className="mb-4">
          <Crown className="w-10 h-10 text-dark-gray mx-auto" />
        </div>
        <h1 className="text-2xl font-medium text-black mb-2">Profil</h1>
      </div>

      {/* Profile Info */}
      <div className="px-5 mb-6 pb-24 overflow-y-auto">
        <div className="bg-light-green rounded-lg p-6 text-center mb-6">
          <div className="w-20 h-20 bg-primary-green rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl font-medium text-dark-gray mb-1">
            {user?.name || 'Philip'}
          </h2>
          <p className="text-text-gray">@{user?.username || 'philip'}</p>
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-dark-gray mb-3">Profil oplysninger</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-text-gray">Fulde navn</label>
                <p className="font-medium text-dark-gray">{user?.name || 'Philip'}</p>
              </div>
              <div>
                <label className="text-sm text-text-gray">Brugernavn</label>
                <p className="font-medium text-dark-gray">@{user?.username || 'philip'}</p>
              </div>
              <div>
                <label className="text-sm text-text-gray">Status</label>
                <p className="font-medium text-green-600">Aktiv medarbejder</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-dark-gray mb-3">Arbejdsinformation</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-text-gray">Position</label>
                <p className="font-medium text-dark-gray">Medarbejder</p>
              </div>
              <div>
                <label className="text-sm text-text-gray">Afdeeling</label>
                <p className="font-medium text-dark-gray">Almindelig</p>
              </div>
              <div>
                <label className="text-sm text-text-gray">Normal arbejdstid</label>
                <p className="font-medium text-dark-gray">37 timer/uge</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation currentPage="profile" />
    </div>
  );
}