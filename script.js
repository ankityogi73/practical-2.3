const svg = document.getElementById("drawingArea");
const toggleBtn = document.getElementById("toggleMode");

let isDrawing = false;
let path;
let mode = "draw"; // "draw" or "erase"

toggleBtn.addEventListener("click", () => {
  if (mode === "draw") {
    mode = "erase";
    toggleBtn.textContent = "Switch to Draw";
    svg.style.cursor = "pointer";
  } else {
    mode = "draw";
    toggleBtn.textContent = "Switch to Eraser";
    svg.style.cursor = "crosshair";
  }
});

svg.addEventListener("mousedown", (e) => {
  if (mode === "erase") return;

  isDrawing = true;
  const point = getMousePosition(e);
  path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke", "blue");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("d", `M ${point.x} ${point.y}`);
  svg.appendChild(path);
});

svg.addEventListener("mousemove", (e) => {
  if (!isDrawing || mode === "erase") return;
  const point = getMousePosition(e);
  let d = path.getAttribute("d");
  path.setAttribute("d", `${d} L ${point.x} ${point.y}`);
});

svg.addEventListener("mouseup", () => {
  isDrawing = false;
});

// Eraser mode: click to remove path
svg.addEventListener("click", (e) => {
  if (mode === "erase" && e.target.tagName === "path") {
    e.target.remove();
  }
});

function getMousePosition(evt) {
  const rect = svg.getBoundingClientRect();
  return {
    x: ((evt.clientX - rect.left) / rect.width) * svg.viewBox.baseVal.width,
    y: ((evt.clientY - rect.top) / rect.height) * svg.viewBox.baseVal.height
  };
}
