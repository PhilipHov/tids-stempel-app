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
  ArrowLeftRight
} from 'lucide-react';

interface Personnel {
  id: string;
  name: string;
  rank: 'SSG' | 'Befalingsmand' | 'Officer';
  specialization: string;
  experience: number;
  status: 'Active' | 'Training' | 'Deployed' | 'On Leave';
  nextTraining?: Date;
  nextDeployment?: Date;
  dropoutRisk: number;
  currentQualifications: string[];
  deploymentDate?: Date;
  deploymentLocation: string;
  careerProgression: {
    currentLevel: string;
    nextLevel: string;
    monthsToPromotion: number;
    requiredTraining: string[];
  };
  performanceMetrics: {
    shootingAccuracy: number;
    physicalFitness: number;
    leadershipScore: number;
    teamworkScore: number;
  };
  trainingHistory: Array<{
    course: string;
    completed: Date;
    grade: string;
  }>;
}

interface ResourceRequirements {
  requiredSSG: number;
  requiredBefalingsmaend: number;
  requiredOfficerer: number;
  currentSSG: number;
  currentBefalingsmaend: number;
  currentOfficerer: number;
}

interface Barracks {
  id: string;
  name: string;
  location: string;
  regiment: string;
  region: string;
  latitude: number;
  longitude: number;
}

interface BarracksDetailModalProps {
  barracks: Barracks | null;
  resources: ResourceRequirements | null;
  personnel: Personnel[];
  isOpen: boolean;
  onClose: () => void;
  onResourceAllocation?: () => void;
  onDeploymentPlanning?: (personnel: Personnel) => void;
}

export function BarracksDetailModal({ 
  barracks, 
  resources, 
  personnel, 
  isOpen, 
  onClose,
  onResourceAllocation,
  onDeploymentPlanning
}: BarracksDetailModalProps) {
  if (!barracks) return null;

  const getResourceStatus = (current: number, required: number) => {
    if (current < required) return { status: 'shortage', color: 'text-red-600', bgColor: 'bg-red-100' };
    if (current > required) return { status: 'excess', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { status: 'optimal', color: 'text-green-600', bgColor: 'bg-green-100' };
  };

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

  const upcomingTrainings = personnel.filter(p => p.nextTraining);
  const upcomingDeployments = personnel.filter(p => p.nextDeployment);
  const highDropoutRisk = personnel.filter(p => p.dropoutRisk > 70);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <MapPin className="h-6 w-6" />
            {barracks.name}
          </DialogTitle>
          <div className="text-gray-600">
            {barracks.regiment} • {barracks.region}
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Oversigt</TabsTrigger>
            <TabsTrigger value="personnel">Personel</TabsTrigger>
            <TabsTrigger value="development">Udvikling</TabsTrigger>
            <TabsTrigger value="training">Træning</TabsTrigger>
            <TabsTrigger value="deployment">Udsendelse</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Resource Status */}
            {resources && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Ressource Status
                    </div>
                    {onResourceAllocation && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={onResourceAllocation}
                      >
                        <ArrowLeftRight className="h-4 w-4 mr-2" />
                        Alloker Ressourcer
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { 
                      title: 'SSG', 
                      current: resources.currentSSG, 
                      required: resources.requiredSSG,
                      icon: '🔹'
                    },
                    { 
                      title: 'Befalingsmænd', 
                      current: resources.currentBefalingsmaend, 
                      required: resources.requiredBefalingsmaend,
                      icon: '🔸'
                    },
                    { 
                      title: 'Officerer', 
                      current: resources.currentOfficerer, 
                      required: resources.requiredOfficerer,
                      icon: '🔺'
                    }
                  ].map(({ title, current, required, icon }) => {
                    const status = getResourceStatus(current, required);
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
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{personnel.length}</div>
                  <div className="text-sm text-gray-600">Totalt Personel</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {personnel.filter(p => p.status === 'Active').length}
                  </div>
                  <div className="text-sm text-gray-600">Aktive</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {upcomingTrainings.length}
                  </div>
                  <div className="text-sm text-gray-600">Kommende Træning</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {highDropoutRisk.length}
                  </div>
                  <div className="text-sm text-gray-600">Høj Frafaldsrisiko</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="personnel" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personel Liste</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {personnel.map((person) => (
                    <div key={person.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{getRankIcon(person.rank)}</span>
                        <div>
                          <div className="font-medium">{person.name}</div>
                          <div className="text-sm text-gray-600">
                            {person.rank} • {person.specialization} • {person.experience} år
                          </div>
                          <div className="text-xs text-gray-500">
                            {person.currentQualifications.join(', ')}
                          </div>
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
                        {onDeploymentPlanning && person.nextDeployment && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onDeploymentPlanning(person)}
                            className="ml-2"
                          >
                            <Target className="h-3 w-3 mr-1" />
                            Planlæg Udsendelse
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="development" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Personel Udvikling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {personnel.map((person) => (
                    <div key={person.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold flex items-center gap-2">
                            <span className="text-lg">{getRankIcon(person.rank)}</span>
                            {person.name}
                          </h3>
                          <p className="text-sm text-gray-600">{person.specialization}</p>
                        </div>
                        <Badge variant={person.dropoutRisk > 70 ? 'destructive' : person.dropoutRisk > 40 ? 'secondary' : 'default'}>
                          {person.dropoutRisk}% frafaldsrisiko
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Career Progression */}
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-1">
                            <Award className="h-4 w-4" />
                            Karriere Udvikling
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-600">Nuværende niveau:</span>
                              <span className="ml-2 font-medium">{person.careerProgression.currentLevel}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Næste niveau:</span>
                              <span className="ml-2 font-medium">{person.careerProgression.nextLevel}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Måneder til forfremmelse:</span>
                              <span className="ml-2 font-medium">{person.careerProgression.monthsToPromotion}</span>
                            </div>
                          </div>
                        </div>

                        {/* Performance Metrics */}
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-1">
                            <BarChart3 className="h-4 w-4" />
                            Performance
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Skydebane:</span>
                              <span className="font-medium">{person.performanceMetrics.shootingAccuracy}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Fysisk form:</span>
                              <span className="font-medium">{person.performanceMetrics.physicalFitness}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Lederevne:</span>
                              <span className="font-medium">{person.performanceMetrics.leadershipScore}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Teamarbejde:</span>
                              <span className="font-medium">{person.performanceMetrics.teamworkScore}%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Training History */}
                      <div className="mt-4">
                        <h4 className="font-medium mb-2 flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          Træningshistorik
                        </h4>
                        <div className="space-y-1">
                          {person.trainingHistory.map((training, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{training.course}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-600">{training.completed.toLocaleDateString('da-DK')}</span>
                                <Badge variant="outline" className="text-xs">
                                  {training.grade}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Træningsplanlægning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Kommende Føringskurser</h3>
                    <div className="space-y-2">
                      {upcomingTrainings.map((person) => (
                        <div key={person.id} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-2">
                            <span>{getRankIcon(person.rank)}</span>
                            <span className="font-medium">{person.name}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {person.nextTraining?.toLocaleDateString('da-DK')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deployment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Udsendelsesplanlægning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Planlagte Udsendelser</h3>
                    <div className="space-y-2">
                      {upcomingDeployments.map((person) => (
                        <div key={person.id} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-2">
                            <span>{getRankIcon(person.rank)}</span>
                            <span className="font-medium">{person.name}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {person.nextDeployment?.toLocaleDateString('da-DK')}
                          </div>
                        </div>
                      ))}
                    </div>
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
