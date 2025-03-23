import app from "./src/app.js";

const PORT = process.env.PORT || 6660;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
