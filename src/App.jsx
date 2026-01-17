
import React, { useState, useEffect, useRef } from 'react';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'path', content: 'C:\\Users\\aditi\\terminal' },
    { type: 'line', content: '---' },
    { type: 'output', content: 'Hey There! I am Aditi Sanap...' },
    { type: 'output', content: 'To know me better, just enter "help".' },
    { type: 'blank', content: '' },
  ]);
  
  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const commands = {
    help: (
      <div className="mt-2">
        <p><span className="text-pink-400/70">about</span>      - learn more about me</p>
        <p><span className="text-pink-400/70">education</span>  - explore my academic journey</p>
        <p><span className="text-pink-400/70">work</span>       - view my relevant experience</p>
        <p><span className="text-pink-400/70">projects</span>   - check out my projects</p>
        <p><span className="text-pink-400/70">skills</span>     - view my skill set</p>
        <p><span className="text-pink-400/70">socials</span>    - discover my social media profiles</p>
        <p><span className="text-pink-400/70">certification</span> - view my professional credentials</p>
        <p><span className="text-pink-400/70">welcome</span>    - view the introductory section</p>
        <p><span className="text-pink-400/70">pwd</span>        - show the current working directory</p>
        <p><span className="text-pink-400/70">echo</span>       - display custom text</p>
        <p><span className="text-pink-400/70">clear</span>      - clear the terminal display</p>
      </div>
    ),
    certifications: (
      <div className="mt-2 border-l-2 border-pink-500/30 pl-4">
        <p className="text-yellow-400 font-bold mb-2 underline">Oracle Cloud Professional Certifications:</p>
        
        <div className="mb-3">
          <p className="text-pink-100 font-semibold">● Oracle APEX Cloud Certified Developer Professional</p>
          <a href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=FD1D70C86C6ED1C091BC2503F180049C46CF756E7AAB2F9AD8B0B1EBDA76488B" target="_blank" rel="noreferrer" className="text-blue-400 text-sm hover:underline ml-4">
            [Verify Badge ↗]
          </a>
        </div>

        <div className="mb-3">
          <p className="text-pink-100 font-semibold">● Oracle Cloud Infrastructure 2025 Certified DevOps Professional</p>
          <a href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=D6B22419412CC6CA948A9D45162113CDFF35C3816737C07CA29798A978D878E7" target="_blank" rel="noreferrer" className="text-blue-400 text-sm hover:underline ml-4">
            [Verify Badge ↗]
          </a>
        </div>

        <div className="mb-3">
          <p className="text-pink-100 font-semibold">● Oracle Cloud Infrastructure 2025 Certified Data Science Professional</p>
          <a href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=ECB8DB4E59812E29CC9B941E9F293C025B4368DA7365B8D2B92533B1626AA20F" target="_blank" rel="noreferrer" className="text-blue-400 text-sm hover:underline ml-4">
            [Verify Badge ↗]
          </a>
        </div>
      </div>
    ),
    about: "I am a Software Developer specialized in GenAI, MLOps, API, Frontend, Big Data & DevOps.",
    education: "Pursuing B.Tech in Computer Science. Interested in automation and scalable systems.",
    work: "Frontend & DevOps Intern | Open Source Contributor.",
    projects: "Terminal Portfolio, AI-integrated Web Apps, and CI/CD Automation Pipelines.",
    skills: "React, Python, Tableau, Tailwind, C++, Docker, Jenkins, MySQL.",
    socials: (
      <div className="mt-1">
        <p>Email: <span className="text-pink-400">aditibabansanap@gmail.com</span></p>
        <p>LinkedIn: <span className="text-pink-400">linkedin.com/in/aditi-sanap</span></p>
        <p>GitHub: <span className="text-pink-400">github.com/aditi-sanap</span></p>
      </div>
    ),
    welcome: "Welcome to my interactive terminal! I am a developer passionate about bridging UI and DevOps.",
    pwd: "C:\\Users\\aditi\\terminal",
    whoami: "You are an explorer in Aditi's digital workspace."
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const parts = input.trim().split(' ');
      const mainCommand = parts[0].toLowerCase();
      const args = parts.slice(1).join(' ');

      // Fix: Defined isCertCommand to handle different user inputs
      const isCertCommand = 
        mainCommand === 'certification' || 
        mainCommand === 'certifications' || 
        (mainCommand === 'professional' && parts[1] === 'certification');

      const newHistory = [...history, { type: 'input', content: input }];

      if (mainCommand === 'clear') {
        setHistory([{ type: 'path', content: 'C:\\Users\\aditi\\terminal' }]);
      } else if (mainCommand === 'echo') {
        newHistory.push({ type: 'output', content: args || "Echo what?" });
        setHistory(newHistory);
      } else if (isCertCommand) {
        newHistory.push({ type: 'output', content: commands.certifications });
        setHistory(newHistory);
      } else if (commands[mainCommand]) {
        newHistory.push({ type: 'output', content: commands[mainCommand] });
        setHistory(newHistory);
      } else if (mainCommand !== "") {
        newHistory.push({ type: 'output', content: `Unknown command: ${mainCommand}` });
        setHistory(newHistory);
      }
      setInput('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#121212] p-6 font-mono">
      <div className="w-full max-w-3xl bg-[#1e1e1e] p-8 rounded-md shadow-[0_20px_50px_rgba(236,72,153,0.2)] min-h-[600px] border border-pink-900/30">
        
        <div className="text-pink-100 text-lg leading-relaxed text-left">
          {history.map((line, index) => (
            <div key={index} className="mb-4">
              {line.type === 'path' && (
                <p className="text-pink-500 font-bold mb-6">{line.content}</p>
              )}
              {line.type === 'line' && (
                <p className="text-pink-900/50">---</p>
              )}
              {line.type === 'output' && (
                <div className="text-pink-50/90">{line.content}</div>
              )}
              {line.type === 'input' && (
                <p>
                  <span className="text-pink-400/70">aditi@desktop:~$</span>
                  <span className="ml-3 text-pink-300">{line.content}</span>
                </p>
              )}
            </div>
          ))}

          <div className="flex items-center mt-6">
            <span className="text-pink-400/70">aditi@desktop:~$</span>
            <input
              type="text"
              className="flex-1 ml-3 bg-transparent outline-none border-none text-white caret-pink-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              autoFocus
            />
          </div>
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
