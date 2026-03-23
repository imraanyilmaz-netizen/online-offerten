# sync-partner-registration

Schreibt **alle** Partner-Stammdaten nach `partners` (Service Role), damit `auth.users` / JWT nur noch **`role: 'partner'`** in den Metadaten braucht.

## Deploy

```bash
supabase functions deploy sync-partner-registration --no-verify-jwt
```

## Body (JSON)

Felder wie bei der Registrierung: `userId`, `email`, `company_name`, `contact_person`, `phone`, `main_categories`, `offered_services`, `service_regions`, `address_street`, `address_zip`, `address_city`, `website`, `year_founded`, `employee_count`, `liability_insurance`, `commercial_register_number`, `message` (Firmenbeschreibung), `agreed_to_terms`.
