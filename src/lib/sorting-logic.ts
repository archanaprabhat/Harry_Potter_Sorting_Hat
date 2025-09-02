
// src/lib/sorting-logic.ts
import { QUIZ_QUESTIONS, HOUSES } from './quiz-data';

/**
 * Calculate which house a user belongs to based on their quiz answers
 * @param answers Array of selected option indices (0-3 for each question)
 * @returns The house name as a string
 */
export function calculateSortedHouse(answers: number[]): 'gryffindor' | 'slytherin' | 'hufflepuff' | 'ravenclaw' {
  // Initialize house scores
  const scores = {
    gryffindor: 0,
    slytherin: 0,
    hufflepuff: 0,
    ravenclaw: 0
  };

  // Calculate scores based on answers
  answers.forEach((answerIndex, questionIndex) => {
    if (questionIndex < QUIZ_QUESTIONS.length && answerIndex < QUIZ_QUESTIONS[questionIndex].options.length) {
      const selectedOption = QUIZ_QUESTIONS[questionIndex].options[answerIndex];
      
      // Add points from the selected option to each house
      scores.gryffindor += selectedOption.points.gryffindor;
      scores.slytherin += selectedOption.points.slytherin;
      scores.hufflepuff += selectedOption.points.hufflepuff;
      scores.ravenclaw += selectedOption.points.ravenclaw;
    }
  });

  // Find the house with the highest score
  let maxScore = 0;
  let sortedHouse: keyof typeof scores = 'gryffindor';

  for (const [house, score] of Object.entries(scores) as [keyof typeof scores, number][]) {
    if (score > maxScore) {
      maxScore = score;
      sortedHouse = house;
    }
  }

  // In case of a tie, we could add tiebreaker logic
  // For now, the first house with the highest score wins
  return sortedHouse;
}

/**
 * Get house information for display purposes
 * @param house The house name
 * @returns House data object
 */
export function getHouseInfo(house: 'gryffindor' | 'slytherin' | 'hufflepuff' | 'ravenclaw') {
  return HOUSES[house];
}

/**
 * Calculate percentage breakdown of house affinities
 * @param answers Array of selected option indices
 * @returns Object with percentage for each house
 */
export function calculateHousePercentages(answers: number[]) {
  const scores = {
    gryffindor: 0,
    slytherin: 0,
    hufflepuff: 0,
    ravenclaw: 0
  };

  // Calculate raw scores
  answers.forEach((answerIndex, questionIndex) => {
    if (questionIndex < QUIZ_QUESTIONS.length && answerIndex < QUIZ_QUESTIONS[questionIndex].options.length) {
      const selectedOption = QUIZ_QUESTIONS[questionIndex].options[answerIndex];
      
      scores.gryffindor += selectedOption.points.gryffindor;
      scores.slytherin += selectedOption.points.slytherin;
      scores.hufflepuff += selectedOption.points.hufflepuff;
      scores.ravenclaw += selectedOption.points.ravenclaw;
    }
  });

  // Calculate total points
  const totalPoints = Object.values(scores).reduce((sum, score) => sum + score, 0);

  // Convert to percentages
  const percentages = {
    gryffindor: totalPoints > 0 ? Math.round((scores.gryffindor / totalPoints) * 100) : 25,
    slytherin: totalPoints > 0 ? Math.round((scores.slytherin / totalPoints) * 100) : 25,
    hufflepuff: totalPoints > 0 ? Math.round((scores.hufflepuff / totalPoints) * 100) : 25,
    ravenclaw: totalPoints > 0 ? Math.round((scores.ravenclaw / totalPoints) * 100) : 25
  };

  return percentages;
}