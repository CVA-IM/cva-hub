-- CVA Data Management System
-- Supabase Database Schema
-- Run this in Supabase SQL Editor to create all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================================
-- COUNTRIES
-- ===========================================
CREATE TABLE countries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  code VARCHAR(3) NOT NULL UNIQUE,
  currency VARCHAR(3) NOT NULL DEFAULT 'USD',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert some default countries
INSERT INTO countries (name, code, currency) VALUES
  ('Syria', 'SY', 'SYP'),
  ('Lebanon', 'LB', 'LBP'),
  ('Turkey', 'TR', 'TRY'),
  ('Jordan', 'JO', 'JOD'),
  ('Iraq', 'IQ', 'IQD'),
  ('Yemen', 'YE', 'YER');

-- ===========================================
-- LOCATIONS (Admin Levels)
-- ===========================================
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  admin_level INTEGER NOT NULL DEFAULT 1, -- 1 = Province, 2 = District, 3 = Town
  parent_id UUID REFERENCES locations(id) ON DELETE SET NULL,
  pcode VARCHAR(50), -- UN P-Code
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_locations_country ON locations(country_id);
CREATE INDEX idx_locations_parent ON locations(parent_id);

-- ===========================================
-- USER PROFILES
-- ===========================================
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'programme_manager', 'field_staff', 'viewer')),
  country_id UUID REFERENCES countries(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ===========================================
-- PROJECTS
-- ===========================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  finance_code VARCHAR(50),
  status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'closed')),
  eligibility_criteria JSONB,
  total_budget DECIMAL(15, 2) DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'USD',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES auth.users(id)
);

CREATE INDEX idx_projects_country ON projects(country_id);
CREATE INDEX idx_projects_status ON projects(status);

-- ===========================================
-- ASSISTANCE TYPES (Cash, Voucher, Goods, Services)
-- ===========================================
CREATE TABLE assistance_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('cash', 'voucher', 'goods', 'services')),
  unit VARCHAR(50) NOT NULL DEFAULT 'unit', -- e.g., 'USD', 'kg', 'parcel'
  unit_value DECIMAL(10, 2) NOT NULL DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'USD',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_assistance_types_project ON assistance_types(project_id);

-- ===========================================
-- HOUSEHOLDS
-- ===========================================
CREATE TABLE households (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  registration_number VARCHAR(50) NOT NULL UNIQUE,
  location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
  address TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'enrolled', 'active', 'inactive')),
  consent_given BOOLEAN DEFAULT FALSE,
  consent_date TIMESTAMP WITH TIME ZONE,
  custom_fields JSONB, -- For project-specific fields
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_households_project ON households(project_id);
CREATE INDEX idx_households_status ON households(status);
CREATE INDEX idx_households_registration ON households(registration_number);

-- ===========================================
-- BENEFICIARIES (Household Members)
-- ===========================================
CREATE TABLE beneficiaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  household_id UUID NOT NULL REFERENCES households(id) ON DELETE CASCADE,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  date_of_birth DATE,
  gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
  national_id VARCHAR(100),
  phone VARCHAR(50),
  email VARCHAR(255),
  is_head BOOLEAN DEFAULT FALSE,
  is_proxy BOOLEAN DEFAULT FALSE,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_beneficiaries_household ON beneficiaries(household_id);
CREATE INDEX idx_beneficiaries_national_id ON beneficiaries(national_id);

-- ===========================================
-- ENTITLEMENTS
-- ===========================================
CREATE TABLE entitlements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  household_id UUID NOT NULL REFERENCES households(id) ON DELETE CASCADE,
  assistance_type_id UUID NOT NULL REFERENCES assistance_types(id) ON DELETE CASCADE,
  programme_total DECIMAL(10, 2) NOT NULL DEFAULT 0, -- Total over programme
  distributed_total DECIMAL(10, 2) NOT NULL DEFAULT 0, -- Already distributed
  remaining DECIMAL(10, 2) GENERATED ALWAYS AS (programme_total - distributed_total) STORED,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(household_id, assistance_type_id)
);

CREATE INDEX idx_entitlements_household ON entitlements(household_id);

-- ===========================================
-- DISTRIBUTIONS
-- ===========================================
CREATE TABLE distributions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  distribution_date DATE NOT NULL,
  location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES auth.users(id)
);

CREATE INDEX idx_distributions_project ON distributions(project_id);
CREATE INDEX idx_distributions_status ON distributions(status);
CREATE INDEX idx_distributions_date ON distributions(distribution_date);

