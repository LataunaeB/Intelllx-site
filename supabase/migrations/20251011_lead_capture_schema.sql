-- Lead Capture Schema Migration
-- Creates tables for leads, conversations, and messages with RLS policies

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLES
-- ============================================================================

-- Leads table: stores contact information
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    source TEXT, -- e.g., 'chat', 'contact-form', 'pricing-page'
    page_url TEXT, -- URL where the lead was captured
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Conversations table: groups messages by lead
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Messages table: stores individual messages in conversations
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- INDEXES for better query performance
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_lead_id ON public.conversations(lead_id);
CREATE INDEX IF NOT EXISTS idx_conversations_status ON public.conversations(status);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);

-- ============================================================================
-- TRIGGERS for updated_at timestamps
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at
    BEFORE UPDATE ON public.conversations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotency)
DROP POLICY IF EXISTS "Service role has full access to leads" ON public.leads;
DROP POLICY IF EXISTS "Anonymous can insert leads" ON public.leads;
DROP POLICY IF EXISTS "Service role has full access to conversations" ON public.conversations;
DROP POLICY IF EXISTS "Anonymous can insert conversations" ON public.conversations;
DROP POLICY IF EXISTS "Service role has full access to messages" ON public.messages;
DROP POLICY IF EXISTS "Anonymous can insert messages" ON public.messages;

-- Leads policies
-- Service role (server-side) has full access
CREATE POLICY "Service role has full access to leads"
    ON public.leads
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Anonymous users can only insert (for lead capture)
CREATE POLICY "Anonymous can insert leads"
    ON public.leads
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Conversations policies
CREATE POLICY "Service role has full access to conversations"
    ON public.conversations
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Anonymous can insert conversations"
    ON public.conversations
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Messages policies
CREATE POLICY "Service role has full access to messages"
    ON public.messages
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Anonymous can insert messages"
    ON public.messages
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- ============================================================================
-- COMMENTS for documentation
-- ============================================================================

COMMENT ON TABLE public.leads IS 'Stores contact information for potential customers';
COMMENT ON TABLE public.conversations IS 'Groups messages by lead for chat conversations';
COMMENT ON TABLE public.messages IS 'Individual messages in conversations with role (user/assistant/system)';

COMMENT ON COLUMN public.leads.source IS 'Origin of the lead (e.g., chat, contact-form, pricing)';
COMMENT ON COLUMN public.leads.page_url IS 'URL where the lead was captured';
COMMENT ON COLUMN public.conversations.status IS 'Conversation status: active, closed, or archived';
COMMENT ON COLUMN public.messages.role IS 'Message sender: user (customer), assistant (AI/staff), or system';

