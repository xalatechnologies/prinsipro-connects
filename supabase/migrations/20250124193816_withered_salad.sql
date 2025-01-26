/*
  # Content Schema Setup

  1. New Tables
    - areas
      - id (uuid)
      - name (text)
      - description (text)
      - responsible (text)
      - style (jsonb)
      - created_at (timestamptz)
    - categories
      - id (uuid)
      - area_id (uuid, references areas)
      - name (text)
      - description (text)
      - style (jsonb)
      - created_at (timestamptz)
    - principles
      - id (uuid)
      - category_id (uuid, references categories)
      - title (text)
      - description (text)
      - goal (text)
      - importance (text)
      - consequences (text)
      - rationale (text)
      - status (text)
      - version (text)
      - style (jsonb)
      - created_at (timestamptz)
    - measures
      - id (uuid)
      - principle_id (uuid, references principles)
      - title (text)
      - description (text)
      - responsible (text)
      - status (text)
      - priority (text)
      - deadline (timestamptz)
      - progress_percentage (integer)
      - style (jsonb)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access
*/

-- Create areas table
CREATE TABLE areas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  responsible text,
  style jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  area_id uuid REFERENCES areas ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  style jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create principles table
CREATE TABLE principles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  goal text,
  importance text,
  consequences text,
  rationale text,
  status text NOT NULL CHECK (status IN ('draft', 'review', 'approved', 'deprecated')),
  version text NOT NULL DEFAULT '1.0',
  style jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create measures table
CREATE TABLE measures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  principle_id uuid REFERENCES principles ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  responsible text,
  status text NOT NULL CHECK (status IN ('planlagt', 'pågående', 'fullført')),
  priority text NOT NULL CHECK (priority IN ('høy', 'medium', 'lav')),
  deadline timestamptz,
  progress_percentage integer CHECK (progress_percentage BETWEEN 0 AND 100),
  style jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_status_update timestamptz DEFAULT now(),
  next_review_date timestamptz
);

-- Enable RLS
ALTER TABLE areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE principles ENABLE ROW LEVEL SECURITY;
ALTER TABLE measures ENABLE ROW LEVEL SECURITY;

-- RLS Policies for areas
CREATE POLICY "Areas viewable by all users"
  ON areas FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Areas manageable by admins and editors"
  ON areas FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name IN ('admin', 'editor')
    )
  );

-- RLS Policies for categories
CREATE POLICY "Categories viewable by all users"
  ON categories FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Categories manageable by admins and editors"
  ON categories FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name IN ('admin', 'editor')
    )
  );

-- RLS Policies for principles
CREATE POLICY "Principles viewable by all users"
  ON principles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Principles manageable by admins and editors"
  ON principles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name IN ('admin', 'editor')
    )
  );

-- RLS Policies for measures
CREATE POLICY "Measures viewable by all users"
  ON measures FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Measures manageable by admins and editors"
  ON measures FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name IN ('admin', 'editor')
    )
  );