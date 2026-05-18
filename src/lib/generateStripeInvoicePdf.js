/**
 * Generates a single, paid Stripe top-up Rechnung (per-payment invoice) PDF.
 * Designed for admin retroactive download of historical partner top-ups so the
 * accountant gets a proper per-payment document.
 *
 * The document is marked "Bereits bezahlt" (Already paid) because the money
 * was already collected via Stripe — this is a Zahlungsbestätigung in the
 * legal form of a Rechnung. No MwSt is displayed (issuer is not MwSt-pflichtig
 * for these credit top-ups, matching `generatePaymentReportPdf.js`).
 *
 * Invoice numbering is deterministic per transaction id so re-downloading the
 * same row always yields the same Rechnung-Nr — important for bookkeeping.
 *
 * @param {Object} args
 * @param {Object} args.transaction        { id, created_at, amount, description }
 * @param {Object} args.partner            { company_name, address_street, address_zip,
 *                                           address_city, email, slug }
 * @returns {Promise<{ filename: string, invoiceNumber: string }>}
 */

const ISSUER = {
  name: 'Yilmaz Platform Solutions',
  street: 'Kreuzstrasse 16',
  zipCity: '8953 Dietikon',
  uid: 'CHE-234.206.612',
  brand: 'Online-offerten.ch',
  brandWeb: 'online-offerten.ch',
  email: 'info@online-offerten.ch',
  phone: '+41 76 537 63 84',
  tagline: 'Finden, anfragen, vergleichen',
};

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

/**
 * Deterministic Rechnung-Nr per transaction:
 *   RG-YYYY-XXXXXXXX
 * Year is taken from the payment date so accounting can sort by fiscal year.
 */
const buildInvoiceNumber = (transactionId, createdAt) => {
  const date = createdAt instanceof Date ? createdAt : new Date(createdAt);
  const year = date.getFullYear();
  const shortId = (transactionId || '')
    .toString()
    .replace(/-/g, '')
    .slice(0, 8)
    .toUpperCase() || 'XXXXXXXX';
  return `RG-${year}-${shortId}`;
};

