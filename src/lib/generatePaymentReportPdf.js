/**
 * Lazy-loaded Zahlungsübersicht PDF (kein Rechnungsdokument, keine MwSt-Ausweisung).
 * Pattern matches `generateChecklistPdf.js`: dynamic import + autotable plugin apply.
 *
 * @param {Object} args
 * @param {string} args.partnerId - DB id of the partner (für Beleg-Nummer)
 * @param {{ company_name?: string|null, address_street?: string|null, address_zip?: string|null, address_city?: string|null, email?: string|null, slug?: string|null }} args.partner
 * @param {Date} args.fromDate
 * @param {Date} args.toDate
 * @param {Array<{ created_at: string, amount: number, description: string|null }>} args.transactions
 */

/** Footer-Block: Firmenidentifikation (kein MwSt-Ausweis im Dokument). */
const ISSUER = {
  name: 'Yilmaz Platform Solutions',
  street: 'Kreuzstrasse 16',
  zipCity: '8953 Dietikon',
  uid: 'CHE-234.206.612',
  brand: 'Online-offerten.ch',
  brandWeb: 'online-offerten.ch',
  tagline: 'Finden, anfragen, vergleichen',
};

export const generatePaymentReportPdf = async ({ partnerId, partner, fromDate, toDate, transactions }) => {
  const jsPDFModule = await import('jspdf');
  const jsPDF = jsPDFModule.default || jsPDFModule.jsPDF || jsPDFModule;

  const autoTableModule = await import('jspdf-autotable');
  if (autoTableModule.applyPlugin && typeof autoTableModule.applyPlugin === 'function') {
    autoTableModule.applyPlugin(jsPDF);
  }

  const doc = new jsPDF();
  if (!doc.internal) {
    throw new Error('jsPDF instance is invalid.');
  }
  if (typeof doc.autoTable !== 'function') {
    if (autoTableModule.autoTable && typeof autoTableModule.autoTable === 'function') {
      doc.autoTable = (options) => autoTableModule.autoTable(doc, options);
    } else {
      throw new Error('jspdf-autotable plugin failed to load.');
    }
  }

  const formatChf = (n) =>
    Number(n || 0).toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formatDateDe = (d) => {
    const date = d instanceof Date ? d : new Date(d);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  };
  const formatDateTimeDe = (d) => {
    const date = d instanceof Date ? d : new Date(d);
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${formatDateDe(date)} ${hh}:${min}`;
  };
  const yyyymmdd = (d) => {
    const date = d instanceof Date ? d : new Date(d);
    return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  };

  /** Beleg-Nummer: deterministisch aus partner_id + Zeitraum (idempotent für Buchhaltung). */
  const partnerIdShort = (partnerId || '').toString().replace(/-/g, '').slice(0, 8).toUpperCase() || 'XXXXXXXX';
  const docNumber = `OO-${yyyymmdd(fromDate)}-${yyyymmdd(toDate)}-${partnerIdShort}`;

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 14;
  const rightX = pageWidth - marginX;

  // ── Header ───────────────────────────────────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(28, 35, 41);
  doc.text(ISSUER.brand, marginX, 22);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(ISSUER.tagline, marginX, 28);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(28, 35, 41);
  doc.text('Zahlungsübersicht', rightX, 22, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(60, 73, 88);
  doc.text(`Beleg-Nr. ${docNumber}`, rightX, 28, { align: 'right' });
  doc.text(`Erstellt am: ${formatDateDe(new Date())}`, rightX, 33, { align: 'right' });

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(marginX, 39, rightX, 39);

  // ── Empfänger-Block ──────────────────────────────────────────────────────
  let cursorY = 48;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(100, 116, 139);
  doc.text('PARTNER', marginX, cursorY);
  cursorY += 6;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(28, 35, 41);
  doc.text(partner?.company_name || '—', marginX, cursorY);
  cursorY += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(60, 73, 88);
  const partnerLines = [
    [partner?.address_street].filter(Boolean).join(' '),
    [partner?.address_zip, partner?.address_city].filter(Boolean).join(' '),
    partner?.email || '',
  ].filter((line) => line && line.trim().length > 0);
  partnerLines.forEach((line) => {
    doc.text(line, marginX, cursorY);
    cursorY += 5.5;
  });

  // ── Zeitraum ─────────────────────────────────────────────────────────────
  cursorY += 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(100, 116, 139);
  doc.text('ZEITRAUM', marginX, cursorY);
  cursorY += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(60, 73, 88);
  doc.text(`${formatDateDe(fromDate)} – ${formatDateDe(toDate)}`, marginX, cursorY);
  cursorY += 8;

  // ── Tabelle ──────────────────────────────────────────────────────────────
  const total = transactions.reduce((sum, t) => sum + Number(t.amount || 0), 0);

  if (transactions.length === 0) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(11);
    doc.setTextColor(100, 116, 139);
    doc.text('Keine Stripe-Aufladungen im gewählten Zeitraum gefunden.', marginX, cursorY + 4);
    cursorY += 14;
  } else {
    const body = transactions.map((t) => [
      formatDateTimeDe(t.created_at),
      t.description || 'Guthaben-Aufladung (Online-offerten.ch)',
      `CHF ${formatChf(t.amount)}`,
    ]);

    doc.autoTable({
      startY: cursorY,
      head: [['Datum', 'Beschreibung', 'Betrag']],
      body,
      theme: 'grid',
      styles: {
        font: 'helvetica',
        fontSize: 10,
        cellPadding: 3,
        textColor: [40, 55, 71],
      },
      headStyles: {
        fillColor: [22, 163, 74],
        textColor: 255,
        fontStyle: 'bold',
        halign: 'left',
      },
      columnStyles: {
        0: { cellWidth: 38 },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 32, halign: 'right' },
      },
      margin: { left: marginX, right: marginX },
    });

    const finalY = doc.lastAutoTable?.finalY || cursorY;
    cursorY = finalY + 6;

    // ── Total-Block (rechts) ───────────────────────────────────────────────
    doc.setDrawColor(22, 163, 74);
    doc.setLineWidth(0.6);
    doc.line(marginX, cursorY, rightX, cursorY);
    cursorY += 7;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(28, 35, 41);
    doc.text(
      `Total bezahlt (${transactions.length} ${transactions.length === 1 ? 'Zahlung' : 'Zahlungen'})`,
      marginX,
      cursorY
    );
    doc.text(`CHF ${formatChf(total)}`, rightX, cursorY, { align: 'right' });
    cursorY += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(22, 101, 52);
    doc.text('Bezahlt via Stripe.', marginX, cursorY);
    cursorY += 6;
  }

  // ── Footer (auf jeder Seite): Issuer-Block + Seitenzahl ─────────────────
  const drawFooter = () => {
    const footerTop = pageHeight - 28;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(marginX, footerTop, rightX, footerTop);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(80, 95, 110);
    doc.text(ISSUER.name, marginX, footerTop + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(110, 122, 138);
    doc.text(
      `${ISSUER.street}  ·  ${ISSUER.zipCity}  ·  UID ${ISSUER.uid}`,
      marginX,
      footerTop + 10
    );
    doc.text(`Web: ${ISSUER.brandWeb}`, marginX, footerTop + 15);

    const page = doc.internal.getCurrentPageInfo().pageNumber;
    const total = doc.internal.getNumberOfPages();
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Seite ${page} / ${total}`, rightX, footerTop + 15, { align: 'right' });
  };

  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    drawFooter();
  }

  // ── Dateiname ────────────────────────────────────────────────────────────
  const slugPart = (partner?.slug || partner?.company_name || 'partner')
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'partner';
  const filename = `Zahlungsuebersicht_${docNumber}_${slugPart}.pdf`;

  doc.save(filename);
  return { filename, docNumber, total, count: transactions.length };
};
