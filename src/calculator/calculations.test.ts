import { describe, it, expect } from 'vitest';
import { TimeCalculationInput, TimeUnit } from './TimeCalculationInput';
import { calculateBreakEvenTime, calculatePotentialSavedTime } from './calculations';


type CalculationScenario = TimeCalculationInput & {
    expected: number;
    expectedUnit: TimeUnit
};


describe('calculatePotentialSavedTime', () => {
    it.each`
        horizonValue | horizonUnit      | frequencyValue | frequencyUnit      | taskDuration | taskDurationUnit    | expected             | resultUnit
        ${1}         | ${TimeUnit.Day}  | ${1}           | ${TimeUnit.Day}    | ${0}         | ${TimeUnit.Minute}  | ${0}                 | ${TimeUnit.Second}
        ${1}         | ${TimeUnit.Day}  | ${1}           | ${TimeUnit.Day}    | ${30}        | ${TimeUnit.Second}  | ${30}                | ${TimeUnit.Second}
        ${1}         | ${TimeUnit.Day}  | ${1}           | ${TimeUnit.Day}    | ${1}         | ${TimeUnit.Minute}  | ${60}                | ${TimeUnit.Second}
        ${5}         | ${TimeUnit.Day}  | ${1}           | ${TimeUnit.Day}    | ${1}         | ${TimeUnit.Minute}  | ${300}               | ${TimeUnit.Second}
        ${14}        | ${TimeUnit.Day}  | ${2}           | ${TimeUnit.Week}   | ${1}         | ${TimeUnit.Minute}  | ${240}               | ${TimeUnit.Second}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Year}   | ${1}         | ${TimeUnit.Second}  | ${5}                 | ${TimeUnit.Second}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Month}  | ${1}         | ${TimeUnit.Second}  | ${60}                | ${TimeUnit.Second}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Week}   | ${1}         | ${TimeUnit.Second}  | ${260}               | ${TimeUnit.Second}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Day}    | ${1}         | ${TimeUnit.Second}  | ${1825}              | ${TimeUnit.Second}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Year}   | ${1}         | ${TimeUnit.Day}     | ${5 * 24 * 60 * 60}  | ${TimeUnit.Second}

        // xkcd comic test cases (row wise)
        ${5}         | ${TimeUnit.Year} | ${50}          | ${TimeUnit.Day}    | ${1}         | ${TimeUnit.Second}  | ${1}                 | ${TimeUnit.Day}
        ${5}         | ${TimeUnit.Year} | ${5}           | ${TimeUnit.Day}    | ${1}         | ${TimeUnit.Second}  | ${2}                 | ${TimeUnit.Hour}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Day}    | ${1}         | ${TimeUnit.Second}  | ${30}                | ${TimeUnit.Minute}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Week}   | ${1}         | ${TimeUnit.Second}  | ${4}                 | ${TimeUnit.Minute}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Month}  | ${1}         | ${TimeUnit.Second}  | ${1}                 | ${TimeUnit.Minute}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Year}   | ${1}         | ${TimeUnit.Second}  | ${5}                 | ${TimeUnit.Second}

        ${5}         | ${TimeUnit.Year} | ${50}          | ${TimeUnit.Day}    | ${5}         | ${TimeUnit.Second}  | ${5}                 | ${TimeUnit.Day}
        ${5}         | ${TimeUnit.Year} | ${5}           | ${TimeUnit.Day}    | ${5}         | ${TimeUnit.Second}  | ${12}                | ${TimeUnit.Hour}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Day}    | ${5}         | ${TimeUnit.Second}  | ${2}                 | ${TimeUnit.Hour}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Week}   | ${5}         | ${TimeUnit.Second}  | ${21}                | ${TimeUnit.Minute}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Month}  | ${5}         | ${TimeUnit.Second}  | ${5}                 | ${TimeUnit.Minute}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Year}   | ${5}         | ${TimeUnit.Second}  | ${25}                | ${TimeUnit.Second}

        // In test case 3 we have 15 hours instead of 12
        ${5}         | ${TimeUnit.Year} | ${50}          | ${TimeUnit.Day}    | ${30}        | ${TimeUnit.Second}  | ${4}                 | ${TimeUnit.Week}
        ${5}         | ${TimeUnit.Year} | ${5}           | ${TimeUnit.Day}    | ${30}        | ${TimeUnit.Second}  | ${3}                 | ${TimeUnit.Day}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Day}    | ${30}        | ${TimeUnit.Second}  | ${15}                | ${TimeUnit.Hour}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Week}   | ${30}        | ${TimeUnit.Second}  | ${2}                 | ${TimeUnit.Hour}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Month}  | ${30}        | ${TimeUnit.Second}  | ${30}                | ${TimeUnit.Minute}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Year}   | ${30}        | ${TimeUnit.Second}  | ${2}                 | ${TimeUnit.Minute}

        // Here in test case 1 we have 9 weeks intead of 8
        ${5}         | ${TimeUnit.Year} | ${50}          | ${TimeUnit.Day}    | ${1}         | ${TimeUnit.Minute}  | ${9}                 | ${TimeUnit.Week}
        ${5}         | ${TimeUnit.Year} | ${5}           | ${TimeUnit.Day}    | ${1}         | ${TimeUnit.Minute}  | ${6}                 | ${TimeUnit.Day}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Day}    | ${1}         | ${TimeUnit.Minute}  | ${1}                 | ${TimeUnit.Day}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Week}   | ${1}         | ${TimeUnit.Minute}  | ${4}                 | ${TimeUnit.Hour}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Month}  | ${1}         | ${TimeUnit.Minute}  | ${1}                 | ${TimeUnit.Hour}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Year}   | ${1}         | ${TimeUnit.Minute}  | ${5}                 | ${TimeUnit.Minute}

        // Here in test case 1 we have 10 months instead of 9
        ${5}         | ${TimeUnit.Year} | ${50}          | ${TimeUnit.Day}    | ${5}         | ${TimeUnit.Minute}  | ${10}                | ${TimeUnit.Month}
        ${5}         | ${TimeUnit.Year} | ${5}           | ${TimeUnit.Day}    | ${5}         | ${TimeUnit.Minute}  | ${4}                 | ${TimeUnit.Week}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Day}    | ${5}         | ${TimeUnit.Minute}  | ${6}                 | ${TimeUnit.Day}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Week}   | ${5}         | ${TimeUnit.Minute}  | ${21}                | ${TimeUnit.Hour}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Month}  | ${5}         | ${TimeUnit.Minute}  | ${5}                 | ${TimeUnit.Hour}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Year}   | ${5}         | ${TimeUnit.Minute}  | ${25}                | ${TimeUnit.Minute}

        ${5}         | ${TimeUnit.Year} | ${5}           | ${TimeUnit.Day}    | ${30}        | ${TimeUnit.Minute}  | ${6}                 | ${TimeUnit.Month}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Day}    | ${30}        | ${TimeUnit.Minute}  | ${5}                 | ${TimeUnit.Week}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Week}   | ${30}        | ${TimeUnit.Minute}  | ${5}                 | ${TimeUnit.Day}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Month}  | ${30}        | ${TimeUnit.Minute}  | ${1}                 | ${TimeUnit.Day}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Year}   | ${30}        | ${TimeUnit.Minute}  | ${2}                 | ${TimeUnit.Hour}

        // Here in test case 1 we have 12 months instead of 10
        ${5}         | ${TimeUnit.Year} | ${5}           | ${TimeUnit.Day}    | ${1}         | ${TimeUnit.Hour}    | ${12}                | ${TimeUnit.Month}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Day}    | ${1}         | ${TimeUnit.Hour}    | ${2}                 | ${TimeUnit.Month}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Week}   | ${1}         | ${TimeUnit.Hour}    | ${10}                | ${TimeUnit.Day}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Month}  | ${1}         | ${TimeUnit.Hour}    | ${2}                 | ${TimeUnit.Day}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Year}   | ${1}         | ${TimeUnit.Hour}    | ${5}                 | ${TimeUnit.Hour}

        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Week}   | ${6}         | ${TimeUnit.Hour}    | ${2}                 | ${TimeUnit.Month}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Month}  | ${6}         | ${TimeUnit.Hour}    | ${2}                 | ${TimeUnit.Week}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Year}   | ${6}         | ${TimeUnit.Hour}    | ${1}                 | ${TimeUnit.Day}

        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Month}  | ${1}         | ${TimeUnit.Day}     | ${8}                 | ${TimeUnit.Week}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Year}   | ${1}         | ${TimeUnit.Day}     | ${5}                 | ${TimeUnit.Day}
    `(`should return $expected $expectedUnit for a $taskDuration $taskDurationUnit 
        task done $frequencyValue per $frequencyUnit for $horizonValue $horizonUnit`, (calculationScenario: CalculationScenario) => {
        const { expected, ...calculationInput } = calculationScenario;
        const result = calculatePotentialSavedTime(calculationInput);
        expect(result).toBe(expected);
    });

    it("should throw an error if the task duration and frequency are impossible", () => {
        const calculationInput: TimeCalculationInput = {
            taskDuration: 6,
            taskDurationUnit: TimeUnit.Hour,
            frequencyValue: 5,
            frequencyUnit: TimeUnit.Day,
            horizonValue: 5,
            horizonUnit: TimeUnit.Year,
            resultUnit: TimeUnit.Day,
            timeToAutomate: 0,
            timeToAutomateUnit: TimeUnit.Second
        };
        expect(() => calculatePotentialSavedTime(calculationInput)).toThrowError("The task duration is impossible for the given frequency.");
    });

});


describe('calculatePotentialSavedTime', () => {
    it.each`
        frequencyValue | frequencyUnit      | taskDuration | taskDurationUnit    | timeToAutomate | timeToAutomateUnit | expected             | resultUnit
        ${1}           | ${TimeUnit.Week}   | ${15}        | ${TimeUnit.Minute}  | ${1}           | ${TimeUnit.Hour}   | ${4}                 | ${TimeUnit.Week}
    `(`should return $expected $expectedUnit for a $taskDuration $taskDurationUnit 
        task done $frequencyValue per $frequencyUnit for $horizonValue $horizonUnit`, (calculationScenario: CalculationScenario) => {
        const { expected, ...calculationInput } = calculationScenario;
        const result = calculateBreakEvenTime(calculationInput);
        expect(result).toBe(expected);
    });
});