import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar } from './ui/calendar';
import { 
  Target, 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  ArrowRight,
  X
} from 'lucide-react';

interface DeploymentPlanningProps {
  isOpen: boolean;
  onClose: () => void;
  personnel: {
    id: string;
    name: string;
    rank: 'SSG' | 'Befalingsmand' | 'Officer';
    specialization: string;
    experience: number;
    currentQualifications: string[];
    deploymentDate: Date;
    deploymentLocation: string;
  };
}

interface Requirement {
  id: string;
  name: string;
  type: 'Shooting' | 'Training' | 'Medical' | 'Leadership' | 'Specialized';
  description: string;
  location: string;
  duration: number; // hours
  prerequisites: string[];
  completed: boolean;
  deadline: Date;
  priority: 'High' | 'Medium' | 'Low';
}

interface TrainingSlot {
  id: string;
  name: string;
  type: string;
  location: string;
  startDate: Date;
  endDate: Date;
  capacity: number;
  available: number;
  instructors: string[];
}

export function DeploymentPlanning({ isOpen, onClose, personnel }: DeploymentPlanningProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTrainingSlots, setSelectedTrainingSlots] = useState<string[]>([]);

  // Mock requirements based on deployment
  const requirements: Requirement[] = [
    {
      id: '1',
      name: 'Skydebane Kvalifikation',
      type: 'Shooting',
      description: 'Minimum 85% træfsikkerhed på 300m',
      location: 'Aalborg Skydebane',
      duration: 8,
      prerequisites: ['Grundlæggende Våbenhåndtering'],
      completed: false,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      priority: 'High'
    },
    {
      id: '2',
      name: 'Førstehjælp Kursus',
      type: 'Medical',
      description: 'Militær førstehjælp og traumabehandling',
      location: 'København Enhed',
      duration: 16,
      prerequisites: ['Grundlæggende Medicin'],
      completed: true,
      deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      priority: 'High'
    },
    {
      id: '3',
      name: 'Føringskursus',
      type: 'Leadership',
      description: 'Taktisk ledelse og beslutningstagning',
      location: 'Aarhus Enhed',
      duration: 40,
      prerequisites: ['Officer Rang', 'Minimum 2 års erfaring'],
      completed: false,
      deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      priority: 'High'
    },
    {
      id: '4',
      name: 'Øvelse: Urban Warfare',
      type: 'Training',
      description: 'Træning i bykampsituationer',
      location: 'Øvelsesterræn Oksbøl',
      duration: 72,
      prerequisites: ['Skydebane Kvalifikation', 'Førstehjælp Kursus'],
      completed: false,
      deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      priority: 'Medium'
    }
  ];

  // Mock training slots
  const trainingSlots: TrainingSlot[] = [
    {
      id: '1',
      name: 'Skydebane Kvalifikation',
      type: 'Shooting',
      location: 'Aalborg Skydebane',
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
      capacity: 12,
      available: 8,
      instructors: ['Kaptajn Hansen', 'Løjtnant Larsen']
    },
    {
      id: '2',
      name: 'Føringskursus',
      type: 'Leadership',
      location: 'Aarhus Enhed',
      startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      capacity: 20,
      available: 15,
      instructors: ['Oberst Nielsen', 'Major Andersen']
    },
    {
      id: '3',
      name: 'Urban Warfare Øvelse',
      type: 'Training',
      location: 'Øvelsesterræn Oksbøl',
      startDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 48 * 24 * 60 * 60 * 1000),
      capacity: 30,
      available: 12,
      instructors: ['Kaptajn Møller', 'Løjtnant Sørensen']
    }
  ];

  const completedRequirements = requirements.filter(r => r.completed).length;
  const totalRequirements = requirements.length;
  const completionPercentage = Math.round((completedRequirements / totalRequirements) * 100);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Shooting': return '🎯';
      case 'Training': return '🏃';
      case 'Medical': return '🏥';
      case 'Leadership': return '👑';
      case 'Specialized': return '⭐';
      default: return '📋';
    }
  };

  const generateTrainingPlan = () => {
    const plan = selectedTrainingSlots.map(slotId => {
      const slot = trainingSlots.find(s => s.id === slotId);
      return slot;
    }).filter(Boolean);

    return plan.sort((a, b) => a!.startDate.getTime() - b!.startDate.getTime());
  };

  const trainingPlan = generateTrainingPlan();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Target className="h-6 w-6" />
            Udsendelse Planlægning
          </DialogTitle>
          <div className="text-gray-600">
            Træningsplan for {personnel.name} - Udsendelse til {personnel.deploymentLocation}
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Oversigt</TabsTrigger>
            <TabsTrigger value="requirements">Krav</TabsTrigger>
            <TabsTrigger value="booking">Booking</TabsTrigger>
            <TabsTrigger value="plan">Plan</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Personnel Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Personel Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Navn</div>
                    <div className="font-semibold">{personnel.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Rang</div>
                    <div className="font-semibold">{personnel.rank}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Specialisering</div>
                    <div className="font-semibold">{personnel.specialization}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Erfaring</div>
                    <div className="font-semibold">{personnel.experience} år</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deployment Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Udsendelse Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Destination</div>
                    <div className="font-semibold">{personnel.deploymentLocation}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Udsendelsesdato</div>
                    <div className="font-semibold">
                      {personnel.deploymentDate.toLocaleDateString('da-DK')}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Dage til udsendelse</div>
                    <div className="font-semibold">
                      {Math.ceil((personnel.deploymentDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} dage
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Fremgang
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Krav Opfyldt</span>
                    <span className="font-bold text-blue-600">
                      {completedRequirements}/{totalRequirements}
                    </span>
                  </div>
                  <Progress value={completionPercentage} className="h-3" />
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{completedRequirements}</div>
                    <div className="text-sm text-gray-600">Fuldført</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">{totalRequirements - completedRequirements}</div>
                    <div className="text-sm text-gray-600">Mangler</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{completionPercentage}%</div>
                    <div className="text-sm text-gray-600">Procent</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Krav og Kvalifikationer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requirements.map((requirement) => (
                    <div key={requirement.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getTypeIcon(requirement.type)}</span>
                          <div>
                            <h3 className="font-semibold">{requirement.name}</h3>
                            <p className="text-sm text-gray-600">{requirement.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(requirement.priority)}>
                            {requirement.priority}
                          </Badge>
                          {requirement.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Lokation</div>
                          <div className="font-medium">{requirement.location}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Varighed</div>
                          <div className="font-medium">{requirement.duration} timer</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Deadline</div>
                          <div className="font-medium">
                            {requirement.deadline.toLocaleDateString('da-DK')}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Forudsætninger</div>
                          <div className="font-medium">{requirement.prerequisites.join(', ')}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="booking" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Træningsbooking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trainingSlots.map((slot) => (
                    <div key={slot.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{slot.name}</h3>
                          <div className="text-sm text-gray-600 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {slot.location}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={slot.available > 0 ? 'default' : 'destructive'}>
                            {slot.available}/{slot.capacity} ledige
                          </Badge>
                          <Button
                            size="sm"
                            variant={selectedTrainingSlots.includes(slot.id) ? "default" : "outline"}
                            disabled={slot.available === 0}
                            onClick={() => {
                              if (selectedTrainingSlots.includes(slot.id)) {
                                setSelectedTrainingSlots(prev => prev.filter(id => id !== slot.id));
                              } else {
                                setSelectedTrainingSlots(prev => [...prev, slot.id]);
                              }
                            }}
                          >
                            {selectedTrainingSlots.includes(slot.id) ? 'Valgt' : 'Vælg'}
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Start</div>
                          <div className="font-medium">
                            {slot.startDate.toLocaleDateString('da-DK')}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Slut</div>
                          <div className="font-medium">
                            {slot.endDate.toLocaleDateString('da-DK')}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Type</div>
                          <div className="font-medium">{slot.type}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Instruktører</div>
                          <div className="font-medium">{slot.instructors.join(', ')}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plan" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Træningsplan
                </CardTitle>
              </CardHeader>
              <CardContent>
                {trainingPlan.length > 0 ? (
                  <div className="space-y-4">
                    <div className="space-y-4">
                      {trainingPlan.map((slot, index) => (
                        <div key={slot!.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-semibold">{slot!.name}</div>
                              <div className="text-sm text-gray-600">
                                {slot!.location} • {slot!.type}
                              </div>
                              <div className="text-sm text-gray-600">
                                {slot!.startDate.toLocaleDateString('da-DK')} - {slot!.endDate.toLocaleDateString('da-DK')}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {slot!.available} ledige pladser
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedTrainingSlots(prev => prev.filter(id => id !== slot!.id))}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex gap-2">
                        <Button className="flex-1">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Bekræft Booking
                        </Button>
                        <Button variant="outline" onClick={onClose}>
                          Annuller
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Vælg træningsslots for at se planen</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
