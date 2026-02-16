export interface Philosopher {
  name: string;
  era: string;
  emoji: string;
  question: string;
}

export interface Feature {
  icon: string;
  title: string;
  desc: string;
}

export const philosophers: Philosopher[] = [
  {
    name: "Socrates",
    era: "Ancient",
    emoji: "🏛️",
    question: "What is the nature of true knowledge?",
  },
  {
    name: "Kant",
    era: "Modern",
    emoji: "📐",
    question: "What are the limits of human reason?",
  },
  {
    name: "Nietzsche",
    era: "19th Century",
    emoji: "⚡",
    question: "How do we create meaning in an indifferent universe?",
  },
  {
    name: "Simone de Beauvoir",
    era: "20th Century",
    emoji: "🔥",
    question: "How does freedom relate to responsibility?",
  },
  {
    name: "Hannah Arendt",
    era: "20th Century",
    emoji: "🕊️",
    question: "What is the nature of political action and freedom?",
  },
  {
    name: "Confucius",
    era: "Ancient",
    emoji: "☯️",
    question: "What is the path to a virtuous life?",
  },
];

export const features: Feature[] = [
  {
    icon: "🧠",
    title: "Socratic Dialogue",
    desc: "Learn through guided questioning, just as Socrates taught in the Agora. The AI challenges your assumptions and leads you to deeper understanding.",
  },
  {
    icon: "📚",
    title: "2,500+ Years of Thought",
    desc: "From Pre-Socratics to Contemporary philosophy. Explore every major philosophical tradition, thinker, and school of thought.",
  },
  {
    icon: "💬",
    title: "Debate & Argue",
    desc: "Take a philosophical position and defend it. The AI plays devil's advocate, strengthening your critical thinking.",
  },
  {
    icon: "✍️",
    title: "Essay Assistance",
    desc: "Get help structuring philosophical arguments, analyzing texts, and writing compelling philosophy papers.",
  },
];

export const quickPrompts = [
  "What is the Trolley Problem?",
  "Explain Plato's Cave",
  "Does free will exist?",
  "What is existentialism?",
];

export const navItems = ["About", "Features", "Explore", "Try It"];
