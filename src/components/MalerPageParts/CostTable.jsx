import React from 'react';
// framer-motion removed - CSS for better INP
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const CostTable = ({ costKey, items }) => {
  const getData = (key) => {
    const data = {
      interior: {
        title: "Innenanstrich Kosten pro m²",
        p1: "Der Innenanstrich ist eine der häufigsten Malerarbeiten. Die Kosten werden oft pro Quadratmeter (m²) Wand- und Deckenfläche berechnet. Ein einfacher weisser Anstrich ist in der Regel günstiger als mehrfarbige Gestaltungen oder die Verwendung von Spezialfarben.",
        table: {
          header1: "Leistung",
          header2: "Preis pro m² (CHF)",
          rows: [
            { col1: "Decke & Wände weiss streichen (Standard)", col2: "8 - 15 CHF" },
            { col1: "Wände farbig streichen (pro Farbe)", col2: "10 - 20 CHF" },
            { col1: "Türen und Türrahmen lackieren (pro Stück)", col2: "150 - 250 CHF" },
            { col1: "Fenster lackieren (pro Stück)", col2: "100 - 200 CHF" }
          ]
        },
        disclaimer: null
      },
      exterior: {
        title: "Aussenanstrich (Fassade) Preise 2024",
        p1: "Ein neuer Fassadenanstrich schützt nicht nur das Gebäude vor Witterungseinflüssen, sondern wertet auch die Optik erheblich auf. Die Kosten sind hier höher, da oft ein Gerüst benötigt wird und spezielle, wetterfeste Farben zum Einsatz kommen.",
        table: {
          header1: "Leistung",
          header2: "Preis pro m² (CHF)",
          rows: [
            { col1: "Fassade reinigen & grundieren", col2: "10 - 25 CHF" },
            { col1: "Fassade streichen (2 Anstriche)", col2: "30 - 50 CHF" },
            { col1: "Gerüstbau (pro m² Fassadenfläche)", col2: "8 - 15 CHF" }
          ]
        },
        disclaimer: null
      },
      renovation: {
        title: "Renovierung: Kosten für Malerarbeiten in einer Wohnung",
        p1: "Bei einem Umzug oder einer kompletten Renovierung fallen oft verschiedene Malerarbeiten an. Die Kosten für das Streichen einer ganzen Wohnung hängen von der Wohnungsgrösse und dem Umfang der Arbeiten ab.",
        table: {
          header1: "Wohnungsgrösse",
          header2: "Geschätzte Kosten (CHF)",
          rows: [
            { col1: "2.5 Zimmer Wohnung (ca. 60m²)", col2: "1'800 - 3'200 CHF" },
            { col1: "3.5 Zimmer Wohnung (ca. 85m²)", col2: "2'500 - 4'500 CHF" },
            { col1: "4.5 Zimmer Wohnung (ca. 110m²)", col2: "3'500 - 6'000 CHF" }
          ]
        },
        disclaimer: "*Dies sind Schätzpreise für einen Standardanstrich (Wände und Decken weiss). Zusätzliche Arbeiten wie Spachteln, Abdecken oder das Lackieren von Türen und Fenstern sind nicht inbegriffen."
      }
    };
    return data[key] || {};
  };

  const data = getData(costKey);
  if (!data.title) return null;

  return (
    <div
      className="my-8"
    >
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">{data.title}</h3>
      <p className="text-gray-600 leading-relaxed mb-6">{data.p1}</p>
      
      <div className="rounded-lg border bg-card text-card-foreground shadow-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-100">
              <TableHead className="w-2/3 font-bold text-gray-700">{data.table.header1}</TableHead>
              <TableHead className="text-right font-bold text-gray-700">{data.table.header2}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.table.rows.map((row, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="font-medium">{row.col1}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary" className="text-base font-semibold text-green-700 bg-green-100">
                    {row.col2}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {data.disclaimer && (
        <p className="text-xs text-gray-500 mt-4 italic">{data.disclaimer}</p>
      )}
    </div>
  );
};

export default CostTable;