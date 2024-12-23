import { getStoryContext, type TestRunnerConfig } from '@storybook/test-runner';
import { injectAxe, getViolations } from 'axe-playwright';

// type ImpactValue = 'minor' | 'moderate' | 'serious' | 'critical' | null;
const impactValueNumbers = {
    all: 0,
    minor: 1,
    moderate: 2,
    serious: 3,
    critical: 4,
};

/*
 * See https://storybook.js.org/docs/writing-tests/test-runner#test-hook-api
 * to learn more about the test-runner hooks API.
 * and https://storybook.js.org/docs/writing-tests/accessibility-testing#automate-accessibility-tests-with-test-runner
 * to learn more about how to automate accessibility tests with the test-runner.
 */
const config: TestRunnerConfig = {
    // see https://storybook.js.org/docs/7/writing-tests/test-runner#experimental-filter-tests
    // for information on how to filter stories
    tags: {
        include: ['test', 'a11y-all', 'a11y-minor', 'a11y-moderate', 'a11y-serious', 'a11y-critical'],
        skip: ['skip'],
    },
    async preVisit(page, context) {
        // Get the entire context of a story, including parameters, args, argTypes, etc.
        const fullContext = await getStoryContext(page, context);
        if (fullContext.tags.some((tag) => tag.startsWith('a11y-'))) {
            await injectAxe(page);
        }
    },
    async postVisit(page, context) {
        const fullContext = await getStoryContext(page, context);
        const a11yTags = fullContext.tags.filter((tag) => tag.startsWith('a11y-'));
        if (a11yTags.length > 0) {
            // if the story has multiple a11y tags, use the lowest severity tag
            const lowestTag = Math.min(
                4, // this 4 means that unknown a11y tags are treated as critical
                ...a11yTags.map((tag): number => {
                    const str = tag.split('-')[1];
                    const val = Number(impactValueNumbers[str]);
                    return val;
                }),
            );
            const violations = await getViolations(page, context);
            const relevantViolations = violations.filter((violation) => {
                // the impact could be null if the violation is not classified
                const impactValueNum = violation.impact ? impactValueNumbers[violation.impact] : 0;
                // only keep violations that are at least as severe as the tag the user has set
                return impactValueNum >= lowestTag;
            });
            if (relevantViolations.length > 0) {
                const message = `Accessibility violations found in story "${fullContext.name}".\nID: ${fullContext.id}.\nTags: ${a11yTags.join(',')}.`;
                const jsonStr = JSON.stringify(relevantViolations, null, 2);
                throw new Error(`${message}\n${jsonStr}`);
            } else {
                console.log(
                    `No relevant accessibility violations found in story "${fullContext.name}".\nID: ${fullContext.id}.\nTags: ${a11yTags.join(',')}.`,
                );
            }
        }
    },
};

export default config;
