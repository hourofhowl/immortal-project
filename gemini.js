function generateContent(userPrompt, callback) {
 
  const prompt = `${SYSTEM_PROMPT}\n\n${userPrompt}`;

  fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("Gemini 응답 원본:", data);

    let modelMsg = data?.candidates?.[0]?.content?.parts?.[0]?.text || "응답 없음";

    if (callback) {
      callback(modelMsg);
    }
  })
  .catch(error => {
    console.error("Error:", error);
  });
}