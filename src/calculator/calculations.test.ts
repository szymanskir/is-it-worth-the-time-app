import { describe, it, expect } from 'vitest';
import { TimeCalculationInput, TimeUnit } from './TimeCalculationInput';
import { calculatePotentialSavedTime } from './calculations';


type CalculationScenario = TimeCalculationInput & {
    expected: number;
    expectedUnit: TimeUnit
};


describe('calculatePotentialSavedTime', () => {
    it.each`
        horizonValue | horizonUnit      | frequencyValue | frequencyUnit      | taskDuration | taskDurationUnit    | expected             | expectedUnit
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
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Month}  | ${1}         | ${TimeUnit.Day}     | ${8}                 | ${TimeUnit.Week}
        ${5}         | ${TimeUnit.Year} | ${1}           | ${TimeUnit.Month}  | ${6}         | ${TimeUnit.Hour}    | ${2}                 | ${TimeUnit.Week}
    `(`should return $expected seconds for a $taskDuration $taskDurationUnit 
        task done $frequencyValue per $frequencyUnit for $horizonValue $horizonUnit`, (calculationScenario: CalculationScenario) => {
        const { expected, expectedUnit, ...calculationInput } = calculationScenario;
        const result = calculatePotentialSavedTime(calculationInput, expectedUnit);
        expect(result).toBe(expected);
    });
});