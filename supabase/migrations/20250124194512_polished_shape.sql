/*
  # Add multi-tenant support

  1. New Tables
    - `tenants` - Store tenant information
    - `tenant_users` - Link users to tenants with roles

  2. Changes
    - Add tenant_id to all existing tables
    - Add functions for tenant management
    - Add triggers for automatic tenant_id setting

  3. Security
    - Enable RLS on tenant tables
    - Add tenant isolation policies
*/

-- Create tenants table
CREATE TABLE tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  domain text UNIQUE,
  settings jsonb DEFAULT '{}',
  status text NOT NULL CHECK (status IN ('active', 'inactive', 'suspended')) DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tenant_users table
CREATE TABLE tenant_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role text NOT NULL CHECK (role IN ('owner', 'admin', 'editor', 'viewer')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(tenant_id, user_id)
);

-- Add tenant_id to existing tables
ALTER TABLE areas ADD COLUMN tenant_id uuid REFERENCES tenants(id);
ALTER TABLE categories ADD COLUMN tenant_id uuid REFERENCES tenants(id);
ALTER TABLE principles ADD COLUMN tenant_id uuid REFERENCES tenants(id);
ALTER TABLE measures ADD COLUMN tenant_id uuid REFERENCES tenants(id);
ALTER TABLE comments ADD COLUMN tenant_id uuid REFERENCES tenants(id);
ALTER TABLE ratings ADD COLUMN tenant_id uuid REFERENCES tenants(id);
ALTER TABLE reactions ADD COLUMN tenant_id uuid REFERENCES tenants(id);
ALTER TABLE exceptions ADD COLUMN tenant_id uuid REFERENCES tenants(id);
ALTER TABLE reviews ADD COLUMN tenant_id uuid REFERENCES tenants(id);
ALTER TABLE reference_docs ADD COLUMN tenant_id uuid REFERENCES tenants(id);
ALTER TABLE reference_mappings ADD COLUMN tenant_id uuid REFERENCES tenants(id);

-- Create function to get current tenant_id
CREATE OR REPLACE FUNCTION get_current_tenant_id()
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN (
    SELECT tenant_id 
    FROM tenant_users 
    WHERE user_id = auth.uid() 
    LIMIT 1
  );
END;
$$;

-- Create function to check if user belongs to tenant
CREATE OR REPLACE FUNCTION belongs_to_tenant(tenant_uuid uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM tenant_users 
    WHERE tenant_id = tenant_uuid 
    AND user_id = auth.uid()
  );
END;
$$;

-- Enable RLS on tenant tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tenants
CREATE POLICY "Tenants viewable by tenant members"
  ON tenants FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tenant_users
      WHERE tenant_users.tenant_id = tenants.id
      AND tenant_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Tenants manageable by tenant owners"
  ON tenants FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tenant_users
      WHERE tenant_users.tenant_id = tenants.id
      AND tenant_users.user_id = auth.uid()
      AND tenant_users.role = 'owner'
    )
  );

-- RLS Policies for tenant_users
CREATE POLICY "Tenant users viewable by tenant members"
  ON tenant_users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tenant_users tu
      WHERE tu.tenant_id = tenant_users.tenant_id
      AND tu.user_id = auth.uid()
    )
  );

CREATE POLICY "Tenant users manageable by tenant admins"
  ON tenant_users FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tenant_users tu
      WHERE tu.tenant_id = tenant_users.tenant_id
      AND tu.user_id = auth.uid()
      AND tu.role IN ('owner', 'admin')
    )
  );

-- Update RLS policies for tenant isolation
CREATE POLICY "Areas isolated by tenant"
  ON areas FOR ALL
  TO authenticated
  USING (tenant_id = get_current_tenant_id())
  WITH CHECK (tenant_id = get_current_tenant_id());

CREATE POLICY "Categories isolated by tenant"
  ON categories FOR ALL
  TO authenticated
  USING (tenant_id = get_current_tenant_id())
  WITH CHECK (tenant_id = get_current_tenant_id());

