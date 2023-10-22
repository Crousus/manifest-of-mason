import React, { useState, useRef } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import java from 'react-syntax-highlighter/dist/esm/languages/hljs/java';
import dracula from 'react-syntax-highlighter/dist/esm/styles/hljs/dracula';

SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('java', java);

type CodeBoxProps = {
  pythonCode: string;
  javaCode: string;
};

export default function CodeBox({ pythonCode, javaCode }: CodeBoxProps) {
  const [language, setLanguage] = useState('python');
  const codeRef = useRef();

  const handleCopyClick = () => {
    const codeToCopy = language === 'python' ? pythonCode : javaCode;
    navigator.clipboard.writeText(codeToCopy)
      .then(() => alert("Code copied to clipboard"))
      .catch(err => console.error("Could not copy text: ", err));
  };

  const handleLanguageSwitch = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'python' ? 'java' : 'python'));
  };

  return (
    <div className="lg:pr-4">
      <div className="relative overflow-hidden rounded-3xl bg-[#282a36] px-6 pb-9 pt-8 shadow-2xl sm:px-12 lg:max-w-2xl lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
        <button
          onClick={handleCopyClick}
          className="absolute top-4 right-4 rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
        >
          Copy
        </button>
        <button
          onClick={handleLanguageSwitch}
          className="absolute top-4 right-18 rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
        >
          {language === 'python' ? 'Python' : 'Java'}
        </button>
        <SyntaxHighlighter language={language} style={dracula} className="mt-2">
          {language === 'python' ? pythonCode : javaCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
