// RegimentPopup.tsx
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Calendar, 
  MapPin,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  UserCheck,
  UserX,
  Award,
  BookOpen,
  BarChart3,
  UserPlus,
  UserMinus,
  Shield,
  Star,
  Building2,
  GraduationCap,
  Truck,
  Info,
  Wrench
} from 'lucide-react';

export interface RegimentData {
  id: string;
  name: string;
  personnel: {
    officers: {
      KC: { current: number; target: number };
      PL: { current: number; target: number };
      KF: { current: number; target: number };
    };
    ncos: { current: number; target: number };
    enlisted: { current: number; target: number };
  };
  materiel: {
    ammo: { name: string; current: number; target: number; unit: string };
    weapons: { name: string; current: number; target: number; unit: string };
    buildings: { name: string; current: number; target: number; unit: string };
  };
  training: Array<{
    unitType: string;
    goalsTarget: number;
    goalsDone: number;
    missingLessons: string[];
  }>;
  notes: string;
}

interface RegimentPopupProps {
  data: RegimentData;
}

export default function RegimentPopup({ data }: RegimentPopupProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <UserCheck className="h-4 w-4 text-green-600" />;
      case 'Training': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'Deployed': return <Target className="h-4 w-4 text-orange-600" />;
      case 'On Leave': return <UserX className="h-4 w-4 text-gray-600" />;
      default: return <UserCheck className="h-4 w-4 text-gray-600" />;
    }
  };

  const getResourceStatus = (current: number, required: number) => {
    if (current < required) return { status: 'shortage', color: 'text-red-600', bgColor: 'bg-red-100' };
    if (current > required) return { status: 'excess', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { status: 'optimal', color: 'text-green-600', bgColor: 'bg-green-100' };
  };

  const getTotalPersonnel = () => {
    const officers = data.personnel.officers.KC.current + data.personnel.officers.PL.current + data.personnel.officers.KF.current;
    return officers + data.personnel.ncos.current + data.personnel.enlisted.current;
  };

  const getTotalTarget = () => {
    const officers = data.personnel.officers.KC.target + data.personnel.officers.PL.target + data.personnel.officers.KF.target;
    return officers + data.personnel.ncos.target + data.personnel.enlisted.target;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{data.name}</h1>
        <div className="text-gray-600">
          Regiment oversigt • {getTotalPersonnel()} personel
        </div>
      </div>

      <Tabs defaultValue="personnel" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personnel">Personel</TabsTrigger>
          <TabsTrigger value="materiel">Materiel</TabsTrigger>
          <TabsTrigger value="uddannelse">Uddannelse</TabsTrigger>
          <TabsTrigger value="deployment">Udsendelse</TabsTrigger>
          <TabsTrigger value="andet">Andet</TabsTrigger>
        </TabsList>

        <TabsContent value="personnel" className="space-y-4">
          {/* Personnel Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{data.personnel.officers.KC.current + data.personnel.officers.PL.current + data.personnel.officers.KF.current}</div>
                <div className="text-sm text-gray-600">Officerer</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{data.personnel.ncos.current}</div>
                <div className="text-sm text-gray-600">Befalingsmænd</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{data.personnel.enlisted.current}</div>
                <div className="text-sm text-gray-600">Menige</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{getTotalPersonnel()}</div>
                <div className="text-sm text-gray-600">Totalt</div>
              </CardContent>
            </Card>
          </div>

          {/* Personnel Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Personel Oversigt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Officers */}
              <div>
                <h4 className="font-medium mb-2">Officerer</h4>
                <div className="space-y-2">
                  {[
                    { title: 'KC', current: data.personnel.officers.KC.current, target: data.personnel.officers.KC.target, icon: '🔺' },
                    { title: 'PL', current: data.personnel.officers.PL.current, target: data.personnel.officers.PL.target, icon: '🔸' },
                    { title: 'KF', current: data.personnel.officers.KF.current, target: data.personnel.officers.KF.target, icon: '🔹' }
                  ].map(({ title, current, target, icon }) => {
                    const status = getResourceStatus(current, target);
                    const percentage = Math.round((current / target) * 100);
                    
                    return (
                      <div key={title} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{icon}</span>
                            <span className="font-medium">{title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`font-bold ${status.color}`}>
                              {current}/{target}
                            </span>
                            <Badge 
                              variant={status.status === 'optimal' ? 'default' : 'destructive'}
                              className={status.bgColor}
                            >
                              {status.status === 'optimal' ? 'Optimal' : 
                               status.status === 'shortage' ? 'Mangler' : 'For mange'}
                            </Badge>
                          </div>
                        </div>
                        <Progress 
                          value={Math.min(percentage, 100)} 
                          className="h-2"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* NCOs */}
              <div>
                <h4 className="font-medium mb-2">Befalingsmænd</h4>
                <div className="space-y-2">
                  {(() => {
                    const status = getResourceStatus(data.personnel.ncos.current, data.personnel.ncos.target);
                    const percentage = Math.round((data.personnel.ncos.current / data.personnel.ncos.target) * 100);
                    
                    return (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🔸</span>
                            <span className="font-medium">SSG</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`font-bold ${status.color}`}>
                              {data.personnel.ncos.current}/{data.personnel.ncos.target}
                            </span>
                            <Badge 
                              variant={status.status === 'optimal' ? 'default' : 'destructive'}
                              className={status.bgColor}
                            >
                              {status.status === 'optimal' ? 'Optimal' : 
                               status.status === 'shortage' ? 'Mangler' : 'For mange'}
                            </Badge>
                          </div>
                        </div>
                        <Progress 
                          value={Math.min(percentage, 100)} 
                          className="h-2"
                        />
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Enlisted */}
              <div>
                <h4 className="font-medium mb-2">Menige</h4>
                <div className="space-y-2">
                  {(() => {
                    const status = getResourceStatus(data.personnel.enlisted.current, data.personnel.enlisted.target);
                    const percentage = Math.round((data.personnel.enlisted.current / data.personnel.enlisted.target) * 100);
                    
                    return (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🔹</span>
                            <span className="font-medium">Menige</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`font-bold ${status.color}`}>
                              {data.personnel.enlisted.current}/{data.personnel.enlisted.target}
                            </span>
                            <Badge 
                              variant={status.status === 'optimal' ? 'default' : 'destructive'}
                              className={status.bgColor}
                            >
                              {status.status === 'optimal' ? 'Optimal' : 
                               status.status === 'shortage' ? 'Mangler' : 'For mange'}
                            </Badge>
                          </div>
                        </div>
                        <Progress 
                          value={Math.min(percentage, 100)} 
                          className="h-2"
                        />
                      </div>
                    );
                  })()}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materiel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Materiel Oversigt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Ammunition */}
              <div>
                <h4 className="font-medium mb-2">Ammunition</h4>
                <div className="space-y-2">
                  {(() => {
                    const status = getResourceStatus(data.materiel.ammo.current, data.materiel.ammo.target);
                    const percentage = Math.round((data.materiel.ammo.current / data.materiel.ammo.target) * 100);
                    
                    return (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🔸</span>
                            <span className="font-medium">{data.materiel.ammo.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`font-bold ${status.color}`}>
                              {data.materiel.ammo.current.toLocaleString()}/{data.materiel.ammo.target.toLocaleString()} {data.materiel.ammo.unit}
                            </span>
                            <Badge 
                              variant={status.status === 'optimal' ? 'default' : 'destructive'}
                              className={status.bgColor}
                            >
                              {status.status === 'optimal' ? 'Optimal' : 
                               status.status === 'shortage' ? 'Mangler' : 'For mange'}
                            </Badge>
                          </div>
                        </div>
                        <Progress 
                          value={Math.min(percentage, 100)} 
                          className="h-2"
                        />
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Weapons */}
              <div>
                <h4 className="font-medium mb-2">Våben</h4>
                <div className="space-y-2">
                  {(() => {
                    const status = getResourceStatus(data.materiel.weapons.current, data.materiel.weapons.target);
                    const percentage = Math.round((data.materiel.weapons.current / data.materiel.weapons.target) * 100);
                    
                    return (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🔹</span>
                            <span className="font-medium">{data.materiel.weapons.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`font-bold ${status.color}`}>
                              {data.materiel.weapons.current}/{data.materiel.weapons.target} {data.materiel.weapons.unit}
                            </span>
                            <Badge 
                              variant={status.status === 'optimal' ? 'default' : 'destructive'}
                              className={status.bgColor}
                            >
                              {status.status === 'optimal' ? 'Optimal' : 
                               status.status === 'shortage' ? 'Mangler' : 'For mange'}
                            </Badge>
                          </div>
                        </div>
                        <Progress 
                          value={Math.min(percentage, 100)} 
                          className="h-2"
                        />
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Buildings */}
              <div>
                <h4 className="font-medium mb-2">Bygninger og Infrastruktur</h4>
                <div className="space-y-2">
                  {(() => {
                    const status = getResourceStatus(data.materiel.buildings.current, data.materiel.buildings.target);
                    const percentage = Math.round((data.materiel.buildings.current / data.materiel.buildings.target) * 100);
                    
                    return (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🏢</span>
                            <span className="font-medium">{data.materiel.buildings.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`font-bold ${status.color}`}>
                              {data.materiel.buildings.current}/{data.materiel.buildings.target} {data.materiel.buildings.unit}
                            </span>
                            <Badge 
                              variant={status.status === 'optimal' ? 'default' : 'destructive'}
                              className={status.bgColor}
                            >
                              {status.status === 'optimal' ? 'Optimal' : 
                               status.status === 'shortage' ? 'Mangler' : 'For mange'}
                            </Badge>
                          </div>
                        </div>
                        <Progress 
                          value={Math.min(percentage, 100)} 
                          className="h-2"
                        />
                      </div>
                    );
                  })()}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="uddannelse" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Uddannelsesplaner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {data.training.map((training, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      {training.unitType === 'stående' ? 'Stående Styrker' : 'Uddannelsesenheder'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Nuværende Status</div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Fuldført:</span>
                            <span className="font-medium">{training.goalsDone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Mål:</span>
                            <span className="font-medium">{training.goalsTarget}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Prognose</div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Manglende:</span>
                            <span className="font-medium text-red-600">{training.goalsTarget - training.goalsDone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mål opfyldt:</span>
                        <span className="font-medium">{Math.round((training.goalsDone / training.goalsTarget) * 100)}%</span>
                      </div>
                      <Progress 
                        value={(training.goalsDone / training.goalsTarget) * 100} 
                        className="h-2 mb-2" 
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        <strong>Mangler:</strong> {training.missingLessons.join(' • ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Udsendelse Planlægning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Detaljer om kommende og igangværende udsendelser for regimentet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="andet" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Noter og Andet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">{data.notes}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}