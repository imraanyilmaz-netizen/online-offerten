import Link from 'next/link';
import React from 'react';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';

const CostTable = () => {
  const tableData = [
    {
      size: "1.5 Zimmer",
      transportOnly: "CHF 600 - 900",
      transportAssembly: "CHF 1'000 - 1'300",
      transportAssemblyCleaning: "CHF 1'500 - 1'800"
    },
    {
      size: "2.5 Zimmer",
      transportOnly: "CHF 900 - 1'200",
      transportAssembly: "CHF 1'300 - 1'600",
      transportAssemblyCleaning: "CHF 1'800 - 2'100"
    },
    {
      size: "3.5 Zimmer",
      transportOnly: "CHF 1'200 - 1'800",
      transportAssembly: "CHF 1'600 - 2'200",
      transportAssemblyCleaning: "CHF 2'100 - 2'700"
    },
    {
      size: "4.5 Zimmer",
      transportOnly: "CHF 1'750 - 2'500",
      transportAssembly: "CHF 2'150 - 2'900",
      transportAssemblyCleaning: "CHF 2'650 - 3'400"
    },
    {
      size: "5.5+ Zimmer",
      transportOnly: "CHF 2'250 - 3'500",
      transportAssembly: "CHF 2'650 - 3'900",
      transportAssemblyCleaning: "CHF 3'150 - 4'400"
    }
  ];

  return (
    <div className="overflow-x-auto bg-white p-4 sm:p-6 rounded-xl shadow-lg">
      <table className="w-full min-w-[600px] text-sm text-left text-gray-700">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-4 py-3">Wohnungsgrösse</th>
            <th scope="col" className="px-4 py-3">Nur Transport</th>
            <th scope="col" className="px-4 py-3">Transport & Möbelmontage</th>
            <th scope="col" className="px-4 py-3">Komplettpaket (inkl. Reinigung)</th>
            <th scope="col" className="px-4 py-3 text-center">Aktion</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr
              key={index}
              className="bg-white border-b hover:bg-gray-50"
            >
              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{row.size}</td>
              <td className="px-4 py-3">{row.transportOnly}</td>
              <td className="px-4 py-3">{row.transportAssembly}</td>
              <td className="px-4 py-3">{row.transportAssemblyCleaning}</td>
              <td className="px-4 py-3 text-center">
                <Button size="sm" variant="outline" asChild className="whitespace-nowrap">
                  <Link href="/kostenlose-offerte-anfordern">
                    offerten anfordern
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-xs text-gray-500 italic">*Alle Preise sind Schätzungen und können je nach Distanz und Aufwand variieren.</p>
    </div>
  );
};

export default CostTable;