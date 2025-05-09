"use client";

import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";

import { Card, CardContent } from "@/components/common/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/ui/tabs";
import { useResume } from "@/contexts/ResumeContext";
import { getEntity } from "@/lib/entityUtils";
import {
  entityMetadata,
  ResumeDataKeysWithEntries,
  ResumeDataWithEntries,
} from "@/types/resume";

import { EntitiesList } from "./EntitiesList";
import { EntityForm } from "./forms/EntityForm";

export function Editor() {
  const { data, updateData } = useResume();
  const [activeTab, setActiveTab] =
    useState<ResumeDataKeysWithEntries>("about");
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);

  const handleTabChange = (value: string) => {
    setActiveTab(value as ResumeDataKeysWithEntries);
    setSelectedEntityId(null);
  };

  const handleEntitySelect = (id: string) => {
    setSelectedEntityId(id);
  };

  const handleBackToList = () => {
    setSelectedEntityId(null);
  };

  const getSelectedEntity = (): ResumeDataWithEntries | null => {
    return getEntity(data, activeTab, selectedEntityId);
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
                className="cursor-pointer inline-flex items-center font-medium leading-tight text-slate-700 dark:text-slate-50 group back-button"
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
                <Select value={activeTab} onValueChange={handleTabChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(entityMetadata).map((key) => (
                      <SelectItem key={key} value={key}>
                        <span className="flex items-center gap-1.5">
                          {React.createElement(
                            entityMetadata[key as keyof typeof entityMetadata]
                              .icon,
                            { className: "h-3.5 w-3.5" }
                          )}
                          <span>
                            {
                              entityMetadata[key as keyof typeof entityMetadata]
                                .title
                            }
                          </span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <TabsList className="hidden sm:flex sm:flex-wrap sm:gap-1 editor-tabs">
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
