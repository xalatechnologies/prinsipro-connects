/*
  # Initial Schema Setup

  1. New Tables
    - users (handled by Supabase Auth)
    - roles
      - id (uuid)
      - name (text)
      - description (text)
      - created_at (timestamptz)
    - user_roles
      - id (uuid)
      - user_id (uuid, references auth.users)
      - role_id (uuid, references roles)
      - created_at (timestamptz)
    - permissions
      - id (uuid)
      - name (text)
      - description (text)
      - scope (text)
      - created_at (timestamptz)
    - role_permissions
      - id (uuid)
      - role_id (uuid, references roles)
      - permission_id (uuid, references permissions)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access
*/

-- Create roles table
CREATE TABLE roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_roles table
CREATE TABLE user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  role_id uuid REFERENCES roles NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, role_id)
);

-- Create permissions table
CREATE TABLE permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  scope text NOT NULL CHECK (scope IN ('global', 'area', 'category', 'principle')),
  created_at timestamptz DEFAULT now()
);

-- Create role_permissions table
CREATE TABLE role_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id uuid REFERENCES roles NOT NULL,
  permission_id uuid REFERENCES permissions NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(role_id, permission_id)
);

-- Enable RLS
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Roles viewable by authenticated users"
  ON roles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Roles manageable by admins only"
  ON roles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role_id IN (
        SELECT r.id FROM roles r WHERE r.name = 'admin'
      )
    )
  );

CREATE POLICY "User roles viewable by authenticated users"
  ON user_roles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "User roles manageable by admins only"
  ON user_roles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role_id IN (
        SELECT r.id FROM roles r WHERE r.name = 'admin'
      )
    )
  );

CREATE POLICY "Permissions viewable by authenticated users"
  ON permissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Permissions manageable by admins only"
  ON permissions FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role_id IN (
        SELECT r.id FROM roles r WHERE r.name = 'admin'
      )
    )
  );

CREATE POLICY "Role permissions viewable by authenticated users"
  ON role_permissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Role permissions manageable by admins only"
  ON role_permissions FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role_id IN (
        SELECT r.id FROM roles r WHERE r.name = 'admin'
      )
    )
  );