-- ===========================================
-- DISTRIBUTION RECORDS
-- ===========================================
CREATE TABLE distribution_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  distribution_id UUID NOT NULL REFERENCES distributions(id) ON DELETE CASCADE,
  household_id UUID NOT NULL REFERENCES households(id) ON DELETE CASCADE,
  entitlement_id UUID NOT NULL REFERENCES entitlements(id) ON DELETE CASCADE,
  planned_amount DECIMAL(10, 2) NOT NULL,
  actual_amount DECIMAL(10, 2),
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'distributed', 'partial', 'missed')),
  distributed_at TIMESTAMP WITH TIME ZONE,
  signature_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_distribution_records_distribution ON distribution_records(distribution_id);
CREATE INDEX idx_distribution_records_household ON distribution_records(household_id);
CREATE INDEX idx_distribution_records_status ON distribution_records(status);

-- ===========================================
-- CASE FILES (Case Management)
-- ===========================================
CREATE TABLE case_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  household_id UUID NOT NULL REFERENCES households(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  triage_level VARCHAR(20) NOT NULL DEFAULT 'low' CHECK (triage_level IN ('low', 'medium', 'high', 'critical')),
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_case_files_household ON case_files(household_id);
CREATE INDEX idx_case_files_status ON case_files(status);
CREATE INDEX idx_case_files_assigned ON case_files(assigned_to);

-- ===========================================
-- CASE NOTES
-- ===========================================
CREATE TABLE case_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID NOT NULL REFERENCES case_files(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  note TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_case_notes_case ON case_notes(case_id);

-- ===========================================
-- AUDIT LOGS
-- ===========================================
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  action VARCHAR(50) NOT NULL, -- 'create', 'update', 'delete'
  table_name VARCHAR(100) NOT NULL,
  record_id UUID NOT NULL,
  old_values JSONB,
  new_values JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_table ON audit_logs(table_name);
CREATE INDEX idx_audit_logs_record ON audit_logs(record_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);

-- ===========================================
-- ROW LEVEL SECURITY (RLS)
-- ===========================================

-- Enable RLS on all tables
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE assistance_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE households ENABLE ROW LEVEL SECURITY;
ALTER TABLE beneficiaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE distributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE distribution_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Policies for authenticated users (simplified for prototype)
-- In production, you'd want more granular policies based on user roles and country access

CREATE POLICY "Allow read for authenticated users" ON countries FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read for authenticated users" ON locations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read for authenticated users" ON user_profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow users to update own profile" ON user_profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE POLICY "Allow all for authenticated users" ON projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON assistance_types FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON households FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON beneficiaries FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON entitlements FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON distributions FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON distribution_records FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON case_files FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON case_notes FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON audit_logs FOR ALL TO authenticated USING (true);

-- ===========================================
-- FUNCTIONS
-- ===========================================

-- Function to generate registration numbers
CREATE OR REPLACE FUNCTION generate_registration_number()
RETURNS TRIGGER AS $$
DECLARE
  next_num INTEGER;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(registration_number FROM 4) AS INTEGER)), 0) + 1
  INTO next_num
  FROM households;
  
  NEW.registration_number := 'HH-' || LPAD(next_num::TEXT, 6, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_registration_number
  BEFORE INSERT ON households
  FOR EACH ROW
  WHEN (NEW.registration_number IS NULL OR NEW.registration_number = '')
  EXECUTE FUNCTION generate_registration_number();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_countries_updated_at BEFORE UPDATE ON countries FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_households_updated_at BEFORE UPDATE ON households FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_beneficiaries_updated_at BEFORE UPDATE ON beneficiaries FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_entitlements_updated_at BEFORE UPDATE ON entitlements FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_distributions_updated_at BEFORE UPDATE ON distributions FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_distribution_records_updated_at BEFORE UPDATE ON distribution_records FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_case_files_updated_at BEFORE UPDATE ON case_files FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ===========================================
-- SAMPLE DATA (Optional - uncomment to add)
-- ===========================================

/*
-- Sample locations for Syria
INSERT INTO locations (country_id, name, admin_level, pcode) VALUES
  ((SELECT id FROM countries WHERE code = 'SY'), 'Aleppo', 1, 'SY02'),
  ((SELECT id FROM countries WHERE code = 'SY'), 'Damascus', 1, 'SY01'),
  ((SELECT id FROM countries WHERE code = 'SY'), 'Homs', 1, 'SY04');

-- Sample locations for Lebanon
INSERT INTO locations (country_id, name, admin_level, pcode) VALUES
  ((SELECT id FROM countries WHERE code = 'LB'), 'Beirut', 1, 'LB01'),
  ((SELECT id FROM countries WHERE code = 'LB'), 'Tripoli', 1, 'LB06'),
  ((SELECT id FROM countries WHERE code = 'LB'), 'Bekaa', 1, 'LB04');
*/