export const generateStripeInvoicePdf = async ({ transaction, partner }) => {
  if (!transaction) throw new Error('Transaction is required.');
  if (!partner) throw new Error('Partner is required.');

  const jsPDFModule = await import('jspdf');
  const jsPDF = jsPDFModule.default || jsPDFModule.jsPDF || jsPDFModule;

  const autoTableModule = await import('jspdf-autotable');
  if (autoTableModule.applyPlugin && typeof autoTableModule.applyPlugin === 'function') {
    autoTableModule.applyPlugin(jsPDF);
  }

  const doc = new jsPDF();
  if (!doc.internal) throw new Error('jsPDF instance is invalid.');
  if (typeof doc.autoTable !== 'function') {
    if (autoTableModule.autoTable && typeof autoTableModule.autoTable === 'function') {
      doc.autoTable = (options) => autoTableModule.autoTable(doc, options);
    } else {
      throw new Error('jspdf-autotable plugin failed to load.');
    }
  }

  const paymentDate = transaction.created_at ? new Date(transaction.created_at) : new Date();
  const invoiceNumber = buildInvoiceNumber(transaction.id, paymentDate);
  const amount = Number(transaction.amount || 0);

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 14;
  const rightX = pageWidth - marginX;

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
  doc.text('Rechnung', rightX, 22, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(60, 73, 88);
  doc.text(`Rechnung-Nr. ${invoiceNumber}`, rightX, 28, { align: 'right' });
  doc.text(`Rechnungsdatum: ${formatDateDe(paymentDate)}`, rightX, 33, { align: 'right' });

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(marginX, 39, rightX, 39);

  let cursorY = 48;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(100, 116, 139);
  doc.text('RECHNUNGSEMPFÄNGER', marginX, cursorY);
  cursorY += 6;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(28, 35, 41);
  doc.text(partner.company_name || '—', marginX, cursorY);
  cursorY += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(60, 73, 88);
  const partnerLines = [
    [partner.address_street].filter(Boolean).join(' '),
    [partner.address_zip, partner.address_city].filter(Boolean).join(' '),
    partner.email || '',
  ].filter((line) => line && line.trim().length > 0);
  partnerLines.forEach((line) => {
    doc.text(line, marginX, cursorY);
    cursorY += 5.5;
  });

  const issuerStartY = 48;
  let issuerY = issuerStartY;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(100, 116, 139);
  doc.text('RECHNUNGSSTELLER', rightX, issuerY, { align: 'right' });
  issuerY += 6;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(28, 35, 41);
  doc.text(ISSUER.name, rightX, issuerY, { align: 'right' });
  issuerY += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(60, 73, 88);
  doc.text(ISSUER.street, rightX, issuerY, { align: 'right' });
  issuerY += 5.5;
  doc.text(ISSUER.zipCity, rightX, issuerY, { align: 'right' });
  issuerY += 5.5;
  doc.text(`UID: ${ISSUER.uid}`, rightX, issuerY, { align: 'right' });
  issuerY += 5.5;
  doc.text(ISSUER.email, rightX, issuerY, { align: 'right' });

  cursorY = Math.max(cursorY, issuerY) + 8;

  const greenLight = [240, 253, 244];
  const greenDark = [22, 101, 52];
  const greenAccent = [22, 163, 74];

  doc.setFillColor(greenLight[0], greenLight[1], greenLight[2]);
  doc.roundedRect(marginX, cursorY, rightX - marginX, 14, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(greenDark[0], greenDark[1], greenDark[2]);
  doc.text('Status: BEZAHLT', marginX + 4, cursorY + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text(
    `Bezahlt via Stripe am ${formatDateTimeDe(paymentDate)}`,
    rightX - 4,
    cursorY + 9,
    { align: 'right' }
  );

  cursorY += 22;

  const descriptionLine =
    transaction.description && transaction.description.toString().trim().length > 0
      ? transaction.description.toString().trim()
      : 'Guthabenaufladung Partnerkonto (Online-offerten.ch)';

  doc.autoTable({
    startY: cursorY,
    head: [['Position', 'Beschreibung', 'Betrag']],
    body: [
      [
        '1',
        descriptionLine,
        `CHF ${formatChf(amount)}`,
      ],
    ],
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize: 10,
      cellPadding: 3.5,
      textColor: [40, 55, 71],
    },
    headStyles: {
      fillColor: greenAccent,
      textColor: 255,
      fontStyle: 'bold',
      halign: 'left',
    },
    columnStyles: {
      0: { cellWidth: 18, halign: 'center' },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 32, halign: 'right' },
    },
    margin: { left: marginX, right: marginX },
  });

  cursorY = (doc.lastAutoTable?.finalY || cursorY) + 6;

  doc.setDrawColor(greenAccent[0], greenAccent[1], greenAccent[2]);
  doc.setLineWidth(0.6);
  doc.line(marginX, cursorY, rightX, cursorY);
  cursorY += 7;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(28, 35, 41);
  doc.text('Rechnungsbetrag (bezahlt)', marginX, cursorY);
  doc.text(`CHF ${formatChf(amount)}`, rightX, cursorY, { align: 'right' });
  cursorY += 8;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'Die Mehrwertsteuer ist nicht im Ausweis enthalten (Issuer nicht MwSt-pflichtig).',
    marginX,
    cursorY
  );
  cursorY += 6;

  if (transaction.id) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(140, 152, 168);
    doc.text(`Transaktions-ID: ${transaction.id}`, marginX, cursorY);
    cursorY += 5;
  }

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
    doc.text(
      `${ISSUER.brandWeb}  ·  ${ISSUER.email}  ·  ${ISSUER.phone}`,
      marginX,
      footerTop + 15
    );

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

  const slugPart = (partner.slug || partner.company_name || 'partner')
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'partner';

  const filename = `Rechnung_${invoiceNumber}_${slugPart}.pdf`;
  doc.save(filename);

  return { filename, invoiceNumber };
};
