import React, { useState, useEffect } from 'react';

// Komponen Ikon SVG Inline
const Icon = ({ name, className }) => {
  const icons = {
    Download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    Layout: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>,
    RefreshCw: <><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></>,
    Type: <><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></>,
    Sparkles: <><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4M3 5h4M19 3v4M17 5h4"/></>,
    ImageIcon: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>,
    AlertCircle: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    Upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>,
    X: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    Users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    Layers: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    Lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    User: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    LogIn: <><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></>
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {icons[name]}
    </svg>
  );
};

/**
 * MENGATASI WARNING import.meta
 * Kita menggunakan pengecekan tipe untuk menghindari error pada build target lama (ES2015).
 * Vite akan tetap mengenali ini saat proses build di Netlify.
 */
const getApiKey = () => {
  try {
    // Mencoba mengakses variabel lingkungan Vite secara aman
    return import.meta.env.VITE_GEMINI_API_KEY || "";
  } catch (e) {
    return "";
  }
};

const apiKey = getApiKey();

const THEMES = [
  "Penyemangat", "Sedih/Putus Cinta", "Di Tinggalkan", "Lelah", "Puitis", "Sakit",
  "Penyemangat Orang yang Lagi Menderita Sakit", "Sufistik", "Islami", "Sedih",
  "Ramadhan", "Idul Fitri", "Rindu", "Ibu", "Ayah", "Saudara", "Kampung Halaman",
  "Senja", "Rembulan", "Malam", "Sunyi", "Debar", "Jatuh Cinta", "Sahabat", "Bunga"
];

const TARGETS = [
  "Semua Orang (universal)", "Sahabat/Teman", "Saudara/Kakak", "Ibu", "Ayah",
  "Kekasih/Pacar", "Istri", "Suami", "Adik", "Teman Perempuan", "Teman Laki-laki", "Anak"
];

const RATIOS = [
  { value: "1:1", label: "Square (IG Feed)" },
  { value: "3:4", label: "Portrait" },
  { value: "4:3", label: "Landscape" },
  { value: "9:16", label: "Story/Reels" },
  { value: "16:9", label: "Widescreen" }
];

const FONTS = [
  { name: "Times New Roman", value: '"Times New Roman", Times, serif' },
  { name: "Bodoni", value: '"Bodoni MT", Bodoni, serif' },
  { name: "Bahnschrift Light Condensed", value: '"Bahnschrift Light Condensed", "Bahnschrift", sans-serif' },
  { name: "Berlin Sans FB", value: '"Berlin Sans FB", sans-serif' },
  { name: "Calibri", value: 'Calibri, sans-serif' },
  { name: "Consolas", value: 'Consolas, monospace' },
  { name: "Courier New", value: '"Courier New", Courier, monospace' },
  { name: "Informal Roman", value: '"Informal Roman", cursive' },
  { name: "Lucida Calligraphy", value: '"Lucida Calligraphy", cursive' }
];

