/*
  # Create governance tables

  1. New Tables
    - `exceptions` - Track exceptions to principles
    - `reviews` - Track principle reviews
    - `reference_docs` - Store reference documents
    - `reference_mappings` - Link references to principles

  2. Security
    - Enable RLS on all tables
    - Add policies for viewing and managing content
*/

-- Create exceptions table
CREATE TABLE exceptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  principle_id uuid REFERENCES principles ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  justification text,
  risk_assessment jsonb NOT NULL,
  status text CHECK (status IN ('pending', 'approved', 'rejected')) NOT NULL,
  approved_by uuid REFERENCES auth.users,
  approval_date timestamptz,
  expiry_date timestamptz,
  created_by uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  principle_id uuid REFERENCES principles ON DELETE CASCADE NOT NULL,
  reviewer_id uuid REFERENCES auth.users NOT NULL,
  status text CHECK (status IN ('pending', 'approved', 'rejected', 'needs_changes')) NOT NULL,
  comments text,
  review_date timestamptz NOT NULL,
  next_review_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reference_docs table (renamed from references to avoid reserved keyword)
CREATE TABLE reference_docs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text CHECK (type IN ('DigDir', 'NSM', 'NFK')) NOT NULL,
  code text NOT NULL,
  title text NOT NULL,
  description text,
  url text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(type, code)
);

-- Create reference_mappings table
CREATE TABLE reference_mappings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_id uuid REFERENCES reference_docs ON DELETE CASCADE NOT NULL,
  principle_id uuid REFERENCES principles ON DELETE CASCADE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(reference_id, principle_id)
);

-- Enable RLS
ALTER TABLE exceptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE reference_docs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reference_mappings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for exceptions
CREATE POLICY "Exceptions viewable by all users"
  ON exceptions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Exceptions manageable by admins"
  ON exceptions FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name = 'admin'
    )
  );

-- RLS Policies for reviews
CREATE POLICY "Reviews viewable by all users"
  ON reviews FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Reviews manageable by admins and editors"
  ON reviews FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name IN ('admin', 'editor')
    )
  );

-- RLS Policies for reference_docs
CREATE POLICY "Reference docs viewable by all users"
  ON reference_docs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Reference docs manageable by admins"
  ON reference_docs FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name = 'admin'
    )
  );

-- RLS Policies for reference mappings
CREATE POLICY "Reference mappings viewable by all users"
  ON reference_mappings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Reference mappings manageable by admins"
  ON reference_mappings FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name = 'admin'
    )
  );