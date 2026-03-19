import React, { useState, useEffect } from 'react';

// Komponen Ikon SVG Inline untuk mengatasi error pemuatan eksternal lucide-react
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

const apiKey = ""; // Disediakan oleh environment eksekusi

// Daftar Tema sesuai permintaan
const THEMES = [
  "Penyemangat",
  "Sedih/Putus Cinta",
  "Di Tinggalkan",
  "Lelah",
  "Puitis",
  "Sakit",
  "Penyemangat Orang yang Lagi Menderita Sakit",
  "Sufistik",
  "Islami",
  "Sedih",
  "Ramadhan",
  "Idul Fitri",
  "Rindu",
  "Ibu",
  "Ayah",
  "Saudara",
  "Kampung Halaman",
  "Senja",
  "Rembulan",
  "Malam",
  "Sunyi",
  "Debar",
  "Jatuh Cinta",
  "Sahabat",
  "Bunga"
];

// Daftar Tujuan Kutipan
const TARGETS = [
  "Semua Orang (universal)",
  "Sahabat/Teman",
  "Saudara/Kakak",
  "Ibu",
  "Ayah",
  "Kekasih/Pacar",
  "Istri",
  "Suami",
  "Adik",
  "Teman Perempuan",
  "Teman Laki-laki",
  "Anak"
];

// Opsi Rasio Aspek
const RATIOS = [
  { value: "1:1", label: "Square (IG Feed)" },
  { value: "3:4", label: "Portrait" },
  { value: "4:3", label: "Landscape" },
  { value: "9:16", label: "Story/Reels" },
  { value: "16:9", label: "Widescreen" }
];

// Opsi Pilihan Font
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

