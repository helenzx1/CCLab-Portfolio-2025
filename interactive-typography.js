* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  background: #0f0f12;
  color: #eee;
}

.wrap {
  max-width: 900px;
  margin: 0 auto;
  padding: 28px 16px 40px;
}

.top h1 {
  margin: 0 0 6px;
  font-size: 22px;
  letter-spacing: 0.5px;
}

.top p {
  margin: 0 0 18px;
  opacity: 0.8;
  font-size: 14px;
  line-height: 1.5;
}

#sketch-holder {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
}

canvas {
  border-radius: 14px;
  box-shadow: 0 14px 40px rgba(0,0,0,0.35);
  display: block;
}

.bottom {
  margin-top: 18px;
  opacity: 0.6;
  font-size: 12px;
}
