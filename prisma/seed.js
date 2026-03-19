const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create Default Institute
  const institute = await prisma.institute.upsert({
    where: { domain: 'emax.typing.lab' },
    update: {},
    create: {
      name: 'E-Max Computer Education Center',
      logo: '/logo.png',
      primaryColor: '#ff6600',
      secondaryColor: '#1a1a1a',
      domain: 'emax.typing.lab',
    },
  });

  // 2. Create Sample Student
  await prisma.student.upsert({
    where: { email: 'student@emax.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'student@emax.com',
      password: 'password123', // Use bcrypt.hash in real seed
      instituteId: institute.id,
    },
  });

  // 3. Create 1000 Paragraphs (Sample Content)
  const englishSamples = [
    "Digital literacy is the ability to find, evaluate, and communicate information through various digital platforms. It is a critical skill in the modern workplace where technology is integrated into every task.",
    "Cloud computing allows users to access and store data over the internet instead of on a hard drive. This technology has revolutionized how businesses operate, providing scalability and flexibility.",
    "Artificial intelligence is transforming industries by automating repetitive tasks and providing data-driven insights. From healthcare to finance, AI applications are becoming increasingly common.",
  ];

  const hindiSamples = [
    "सूचना प्रौद्योगिकी हमारे जीवन का एक अभिन्न अंग बन गई है। कंप्यूटर के माध्यम से हम दुनिया भर की जानकारी प्राप्त कर सकते हैं और डिजिटल युग में अपनी पहचान बना सकते हैं।",
    "डिजिटल इंडिया अभियान का उद्देश्य भारत को एक ज्ञान-आधारित अर्थव्यवस्था में बदलना है। इसके तहत सभी सरकारी सेवाओं को इलेक्ट्रॉनिक माध्यम से उपलब्ध कराया जा रहा है।",
    "कंप्यूटर टाइपिंग कौशल आज के समय में बहुत महत्वपूर्ण है। सही गति और सटीकता के साथ टाइपिंग करना करियर में सफलता की कुंजी है। निरंतर अभ्यास से इसमें सुधार किया जा सकता है।",
  ];

  console.log('Generating 1000 paragraphs...');
  
  const data = [];
  
  // Create 500 English
  for (let i = 0; i < 500; i++) {
    data.push({
      language: 'English',
      difficulty: i % 3 === 0 ? 'Beginner' : i % 3 === 1 ? 'Intermediate' : 'Advanced',
      content: englishSamples[i % englishSamples.length] + ` (P-${i+1})`,
    });
  }

  // Create 500 Hindi
  for (let i = 0; i < 500; i++) {
    data.push({
      language: 'Hindi',
      difficulty: i % 3 === 0 ? 'Beginner' : i % 3 === 1 ? 'Intermediate' : 'Advanced',
      content: hindiSamples[i % hindiSamples.length] + ` (प-${i+1})`,
    });
  }

  // Batch insert
  await prisma.typingParagraph.createMany({
    data: data,
    skipDuplicates: true,
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
