// Lazy load jsPDF - only load when PDF generation is needed
export const generateChecklistPdf = async (checklistData, t, checkedItems) => {
  try {
    // Import jsPDF first
    const jsPDFModule = await import('jspdf');
    const jsPDF = jsPDFModule.default || jsPDFModule.jsPDF || jsPDFModule;
    
    // Import jspdf-autotable - For v5.x, we need to use applyPlugin
    const autoTableModule = await import('jspdf-autotable');
    
    // Apply the plugin to jsPDF if applyPlugin is available
    // This is required for jspdf-autotable v5.x with jsPDF v3.x
    if (autoTableModule.applyPlugin && typeof autoTableModule.applyPlugin === 'function') {
      autoTableModule.applyPlugin(jsPDF);
    }
    
    // Create jsPDF instance AFTER applying plugin
    const doc = new jsPDF();
    
    // Verify doc has internal property (jsPDF instance is valid)
    if (!doc.internal) {
      throw new Error('jsPDF instance is invalid. internal property is missing.');
    }
    
    // Verify autoTable is available on the instance
    if (typeof doc.autoTable !== 'function') {
      // Fallback: Try using autoTable as a function instead of method
      if (autoTableModule.autoTable && typeof autoTableModule.autoTable === 'function') {
        // Store autoTable function for later use
        doc.autoTable = function(options) {
          return autoTableModule.autoTable(doc, options);
        };
      } else {
        throw new Error('jspdf-autotable plugin failed to load. autoTable method is not available. Please ensure jspdf-autotable v5.x is properly installed.');
      }
    }

  const addHeader = (docInstance) => {
    docInstance.setFontSize(22);
    docInstance.setFont('helvetica', 'bold');
    docInstance.setTextColor(40, 55, 71);
    docInstance.text('Umzugs-Checkliste', 105, 20, { align: 'center' });
    docInstance.setFontSize(11);
    docInstance.setFont('helvetica', 'normal');
    docInstance.setTextColor(100, 116, 139);
    docInstance.text('Ihr perfekter Begleiter für einen stressfreien Umzug | online-offerten.ch', 105, 28, { align: 'center' });
    docInstance.setDrawColor(226, 232, 240);
    docInstance.line(14, 35, 196, 35);
  };

  const addFooter = (docInstance) => {
    const pageCount = docInstance.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      docInstance.setPage(i);
      docInstance.setFontSize(9);
      docInstance.setTextColor(150);
      docInstance.text(`Seite ${i} von ${pageCount}`, docInstance.internal.pageSize.width - 20, 285, { align: 'right' });
      docInstance.text('© online-offerten.ch', 14, 285);
    }
  };

  addHeader(doc);

  let startY = 45;
  const checkboxWidth = 10; // Total space for checkbox and padding

  checklistData.forEach(section => {
    const sectionTitle = section.title || (t && section.titleKey ? t(section.titleKey) : section.titleKey);
    const body = section.items.map((item, index) => {
      if (typeof item !== 'string') return { id: `${section.id}-${index}`, text: '' };
      return {
        id: `${section.id}-${index}`,
        text: item
      };
    });

    if (startY > 250 && body.length > 0) {
      doc.addPage();
      addHeader(doc);
      startY = 45;
    }

    doc.autoTable({
      startY: startY,
      head: [[sectionTitle]],
      body: body.map(item => [item.text]),
      theme: 'grid',
      headStyles: {
        fillColor: [45, 212, 191],
        textColor: 255,
        fontSize: 14,
        fontStyle: 'bold',
      },
      columnStyles: {
        0: { cellWidth: 182 }, // Total width is 196 - 14*2 (margins) = 170
      },
       willDrawCell: function (data) {
        if (data.section === 'body' && data.column.index === 0) {
          // Add left padding to the cell to make space for the checkbox
          data.cell.styles.cellPadding = { top: 2, right: 2, bottom: 2, left: checkboxWidth };
        }
      },
      didDrawCell: function (data) {
        if (data.section === 'body' && data.column.index === 0) {
          const isChecked = !!checkedItems[body[data.row.index].id];
          const checkboxSize = 4;
          const checkboxX = data.cell.x + checkboxWidth / 2 - checkboxSize / 2;
          const checkboxY = data.cell.y + data.cell.height / 2 - checkboxSize / 2;

          doc.setDrawColor(100, 116, 139); // a neutral grey
          doc.setLineWidth(0.5);
          doc.rect(checkboxX, checkboxY, checkboxSize, checkboxSize, 'S');

          if (isChecked) {
            doc.setDrawColor(45, 212, 191); // theme color
            doc.setLineWidth(1.2);
            // Draw a checkmark
            doc.line(checkboxX + 0.8, checkboxY + checkboxSize / 2, checkboxX + checkboxSize / 2.5, checkboxY + checkboxSize - 1.2);
            doc.line(checkboxX + checkboxSize / 2.5, checkboxY + checkboxSize - 1.2, checkboxX + checkboxSize - 1, checkboxY + 1);
          }
        }
      },
      margin: { top: 10, left: 14, right: 14 },
    });

    // Get final Y position from autoTable
    startY = doc.lastAutoTable.finalY + 15;
  });

    addFooter(doc);
    
    // Save PDF - this should trigger download
    // Note: doc.save() must be called within user interaction context
    // (which it is, since it's called from a button click handler)
    doc.save('Umzugs-Checkliste-Online-Offerten.pdf');
  } catch (error) {
    console.error('Error in generateChecklistPdf:', error);
    throw error; // Re-throw to be handled by the caller
  }
};