// Utilitas Fetch dengan Exponential Backoff
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
        throw new Error(`Format respons server tidak valid. Mungkin API key salah atau server sibuk.`);
      }
      
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          const authError = new Error(`Akses ditolak (${response.status}). Pastikan API Key valid atau akun Google Anda sudah terhubung.`);
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
  // State untuk Fitur Login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  // State Utama Aplikasi
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

  // Fungsi Login Menggunakan Google Sheets (CSV)
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      // URL CSV Google Sheets Anda yang sudah valid
      const sheetCSVUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT_-fsvc24MVtOjTUc16v_PvAVe9qAOcYviCTeR0cJ-exwwfRtvU1jifbZTlq5LpuoNjYRA6Uib_39l/pub?gid=0&single=true&output=csv"; 

      // Fallback Demo: HANYA aktif jika link masih kosong atau berupa teks placeholder bawaan
      if (!sheetCSVUrl || sheetCSVUrl === "LINK_PUBLISH_TO_WEB_CSV_ANDA_DISINI") {
        setTimeout(() => {
          if (loginUsername === "admin" && loginPassword === "admin123") {
            setIsLoggedIn(true);
          } else {
            setLoginError("Untuk mode DEMO, gunakan Username: admin & Password: admin123.");
          }
          setIsLoggingIn(false);
        }, 1000);
        return;
      }

      // Ambil data CSV dari tautan jika URL tidak kosong
      const response = await fetch(sheetCSVUrl);
      if (!response.ok) throw new Error("Gagal terhubung ke database. Pastikan link Google Sheets benar dan telah dipublikasikan.");
      
      const csvText = await response.text();
      
      // PERBAIKAN: Memisahkan berdasarkan baris dengan menangani format CRLF (\r\n) dari Windows/Sheets
      // serta membuang baris yang benar-benar kosong di akhir dokumen
      const rows = csvText.split(/\r?\n/).filter(row => row.trim() !== '');
      
      let isAuthenticated = false;
      
      // Amankan input pengguna (hapus spasi yang tidak sengaja terketik di awal/akhir)
      const inputUser = loginUsername.trim();
      const inputPass = loginPassword.trim();

      // Mulai dari i = 1 untuk melewati baris Header (Judul Kolom di baris pertama Sheets)
      for (let i = 1; i < rows.length; i++) {
        // PERBAIKAN: Bersihkan setiap sel dari tanda kutip ganda yang membungkus nilai CSV secara lebih aman
        const cells = rows[i].split(',').map(cell => {
          let cleanCell = cell.trim();
          if (cleanCell.startsWith('"') && cleanCell.endsWith('"')) {
            cleanCell = cleanCell.slice(1, -1);
          }
          return cleanCell.trim();
        });

        if (cells.length >= 2) {
          const dbUsername = cells[0];
          const dbPassword = cells[1];
          
          // Verifikasi kecocokan persis
          if (dbUsername === inputUser && dbPassword === inputPass) {
            isAuthenticated = true;
            break;
          }
        }
      }

      if (isAuthenticated) {
        setIsLoggedIn(true);
      } else {
        setLoginError("Username atau password salah!");
      }

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
      reader.onloadend = () => {
        setCustomBgFile(reader.result);
        if (generatedQuote || generatedQuotes.length > 0) {
          setBgImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearCustomImage = () => {
    setCustomBgFile(null);
  };

  useEffect(() => {
    if (bgImageUrl) {
      if (quoteMode === 'continuous' && generatedQuotes.length > 0) {
        Promise.all(generatedQuotes.map(q => drawCanvas(bgImageUrl, q, aspectRatio, selectedTheme, footerText, footerStyle, quoteStyle, quoteFont)))
          .then(urls => setCompositeImageUrls(urls))
          .catch(err => console.error("Canvas error:", err));
      } else if (quoteMode === 'single' && generatedQuote) {
        drawCanvas(bgImageUrl, generatedQuote, aspectRatio, selectedTheme, footerText, footerStyle, quoteStyle, quoteFont)
          .then(url => setCompositeImageUrl(url))
          .catch(err => console.error("Canvas error:", err));
      }
    }
  }, [bgImageUrl, generatedQuote, generatedQuotes, aspectRatio, selectedTheme, footerText, footerStyle, quoteStyle, quoteFont, quoteMode]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError("");
    setCompositeImageUrl("");
    setCompositeImageUrls([]);
    
    try {
      setLoadingStep("Menulis kutipan & ide artistik...");
      const isContinuous = quoteMode === "continuous";
      
      const textPrompt = isContinuous
        ? `Buatkan 4 bagian kutipan bahasa Indonesia yang saling bersambung/berhubungan (membentuk satu cerita/pesan utuh dan runtut dari bagian 1 hingga 4) dan deskripsi latar belakang dengan tema: "${selectedTheme}".\nKutipan ini ditujukan kepada: "${targetAudience}".\n${additionalPrompt ? `Instruksi tambahan dari pengguna: "${additionalPrompt}"` : ''}\n\nBerikan respons HANYA dalam format JSON valid dengan struktur:\n{\n  "quotes": ["Teks bagian 1", "Teks bagian 2", "Teks bagian 3", "Teks bagian 4"],\n  "imagePrompt": "Detailed English prompt for image generation, describing a matching artistic background (cinematic lighting, clean, aesthetic, suitable for text overlay with empty center space. No text in the image)."\n}`
        : `Buatkan kutipan dan deskripsi latar belakang dengan tema: "${selectedTheme}".\nKutipan ini ditujukan kepada: "${targetAudience}".\n${additionalPrompt ? `Instruksi tambahan dari pengguna: "${additionalPrompt}"` : ''}\n\nBerikan respons HANYA dalam format JSON valid dengan struktur:\n{\n  "quote": "Teks kutipan bahasa Indonesia (maksimal 3 kalimat pendek, menyentuh, puitis)",\n  "imagePrompt": "Detailed English prompt for image generation, describing a matching artistic background (cinematic lighting, clean, aesthetic, suitable for text overlay with empty center space. No text in the image)."\n}`;

      const textPayload = {
        contents: [{ parts: [{ text: textPrompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: isContinuous ? {
            type: "OBJECT",
            properties: {
              quotes: { type: "ARRAY", items: { type: "STRING" } },
              imagePrompt: { type: "STRING" }
            },
            required: ["quotes", "imagePrompt"]
          } : {
            type: "OBJECT",
            properties: {
              quote: { type: "STRING" },
              imagePrompt: { type: "STRING" }
            },
            required: ["quote", "imagePrompt"]
          }
        }
      };

      const textRes = await fetchWithRetry(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(textPayload) }
      );
      
      const rawText = textRes.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error("Respons API Gemini kosong atau formatnya berubah.");
      
      let parsedData;
      try {
        parsedData = JSON.parse(rawText);
      } catch (parseErr) {
        const cleanedText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
        parsedData = JSON.parse(cleanedText);
      }
      
      if (isContinuous) {
        setGeneratedQuotes(parsedData.quotes || []);
        setGeneratedQuote("");
      } else {
        setGeneratedQuote(parsedData.quote || "");
        setGeneratedQuotes([]);
      }

      if (customBgFile) {
        setLoadingStep("Mengatur gambar latar belakang Anda...");
        setBgImageUrl(customBgFile);
        setLoadingStep("Mendesain tipografi...");
      } else {
        setLoadingStep("Melukis gambar latar belakang...");
        const imgPayload = {
          instances: { prompt: parsedData.imagePrompt },
          parameters: { sampleCount: 1, aspectRatio: aspectRatio }
        };

        let imgRes;
        try {
          imgRes = await fetchWithRetry(
            `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`,
            { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(imgPayload) },
            2
          );
        } catch (e) {
          console.warn("Retrying image generation without aspectRatio...");
          const fallbackPayload = {
            instances: { prompt: parsedData.imagePrompt },
            parameters: { sampleCount: 1 }
          };
          imgRes = await fetchWithRetry(
            `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`,
            { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fallbackPayload) }
          );
        }

        const base64 = `data:image/png;base64,${imgRes.predictions[0].bytesBase64Encoded}`;
        setBgImageUrl(base64);
        setLoadingStep("Mendesain tipografi...");
      }

    } catch (err) {
      console.error(err);
      setError(`Terjadi kesalahan: ${err.message}. Silakan coba lagi.`);
    } finally {
      setIsLoading(false);
      setLoadingStep("");
    }
  };

  const drawCanvas = (base64Img, text, ratioStr, theme, fText, fStyle, qStyle, qFont) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      const dims = {
        "1:1": { w: 1080, h: 1080 },
        "3:4": { w: 1080, h: 1440 },
        "4:3": { w: 1440, h: 1080 },
        "9:16": { w: 1080, h: 1920 },
        "16:9": { w: 1920, h: 1080 }
      }[ratioStr] || { w: 1080, h: 1080 };

      canvas.width = dims.w;
      canvas.height = dims.h;

      const img = new Image();
      img.onload = () => {
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.25)');
        gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.55)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.85)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 3;
        ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

        const fontFamily = qFont;
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.font = `italic 240px ${fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('"', canvas.width / 2, canvas.height / 2 - 180);

        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 16;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 4;

        let fontSize = (ratioStr === "16:9" || ratioStr === "4:3") ? 52 : 64;
        const maxWidth = canvas.width - 240;
        let lines = [];
        let lineHeight;

        const qStyleStr = qStyle.includes('italic') ? 'italic' : 'normal';
        const qWeightStr = qStyle.includes('bold') ? 'bold' : 'normal';

        while (fontSize > 30) {
          ctx.font = `${qStyleStr} ${qWeightStr} ${fontSize}px ${fontFamily}`;
          lineHeight = fontSize * 1.5;
          lines = [];
          let line = '';
          const words = text.split(' ');
          
          for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && n > 0) {
              lines.push(line.trim());
              line = words[n] + ' ';
            } else {
              line = testLine;
            }
          }
          lines.push(line.trim());
          
          if ((lines.length * lineHeight) < (canvas.height - 400)) {
            break;
          }
          fontSize -= 4;
        }

        ctx.fillStyle = '#ffffff';
        const initialStartY = (canvas.height / 2) - ((lines.length * lineHeight) / 2) + (lineHeight / 2);
        let currentY = initialStartY;

        for (let i = 0; i < lines.length; i++) {
          ctx.fillText(lines[i], canvas.width / 2, currentY);
          currentY += lineHeight;
        }

        const finishCanvas = () => {
          if (fText) {
            const styleStr = fStyle.includes('italic') ? 'italic' : 'normal';
            const weightStr = fStyle.includes('bold') ? 'bold' : 'normal';
            
            ctx.font = `${styleStr} ${weightStr} 34px ${fontFamily}`;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.fillText(fText, canvas.width / 2, currentY + 10); 
          }

          ctx.font = `italic 28px ${fontFamily}`;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.shadowBlur = 8;
          ctx.fillText("My_Quotes", canvas.width / 2, canvas.height - 120);

          resolve(canvas.toDataURL('image/png'));
        };

        const drawTopWatermark = () => {
          const topText = "@pejalan_sunyi4";
          ctx.font = `bold 30px ${fontFamily}`;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          const textWidth = ctx.measureText(topText).width;
          const iconSize = 34;
          const spacing = 12;
          
          const totalWidth = iconSize + spacing + textWidth;
          const startX = (canvas.width / 2) - (totalWidth / 2);
          const topY = initialStartY - 70; 

          const topIcon = new Image();
          const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"/></svg>`;
          topIcon.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgIcon)}`;
          
          topIcon.onload = () => {
            ctx.drawImage(topIcon, startX, topY - (iconSize / 2), iconSize, iconSize);
            ctx.fillText(topText, startX + iconSize + spacing + (textWidth / 2), topY);
            finishCanvas(); 
          };
          topIcon.onerror = () => {
            ctx.fillText(topText, canvas.width / 2, topY);
            finishCanvas();
          };
        };

        drawTopWatermark();
      };
      img.onerror = reject;
      img.src = base64Img;
    });
  };

  const handleDownload = () => {
    if (quoteMode === "continuous") {
      if (compositeImageUrls.length === 0) return;
      compositeImageUrls.forEach((url, index) => {
        setTimeout(() => {
          const a = document.createElement('a');
          a.href = url;
          a.download = `QuotesAI-${selectedTheme.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-part${index + 1}-${Date.now()}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }, index * 400); 
      });
    } else {
      if (!compositeImageUrl) return;
      const a = document.createElement('a');
      a.href = compositeImageUrl;
      a.download = `QuotesAI-${selectedTheme.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginUsername("");
    setLoginPassword("");
  };

  // Tampilan Login (Jika belum login)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
        
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md z-10 relative backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 border border-slate-700 mb-4 shadow-inner">
              <Icon name="Sparkles" className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Asfhir Quotes
            </h1>
            <p className="text-slate-400 text-sm mt-2">Silakan masuk untuk melanjutkan ke studio</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="User" className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg bg-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Masukkan username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Lock" className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg bg-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs text-center">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn || !loginUsername || !loginPassword}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-lg shadow-blue-500/30 transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2 mt-4"
            >
              {isLoggingIn ? (
                <Icon name="RefreshCw" className="w-5 h-5 animate-spin" />
              ) : (
                <Icon name="LogIn" className="w-5 h-5" />
              )}
              {isLoggingIn ? 'Memverifikasi...' : 'Masuk Sekarang'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Tampilan Utama Aplikasi (Jika sudah login)
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans selection:bg-blue-500/30 relative">
      
      {/* Tombol Logout */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700 hover:bg-slate-800 rounded-lg text-sm text-slate-300 transition-colors"
        >
          <Icon name="User" className="w-4 h-4" /> Logout ({loginUsername})
        </button>
      </div>

      <header className="mb-8 text-center max-w-2xl mx-auto pt-8">
        <div className="inline-flex items-center justify-center gap-3 mb-2">
          <Icon name="Sparkles" className="w-8 h-8 text-blue-400" />
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Asfhir Quotes Studio
          </h1>
        </div>
        <p className="text-slate-400 text-lg">Hasilkan gambar kutipan estetik dan bermakna dalam hitungan detik.</p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Panel Kontrol Kiri */}
        <div className="lg:col-span-4 space-y-6 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
              <Icon name="Layers" className="w-4 h-4" /> Mode Kutipan
            </label>
            <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
              <button
                onClick={() => setQuoteMode("single")}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${quoteMode === 'single' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Tunggal
              </button>
              <button
                onClick={() => setQuoteMode("continuous")}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${quoteMode === 'continuous' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Bersambung (4 Gb)
              </button>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
              <Icon name="Type" className="w-4 h-4" /> Pilih Tema Kutipan
            </label>
            <select 
              value={selectedTheme} 
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              {THEMES.map(theme => <option key={theme} value={theme}>{theme}</option>)}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
              <Icon name="Users" className="w-4 h-4" /> Tujuan Kutipan (Untuk Siapa)
            </label>
            <select 
              value={targetAudience} 
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              {TARGETS.map(target => <option key={target} value={target}>{target}</option>)}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
              <Icon name="Type" className="w-4 h-4" /> Font & Gaya Kutipan
            </label>
            <div className="flex gap-2">
              <select
                value={quoteFont}
                onChange={(e) => setQuoteFont(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              >
                {FONTS.map(f => <option key={f.name} value={f.value}>{f.name}</option>)}
              </select>
              <select
                value={quoteStyle}
                onChange={(e) => setQuoteStyle(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all flex-shrink-0"
              >
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
                <option value="normal bold">Normal Bold</option>
                <option value="italic bold">Italic Bold</option>
              </select>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
              <Icon name="Layout" className="w-4 h-4" /> Rasio Aspek
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {RATIOS.map(r => (
                <button 
                  key={r.value}
                  onClick={() => setAspectRatio(r.value)}
                  className={`p-3 rounded-lg flex flex-col items-center justify-center gap-2 border transition-all ${
                    aspectRatio === r.value 
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300' 
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div 
                    className={`w-6 border-2 border-current rounded-sm ${aspectRatio === r.value ? 'opacity-100' : 'opacity-60'}`} 
                    style={{ aspectRatio: r.value.replace(':', '/'), height: r.value === '16:9' ? '12px' : 'auto' }}
                  ></div>
                  <span className="text-xs font-medium">{r.value}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
              <Icon name="ImageIcon" className="w-4 h-4" /> Latar Belakang <span className="text-xs font-normal text-slate-500">(Opsional)</span>
            </label>
            {!customBgFile ? (
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-700 border-dashed rounded-lg cursor-pointer bg-slate-800 hover:bg-slate-700 hover:border-blue-500 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Icon name="Upload" className="w-6 h-6 mb-2 text-slate-400" />
                  <p className="text-xs text-slate-400"><span className="font-semibold">Klik untuk unggah</span> gambar sendiri</p>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            ) : (
              <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-700">
                <img src={customBgFile} alt="Custom Background" className="w-full h-full object-cover" />
                <button
                  onClick={clearCustomImage}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white hover:bg-red-500 transition-colors"
                  title="Hapus Gambar Latar"
                >
                  <Icon name="X" className="w-4 h-4" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-1.5 text-center text-xs text-white">
                  Gambar Anda siap digunakan
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
              Prompt Tambahan <span className="text-xs font-normal text-slate-500">(Opsional)</span>
            </label>
            <textarea 
              value={additionalPrompt}
              onChange={(e) => setAdditionalPrompt(e.target.value)}
              placeholder="Cth: Gunakan bahasa yang lebih puitis, dan suasana senja di latar belakang..."
              className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-4 py-3 h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
              Nama Footer (Watermark) <span className="text-xs font-normal text-slate-500">(Opsional)</span>
            </label>
            <div className="flex gap-2">
              <input 
                type="text"
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
                placeholder="Cth: @nama_kamu"
                className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <select
                value={footerStyle}
                onChange={(e) => setFooterStyle(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all flex-shrink-0"
              >
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
                <option value="normal bold">Normal Bold</option>
                <option value="italic bold">Italic Bold</option>
              </select>
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-lg shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:active:scale-100"
          >
            {isLoading ? <Icon name="RefreshCw" className="w-5 h-5 animate-spin" /> : <Icon name="Sparkles" className="w-5 h-5" />}
            {isLoading ? 'Sedang Memproses AI...' : 'Buat Kutipan Estetik'}
          </button>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3 text-red-400 text-sm">
              <Icon name="AlertCircle" className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}
        </div>

        {/* Panel Pratinjau Kanan */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col overflow-hidden relative min-h-[500px]">
          
          <div className="flex-1 p-6 flex flex-col items-center justify-center relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-950 overflow-y-auto">
            {compositeImageUrls.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl pb-10">
                {compositeImageUrls.map((url, idx) => (
                  <div key={idx} className="relative group">
                    <img 
                      src={url} 
                      alt={`AI Generated Quote Part ${idx + 1}`} 
                      className="w-full h-auto object-contain rounded-lg shadow-2xl ring-1 ring-white/10" 
                    />
                    <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-lg">
                      Slide {idx + 1} / {compositeImageUrls.length}
                    </div>
                  </div>
                ))}
              </div>
            ) : compositeImageUrl ? (
              <img 
                src={compositeImageUrl} 
                alt="AI Generated Quote" 
                className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-2xl ring-1 ring-white/10" 
              />
            ) : (
              <div className="text-center text-slate-500 flex flex-col items-center">
                <Icon name="ImageIcon" className="w-20 h-20 mb-4 opacity-20" />
                <p className="text-lg font-medium">Kanvas Kosong</p>
                <p className="text-sm mt-1 max-w-sm">Tentukan pengaturan Anda di sebelah kiri dan klik tombol untuk mulai menghasilkan mahakarya.</p>
              </div>
            )}

            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center z-10 p-6 text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                  <Icon name="Sparkles" className="w-6 h-6 text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 animate-pulse">Sedang Meracik Keajaiban...</h3>
                <p className="text-blue-300 font-medium">{loadingStep}</p>
              </div>
            )}
          </div>

          {/* Baris Tindakan Bawah */}
          <div className="bg-slate-950 border-t border-slate-800 p-4 flex justify-between items-center">
            <div className="text-sm text-slate-400 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              Model: Gemini 2.5 Flash & Imagen 4.0
            </div>
            
            <button 
              onClick={handleDownload}
              disabled={(!compositeImageUrl && compositeImageUrls.length === 0) || isLoading}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium border border-slate-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Download" className="w-4 h-4" /> 
              {compositeImageUrls.length > 0 ? `Unduh Semua (${compositeImageUrls.length})` : 'Unduh Gambar HD'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}