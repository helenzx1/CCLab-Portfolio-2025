const generateBtn = document.getElementById("gen-btn");
const resultContainer = document.getElementById("result-container");
const colorBox = document.getElementById("color-box");

async function generateAvoidColor() {

  const name = document.getElementById("nameInput").value;

  if (name === "") {resultContainer.innerHTML = "<p>Please enter your name.</p>";
    return;
  }

  const response = await fetch("http://colormind.io/api/", {
    method: "POST",
    body: JSON.stringify({model: "default"})
  });

  const data = await response.json();
  const colors = data.result;

  let total = 0;

  for (let i = 0; i < name.length; i++) {total += name.charCodeAt(i);}

  let colorIndex = total % colors.length;

  let avoidColor = colors[colorIndex];

  let rgb = `rgb(${avoidColor[0]}, ${avoidColor[1]}, ${avoidColor[2]})`;

  let message;
  if (total % 3 === 0) {
    message = "This color feels unlucky today.";
  } else if (total % 3 === 1) {
    message = "Maybe avoid this color today.";
  } else {
    message = "Be careful with this color.";
  }

  resultContainer.innerHTML = `
    <h2>Your color to avoid today.</h2>
    <p>${message}</p>
    <p>Everything else is still lucky.</p>
    <p>Have a happy day.</p>`;
  colorBox.style.backgroundColor = rgb;
  document.body.style.backgroundColor = rgb;
}

generateBtn.addEventListener("click", generateAvoidColor);