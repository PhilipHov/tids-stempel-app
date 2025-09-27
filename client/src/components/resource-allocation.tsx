import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Users, 
  ArrowRight, 
  MapPin, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Target,
  Calendar,
  TrendingUp,
  ArrowLeftRight
} from 'lucide-react';

interface ResourceAllocationProps {
  isOpen: boolean;
  onClose: () => void;
  requestingBarracks: {
    id: string;
    name: string;
    location: string;
    regiment: string;
    shortage: {
      SSG: number;
      Befalingsmaend: number;
      Officerer: number;
    };
  };
  availableResources: Array<{
    barracksId: string;
    barracksName: string;
    location: string;
    excess: {
      SSG: number;
      Befalingsmaend: number;
      Officerer: number;
    };
    distance: number; // km
    transferTime: number; // hours
  }>;
}

export function ResourceAllocation({ 
  isOpen, 
  onClose, 
  requestingBarracks, 
  availableResources 
}: ResourceAllocationProps) {
  const [selectedAllocations, setSelectedAllocations] = useState<Array<{
    barracksId: string;
    resourceType: 'SSG' | 'Befalingsmaend' | 'Officerer';
    amount: number;
    priority: number;
  }>>([]);

  const handleAllocationSelect = (barracksId: string, resourceType: 'SSG' | 'Befalingsmaend' | 'Officerer', amount: number) => {
    setSelectedAllocations(prev => {
      const existing = prev.find(a => a.barracksId === barracksId && a.resourceType === resourceType);
      if (existing) {
        return prev.map(a => 
          a.barracksId === barracksId && a.resourceType === resourceType
            ? { ...a, amount }
            : a
        );
      }
      return [...prev, { barracksId, resourceType, amount, priority: 1 }];
    });
  };

  const getTotalAllocated = (resourceType: 'SSG' | 'Befalingsmaend' | 'Officerer') => {
    return selectedAllocations
      .filter(a => a.resourceType === resourceType)
      .reduce((sum, a) => sum + a.amount, 0);
  };

  const getShortageStatus = (resourceType: 'SSG' | 'Befalingsmaend' | 'Officerer') => {
    const shortage = requestingBarracks.shortage[resourceType];
    const allocated = getTotalAllocated(resourceType);
    return {
      shortage,
      allocated,
      remaining: shortage - allocated,
      percentage: Math.round((allocated / shortage) * 100)
    };
  };

  const generateAllocationPlan = () => {
    const plan = selectedAllocations.map(allocation => {
      const sourceBarracks = availableResources.find(r => r.barracksId === allocation.barracksId);
      return {
        from: sourceBarracks?.barracksName || 'Unknown',
        to: requestingBarracks.name,
        resource: allocation.resourceType,
        amount: allocation.amount,
        estimatedTransferTime: sourceBarracks?.transferTime || 0,
        priority: allocation.priority
      };
    });

    // Sort by priority and transfer time
    return plan.sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      return a.estimatedTransferTime - b.estimatedTransferTime;
    });
  };

  const allocationPlan = generateAllocationPlan();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <ArrowLeftRight className="h-6 w-6" />
            Ressource Allokering
          </DialogTitle>
          <div className="text-gray-600">
            Forslag til ressource fordeling for {requestingBarracks.name}
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Oversigt</TabsTrigger>
            <TabsTrigger value="allocation">Allokering</TabsTrigger>
            <TabsTrigger value="plan">Plan</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Shortage Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Ressource Mangler
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(['SSG', 'Befalingsmaend', 'Officerer'] as const).map((resourceType) => {
                  const status = getShortageStatus(resourceType);
                  return (
                    <div key={resourceType} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">
                            {resourceType === 'SSG' ? '🔹' : resourceType === 'Befalingsmaend' ? '🔸' : '🔺'}
                          </span>
                          <span className="font-medium">{resourceType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-red-600 font-bold">
                            Mangler: {status.shortage}
                          </span>
                          <Badge variant={status.remaining === 0 ? 'default' : 'destructive'}>
                            {status.percentage}% dækket
                          </Badge>
                        </div>
                      </div>
                      <Progress value={status.percentage} className="h-2" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Available Resources Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  Tilgængelige Ressourcer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {availableResources.slice(0, 3).map((resource) => (
                    <div key={resource.barracksId} className="border rounded-lg p-3">
                      <div className="font-medium">{resource.barracksName}</div>
                      <div className="text-sm text-gray-600">{resource.location}</div>
                      <div className="text-sm text-gray-600">{resource.distance} km væk</div>
                      <div className="mt-2 space-y-1">
                        {resource.excess.SSG > 0 && (
                          <div className="text-xs flex justify-between">
                            <span>SSG:</span>
                            <span className="text-green-600">+{resource.excess.SSG}</span>
                          </div>
                        )}
                        {resource.excess.Befalingsmaend > 0 && (
                          <div className="text-xs flex justify-between">
                            <span>Befalingsmænd:</span>
                            <span className="text-green-600">+{resource.excess.Befalingsmaend}</span>
                          </div>
                        )}
                        {resource.excess.Officerer > 0 && (
                          <div className="text-xs flex justify-between">
                            <span>Officerer:</span>
                            <span className="text-green-600">+{resource.excess.Officerer}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allocation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vælg Ressource Allokering</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {availableResources.map((resource) => (
                    <div key={resource.barracksId} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">{resource.barracksName}</h3>
                          <div className="text-sm text-gray-600 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {resource.location} • {resource.distance} km • {resource.transferTime}t
                          </div>
                        </div>
                        <Badge variant="outline" className="text-green-600">
                          Tilgængelig
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        {(['SSG', 'Befalingsmaend', 'Officerer'] as const).map((resourceType) => {
                          const available = resource.excess[resourceType];
                          const shortage = requestingBarracks.shortage[resourceType];
                          const maxTransfer = Math.min(available, shortage);
                          
                          return (
                            <div key={resourceType} className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">
                                  {resourceType === 'SSG' ? '🔹' : resourceType === 'Befalingsmaend' ? '🔸' : '🔺'}
                                </span>
                                <span className="font-medium text-sm">{resourceType}</span>
                              </div>
                              <div className="text-xs text-gray-600">
                                Tilgængelig: {available}
                              </div>
                              {maxTransfer > 0 && (
                                <div className="space-y-1">
                                  {[1, 2, 3].filter(n => n <= maxTransfer).map((amount) => (
                                    <Button
                                      key={amount}
                                      size="sm"
                                      variant={selectedAllocations.some(a => 
                                        a.barracksId === resource.barracksId && 
                                        a.resourceType === resourceType && 
                                        a.amount === amount
                                      ) ? "default" : "outline"}
                                      className="w-full text-xs"
                                      onClick={() => handleAllocationSelect(resource.barracksId, resourceType, amount)}
                                    >
                                      {amount} {resourceType === 'SSG' ? 'SSG' : resourceType === 'Befalingsmaend' ? 'Bef.' : 'Off.'}
                                    </Button>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
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
                  <Calendar className="h-5 w-5" />
                  Allokeringsplan
                </CardTitle>
              </CardHeader>
              <CardContent>
                {allocationPlan.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      {allocationPlan.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-medium">
                                {item.amount} {item.resource} fra {item.from}
                              </div>
                              <div className="text-sm text-gray-600">
                                Prioritet: {item.priority} • Estimeret tid: {item.estimatedTransferTime}t
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                          <div className="text-right">
                            <div className="font-medium">{item.to}</div>
                            <div className="text-sm text-gray-600">
                              {new Date(Date.now() + item.estimatedTransferTime * 60 * 60 * 1000).toLocaleDateString('da-DK')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-4 border-t">
                      <Button className="flex-1">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Godkend Plan
                      </Button>
                      <Button variant="outline" onClick={onClose}>
                        Annuller
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Vælg ressource allokering for at se planen</p>
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
