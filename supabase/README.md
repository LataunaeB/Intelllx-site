# Supabase Migrations

This directory contains database migrations for the lead capture pipeline.

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Save your project credentials:
   - Project URL
   - Anon key (public)
   - Service role key (secret)

### 2. Run the Migration

#### Option A: Using Supabase Dashboard (Easiest)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste the contents of `migrations/20251011_lead_capture_schema.sql`
5. Click **Run** to execute the migration

#### Option B: Using Supabase CLI

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### 3. Verify the Schema

After running the migration, verify the tables were created:

1. Go to **Table Editor** in your Supabase dashboard
2. You should see three tables:
   - `leads` - Contact information
   - `conversations` - Chat conversations
   - `messages` - Individual messages

### 4. Test RLS Policies

The migration includes Row Level Security (RLS) policies:

- **Service role** (server-side): Full access to all tables
- **Anonymous users**: Can only insert records (for lead capture)
- **No public reads**: Data is only accessible server-side

## Schema Overview

```
leads
├── id (uuid, primary key)
├── email (text, unique)
├── name (text)
├── source (text) - e.g., 'chat', 'contact-form'
├── page_url (text)
├── created_at (timestamptz)
└── updated_at (timestamptz)

conversations
├── id (uuid, primary key)
├── lead_id (uuid, foreign key → leads.id)
├── status (text) - 'active', 'closed', 'archived'
├── created_at (timestamptz)
└── updated_at (timestamptz)

messages
├── id (uuid, primary key)
├── conversation_id (uuid, foreign key → conversations.id)
├── role (text) - 'user', 'assistant', 'system'
├── content (text)
└── created_at (timestamptz)
```

## Troubleshooting

### Error: "uuid-ossp extension not found"

This shouldn't happen on Supabase (it's pre-installed), but if it does:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### Error: "relation already exists"

The migration is idempotent. If tables already exist, it will skip creation. To start fresh:

```sql
DROP TABLE IF EXISTS public.messages CASCADE;
DROP TABLE IF EXISTS public.conversations CASCADE;
DROP TABLE IF EXISTS public.leads CASCADE;
```

Then re-run the migration.

## Security Notes

- RLS is enabled on all tables
- Anonymous users can only INSERT (no reads)
- All queries from Next.js API routes use the service role key
- Never expose the service role key to the client

## Next Steps

After running the migration:

1. Add your Supabase credentials to `.env.local`
2. Test the `/api/leads` endpoint
3. Verify data appears in Supabase dashboard

