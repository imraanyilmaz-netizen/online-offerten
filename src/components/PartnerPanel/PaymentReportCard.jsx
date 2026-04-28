'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/src/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { Download, FileText, Loader2, CalendarRange } from 'lucide-react';
import { generatePaymentReportPdf } from '@/lib/generatePaymentReportPdf';

const PRESETS = [
  { value: 'this_month', label: 'Dieser Monat' },
  { value: 'last_month', label: 'Letzter Monat' },
  { value: 'last_30_days', label: 'Letzte 30 Tage' },
  { value: 'this_year', label: 'Dieses Jahr' },
  { value: 'custom', label: 'Benutzerdefiniert' },
];

/** YYYY-MM-DD (local time) — date input value formatına uyar */
const toIsoDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const computePresetRange = (preset) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (preset) {
    case 'this_month': {
      const from = new Date(today.getFullYear(), today.getMonth(), 1);
      return { from, to: today };
    }
    case 'last_month': {
      const from = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const to = new Date(today.getFullYear(), today.getMonth(), 0);
      return { from, to };
    }
    case 'last_30_days': {
      const from = new Date(today);
      from.setDate(from.getDate() - 29);
      return { from, to: today };
    }
    case 'this_year': {
      const from = new Date(today.getFullYear(), 0, 1);
      return { from, to: today };
    }
    default:
      return { from: today, to: today };
  }
};

const PaymentReportCard = ({ partnerId }) => {
  const { toast } = useToast();
  const [preset, setPreset] = useState('this_month');
  const [fromDate, setFromDate] = useState(() => toIsoDate(computePresetRange('this_month').from));
  const [toDate, setToDate] = useState(() => toIsoDate(computePresetRange('this_month').to));
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (preset === 'custom') return;
    const range = computePresetRange(preset);
    setFromDate(toIsoDate(range.from));
    setToDate(toIsoDate(range.to));
    setSummary(null);
  }, [preset]);

  const isCustom = preset === 'custom';

  const validRange = useMemo(() => {
    if (!fromDate || !toDate) return false;
    return new Date(fromDate).getTime() <= new Date(toDate).getTime();
  }, [fromDate, toDate]);

  const handleGenerate = useCallback(async () => {
    if (!partnerId) return;
    if (!validRange) {
      toast({
        variant: 'destructive',
        title: 'Ungültiger Zeitraum',
        description: 'Das Bis-Datum darf nicht vor dem Von-Datum liegen.',
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data: partner, error: partnerError } = await supabase
        .from('partners')
        .select('company_name, address_street, address_zip, address_city, email, slug')
        .eq('id', partnerId)
        .maybeSingle();

      if (partnerError) throw partnerError;

      const fromIso = `${fromDate}T00:00:00`;
      const toIso = `${toDate}T23:59:59.999`;

      const { data: txs, error: txError } = await supabase
        .from('partner_transactions')
        .select('created_at, amount, description')
        .eq('partner_id', partnerId)
        .eq('transaction_type', 'top-up')
        .gte('created_at', fromIso)
        .lte('created_at', toIso)
        .gt('amount', 0)
        .order('created_at', { ascending: true });

      if (txError) throw txError;

      const transactions = txs || [];
      const total = transactions.reduce((sum, t) => sum + Number(t.amount || 0), 0);

      setSummary({
        count: transactions.length,
        total,
        from: fromDate,
        to: toDate,
      });

      if (transactions.length === 0) {
        toast({
          title: 'Keine Zahlungen gefunden',
          description: 'Im gewählten Zeitraum wurden keine Stripe-Aufladungen gefunden.',
        });
        return;
      }

      await generatePaymentReportPdf({
        partnerId,
        partner: partner || {},
        fromDate: new Date(`${fromDate}T00:00:00`),
        toDate: new Date(`${toDate}T00:00:00`),
        transactions,
      });

      toast({
        title: 'Übersicht erstellt',
        description: `${transactions.length} ${transactions.length === 1 ? 'Zahlung' : 'Zahlungen'} – CHF ${total.toFixed(2)}`,
      });
    } catch (error) {
      console.error('Payment report error:', error);
      toast({
        variant: 'destructive',
        title: 'Fehler beim Erstellen',
        description: error?.message || 'Bericht konnte nicht erstellt werden.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [partnerId, fromDate, toDate, validRange, toast]);

  return (
    <Card className="shadow-lg animate-fade-in">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto bg-green-100 dark:bg-emerald-950/45 p-3 rounded-full w-fit mb-2">
          <FileText className="h-6 w-6 text-green-600 dark:text-emerald-400" />
        </div>
        <CardDescription className="text-base text-muted-foreground">
          Übersicht Ihrer Stripe-Aufladungen für einen gewählten Zeitraum als PDF – für Ihre Buchhaltung.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="report-preset" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Zeitraum
            </Label>
            <Select value={preset} onValueChange={setPreset}>
              <SelectTrigger id="report-preset" className="h-10">
                <CalendarRange className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                <SelectValue placeholder="Zeitraum wählen" />
              </SelectTrigger>
              <SelectContent>
                {PRESETS.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="report-from" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Von
            </Label>
            <Input
              id="report-from"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              disabled={!isCustom}
              max={toDate || undefined}
              className="h-10"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="report-to" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Bis
            </Label>
            <Input
              id="report-to"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              disabled={!isCustom}
              min={fromDate || undefined}
              max={toIsoDate(new Date())}
              className="h-10"
            />
          </div>
        </div>

        {summary && (
          <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-muted/40 px-4 py-3">
            <div className="text-sm text-muted-foreground">
              Letzter Bericht:{' '}
              <span className="font-semibold text-foreground">
                {summary.count} {summary.count === 1 ? 'Zahlung' : 'Zahlungen'}
              </span>
            </div>
            <div className="text-base font-bold text-foreground whitespace-nowrap">
              CHF {summary.total.toFixed(2)}
            </div>
          </div>
        )}

        <Button
          onClick={handleGenerate}
          disabled={isLoading || !validRange || !partnerId}
          className="w-full h-11 text-base font-semibold bg-green-600 hover:bg-green-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Wird erstellt...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Übersicht als PDF herunterladen
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentReportCard;
