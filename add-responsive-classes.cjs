const fs = require('fs');

const file = 'src/components/AdminPanel.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replacements map (regex string to replace function or string)
const replacements = [
  // Layout Root
  {
    regex: /<div style=\{\{ display: 'flex', minHeight: '100vh',/g,
    replace: '<div className="admin-layout" style={{ display: \'flex\', minHeight: \'100vh\','
  },
  // Sidebar
  {
    regex: /<motion\.aside([\s\S]*?)style=\{\{([\s\S]*?)background: 'rgba\(30, 41, 59, 0\.7\)',/g,
    replace: '<motion.aside$1className="admin-sidebar" style={{$2background: \'rgba(30, 41, 59, 0.7)\','
  },
  // Main
  {
    regex: /<main style=\{\{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh',/g,
    replace: '<main className="admin-main" style={{ flex: 1, display: \'flex\', flexDirection: \'column\', height: \'100vh\','
  },
  // Header
  {
    regex: /<header style=\{\{ height: 90, background: 'rgba\(15, 23, 42, 0\.8\)',/g,
    replace: '<header className="admin-header" style={{ height: 90, background: \'rgba(15, 23, 42, 0.8)\','
  },
  // Grids
  {
    regex: /<div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(4, 1fr\)', gap: (32|24) \}\}>/g,
    replace: '<div className={`admin-grid-4 gap-${$1}`} style={{ display: \'grid\', gridTemplateColumns: \'repeat(4, 1fr)\', gap: $1 }}>'
  },
  {
    regex: /<div style=\{\{ display: 'grid', gridTemplateColumns: '2\.5fr 1fr', gap: 40 \}\}>/g,
    replace: '<div className="admin-grid-2-1" style={{ display: \'grid\', gridTemplateColumns: \'2.5fr 1fr\', gap: 40 }}>'
  },
  {
    regex: /<div style=\{\{ display: 'grid', gridTemplateColumns: '1\.2fr 1fr', gap: 64 \}\}>/g,
    replace: '<div className="admin-grid-1-1" style={{ display: \'grid\', gridTemplateColumns: \'1.2fr 1fr\', gap: 64 }}>'
  },
  {
    regex: /<div style=\{\{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: (32|20|16|12) \}\}>/g,
    replace: '<div className={`admin-grid-2 gap-${$1}`} style={{ display: \'grid\', gridTemplateColumns: \'1fr 1fr\', gap: $1 }}>'
  },
  {
    regex: /<div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(3, 1fr\)', gap: (32|20) \}\}>/g,
    replace: '<div className={`admin-grid-3 gap-${$1}`} style={{ display: \'grid\', gridTemplateColumns: \'repeat(3, 1fr)\', gap: $1 }}>'
  },
  // Auto-fill cards grids
  {
    regex: /<div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(auto-fill, minmax\(360px, 1fr\)\)', gap: 32 \}\}>/g,
    replace: '<div className="admin-grid-cards-360" style={{ display: \'grid\', gridTemplateColumns: \'repeat(auto-fill, minmax(360px, 1fr))\', gap: 32 }}>'
  },
  {
    regex: /<div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(auto-fill, minmax\(420px, 1fr\)\)', gap: 32 \}\}>/g,
    replace: '<div className="admin-grid-cards-420" style={{ display: \'grid\', gridTemplateColumns: \'repeat(auto-fill, minmax(420px, 1fr))\', gap: 32 }}>'
  },
  {
    regex: /<div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(auto-fill, minmax\(380px, 1fr\)\)', gap: 32 \}\}>/g,
    replace: '<div className="admin-grid-cards-380" style={{ display: \'grid\', gridTemplateColumns: \'repeat(auto-fill, minmax(380px, 1fr))\', gap: 32 }}>'
  },
  // Fix sidebar toggle button container to use className instead of specific paddings if needed, but let's stick to the main ones first.
];

let newContent = content;
replacements.forEach(r => {
  newContent = newContent.replace(r.regex, r.replace);
});

// also make sure to import AdminPanel.css at the top
if (!newContent.includes("import './AdminPanel.css';")) {
  newContent = newContent.replace(
    "import { useState, useEffect } from 'react';", 
    "import { useState, useEffect } from 'react';\nimport './AdminPanel.css';"
  );
}

fs.writeFileSync(file, newContent, 'utf8');
console.log('AdminPanel.tsx updated with responsive classes.');