CREATE POLICY "Principles isolated by tenant"
  ON principles FOR ALL
  TO authenticated
  USING (tenant_id = get_current_tenant_id())
  WITH CHECK (tenant_id = get_current_tenant_id());

CREATE POLICY "Measures isolated by tenant"
  ON measures FOR ALL
  TO authenticated
  USING (tenant_id = get_current_tenant_id())
  WITH CHECK (tenant_id = get_current_tenant_id());

CREATE POLICY "Comments isolated by tenant"
  ON comments FOR ALL
  TO authenticated
  USING (tenant_id = get_current_tenant_id())
  WITH CHECK (tenant_id = get_current_tenant_id());

CREATE POLICY "Ratings isolated by tenant"
  ON ratings FOR ALL
  TO authenticated
  USING (tenant_id = get_current_tenant_id())
  WITH CHECK (tenant_id = get_current_tenant_id());

CREATE POLICY "Reactions isolated by tenant"
  ON reactions FOR ALL
  TO authenticated
  USING (tenant_id = get_current_tenant_id())
  WITH CHECK (tenant_id = get_current_tenant_id());

CREATE POLICY "Exceptions isolated by tenant"
  ON exceptions FOR ALL
  TO authenticated
  USING (tenant_id = get_current_tenant_id())
  WITH CHECK (tenant_id = get_current_tenant_id());

CREATE POLICY "Reviews isolated by tenant"
  ON reviews FOR ALL
  TO authenticated
  USING (tenant_id = get_current_tenant_id())
  WITH CHECK (tenant_id = get_current_tenant_id());

CREATE POLICY "Reference docs isolated by tenant"
  ON reference_docs FOR ALL
  TO authenticated
  USING (tenant_id = get_current_tenant_id())
  WITH CHECK (tenant_id = get_current_tenant_id());

CREATE POLICY "Reference mappings isolated by tenant"
  ON reference_mappings FOR ALL
  TO authenticated
  USING (tenant_id = get_current_tenant_id())
  WITH CHECK (tenant_id = get_current_tenant_id());

-- Create triggers to automatically set tenant_id
CREATE OR REPLACE FUNCTION set_tenant_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.tenant_id := get_current_tenant_id();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_tenant_id_areas
  BEFORE INSERT ON areas
  FOR EACH ROW
  EXECUTE FUNCTION set_tenant_id();

CREATE TRIGGER set_tenant_id_categories
  BEFORE INSERT ON categories
  FOR EACH ROW
  EXECUTE FUNCTION set_tenant_id();

CREATE TRIGGER set_tenant_id_principles
  BEFORE INSERT ON principles
  FOR EACH ROW
  EXECUTE FUNCTION set_tenant_id();

CREATE TRIGGER set_tenant_id_measures
  BEFORE INSERT ON measures
  FOR EACH ROW
  EXECUTE FUNCTION set_tenant_id();

CREATE TRIGGER set_tenant_id_comments
  BEFORE INSERT ON comments
  FOR EACH ROW
  EXECUTE FUNCTION set_tenant_id();

CREATE TRIGGER set_tenant_id_ratings
  BEFORE INSERT ON ratings
  FOR EACH ROW
  EXECUTE FUNCTION set_tenant_id();

CREATE TRIGGER set_tenant_id_reactions
  BEFORE INSERT ON reactions
  FOR EACH ROW
  EXECUTE FUNCTION set_tenant_id();

CREATE TRIGGER set_tenant_id_exceptions
  BEFORE INSERT ON exceptions
  FOR EACH ROW
  EXECUTE FUNCTION set_tenant_id();

CREATE TRIGGER set_tenant_id_reviews
  BEFORE INSERT ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION set_tenant_id();

CREATE TRIGGER set_tenant_id_reference_docs
  BEFORE INSERT ON reference_docs
  FOR EACH ROW
  EXECUTE FUNCTION set_tenant_id();

CREATE TRIGGER set_tenant_id_reference_mappings
  BEFORE INSERT ON reference_mappings
  FOR EACH ROW
  EXECUTE FUNCTION set_tenant_id();