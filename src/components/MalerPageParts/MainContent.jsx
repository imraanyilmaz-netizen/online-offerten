import React from 'react';
// framer-motion removed - CSS for better INP
import { Home, Building } from 'lucide-react';
import CostTable from './CostTable';

const interiorItems = [
  { col1: "Decke & Wände weiss streichen (Standard)", col2: "8 - 15 CHF" },
  { col1: "Wände farbig streichen (pro Farbe)", col2: "10 - 20 CHF" },
  { col1: "Türen und Türrahmen lackieren (pro Stück)", col2: "150 - 250 CHF" },
  { col1: "Fenster lackieren (pro Stück)", col2: "100 - 200 CHF" }
];

const exteriorItems = [
  { col1: "Fassade reinigen & grundieren", col2: "10 - 25 CHF" },
  { col1: "Fassade streichen (2 Anstriche)", col2: "30 - 50 CHF" },
  { col1: "Gerüstbau (pro m² Fassadenfläche)", col2: "8 - 15 CHF" }
];

const renovationItems = [
  { col1: "2.5 Zimmer Wohnung (ca. 60m²)", col2: "1'800 - 3'200 CHF" },
  { col1: "3.5 Zimmer Wohnung (ca. 85m²)", col2: "2'500 - 4'500 CHF" },
  { col1: "4.5 Zimmer Wohnung (ca. 110m²)", col2: "3'500 - 6'000 CHF" }
];

const MainContent = () => {
  return (
    <main
      className="lg:col-span-3 bg-white p-6 md:p-10 rounded-2xl shadow-2xl space-y-12"
    >
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Malerarbeiten Preise: Was kostet ein Maler in der Schweiz?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4 text-lg">
          Die Kosten für Malerarbeiten in der Schweiz können je nach Art des Anstrichs, Grösse der Fläche, Zustand der Wände und regionalen Unterschieden variieren. Hier finden Sie eine Übersicht über die durchschnittlichen Preise, um Ihnen eine erste Orientierung zu geben.
        </p>
      </section>

      <section>
        <CostTable costKey="interior" items={interiorItems} />
      </section>
      
      <section>
        <CostTable costKey="exterior" items={exteriorItems} />
      </section>
      
      <section>
        <CostTable costKey="renovation" items={renovationItems} />
      </section>

    </main>
  );
};

export default MainContent;