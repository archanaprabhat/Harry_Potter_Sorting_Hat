// src/lib/quiz-data.ts

export interface QuizOption {
  text: string;
  image?: string; // Path to image
  points: {
    gryffindor: number;
    slytherin: number;
    hufflepuff: number;
    ravenclaw: number;
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "You're faced with a dangerous situation. What's your first instinct?",
    options: [
      {
        text: "Charge forward without hesitation",
        image: "/images/quiz/sword.png",
        points: { gryffindor: 10, slytherin: 2, hufflepuff: 3, ravenclaw: 1 }
      },
      {
        text: "Analyze the situation carefully first",
        image: "/images/quiz/book.png",
        points: { gryffindor: 2, slytherin: 3, hufflepuff: 2, ravenclaw: 10 }
      },
      {
        text: "Look for ways to help others escape",
        image: "/images/quiz/helping-hand.png",
        points: { gryffindor: 4, slytherin: 1, hufflepuff: 10, ravenclaw: 3 }
      },
      {
        text: "Find the most advantageous position",
        image: "/images/quiz/strategy.png",
        points: { gryffindor: 1, slytherin: 10, hufflepuff: 2, ravenclaw: 4 }
      }
    ]
  },
  {
    id: 2,
    question: "What quality do you value most in others?",
    options: [
      {
        text: "Loyalty and trustworthiness",
        image: "/images/quiz/loyalty.png",
        points: { gryffindor: 3, slytherin: 2, hufflepuff: 10, ravenclaw: 2 }
      },
      {
        text: "Intelligence and wit",
        image: "/images/quiz/wisdom.png",
        points: { gryffindor: 2, slytherin: 3, hufflepuff: 2, ravenclaw: 10 }
      },
      {
        text: "Courage and bravery",
        image: "/images/quiz/courage.png",
        points: { gryffindor: 10, slytherin: 2, hufflepuff: 3, ravenclaw: 2 }
      },
      {
        text: "Ambition and determination",
        image: "/images/quiz/ambition.png",
        points: { gryffindor: 2, slytherin: 10, hufflepuff: 2, ravenclaw: 3 }
      }
    ]
  },
  {
    id: 3,
    question: "You discover a hidden magical artifact. What do you do?",
    options: [
      {
        text: "Study it thoroughly to understand its power",
        image: "/images/quiz/research.png",
        points: { gryffindor: 2, slytherin: 3, hufflepuff: 2, ravenclaw: 10 }
      },
      {
        text: "Keep it secret for future advantage",
        image: "/images/quiz/secret.png",
        points: { gryffindor: 1, slytherin: 10, hufflepuff: 2, ravenclaw: 4 }
      },
      {
        text: "Share the discovery with friends",
        image: "/images/quiz/sharing.png",
        points: { gryffindor: 4, slytherin: 1, hufflepuff: 10, ravenclaw: 3 }
      },
      {
        text: "Use it immediately to help someone",
        image: "/images/quiz/heroic.png",
        points: { gryffindor: 10, slytherin: 2, hufflepuff: 4, ravenclaw: 2 }
      }
    ]
  },
  {
    id: 4,
    question: "What's your ideal way to spend a free evening?",
    options: [
      {
        text: "Reading about ancient magic",
        image: "/images/quiz/ancient_books.png",
        points: { gryffindor: 2, slytherin: 3, hufflepuff: 2, ravenclaw: 10 }
      },
      {
        text: "Planning your next big move",
        image: "/images/quiz/planning.png",
        points: { gryffindor: 2, slytherin: 10, hufflepuff: 2, ravenclaw: 4 }
      },
      {
        text: "Spending time with close friends",
        image: "/images/quiz/friendship.png",
        points: { gryffindor: 3, slytherin: 1, hufflepuff: 10, ravenclaw: 3 }
      },
      {
        text: "Seeking out new adventures",
        image: "/images/quiz/adventure.png",
        points: { gryffindor: 10, slytherin: 3, hufflepuff: 2, ravenclaw: 2 }
      }
    ]
  },
  {
    id: 5,
    question: "In a group project, you naturally become the...",
    options: [
      {
        text: "Researcher who gathers information",
        image: "/images/quiz/researcher.png",
        points: { gryffindor: 2, slytherin: 2, hufflepuff: 3, ravenclaw: 10 }
      },
      {
        text: "Leader who delegates tasks",
        image: "/images/quiz/leader.png",
        points: { gryffindor: 4, slytherin: 10, hufflepuff: 2, ravenclaw: 3 }
      },
      {
        text: "Supporter who helps everyone",
        image: "/images/quiz/supporter.png",
        points: { gryffindor: 3, slytherin: 1, hufflepuff: 10, ravenclaw: 2 }
      },
      {
        text: "Motivator who keeps spirits high",
        image: "/images/quiz/motivator.png",
        points: { gryffindor: 10, slytherin: 2, hufflepuff: 4, ravenclaw: 2 }
      }
    ]
  },
  {
    id: 6,
    question: "You're lost in a magical forest. How do you find your way?",
    options: [
      {
        text: "Follow your instincts boldly",
        image: "/images/quiz/instinct.png",
        points: { gryffindor: 10, slytherin: 3, hufflepuff: 2, ravenclaw: 2 }
      },
      {
        text: "Use logical deduction and observation",
        image: "/images/quiz/observation.png",
        points: { gryffindor: 2, slytherin: 3, hufflepuff: 2, ravenclaw: 10 }
      },
      {
        text: "Look for signs of other travelers to follow",
        image: "/images/quiz/following.png",
        points: { gryffindor: 2, slytherin: 2, hufflepuff: 10, ravenclaw: 3 }
      },
      {
        text: "Find the highest point to survey your options",
        image: "/images/quiz/strategic.png",
        points: { gryffindor: 3, slytherin: 10, hufflepuff: 2, ravenclaw: 4 }
      }
    ]
  },
  {
    id: 7,
    question: "What magical creature would you most want as a companion?",
    options: [
      {
        text: "A loyal griffin that fights beside you",
        image: "/images/quiz/griffin.png",
        points: { gryffindor: 10, slytherin: 2, hufflepuff: 3, ravenclaw: 2 }
      },
      {
        text: "A cunning snake with ancient wisdom",
        image: "/images/quiz/snake.png",
        points: { gryffindor: 2, slytherin: 10, hufflepuff: 2, ravenclaw: 3 }
      },
      {
        text: "A gentle niffler that finds lost things",
        image: "/images/quiz/niffler.png",
        points: { gryffindor: 2, slytherin: 2, hufflepuff: 10, ravenclaw: 3 }
      },
      {
        text: "A wise raven that shares knowledge",
        image: "/images/quiz/raven.png",
        points: { gryffindor: 2, slytherin: 3, hufflepuff: 2, ravenclaw: 10 }
      }
    ]
  },
  {
    id: 8,
    question: "You witness someone being bullied. What's your response?",
    options: [
      {
        text: "Immediately intervene, no matter the cost",
        image: "/images/quiz/intervene.png",
        points: { gryffindor: 10, slytherin: 1, hufflepuff: 4, ravenclaw: 2 }
      },
      {
        text: "Find an authority figure to handle it properly",
        image: "/images/quiz/authority.png",
        points: { gryffindor: 3, slytherin: 4, hufflepuff: 10, ravenclaw: 3 }
      },
      {
        text: "Quietly help the victim afterwards",
        image: "/images/quiz/quiet-help.png",
        points: { gryffindor: 2, slytherin: 2, hufflepuff: 8, ravenclaw: 4 }
      },
      {
        text: "Document evidence for later use",
        image: "/images/quiz/evidence.png",
        points: { gryffindor: 2, slytherin: 6, hufflepuff: 3, ravenclaw: 10 }
      }
    ]
  },
  {
    id: 9,
    question: "What type of magic would you be most drawn to study?",
    options: [
      {
        text: "Defensive magic to protect others",
        image: "/images/quiz/shield.png",
        points: { gryffindor: 8, slytherin: 2, hufflepuff: 6, ravenclaw: 3 }
      },
      {
        text: "Dark arts and forbidden knowledge",
        image: "/images/quiz/dark-arts.png",
        points: { gryffindor: 1, slytherin: 10, hufflepuff: 1, ravenclaw: 5 }
      },
      {
        text: "Healing magic and herbology",
        image: "/images/quiz/healing.png",
        points: { gryffindor: 3, slytherin: 2, hufflepuff: 10, ravenclaw: 4 }
      },
      {
        text: "Ancient runes and theoretical magic",
        image: "/images/quiz/runes.png",
        points: { gryffindor: 2, slytherin: 3, hufflepuff: 2, ravenclaw: 10 }
      }
    ]
  },
  {
    id: 10,
    question: "How do you handle failure or setbacks?",
    options: [
      {
        text: "Get back up and try again immediately",
        image: "/images/quiz/persistence.png",
        points: { gryffindor: 10, slytherin: 3, hufflepuff: 4, ravenclaw: 2 }
      },
      {
        text: "Analyze what went wrong and adapt",
        image: "/images/quiz/analysis.png",
        points: { gryffindor: 2, slytherin: 4, hufflepuff: 2, ravenclaw: 10 }
      },
      {
        text: "Seek support from friends and family",
        image: "/images/quiz/support.png",
        points: { gryffindor: 3, slytherin: 1, hufflepuff: 10, ravenclaw: 3 }
      },
      {
        text: "Find a way to turn it to your advantage",
        image: "/images/quiz/advantage.png",
        points: { gryffindor: 2, slytherin: 10, hufflepuff: 2, ravenclaw: 4 }
      }
    ]
  }
];

