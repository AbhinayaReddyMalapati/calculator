import React, { useState } from "react";
import { EditorView, basicSetup } from "codemirror";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { go } from "@codemirror/lang-go";
import { php } from "@codemirror/lang-php";
import { swift } from "@codemirror/lang-swift";
import { rust } from "@codemirror/lang-rust";
import { EditorState } from "@codemirror/state";
import { useThemeUI } from "theme-ui";

const languageExtensions: Record<string, any> = {
  Python: python(),
  JavaScript: javascript(),
  "C/C++": cpp(),
  Go: go(),
  PHP: php(),
  Swift: swift(),
  Rust: rust(),
};

const CodeEditor: React.FC<{ selectedLanguage: string }> = ({ selectedLanguage }) => {
  const [code, setCode] = useState("// Write your code here...");
  const themeContext = useThemeUI();
  const isDark = themeContext.theme?.colors?.modes?.dark;

  const editorState = EditorState.create({
    doc: code,
    extensions: [
      basicSetup,
      languageExtensions[selectedLanguage],
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          setCode(update.state.doc.toString());
        }
      }),
      EditorView.theme({
        "&": { backgroundColor: isDark ? "#1e1e1e" : "#ffffff" },
      }),
    ],
  });

  return <EditorView state={editorState} />;
};

export default CodeEditor;

import React from "react";
import clsx from "clsx";

const languages = ["Python", "JavaScript", "TypeScript", "Go", "PHP", "Swift", "Rust", "C/C++"];

const Sidebar: React.FC<{ onSelectLanguage: (language: string) => void; activeLanguage: string }> = ({
  onSelectLanguage,
  activeLanguage,
}) => (
  <aside className="sidebar">
    {languages.map((language) => (
      <button
        key={language}
        className={clsx("language-button", { active: activeLanguage === language })}
        onClick={() => onSelectLanguage(language)}
      >
        {language}
      </button>
    ))}
  </aside>
);

export default Sidebar;

import React from "react";
import { useThemeUI } from "theme-ui";

const ThemeToggle: React.FC = () => {
  const themeContext = useThemeUI();
  const isDark = themeContext.theme?.colors?.modes?.dark;

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    themeContext.setTheme(newTheme);
  };

  return <button onClick={toggleTheme}>Switch to {isDark ? "Light" : "Dark"} Theme</button>;
};

export default ThemeToggle;

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import CodeEditor from "../components/CodeEditor";
import ThemeToggle from "../components/ThemeToggle";

const Home: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("Python");

  return (
    <div className="container">
      <Sidebar onSelectLanguage={setSelectedLanguage} activeLanguage={selectedLanguage} />
      <main className="editor-container">
        <header>
          <h1>Online Code Editor</h1>
          <ThemeToggle />
        </header>
        <CodeEditor selectedLanguage={selectedLanguage} />
      </main>
    </div>
  );
};

export default Home;
