import { Note } from '../types/notes';

export const notes: Note[] = [
  {
    id: 'greeting',
    title: 'Greetings',
    sections: [
      {
        title: 'Common Greetings',
        messages: [
          "Hello! How are you doing today?",
          "Hi there! Hope you're having a great day.",
          "Hi buddy! How have you been?",
          "Hello! Hope this message finds you well.",
          "Hello! How's your day shaping up so far?",
          "Hi there! I hope everything is going great for you today.",
          "Good day to you! How's everything going?",
          "Hi! How's it going?",
          "Hello! How are you?",
          "Hey! What's up?",
          "Hi there! How's today?",
          "Good day! How are you?",
          "Hey! How've you been?",
          "Hello! Hope you're well.",
          "Hi! How are things?",
          "Hey! How's life?",
          "Hi! All good with you?"
        ]
      }
    ]
  },
  {
    id: 'note',
    title: 'Job Notes',
    sections: [
      {
        title: 'Introduction Messages',
        messages: [
          "Thank you for your reply. I am Cella, and we are currently looking for new employes for a new project at our company. Are you interested in this positions?",
          "I am Hannh from Apple One Company. Are you interested in a remote orflexible role? Can I provide more details?",
          "Greeting. I am Bella from Apple one. We are hiring for a role. Can I share the details with you?",
          "Hi! My name is Fiona from Jooble. There is a career path available. Want to learn more? Reply yes or no."
        ]
      },
      {
        title: 'Job Details',
        messages: [
          "We Are Hiring! We offer part-time and full-time positions requiring just 30-60 minutes of your time, with earnings ranging from $200 to $600.",
          "To qualify, you need to be a U.S. citizen or permanent resident and at least 25 years old. If you meet these criteria, please reply with Yes or No.",
          "Our HR department will contact you via WhatsApp soon and provide you with free training. You can also get a bonus of $80-$120 after the training. Please keep an eye on your WhatsApp."
        ]
      }
    ]
  },
  {
    id: 'problem',
    title: 'FAQ & Issues',
    sections: [
      {
        title: 'About Job',
        messages: [
          "We collaborate with numerous recruitment agencies, including LinkedIn, and we received your contact information through them."
        ]
      },
      {
        title: 'Position Details',
        messages: [
          "This position offers the flexibility of remote work in digital marketing, where your primary duty will be to review and rate client products on a sales site."
        ]
      },
      {
        title: 'Get Number',
        messages: [
          "We collaborate with numerous recruitment agencies, including LinkedIn, and we received your contact information through them."        ]
      },
      {
        title: 'Email me',
        messages: [
          "Sorry, we don't use email for job communication; we exclusively use WhatsApp for business, as it simplifies sharing details and salary information. Is that okay with you?"
        ]
      },
      {
        title: 'Company Location',
        messages: [
          "Our company is based in San Francisco and we provide human resources to many companies around the world. This job is worth looking forward to."
        ]
      }
    ]
  }
];