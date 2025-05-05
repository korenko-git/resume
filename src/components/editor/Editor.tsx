"use client";

import React, { useState } from "react";
import { useResume } from "@/contexts/ResumeContext";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/ui/tabs";
import { Card, CardContent } from "@/components/common/ui/card";
import {
  ResumeDataKeysWithEntries,
  entityMetadata,
  ResumeDataWithEntries,
} from "@/types/resume";
import { EntitiesList } from "./EntitiesList";
import { EntityForm } from "./forms/EntityForm";
import { ArrowLeft } from "lucide-react";

export function Editor() {
  const { data, updateData } = useResume();
  const [activeTab, setActiveTab] = useState<
    ResumeDataKeysWithEntries | "about"
  >("about");
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);

  const handleTabChange = (value: string) => {
    setActiveTab(value as ResumeDataKeysWithEntries | "about");
    setSelectedEntityId(null);
  };

  const handleEntitySelect = (id: string) => {
    setSelectedEntityId(id);
  };

  const handleBackToList = () => {
    setSelectedEntityId(null);
  };

  const getSelectedEntity = (): ResumeDataWithEntries | null => {
    if (!selectedEntityId) return null;

    const entries = data[activeTab].entries;
    return entries.find((entry) => entry.id === selectedEntityId) || null;
  };

  return (
    <Card className="w-full border-0 shadow-none sm:border-1 sm:shadow">
      <CardContent className="px-0 sm:px-6">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          {selectedEntityId ? (
            <div className="mb-4">
              <button
                onClick={handleBackToList}
                className="cursor-pointer inline-flex items-center font-medium leading-tight text-slate-700 dark:text-slate-50 group"
              >
                <span className="whitespace-nowrap">
                  <ArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-2" />
                </span>
                <span className="border-b border-blue-300 lg:border-transparent pb-px transition group-hover:border-blue-300 motion-reduce:transition-none">
                  Back to list
                </span>
              </button>
            </div>
          ) : (
            <div className="mb-4">
              <div className="block sm:hidden">
                <label
                  htmlFor="section-select"
                  className="block text-sm font-medium mb-1"
                >
                  Select section
                </label>
                <select
                  id="section-select"
                  value={activeTab}
                  onChange={(e) => handleTabChange(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  {Object.keys(entityMetadata).map((key) => (
                    <option key={key} value={key}>
                      {entityMetadata[key as keyof typeof entityMetadata].title}
                    </option>
                  ))}
                </select>
              </div>

              <TabsList className="hidden sm:flex sm:flex-wrap sm:gap-1">
                {Object.keys(entityMetadata).map((key) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs whitespace-nowrap"
                  >
                    {React.createElement(
                      entityMetadata[key as keyof typeof entityMetadata].icon,
                      { className: "h-3.5 w-3.5" }
                    )}
                    <span>
                      {entityMetadata[key as keyof typeof entityMetadata].title}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          )}

          {(
            Object.keys(entityMetadata) as Array<ResumeDataKeysWithEntries>
          ).map((key) => (
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
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
