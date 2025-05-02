"use client";

import React, { useState } from "react";
import { useResume } from "@/contexts/ResumeContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/common/ui/tabs";
import { Card, CardContent } from "@/components/common/ui/card";
import { 
  ResumeDataKeysWithEntries, 
  entityMetadata,
  ResumeDataWithEntries
} from "@/types/resume";
import { AboutForm } from "./forms/AboutForm";
import { EntitiesList } from "./EntitiesList";
import { EntityForm } from "./forms/EntityForm";

export function Editor() {
  const { data, updateData } = useResume();
  const [activeTab, setActiveTab] = useState<ResumeDataKeysWithEntries | 'about'>('about');
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);

  const handleTabChange = (value: string) => {
    setActiveTab(value as ResumeDataKeysWithEntries | 'about');
    setSelectedEntityId(null);
  };

  const handleEntitySelect = (id: string) => {
    setSelectedEntityId(id);
  };

  const handleBackToList = () => {
    setSelectedEntityId(null);
  };

  const getSelectedEntity = (): ResumeDataWithEntries | null => {
    if (!selectedEntityId || activeTab === 'about') return null;
    
    const entries = data[activeTab].entries;
    return entries.find(entry => entry.id === selectedEntityId) || null;
  };

  return (
    <Card className="w-full">
      <CardContent>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4 ">
            {Object.keys(entityMetadata).map((key) => (
              <TabsTrigger key={key} value={key} className="flex items-center gap-1 px-2 py-1.5 text-xs sm:text-sm sm:px-3 sm:py-2">
                {React.createElement(entityMetadata[key as keyof typeof entityMetadata].icon, { className: " w-3 sm:h-4 sm:w-4" })}
                <span className="truncate">{entityMetadata[key as keyof typeof entityMetadata].title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="about" className="space-y-4">
            {data.about && <AboutForm data={data.about} />}
          </TabsContent>
          
          {(Object.keys(entityMetadata) as Array<ResumeDataKeysWithEntries | 'about'>)
            .filter(key => key !== 'about')
            .map((key) => (
              <TabsContent key={key} value={key} className="space-y-4">
                {selectedEntityId ? (
                  <EntityForm 
                    type={key as ResumeDataKeysWithEntries}
                    data={getSelectedEntity() as ResumeDataWithEntries}
                    onUpdate={(updatedData) => {
                      updateData(key as ResumeDataKeysWithEntries, updatedData);
                      handleBackToList();
                    }}
                  />
                ) : (
                  <EntitiesList 
                    entityType={key as ResumeDataKeysWithEntries}
                    onSelect={handleEntitySelect}
                  />
                )}
              </TabsContent>
            ))
          }
        </Tabs>
      </CardContent>
    </Card>
  );
}