import { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('How are you?');
  const [selectedLanguage, setSelectedLanguage] = useState('french');
  const [showResults, setShowResults] = useState(false);
  const [translationResult, setTranslationResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    { id: 'french', name: 'French', flag: '🇫🇷' },
    { id: 'spanish', name: 'Spanish', flag: '🇪🇸' },
    { id: 'tamil', name: 'Tamil', flag: ' 🇮🇳' },
  ];

  const handleTranslate = async () => {
    try {
      setIsLoading(true);
      console.log(`Translating "${text}" to ${selectedLanguage}`);
      const url = 'https://openai-api-worker.cgraaaj.workers.dev';
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, language: selectedLanguage }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Translation result:', data);
      // Store the translation result and show results screen
      setTranslationResult(data);
      setShowResults(true);
      
    } catch (error) {
      console.error('Translation error:', error);
      // For demo purposes, show a mock translation
      setTranslationResult(getMockTranslation(text, selectedLanguage));
      setShowResults(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setShowResults(false);
    setTranslationResult('');
    setText('How are you?');
    setSelectedLanguage('french');
  };

  const getMockTranslation = (inputText, language) => {
    const translations = {
      french: "Comment allez-vous?",
      spanish: "¿Cómo estás?",
      tamil: "நீங்கள் எப்படி இருக்கிறீர்கள்?",
      hindi: "आप कैसे हैं?"
    };
    return translations[language] || "Translation result will appear here";
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <div className="logo-section">
            <div className="parrot-logo">
              <span className="parrot">🦜</span>
              <div className="stars">
                <span className="star">✨</span>
                <span className="star">⭐</span>
                <span className="star">✨</span>
              </div>
            </div>
            <div className="brand-text">
              <h1>PollyGlot</h1>
              <p>Perfect Translation Every Time</p>
            </div>
          </div>
        </header>

        <main className="main-content">
          {!showResults ? (
            <div className="translation-card">
              <div className="text-input-section">
                <label className="section-label">
                  Text to translate 👇
                </label>
                <textarea
                  className="text-input"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text to translate..."
                />
              </div>

              <div className="language-selection">
                <label className="section-label">
                  Select language 👇
                </label>
                <div className="language-options">
                  {languages.map((language) => (
                    <label key={language.id} className="language-option">
                      <input
                        type="radio"
                        name="language"
                        value={language.id}
                        checked={selectedLanguage === language.id}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                      />
                      <span className="language-text">
                        {language.name} {language.flag}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button 
                className="translate-button" 
                onClick={handleTranslate}
                disabled={isLoading}
              >
                {isLoading ? 'Translating...' : 'Translate'}
              </button>
            </div>
          ) : (
            <div className="results-card">
              <div className="result-section">
                <label className="section-label">
                  Original text 👇
                </label>
                <div className="result-text-box">
                  {text}
                </div>
              </div>

              <div className="result-section">
                <label className="section-label">
                  Your translation 👇
                </label>
                <div className="result-text-box">
                  {translationResult}
                </div>
              </div>

              <button className="start-over-button" onClick={handleStartOver}>
                Start Over
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
