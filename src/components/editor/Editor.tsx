"use client";

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
  EditorTabKey,
  entityMetadata,
  ResumeDataKeysWithEntries,
  ResumeDataWithEntries,
} from "@/types/resume";

import { OutlineLinkButton } from "../common/OutlineLinkButton";
import { SkillsManager } from "./controls/SkillsManager";
import { WelcomeTour } from "./dialogs/WelcomeTour";
import { EntitiesList } from "./EntitiesList";
import { EntityForm } from "./forms/EntityForm";

export function Editor() {
  const { data, updateData } = useResume();
  const [activeTab, setActiveTab] = useState<EditorTabKey>("about");
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);

  const handleTabChange = (value: string) => {
    setActiveTab(value as EditorTabKey);
    setSelectedEntityId(null);
  };

  const handleEntitySelect = (id: string) => {
    setSelectedEntityId(id);
  };

  const handleBackToList = () => {
    setSelectedEntityId(null);
  };

  const getSelectedEntity = (): ResumeDataWithEntries | null => {
    return getEntity(
      data,
      activeTab as ResumeDataKeysWithEntries,
      selectedEntityId,
    );
  };

  function renderContent(key: EditorTabKey) {
    if (selectedEntityId) {
      return (
        <EntityForm
          type={key as ResumeDataKeysWithEntries}
          data={getSelectedEntity() as ResumeDataWithEntries}
          onUpdate={(updatedData) => {
            updateData(key as ResumeDataKeysWithEntries, updatedData);
            handleBackToList();
          }}
        />
      );
    }

    if (key === "skills") {
      return <SkillsManager />;
    }

    return (
      <EntitiesList
        entityType={key as ResumeDataKeysWithEntries}
        onSelect={handleEntitySelect}
      />
    );
  }

  return (
    <Card className="sm:border-border w-full border-0 shadow-none sm:border sm:shadow">
      <CardContent className="px-0 sm:px-6">
        <div className="relative flex items-center justify-end">
          <WelcomeTour
            isEntityFormOpen={!!selectedEntityId && activeTab !== "skills"}
          />
        </div>
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          {selectedEntityId ? (
            <div className="mb-4">
              <OutlineLinkButton
                as="button"
                isLeftArrow
                aria-label="Go back to entities list"
                className="border-0!"
                onClick={handleBackToList}
              >
                Back to list
              </OutlineLinkButton>
            </div>
          ) : (
            <div className="mb-4">
              <div className="mobile-section-select block sm:hidden">
                <label
                  htmlFor="section-select"
                  className="text-foreground mb-1 block text-sm font-medium"
                >
                  Select section
                </label>
                <Select value={activeTab} onValueChange={handleTabChange}>
                  <SelectTrigger id="section-select" className="w-full">
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(entityMetadata).map((key) => (
                      <SelectItem key={key} value={key}>
                        <span className="flex items-center gap-1.5">
                          {React.createElement(
                            entityMetadata[key as EditorTabKey].icon,
                            { className: "h-3.5 w-3.5" },
                          )}
                          <span>
                            {entityMetadata[key as EditorTabKey].title}
                          </span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <TabsList className="editor-tabs hidden sm:flex sm:flex-wrap sm:gap-1">
                {Object.keys(entityMetadata).map((key) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs whitespace-nowrap"
                  >
                    {React.createElement(
                      entityMetadata[key as EditorTabKey].icon,
                      { className: "h-3.5 w-3.5" },
                    )}
                    <span>{entityMetadata[key as EditorTabKey].title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          )}

          {(Object.keys(entityMetadata) as Array<EditorTabKey>).map((key) => (
            <TabsContent key={key} value={key} className="space-y-4">
              {renderContent(key)}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
