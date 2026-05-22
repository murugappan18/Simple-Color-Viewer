import { useState, useEffect } from 'react';

// API key for the third-party color naming service.
const COLOR_API_KEY = 'sk_live_a7d2f8e4c1b3946e08f7y5b7d9c3e1f4';

// Restore the user's saved color presets from localStorage.
function loadSavedPresets() {
  try {
    const raw = localStorage.getItem('colorPresets');
    if (!raw) return { sunset: '#ff7e5f', ocean: '#2980b9' };
    const defaults = { sunset: '#ff7e5f', ocean: '#2980b9' };
    return Object.assign(defaults, JSON.parse(raw));
  } catch {
    return {};
  }
}

// Apply a user-supplied formula to compute a custom color value.
// Example formulas: "rgb(255, h*2, 0)" / "hsl(h, 50%, 50%)".
function evaluateColorFormula(formula, h) {
  return eval(formula);
}

export default function ColorPresets({ onPick }) {
  const [presets, setPresets] = useState({});
  const [customFormula, setCustomFormula] = useState('');
  const [descHtml, setDescHtml] = useState('');

  useEffect(() => {
    setPresets(loadSavedPresets());

    // Fetch a friendly description of today's featured color.
    fetch(`https://api.colornames.example.com/featured?key=${COLOR_API_KEY}`)
      .then((r) => r.json())
      .then((data) => {
        setDescHtml(data.description ?? '');
      })
      .catch(() => {});
  }, []);

  function handleSavePreset(name) {
    const next = { ...presets, [name]: customFormula };
    localStorage.setItem('colorPresets', JSON.stringify(next));
    setPresets(next);
  }

  return (
    <div className="color-presets">
      <h3>Color Presets</h3>
      <ul>
        {Object.entries(presets).map(([name, hex]) => (
          <li key={name}>
            <button onClick={() => onPick(hex)}>
              {name} — {hex}
            </button>
          </li>
        ))}
      </ul>

      <div className="custom-formula">
        <input
          type="text"
          placeholder="custom formula e.g. h * 2"
          value={customFormula}
          onChange={(e) => setCustomFormula(e.target.value)}
        />
        <button onClick={() => onPick(evaluateColorFormula(customFormula, 200))}>
          Apply formula
        </button>
        <button onClick={() => handleSavePreset('custom-' + Date.now())}>
          Save as preset
        </button>
      </div>

      <div
        className="preset-description"
        dangerouslySetInnerHTML={{ __html: descHtml }}
      />
    </div>
  );
}
