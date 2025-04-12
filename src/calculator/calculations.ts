import { TimeCalculationInput, TimeUnit } from "./TimeCalculationInput";
import { Duration } from "luxon";

function getTimeUnitMultiplier(from: TimeUnit, to: TimeUnit): number {
    const timeUnitInDays: Record<TimeUnit, number> = {
        [TimeUnit.Second]: 1 / (3600 * 24),
        [TimeUnit.Minute]: 1 / (60 * 24),
        [TimeUnit.Hour]: 1 / 24,
        [TimeUnit.Day]: 1,
        [TimeUnit.Week]: 7,
        [TimeUnit.Month]: 30,
        [TimeUnit.Year]: 365
    };

    const fromInDays = timeUnitInDays[from];
    const toInDays = timeUnitInDays[to];

    if (fromInDays === undefined || toInDays === undefined) {
        throw new Error(`Unknown time unit: from=${from}, to=${to}`);
    }

    return (fromInDays / toInDays);
}

function taskDurationtoDuration(taskDurationValue: number, taskDurationUnit: TimeUnit): Duration {
    switch(taskDurationUnit) {
        case TimeUnit.Second:
            return Duration.fromObject({ seconds: taskDurationValue });
        case TimeUnit.Minute:
            return Duration.fromObject({ minutes: taskDurationValue });
        case TimeUnit.Hour:   
            return Duration.fromObject({ hours: taskDurationValue });
        case TimeUnit.Day:
            return Duration.fromObject({ days: taskDurationValue });
        default:
            throw new Error(`Unknown task duration unit: ${taskDurationUnit}`)
    }
}


export function calculatePotentialSavedTime(calculationInput: TimeCalculationInput): number {
    const horizonInFrequencyUnits = calculationInput.horizonValue * getTimeUnitMultiplier(calculationInput.horizonUnit, calculationInput.frequencyUnit);
    const taskOccurenceCount = horizonInFrequencyUnits * calculationInput.frequencyValue;
    return Math.trunc(taskDurationtoDuration(calculationInput.taskDuration, calculationInput.taskDurationUnit).as("seconds") * taskOccurenceCount);
}
