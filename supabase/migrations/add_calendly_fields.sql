-- Add additional fields to leads table for Calendly webhook data
-- These fields allow capturing full booking details from Calendly

-- Add columns if they don't exist
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS company TEXT,
ADD COLUMN IF NOT EXISTS service TEXT,
ADD COLUMN IF NOT EXISTS message TEXT,
ADD COLUMN IF NOT EXISTS preferred_date TEXT,
ADD COLUMN IF NOT EXISTS preferred_time TEXT;

-- Update updated_at when rows are updated
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON leads
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