// House information for results
export const HOUSES = {
  gryffindor: {
    name: 'Gryffindor',
    colors: ['#7C0A02', '#D4AF37'],
    traits: ['Courage', 'Bravery', 'Nerve', 'Chivalry'],
    description: 'Where dwell the brave at heart. Their daring, nerve, and chivalry set Gryffindors apart.',
    founder: 'Godric Gryffindor',
    element: 'Fire',
    animal: 'Lion'
  },
  slytherin: {
    name: 'Slytherin',
    colors: ['#1A472A', '#C0C0C0'],
    traits: ['Ambition', 'Cunning', 'Leadership', 'Resourcefulness'],
    description: 'Those cunning folk use any means to achieve their ends. Slytherin will help you on the way to greatness.',
    founder: 'Salazar Slytherin',
    element: 'Water',
    animal: 'Serpent'
  },
  hufflepuff: {
    name: 'Hufflepuff',
    colors: ['#ECB939', '#2D2926'],
    traits: ['Loyalty', 'FairPlay', 'Patience', 'Kindness'],
    description: 'Where they are just and loyal. Hufflepuffs are true and unafraid of toil.',
    founder: 'Helga Hufflepuff',
    element: 'Earth',
    animal: 'Badger'
  },
  ravenclaw: {
    name: 'Ravenclaw',
    colors: ['#0E1A40', '#946B2D'],
    traits: ['Intelligence', 'Wit', 'Learning', 'Wisdom'],
    description: 'Where those of wit and learning will always find their kind. Ravenclaws prize intelligence above all.',
    founder: 'Rowena Ravenclaw',
    element: 'Air',
    animal: 'Eagle'
  }
} as const;