const { generateParagraph } = require('./src/lib/ai');

async function test() {
    process.env.OPEN_AI_API_KEY = "sk-...."; // I can't put real key here, but I can check if it exists
    process.env.GROQ_API_KEY = "gsk_....";
    
    console.log("Testing English generation...");
    const eng = await generateParagraph("English", "Intermediate");
    console.log("Result:", eng ? eng.substring(0, 50) + "..." : "EMPTY");

    console.log("Testing Hindi generation...");
    const hin = await generateParagraph("Hindi", "Intermediate");
    console.log("Result:", hin ? hin.substring(0, 50) + "..." : "EMPTY");
}

// test();
