import { useState } from "react";

type Trigger = {
  id: string;
  event: any;
  eventByPercentage: number;
  action: any;
  actionByPercentage: number;
  color: string;
};

const COLOR_DISTRIBUTION: Record<number, number[]> = {
  1: [1],
  2: [1, 9],
  3: [1, 4, 9],
  4: [1, 3, 7, 9],
  5: [1, 3, 6, 8, 9],
  6: [1, 2, 4, 6, 8, 9],
  7: [1, 2, 3, 4, 6, 8, 9],
  8: [1, 2, 3, 4, 6, 7, 8, 9],
  9: [1, 2, 3, 4, 5, 6, 7, 8, 9],
};

const getColorVar = (index: number): string =>
  index < 5
    ? `var(--traffic-light-danger${index}-light-color)`
    : index === 5
      ? "var(--traffic-light-neutral-light-color)"
      : `var(--traffic-light-safe${index - 5}-light-color)`;

const assignColorsToTriggers = (currentTriggers: Trigger[]): Trigger[] => {
  const count = currentTriggers.length;
  if (count === 0) return [];
  const colorIndices = COLOR_DISTRIBUTION[count] || COLOR_DISTRIBUTION[9];
  return currentTriggers.map((trigger, index) =>
    trigger.action === "Don't"
      ? trigger
      : { ...trigger, color: getColorVar(colorIndices[index]) }
  );
};

const sortTriggers = (currentTriggers: Trigger[]): Trigger[] => {
  return [...currentTriggers].sort((a, b) => {
    const getPriority = (t: Trigger) => {
      if (t.action === "Don't") return 2;
      else if (t.event === "Price rise") return 1;
      else if (t.event === "Price drop") return 3;
      return 4;
    };
    const priorityA = getPriority(a);
    const priorityB = getPriority(b);
    if (priorityA !== priorityB) return priorityA - priorityB;
    if (priorityA === 1) return b.eventByPercentage - a.eventByPercentage;
    if (priorityA === 3) return a.eventByPercentage - b.eventByPercentage;
    return 0;
  });
};

export const useTrafficLightForm = (initialTriggers: Trigger[]) => {
  // Initialize with sorted and colored triggers
  const initializeTriggersWithColors = () => {
    const sorted = sortTriggers(initialTriggers);
    return assignColorsToTriggers(sorted);
  };

  const [triggers, setTriggersState] = useState<Trigger[]>(initializeTriggersWithColors());

  const reassignColors = (currentTriggers: Trigger[]) => {
    const coloredTriggers = assignColorsToTriggers(currentTriggers);
    setTriggersState(coloredTriggers);
  };

  const setTriggers = (newTriggers: Trigger[]) => {
    setTriggersState(newTriggers);
  };

  const addTrigger = () => {
    if (triggers.length >= 9) {
      return;
    }
    const newTrigger: Trigger = {
      id: crypto.randomUUID(),
      event: "Price drop" as any,
      eventByPercentage: 5,
      action: "more" as any,
      actionByPercentage: 5,
      color: "",
    };
    const newTriggersList = [...triggers, newTrigger];
    const sortedTriggers = sortTriggers(newTriggersList);
    reassignColors(sortedTriggers);
  };

  const deleteTrigger = (index: number) => {
    const newTriggers = triggers.filter((_, i) => i !== index);
    const sortedTriggers = sortTriggers(newTriggers);
    reassignColors(sortedTriggers);
  };

  const handleTriggerChange = (index: number, field: string, value: any) => {
    const updatedTriggers = triggers.map((trigger, i) => {
      if (i !== index) return trigger;
      const updatedTrigger = { ...trigger, [field]: value };
      if (field === "action" && value === "Don't") {
        updatedTrigger.color = "var(--traffic-light-neutral-light-color)";
      }
      return updatedTrigger;
    });
    const sorted = sortTriggers(updatedTriggers);
    reassignColors(sorted);
  };

  return {
    triggers,
    setTriggers,
    addTrigger,
    deleteTrigger,
    handleTriggerChange,
    reassignColors,
    sortTriggers: (t: Trigger[]) => sortTriggers(t),
  };
};


