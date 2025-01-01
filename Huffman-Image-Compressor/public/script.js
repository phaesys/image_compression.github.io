document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();
  const image = document.getElementById("image").files[0];
  formData.append("image", image);

  const response = await fetch("/upload", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  const resultDiv = document.getElementById("result");

  if (response.ok) {
    resultDiv.innerHTML = `
      <p>${result.message}</p>
      <a href="${result.compressedPath}" download>Download Compressed Image</a>
    `;
  } else {
    resultDiv.textContent = result.message;
  }
});
