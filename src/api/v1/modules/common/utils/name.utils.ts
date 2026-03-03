export const RANDOM_NAMES = [
    "James Smith", "Michael Johnson", "Robert Williams", "David Brown", "Richard Jones",
    "Joseph Garcia", "Thomas Miller", "Charles Davis", "Christopher Rodriguez", "Daniel Martinez",
    "Matthew Hernandez", "Anthony Lopez", "Donald Gonzalez", "Mark Wilson", "Paul Anderson",
    "Steven Thomas", "Andrew Taylor", "Kenneth Moore", "Joshua Jackson", "Kevin Martin",
    "Mary Smith", "Patricia Johnson", "Jennifer Williams", "Linda Brown", "Elizabeth Jones",
    "Barbara Garcia", "Susan Miller", "Jessica Davis", "Sarah Rodriguez", "Karen Martinez",
    "Nancy Hernandez", "Lisa Lopez", "Betty Gonzalez", "Margaret Wilson", "Sandra Anderson",
    "Ashley Thomas", "Dorothy Taylor", "Kimberly Moore", "Emily Jackson", "Donna Martin"
];

/**
 * Returns a random name from the pre-defined list.
 */
export const getRandomName = (): string => {
    const randomIndex = Math.floor(Math.random() * RANDOM_NAMES.length);
    return RANDOM_NAMES[randomIndex];
};
