import { Bell, Lock, User, HelpCircle, LogOut, Crown } from "lucide-react";
import BottomNavigation from "@/components/bottom-navigation";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoClockOut, setAutoClockOut] = useState(false);

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="pt-8 pb-6 text-center bg-white sticky top-0 z-10 border-b border-gray-100">
        <div className="mb-4">
          <Crown className="w-10 h-10 text-dark-gray mx-auto" />
        </div>
        <h1 className="text-2xl font-medium text-black mb-2">Indstillinger</h1>
      </div>

      <div className="px-5 pb-24 overflow-y-auto">
        {/* App Settings */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-dark-gray mb-4">App indstillinger</h3>
          <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="w-5 h-5 text-text-gray mr-3" />
                <div>
                  <p className="font-medium text-dark-gray">Notifikationer</p>
                  <p className="text-sm text-text-gray">Modtag påmindelser om stempling</p>
                </div>
              </div>
              <Switch 
                checked={notifications} 
                onCheckedChange={setNotifications}
              />
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <User className="w-5 h-5 text-text-gray mr-3" />
                <div>
                  <p className="font-medium text-dark-gray">Mørk tilstand</p>
                  <p className="text-sm text-text-gray">Skift til mørk tema</p>
                </div>
              </div>
              <Switch 
                checked={darkMode} 
                onCheckedChange={setDarkMode}
              />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Lock className="w-5 h-5 text-text-gray mr-3" />
                <div>
                  <p className="font-medium text-dark-gray">Auto ud-stempling</p>
                  <p className="text-sm text-text-gray">Automatisk stemple ud efter 8 timer</p>
                </div>
              </div>
              <Switch 
                checked={autoClockOut} 
                onCheckedChange={setAutoClockOut}
              />
            </div>
          </div>
        </div>

        {/* Work Settings */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-dark-gray mb-4">Arbejdsindstillinger</h3>
          <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-dark-gray">Normal arbejdstid</p>
                  <p className="text-sm text-text-gray">37 timer per uge</p>
                </div>
                <Button variant="ghost" size="sm" className="text-primary-green">
                  Rediger
                </Button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-dark-gray">Pause indstillinger</p>
                  <p className="text-sm text-text-gray">Automatisk pause efter 4 timer</p>
                </div>
                <Button variant="ghost" size="sm" className="text-primary-green">
                  Rediger
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-dark-gray mb-4">Support</h3>
          <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
            <button className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50">
              <div className="flex items-center">
                <HelpCircle className="w-5 h-5 text-text-gray mr-3" />
                <div>
                  <p className="font-medium text-dark-gray">Hjælp & Support</p>
                  <p className="text-sm text-text-gray">Få hjælp til at bruge appen</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Account Actions */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log ud
          </Button>
        </div>

        {/* App Info */}
        <div className="mt-8 text-center text-sm text-text-gray">
          <p>Version 1.0.0</p>
          <p>© 2024 Arbejdstid App</p>
        </div>
      </div>

      <BottomNavigation currentPage="settings" />
    </div>
  );
}