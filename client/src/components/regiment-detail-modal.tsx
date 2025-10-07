import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
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
  Truck
} from 'lucide-react';

interface RegimentData {
  name: string;
  totalBarracks: number;
  totalPersonnel: number;
  totalCapacity: number;
  barracks: Array<{
    id: string;
    name: string;
    location: string;
    personnel: number;
    capacity: number;
    resources: {
      currentSSG: number;
      currentBefalingsmaend: number;
      currentOfficerer: number;
      requiredSSG: number;
      requiredBefalingsmaend: number;
      requiredOfficerer: number;
    };
  }>;
  personnel: Array<{
    id: string;
    name: string;
    rank: 'SSG' | 'Befalingsmand' | 'Officer';
    specialization: string;
    experience: number;
    status: 'Active' | 'Training' | 'Deployed' | 'On Leave';
    dropoutRisk: number;
    barracksName: string;
  }>;
  statistics: {
    totalSSG: number;
    totalBefalingsmaend: number;
    totalOfficerer: number;
    requiredSSG: number;
    requiredBefalingsmaend: number;
    requiredOfficerer: number;
    averageExperience: number;
    highDropoutRisk: number;
    upcomingDeployments: number;
  };
}

interface RegimentDetailModalProps {
  regimentData: RegimentData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function RegimentDetailModal({ regimentData, isOpen, onClose }: RegimentDetailModalProps) {
  if (!regimentData) return null;

  const getRankIcon = (rank: string) => {
    switch (rank) {
      case 'SSG': return '🔹';
      case 'Befalingsmand': return '🔸';
      case 'Officer': return '🔺';
      default: return '👤';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircle className="h-4 w-4 text-green-600" />;
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

  const ssgStatus = getResourceStatus(regimentData.statistics.totalSSG, regimentData.statistics.requiredSSG);
  const befalingsmaendStatus = getResourceStatus(regimentData.statistics.totalBefalingsmaend, regimentData.statistics.requiredBefalingsmaend);
  const officererStatus = getResourceStatus(regimentData.statistics.totalOfficerer, regimentData.statistics.requiredOfficerer);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            {regimentData.name}
          </DialogTitle>
          <div className="text-gray-600">
              Regiment oversigt • {regimentData.totalBarracks} enheder • {regimentData.totalPersonnel} personel
          </div>
        </DialogHeader>

        <Tabs defaultValue="personnel" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personnel">Personel</TabsTrigger>
            <TabsTrigger value="materiel">Materiel</TabsTrigger>
            <TabsTrigger value="uddannelse">Uddannelse</TabsTrigger>
            <TabsTrigger value="deployment">Udsendelse</TabsTrigger>
            <TabsTrigger value="andet">Andet</TabsTrigger>
          </TabsList>


          <TabsContent value="barracks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Enheder i Regimentet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regimentData.barracks.map((barracks) => (
                    <div key={barracks.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{barracks.name}</h3>
                          <p className="text-sm text-gray-600">{barracks.location}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Bemanding</div>
                          <div className="font-semibold">
                            {barracks.personnel}/{barracks.capacity} ({Math.round((barracks.personnel / barracks.capacity) * 100)}%)
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">SSG</div>
                          <div className="font-medium">
                            {barracks.resources.currentSSG}/{barracks.resources.requiredSSG}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Befalingsmænd</div>
                          <div className="font-medium">
                            {barracks.resources.currentBefalingsmaend}/{barracks.resources.requiredBefalingsmaend}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Officerer</div>
                          <div className="font-medium">
                            {barracks.resources.currentOfficerer}/{barracks.resources.requiredOfficerer}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personnel" className="space-y-4">
            {/* Regiment Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{regimentData.totalBarracks}</div>
                  <div className="text-sm text-gray-600">Enheder</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{regimentData.totalPersonnel}</div>
                  <div className="text-sm text-gray-600">Personel</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{regimentData.totalCapacity}</div>
                  <div className="text-sm text-gray-600">Kapacitet</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{regimentData.statistics.averageExperience.toFixed(1)}</div>
                  <div className="text-sm text-gray-600">År erfaring</div>
                </CardContent>
              </Card>
            </div>

            {/* Resource Status Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Ressource Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { 
                    title: 'SSG', 
                    current: regimentData.statistics.totalSSG, 
                    required: regimentData.statistics.requiredSSG,
                    status: ssgStatus,
                    icon: '🔹'
                  },
                  { 
                    title: 'Befalingsmænd', 
                    current: regimentData.statistics.totalBefalingsmaend, 
                    required: regimentData.statistics.requiredBefalingsmaend,
                    status: befalingsmaendStatus,
                    icon: '🔸'
                  },
                  { 
                    title: 'Officerer', 
                    current: regimentData.statistics.totalOfficerer, 
                    required: regimentData.statistics.requiredOfficerer,
                    status: officererStatus,
                    icon: '🔺'
                  }
                ].map(({ title, current, required, status, icon }) => {
                  const percentage = Math.round((current / required) * 100);
                  
                  return (
                    <div key={title} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{icon}</span>
                          <span className="font-medium">{title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${status.color}`}>
                            {current}/{required}
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
              </CardContent>
            </Card>

            {/* Personnel List */}
            <Card>
              <CardHeader>
                <CardTitle>Personel i Regimentet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {regimentData.personnel.map((person) => (
                    <div key={person.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{getRankIcon(person.rank)}</span>
                        <div>
                          <div className="font-medium">{person.name}</div>
                          <div className="text-sm text-gray-600">
                            {person.rank} • {person.specialization} • {person.experience} år
                          </div>
                          <div className="text-xs text-gray-500">{person.barracksName}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(person.status)}
                        <Badge variant="outline">{person.status}</Badge>
                        {person.dropoutRisk > 70 && (
                          <Badge variant="destructive" className="text-xs">
                            <TrendingDown className="h-3 w-3 mr-1" />
                            {person.dropoutRisk}% risiko
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materiel" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Våben og Ammunition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Rifler</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>H&K G36:</span>
                          <span className="text-green-600">245/250</span>
                        </div>
                        <div className="flex justify-between">
                          <span>M4 Carbine:</span>
                          <span className="text-yellow-600">85/100</span>
                        </div>
                        <div className="flex justify-between">
                          <span>H&K MP5:</span>
                          <span className="text-red-600">15/25</span>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Ammunition</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>5.56mm:</span>
                          <span className="text-green-600">85%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>9mm:</span>
                          <span className="text-yellow-600">60%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>7.62mm:</span>
                          <span className="text-red-600">30%</span>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Andet Udstyr</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Skudsikre Veste:</span>
                          <span className="text-green-600">98%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Radioer:</span>
                          <span className="text-yellow-600">75%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>GPS:</span>
                          <span className="text-red-600">45%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Bygninger og Infrastruktur
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regimentData.barracks.map((barracks) => (
                    <div key={barracks.id} className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-3">{barracks.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Bygninger</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Hovedbygning:</span>
                              <Badge variant="default">God</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Kantine:</span>
                              <Badge variant="secondary">Skimmelsvamp</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Våbendepot:</span>
                              <Badge variant="default">God</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Vaskeri:</span>
                              <Badge variant="destructive">Mangler Vinduer</Badge>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Infrastruktur</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>El:</span>
                              <Badge variant="default">Funktionel</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Vand:</span>
                              <Badge variant="secondary">Lækage</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Internet:</span>
                              <Badge variant="default">God</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Vej:</span>
                              <Badge variant="destructive">Huller</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="uddannelse" className="space-y-4">
            {/* Stående Styrker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Stående Styrker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Føringskursus - Stående */}
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Føringskursus
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Nuværende Status</div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Deltagere:</span>
                            <span className="font-medium">8/12</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fuldført:</span>
                            <span className="font-medium">5</span>
                          </div>
                          <div className="flex justify-between">
                            <span>I gang:</span>
                            <span className="font-medium">3</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Prognose</div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Næste kursus:</span>
                            <span className="font-medium">15. Nov 2025</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Kapacitet:</span>
                            <span className="font-medium">12 pladser</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Behov:</span>
                            <span className="text-red-600 font-medium">4 flere</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Kapacitet udnyttet:</span>
                        <span className="font-medium">67%</span>
                      </div>
                      <Progress value={67} className="h-2 mb-2" />
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mål opfyldt:</span>
                        <span className="font-medium text-red-600">33%</span>
                      </div>
                      <Progress value={33} className="h-2 mb-2" />
                      <div className="text-xs text-gray-500 mt-1">
                        <strong>Mangler:</strong> Skydebane 10, 11, 12 • Øvelsesområde A • Simulator 3
                      </div>
                    </div>
                  </div>

                  {/* Sergentskole - Stående */}
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Sergentskole
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Nuværende Status</div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Deltagere:</span>
                            <span className="font-medium">15/20</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fuldført:</span>
                            <span className="font-medium">12</span>
                          </div>
                          <div className="flex justify-between">
                            <span>I gang:</span>
                            <span className="font-medium">3</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Prognose</div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Næste kursus:</span>
                            <span className="font-medium">1. Dec 2025</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Kapacitet:</span>
                            <span className="font-medium">20 pladser</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Behov:</span>
                            <span className="text-yellow-600 font-medium">5 flere</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Kapacitet udnyttet:</span>
                        <span className="font-medium">75%</span>
                      </div>
                      <Progress value={75} className="h-2 mb-2" />
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mål opfyldt:</span>
                        <span className="font-medium text-yellow-600">60%</span>
                      </div>
                      <Progress value={60} className="h-2 mb-2" />
                      <div className="text-xs text-gray-500 mt-1">
                        <strong>Mangler:</strong> Klasselokale 5, 6 • Computerlab 2 • Øvelsesområde B
                      </div>
                    </div>
                  </div>

                  {/* Specialisering - Stående */}
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Specialisering
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Nuværende Status</div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Infanteri:</span>
                            <span className="font-medium">25/30</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Ingeniør:</span>
                            <span className="font-medium">18/20</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Signaler:</span>
                            <span className="font-medium">12/15</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Prognose</div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Næste kursus:</span>
                            <span className="font-medium">20. Nov 2025</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Kapacitet:</span>
                            <span className="font-medium">30 pladser</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Behov:</span>
                            <span className="text-green-600 font-medium">Optimal</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Kapacitet udnyttet:</span>
                        <span className="font-medium">90%</span>
                      </div>
                      <Progress value={90} className="h-2 mb-2" />
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mål opfyldt:</span>
                        <span className="font-medium text-green-600">95%</span>
                      </div>
                      <Progress value={95} className="h-2 mb-2" />
                      <div className="text-xs text-gray-500 mt-1">
                        <strong>Mangler:</strong> Ingeniørværktøj 7, 8 • Signaludstyr 4 • Køretøjer 2
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Uddannelsesenheder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-green-600" />
                  Uddannelsesenheder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Grunduddannelse */}
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Grunduddannelse
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Nuværende Status</div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Rekrutter:</span>
                            <span className="font-medium">45/60</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fuldført:</span>
                            <span className="font-medium">35</span>
                          </div>
                          <div className="flex justify-between">
                            <span>I gang:</span>
                            <span className="font-medium">10</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Prognose</div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Næste hold:</span>
                            <span className="font-medium">1. Jan 2026</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Kapacitet:</span>
                            <span className="font-medium">60 pladser</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Behov:</span>
                            <span className="text-yellow-600 font-medium">15 flere</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Kapacitet udnyttet:</span>
                        <span className="font-medium">75%</span>
                      </div>
                      <Progress value={75} className="h-2 mb-2" />
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mål opfyldt:</span>
                        <span className="font-medium text-yellow-600">50%</span>
                      </div>
                      <Progress value={50} className="h-2 mb-2" />
                      <div className="text-xs text-gray-500 mt-1">
                        <strong>Mangler:</strong> Grunduddannelse 13, 14, 15 • Rekrutcenter 4 • Øvelsesområde C
                      </div>
                    </div>
                  </div>

                  {/* Specialuddannelse */}
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Specialuddannelse
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Nuværende Status</div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Deltagere:</span>
                            <span className="font-medium">22/30</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fuldført:</span>
                            <span className="font-medium">18</span>
                          </div>
                          <div className="flex justify-between">
                            <span>I gang:</span>
                            <span className="font-medium">4</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Prognose</div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Næste kursus:</span>
                            <span className="font-medium">15. Dec 2025</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Kapacitet:</span>
                            <span className="font-medium">30 pladser</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Behov:</span>
                            <span className="text-green-600 font-medium">8 flere</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Kapacitet udnyttet:</span>
                        <span className="font-medium">73%</span>
                      </div>
                      <Progress value={73} className="h-2 mb-2" />
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mål opfyldt:</span>
                        <span className="font-medium text-yellow-600">65%</span>
                      </div>
                      <Progress value={65} className="h-2 mb-2" />
                      <div className="text-xs text-gray-500 mt-1">
                        <strong>Mangler:</strong> Specialkursus 9, 10 • Laboratorium 3 • Teknikrum 5
                      </div>
                    </div>
                  </div>

                  {/* Befalingsuddannelse */}
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Befalingsuddannelse
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Nuværende Status</div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Deltagere:</span>
                            <span className="font-medium">12/15</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fuldført:</span>
                            <span className="font-medium">8</span>
                          </div>
                          <div className="flex justify-between">
                            <span>I gang:</span>
                            <span className="font-medium">4</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Prognose</div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Næste kursus:</span>
                            <span className="font-medium">10. Dec 2025</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Kapacitet:</span>
                            <span className="font-medium">15 pladser</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Behov:</span>
                            <span className="text-yellow-600 font-medium">3 flere</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Kapacitet udnyttet:</span>
                        <span className="font-medium">80%</span>
                      </div>
                      <Progress value={80} className="h-2 mb-2" />
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mål opfyldt:</span>
                        <span className="font-medium text-yellow-600">70%</span>
                      </div>
                      <Progress value={70} className="h-2 mb-2" />
                      <div className="text-xs text-gray-500 mt-1">
                        <strong>Mangler:</strong> Befalingskursus 7, 8 • Ledelseslokale 4 • Øvelsesområde D
                      </div>
                    </div>
                  </div>

                  {/* Reserveuddannelse */}
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Reserveuddannelse
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Nuværende Status</div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Deltagere:</span>
                            <span className="font-medium">28/35</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fuldført:</span>
                            <span className="font-medium">25</span>
                          </div>
                          <div className="flex justify-between">
                            <span>I gang:</span>
                            <span className="font-medium">3</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Prognose</div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Næste kursus:</span>
                            <span className="font-medium">5. Jan 2026</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Kapacitet:</span>
                            <span className="font-medium">35 pladser</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Behov:</span>
                            <span className="text-green-600 font-medium">7 flere</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Kapacitet udnyttet:</span>
                        <span className="font-medium">80%</span>
                      </div>
                      <Progress value={80} className="h-2 mb-2" />
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mål opfyldt:</span>
                        <span className="font-medium text-green-600">85%</span>
                      </div>
                      <Progress value={85} className="h-2 mb-2" />
                      <div className="text-xs text-gray-500 mt-1">
                        <strong>Mangler:</strong> Reservekursus 11, 12 • Weekendtræning 3 • Mobilisering 2
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deployment" className="space-y-4">
            {/* Udsendelsesklarhed Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Udsendelsesklarhed Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* NATO Ready Status */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    NATO Ready Status
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Nuværende Status</div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Parathed:</span>
                          <span className="font-medium">65%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Certificering:</span>
                          <span className="font-medium">70%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Materiel:</span>
                          <span className="font-medium">80%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Mål</div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Mål parathed:</span>
                          <span className="font-medium">95%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Deadline:</span>
                          <span className="font-medium">1. Mar 2026</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <span className="text-yellow-600 font-medium">På rette vej</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Udsendelsesklarhed:</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <Progress value={65} className="h-2 mb-2" />
                    <div className="text-xs text-gray-500 mt-1">
                      <strong>Mangler for mål:</strong> NATO certificering • Terrænøvelser • Materiel test
                    </div>
                  </div>
                </div>

                {/* Handlingsplan for Udsendelsesklarhed */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Handlingsplan for Udsendelsesklarhed
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span className="font-medium text-red-800">Kritisk - NATO Certificering</span>
                      </div>
                      <div className="text-sm text-red-700">
                        <strong>Handling:</strong> Send 12 personel på NATO Standardisering Kursus
                      </div>
                      <div className="text-xs text-red-600 mt-1">
                        <strong>Deadline:</strong> 15. Feb 2026 • <strong>Lokation:</strong> NATO School, Oberammergau
                      </div>
                    </div>

                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-yellow-600" />
                        <span className="font-medium text-yellow-800">Prioritet - Terrænøvelser</span>
                      </div>
                      <div className="text-sm text-yellow-700">
                        <strong>Handling:</strong> Gennemfør 3 intensive terrænøvelser
                      </div>
                      <div className="text-xs text-yellow-600 mt-1">
                        <strong>Booking:</strong> Terræn 7, 8, 9 • <strong>Periode:</strong> 20-28. Jan 2026
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Truck className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800">Materiel - Test & Vedligeholdelse</span>
                      </div>
                      <div className="text-sm text-blue-700">
                        <strong>Handling:</strong> Gennemtest alle udsendelsesmateriel
                      </div>
                      <div className="text-xs text-blue-600 mt-1">
                        <strong>Booking:</strong> Værksted 3, 4 • <strong>Testområde:</strong> A, B, C
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Plan */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Booking Plan
                  </h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Terræn Booking</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Terræn 7:</span>
                            <span className="font-medium">20-22. Jan</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Terræn 8:</span>
                            <span className="font-medium">24-26. Jan</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Terræn 9:</span>
                            <span className="font-medium">28-30. Jan</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Faciliteter Booking</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Værksted 3:</span>
                            <span className="font-medium">15-18. Jan</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Testområde A:</span>
                            <span className="font-medium">19-21. Jan</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Skydebane 10:</span>
                            <span className="font-medium">25. Jan</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">Udsendelsesklarhed Checklist</span>
                      </div>
                      <div className="text-sm text-green-700 space-y-1">
                        <div className="flex justify-between">
                          <span>Personel certificering:</span>
                          <span className="font-medium">12/15 fuldført</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Terrænøvelser:</span>
                          <span className="font-medium">2/3 planlagt</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Materiel test:</span>
                          <span className="font-medium">8/12 gennemført</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="andet" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Økonomi og Administration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Budget Oversigt</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Personel:</span>
                        <span className="font-medium">45.2M DKK</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Materiel:</span>
                        <span className="font-medium">12.8M DKK</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Drift:</span>
                        <span className="font-medium">8.5M DKK</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Træning:</span>
                        <span className="font-medium">3.2M DKK</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>69.7M DKK</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Administrative Opgaver</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Årsrapport:</span>
                        <Badge variant="default">Færdig</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Budget 2026:</span>
                        <Badge variant="secondary">I gang</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Personale evaluering:</span>
                        <Badge variant="destructive">Forsinket</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Udrustning tjek:</span>
                        <Badge variant="default">Planlagt</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Kalender og Begivenheder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Årsinspektion</div>
                      <div className="text-sm text-gray-600">15. December 2025</div>
                    </div>
                    <Badge variant="secondary">Planlagt</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Vinterøvelse</div>
                      <div className="text-sm text-gray-600">20. Januar 2026</div>
                    </div>
                    <Badge variant="default">Bekræftet</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Ledermøde</div>
                      <div className="text-sm text-gray-600">5. November 2025</div>
                    </div>
                    <Badge variant="destructive">Overførsel</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
