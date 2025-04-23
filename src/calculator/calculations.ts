import { TimeCalculationInput, TimeUnit } from "./TimeCalculationInput";
import { Duration } from "luxon";

function formDurationToLuxonDuration(formDurationValue: number, formDurationUnit: TimeUnit): Duration {
    switch(formDurationUnit) {
        case TimeUnit.Second:
            return Duration.fromObject({ seconds: formDurationValue });
        case TimeUnit.Minute:
            return Duration.fromObject({ minutes: formDurationValue });
        case TimeUnit.Hour:   
            return Duration.fromObject({ hours: formDurationValue });
        case TimeUnit.Day:
            return Duration.fromObject({ days: formDurationValue });
        case TimeUnit.Week:
            return Duration.fromObject({ weeks: formDurationValue });
        case TimeUnit.Month:
            return Duration.fromObject({ months: formDurationValue });
        case TimeUnit.Year:
            return Duration.fromObject({ years: formDurationValue });
        default:
            throw new Error(`Unknown task duration unit: ${formDurationUnit}`)
    }
}

function isTaskDurationAchievableForFrequency(calculationInput: TimeCalculationInput): boolean {
    const taskDurationInFrequencyUnits = formDurationToLuxonDuration(calculationInput.taskDuration, calculationInput.taskDurationUnit).as(calculationInput.frequencyUnit);
    return taskDurationInFrequencyUnits * calculationInput.frequencyValue <= 1;
}

function assertTimeCalculationInput(calculationInput: TimeCalculationInput): void {
    if (!isTaskDurationAchievableForFrequency(calculationInput)) {
        throw new Error("The task duration is impossible for the given frequency.");
    }
}

export function calculatePotentialSavedTime(calculationInput: TimeCalculationInput): number {
    assertTimeCalculationInput(calculationInput);

    const horizonInFrequencyUnits = formDurationToLuxonDuration(calculationInput.horizonValue, calculationInput.horizonUnit).as(calculationInput.frequencyUnit);
    const taskOccurenceCount = horizonInFrequencyUnits * calculationInput.frequencyValue;
    const taskDurationInResultUnits = formDurationToLuxonDuration(calculationInput.taskDuration, calculationInput.taskDurationUnit).as(calculationInput.resultUnit);

    return Math.trunc(taskDurationInResultUnits * taskOccurenceCount);
}
