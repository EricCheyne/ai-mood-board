const generateBtn = document.getElementById('generateBtn');
const moodInput = document.getElementById('moodInput');
const aiImage = document.getElementById('aiImage');
const paletteDiv = document.getElementById('palette');
const quoteEl = document.getElementById('quote');

generateBtn.addEventListener('click', async () => {
  const mood = moodInput.value.trim();
  if (!mood) return alert("Please enter a mood!");

  // --- DUMMY PLACEHOLDERS FOR NOW ---
  // Replace this with API integration later

  // Image placeholder (can be replaced with DALL·E or Stability AI)
  aiImage.src = `https://source.unsplash.com/600x400/?${encodeURIComponent(mood)}`;

  // Generate random color palette
  paletteDiv.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const color = '#' + Math.floor(Math.random()*16777215).toString(16);
    const div = document.createElement('div');
    div.className = 'color-box';
    div.style.backgroundColor = color;
    paletteDiv.appendChild(div);
  }

  // Quote (static for now — can use OpenAI later)
  quoteEl.textContent = `“Let your ${mood} energy guide you.”`;
});
