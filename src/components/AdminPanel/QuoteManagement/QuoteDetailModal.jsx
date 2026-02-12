import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Check, X, ExternalLink } from 'lucide-react';

const DetailItem = ({ label, value, children }) => (
  <div>
    <Label className="font-medium text-gray-500">{label}</Label>
    {value ? <p className="text-gray-700">{value}</p> : children}
  </div>
);

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">{title}</h3>
    {children}
  </div>
);

const QuoteDetailModal = ({ quote, onClose, onAction, isProcessing }) => {
  const [quotePrice, setQuotePrice] = useState('');

  useEffect(() => {
    if (quote) {
      setQuotePrice(quote.quote_price || '');
    }
  }, [quote]);

  if (!quote) return null;

  return (
    <Dialog open={!!quote} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Anfragedetails</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <Section title="Kundeninformationen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <DetailItem label="Name" value={`${quote.firstname} ${quote.lastname}`} />
              <DetailItem label="E-Mail" value={quote.email} />
              <DetailItem label="Telefon" value={quote.phone} />
              <DetailItem label="Bevorzugte Zeit" value={quote.preferredtime || 'Nicht angegeben'} />
            </div>
          </Section>

          <Section title="Dienstleistungsdetails">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <DetailItem label="Dienstleistungstyp" value={quote.servicetype || quote.umzugart} />
              <DetailItem label="Gewünschte Offerten" value={quote.quoteswanted} />
              <DetailItem label="Spezialtransport" value={quote.hasspecialitems ? 'Ja' : 'Nein'} />
              <DetailItem label="Möbeldemontage" value={quote.needsdisassembly ? 'Ja' : 'Nein'} />
            </div>
          </Section>

          {(quote.from_city || quote.to_city) && (
            <Section title="Umzugsdetails">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                {(() => {
                  const fromAddress = [quote.from_street, [quote.from_zip, quote.from_city].filter(Boolean).join(' ')].filter(Boolean).join(', ');
                  const fromMapsUrl = fromAddress ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fromAddress + ', Schweiz')}` : null;
                  return (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <Label className="font-bold text-gray-700">Auszugsadresse</Label>
                      {fromMapsUrl ? (
                        <a href={fromMapsUrl} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-900 hover:underline font-semibold mt-1 inline-flex items-center gap-1">
                          {fromAddress}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <p className="text-gray-800 font-semibold mt-1">{fromAddress}</p>
                      )}
                      {quote.from_floor && <p className="text-gray-600 text-xs mt-1">Stockwerk: {quote.from_floor}</p>}
                      {quote.from_rooms && <p className="text-gray-600 text-xs">Zimmer: {quote.from_rooms}</p>}
                    </div>
                  );
                })()}
                {(quote.to_zip || quote.to_city) && (() => {
                  const toAddress = [quote.to_street, [quote.to_zip, quote.to_city].filter(Boolean).join(' ')].filter(Boolean).join(', ');
                  const toMapsUrl = toAddress ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(toAddress + ', Schweiz')}` : null;
                  return (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <Label className="font-bold text-gray-700">Einzugsadresse</Label>
                      {toMapsUrl ? (
                        <a href={toMapsUrl} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-900 hover:underline font-semibold mt-1 inline-flex items-center gap-1">
                          {toAddress}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <p className="text-gray-800 font-semibold mt-1">{toAddress}</p>
                      )}
                      {quote.to_floor && <p className="text-gray-600 text-xs mt-1">Stockwerk: {quote.to_floor}</p>}
                    </div>
                  );
                })()}
              </div>
              {quote.move_date && (
                <div className="mt-3 text-sm">
                  <Label className="font-medium text-gray-500">Umzugsdatum</Label>
                  <p className="text-gray-700">
                    {new Date(quote.move_date).toLocaleDateString('de-DE')}
                    {quote.move_date_flexible && ' (Flexibel)'}
                  </p>
                </div>
              )}
            </Section>
          )}

          {quote.selectedregions && quote.selectedregions.length > 0 && (
            <Section title="Ausgewählte Regionen">
              <div className="flex flex-wrap gap-2">
                {quote.selectedregions.map((region, index) => (
                  <Badge key={index} variant="outline">{region}</Badge>
                ))}
              </div>
            </Section>
          )}

          {quote.comments && (
            <Section title="Zusätzliche Anmerkungen">
              <p className="text-gray-700 bg-gray-50 p-3 rounded whitespace-pre-line">{quote.comments}</p>
            </Section>
          )}

          {quote.status === 'pending' && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Anfragepreis festlegen</h3>
              <div className="mb-4">
                <Label htmlFor="quotePrice">Verkaufspreis der Anfrage (CHF)</Label>
                <Input
                  id="quotePrice"
                  type="number"
                  value={quotePrice}
                  onChange={(e) => setQuotePrice(e.target.value)}
                  placeholder="z.B.: 3.50"
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">Dieser Preis ist der Verkaufspreis der Anfrage an die Partnerfirmen.</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => onAction('reject', quote.id)} disabled={isProcessing} className="text-red-600 hover:text-red-700">
                  <X className="w-4 h-4 mr-1" /> Ablehnen
                </Button>
                <Button onClick={() => onAction('approve', quote.id, quotePrice)} disabled={isProcessing} className="bg-green-600 hover:bg-green-700">
                  <Check className="w-4 h-4 mr-1" /> Genehmigen
                </Button>
              </div>
            </div>
          )}

          {quote.status !== 'pending' && quote.quote_price && (
            <Section title="Festgelegter Anfragepreis">
              <p className="text-2xl font-bold text-green-600">CHF {quote.quote_price}</p>
            </Section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteDetailModal;