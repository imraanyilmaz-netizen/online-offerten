# `send-admin-partner-email`

Sendet eine E-Mail an einen Partner (E-Mail aus Tabelle `partners`). Nur **admin** oder **editor**.

## Aufruf (Frontend)

```ts
await supabase.functions.invoke('send-admin-partner-email', {
  body: {
    partnerId: '<uuid>',
    subject: 'Betreff',
    message: 'Klartext – wird als HTML mit Zeilenumbrüchen versendet',
  },
});
```

## Deploy

```bash
supabase functions deploy send-admin-partner-email
```

Benötigte Secrets (bereits für andere Mail-Funktionen): `RESEND_API_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (automatisch in der Edge-Umgebung).
