generateBtn.addEventListener('click', async () => {
  const mood = moodInput.value.trim();
  if (!mood) return alert("Please enter a mood!");

  // AI Image (via your backend)
  try {
    const res = await fetch('http://localhost:3000/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: mood })
    });
    const data = await res.json();
    aiImage.src = data.imageUrl;
  } catch (err) {
    console.error(err);
    alert("Failed to generate image.");
  }

  // Color palette
  paletteDiv.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const color = '#' + Math.floor(Math.random()*16777215).toString(16);
    const div = document.createElement('div');
    div.className = 'color-box';
    div.style.backgroundColor = color;
    paletteDiv.appendChild(div);
  }

  // Quote
  quoteEl.textContent = `“Let your ${mood} energy guide you.”`;
});