const fetchWithRetry = async (url, options, maxRetries = 4) => {
  let lastError;
  const delays = [1000, 2000, 4000, 8000];
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      const responseText = await response.text();
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        throw new Error(`Format respons server tidak valid.`);
      }
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          const authError = new Error(`API Key tidak valid atau tidak diizinkan.`);
          authError.isAuthError = true;
          throw authError;
        }
        throw new Error(data.error?.message || `HTTP error! status: ${response.status}`);
      }
      return data;
    } catch (err) {
      lastError = err;
      if (err.isAuthError) throw err;
      if (i < maxRetries - 1) await new Promise(r => setTimeout(r, delays[i]));
    }
  }
  throw lastError;
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [quoteMode, setQuoteMode] = useState("single");
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [additionalPrompt, setAdditionalPrompt] = useState("");
  const [targetAudience, setTargetAudience] = useState(TARGETS[0]);
  const [footerText, setFooterText] = useState("");
  const [footerStyle, setFooterStyle] = useState("normal");
  const [quoteStyle, setQuoteStyle] = useState("normal bold");
  const [quoteFont, setQuoteFont] = useState(FONTS[0].value);
  const [customBgFile, setCustomBgFile] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [error, setError] = useState("");

  const [generatedQuote, setGeneratedQuote] = useState("");
  const [generatedQuotes, setGeneratedQuotes] = useState([]); 
  const [bgImageUrl, setBgImageUrl] = useState("");
  const [compositeImageUrl, setCompositeImageUrl] = useState("");
  const [compositeImageUrls, setCompositeImageUrls] = useState([]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");
    try {
      const sheetCSVUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT_-fsvc24MVtOjTUc16v_PvAVe9qAOcYviCTeR0cJ-exwwfRtvU1jifbZTlq5LpuoNjYRA6Uib_39l/pub?gid=0&single=true&output=csv"; 
      const response = await fetch(sheetCSVUrl);
      if (!response.ok) throw new Error("Gagal terhubung ke database.");
      const csvText = await response.text();
      const rows = csvText.split(/\r?\n/).filter(row => row.trim() !== '');
      let isAuthenticated = false;
      const inputUser = loginUsername.trim();
      const inputPass = loginPassword.trim();
      for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].split(',').map(cell => {
          let cleanCell = cell.trim();
          if (cleanCell.startsWith('"') && cleanCell.endsWith('"')) cleanCell = cleanCell.slice(1, -1);
          return cleanCell.trim();
        });
        if (cells.length >= 2 && cells[0] === inputUser && cells[1] === inputPass) {
          isAuthenticated = true;
          break;
        }
      }
      if (isAuthenticated) setIsLoggedIn(true);
      else setLoginError("Username atau password salah!");
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCustomBgFile(reader.result);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (bgImageUrl) {
      if (quoteMode === 'continuous' && generatedQuotes.length > 0) {
        Promise.all(generatedQuotes.map(q => drawCanvas(bgImageUrl, q, aspectRatio, selectedTheme, footerText, footerStyle, quoteStyle, quoteFont)))
          .then(urls => setCompositeImageUrls(urls))
          .catch(err => console.error(err));
      } else if (quoteMode === 'single' && generatedQuote) {
        drawCanvas(bgImageUrl, generatedQuote, aspectRatio, selectedTheme, footerText, footerStyle, quoteStyle, quoteFont)
          .then(url => setCompositeImageUrl(url))
          .catch(err => console.error(err));
      }
    }
  }, [bgImageUrl, generatedQuote, generatedQuotes, aspectRatio, selectedTheme, footerText, footerStyle, quoteStyle, quoteFont, quoteMode]);

  const handleGenerate = async () => {
    if (!apiKey) {
      setError("API Key tidak ditemukan. Pastikan Anda sudah mengaturnya di Netlify Environment Variables (VITE_GEMINI_API_KEY).");
      return;
    }
    setIsLoading(true);
    setError("");
    setCompositeImageUrl("");
    setCompositeImageUrls([]);
    
    try {
      setLoadingStep("Menulis kutipan...");
      const isContinuous = quoteMode === "continuous";
      
      const textPrompt = isContinuous
        ? `Buatkan 4 kutipan bahasa Indonesia bersambung dengan tema: "${selectedTheme}" untuk "${targetAudience}". ${additionalPrompt} Berikan JSON: {"quotes": [], "imagePrompt": "English prompt for artistic background"}`
        : `Buatkan kutipan bahasa Indonesia tema: "${selectedTheme}" untuk "${targetAudience}". ${additionalPrompt} Berikan JSON: {"quote": "", "imagePrompt": "English prompt for artistic background"}`;

      const textPayload = {
        contents: [{ parts: [{ text: textPrompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      };

      // MENGGUNAKAN MODEL STABIL gemini-1.5-flash
      const textRes = await fetchWithRetry(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(textPayload) }
      );
      
      const rawText = textRes.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsedData = JSON.parse(rawText);
      
      if (isContinuous) setGeneratedQuotes(parsedData.quotes || []);
      else setGeneratedQuote(parsedData.quote || "");

      if (customBgFile) {
        setBgImageUrl(customBgFile);
      } else {
        setLoadingStep("Melukis latar belakang...");
        const imgPayload = {
          instances: { prompt: parsedData.imagePrompt },
          parameters: { sampleCount: 1 }
        };
        // MENGGUNAKAN MODEL IMAGEN STABIL
        const imgRes = await fetchWithRetry(
          `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${apiKey}`,
          { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(imgPayload) }
        );
        setBgImageUrl(`data:image/png;base64,${imgRes.predictions[0].bytesBase64Encoded}`);
      }
    } catch (err) {
      setError(`Kesalahan API: ${err.message}`);
    } finally {
      setIsLoading(false);
      setLoadingStep("");
    }
  };

  const drawCanvas = (base64Img, text, ratioStr, theme, fText, fStyle, qStyle, qFont) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const dims = { "1:1": { w: 1080, h: 1080 }, "3:4": { w: 1080, h: 1440 }, "4:3": { w: 1440, h: 1080 }, "9:16": { w: 1080, h: 1920 }, "16:9": { w: 1920, h: 1080 } }[ratioStr] || { w: 1080, h: 1080 };
      canvas.width = dims.w; canvas.height = dims.h;
      const img = new Image();
      img.onload = () => {
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        ctx.drawImage(img, (canvas.width/2)-(img.width/2)*scale, (canvas.height/2)-(img.height/2)*scale, img.width*scale, img.height*scale);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.font = `${qStyle} 60px ${qFont}`;
        const words = text.split(' ');
        let lines = [], line = '', maxWidth = canvas.width - 200;
        for (let n=0; n<words.length; n++) {
          let testLine = line + words[n] + ' ';
          if (ctx.measureText(testLine).width > maxWidth && n > 0) { lines.push(line); line = words[n] + ' '; }
          else line = testLine;
        }
        lines.push(line);
        let y = (canvas.height/2) - (lines.length * 40);
        lines.forEach(l => { ctx.fillText(l.trim(), canvas.width/2, y); y += 80; });
        if (fText) { ctx.font = `${fStyle} 30px ${qFont}`; ctx.fillText(fText, canvas.width/2, y + 40); }
        resolve(canvas.toDataURL('image/png'));
      };
      img.src = base64Img;
    });
  };

  const handleDownload = () => {
    const urls = quoteMode === "continuous" ? compositeImageUrls : [compositeImageUrl];
    urls.forEach((url, i) => {
      const a = document.createElement('a'); a.href = url; a.download = `Quote-${i}.png`; a.click();
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="bg-slate-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-800">
          <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">Asfhir Quotes Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" placeholder="Username" value={loginUsername} onChange={(e)=>setLoginUsername(e.target.value)} className="w-full p-3 bg-slate-800 rounded-lg text-white border border-slate-700" required />
            <input type="password" placeholder="Password" value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)} className="w-full p-3 bg-slate-800 rounded-lg text-white border border-slate-700" required />
            {loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>}
            <button type="submit" className="w-full bg-blue-600 p-3 rounded-lg font-bold hover:bg-blue-500 transition-colors text-white">
              {isLoggingIn ? "Memeriksa..." : "MASUK"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      <header className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-400 mb-2">Asfhir Quotes Studio</h1>
        <p className="text-slate-400">Generator Kutipan AI - Versi Stabil</p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6 bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Mode Kutipan</label>
            <select value={quoteMode} onChange={(e)=>setQuoteMode(e.target.value)} className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700">
              <option value="single">Kutipan Tunggal</option>
              <option value="continuous">Kutipan Bersambung (4 Slide)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Tema</label>
            <select value={selectedTheme} onChange={(e)=>setSelectedTheme(e.target.value)} className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700">
              {THEMES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Target Audience</label>
            <select value={targetAudience} onChange={(e)=>setTargetAudience(e.target.value)} className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700">
              {TARGETS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Footer / Username</label>
            <input type="text" placeholder="Contoh: @asfhir_studio" value={footerText} onChange={(e)=>setFooterText(e.target.value)} className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700" />
          </div>

          <button onClick={handleGenerate} disabled={isLoading} className="w-full bg-blue-600 p-4 rounded-xl font-bold hover:bg-blue-500 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <Icon name="RefreshCw" className="w-5 h-5 animate-spin" />
                {loadingStep}
              </>
            ) : (
              <>
                <Icon name="Sparkles" className="w-5 h-5" />
                GENERATE SEKARANG
              </>
            )}
          </button>
          
          {error && (
            <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg flex gap-2 text-red-200 text-sm">
              <Icon name="AlertCircle" className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center min-h-[400px] sticky top-8">
          {compositeImageUrl || compositeImageUrls.length > 0 ? (
            <div className="w-full space-y-4">
              <div className="relative group">
                <img 
                  src={compositeImageUrls[0] || compositeImageUrl} 
                  className="w-full h-auto rounded-lg shadow-2xl border border-slate-700" 
                  alt="Hasil Preview"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                  <p className="text-white font-medium">Pratinjau Hasil</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={handleDownload} 
                  className="flex-1 bg-green-600 hover:bg-green-500 p-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Icon name="Download" className="w-5 h-5" />
                  UNDUH SEMUA
                </button>
                <button 
                  onClick={() => {setCompositeImageUrl(""); setCompositeImageUrls([])}} 
                  className="bg-slate-800 hover:bg-slate-700 p-3 rounded-xl transition-colors"
                >
                  <Icon name="X" className="w-5 h-5" />
                </button>
              </div>
              
              {quoteMode === "continuous" && (
                <p className="text-center text-xs text-slate-500 italic">
                  *4 slide telah dibuat dan siap diunduh secara bersamaan.
                </p>
              )}
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                <Icon name="ImageIcon" className="w-10 h-10 text-slate-600" />
              </div>
              <div className="space-y-1">
                <p className="text-slate-400 font-medium">Belum ada kutipan</p>
                <p className="text-slate-600 text-sm">Klik tombol "Generate" untuk mulai berkarya.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="max-w-4xl mx-auto text-center mt-16 pb-8 border-t border-slate-900 pt-8">
        <p className="text-slate-600 text-sm">© 2024 Asfhir Quotes Studio. Didukung oleh Gemini AI.</p>
      </footer>
    </div>
  );
}