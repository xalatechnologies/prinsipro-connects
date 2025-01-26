-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Disable triggers temporarily for bulk insert
SET session_replication_role = replica;

---------------------------------------------------------------------------
-- Clean existing role and user data (if any)
---------------------------------------------------------------------------
TRUNCATE TABLE role_permissions CASCADE;
TRUNCATE TABLE permissions CASCADE;
TRUNCATE TABLE user_roles CASCADE;
TRUNCATE TABLE roles CASCADE;

---------------------------------------------------------------------------
-- Insert Roles and Permissions, then map them
---------------------------------------------------------------------------
WITH inserted_roles AS (
  INSERT INTO roles (id, name, description)
  VALUES 
    (uuid_generate_v4(), 'admin', 'Full tilgang til alle funksjoner og data'),
    (uuid_generate_v4(), 'editor', 'Kan redigere innhold, men ikke administrere brukere eller roller'),
    (uuid_generate_v4(), 'viewer', 'Kan kun lese innhold')
  RETURNING *
),
inserted_permissions AS (
  INSERT INTO permissions (id, name, description, scope)
  VALUES 
    -- Global permissions
    (uuid_generate_v4(), 'manage_users', 'Administrere brukere og roller', 'global'),
    (uuid_generate_v4(), 'manage_content', 'Redigere alt innhold', 'global'),
    (uuid_generate_v4(), 'view_content', 'Se alt innhold', 'global'),
    
    -- Area-specific permissions
    (uuid_generate_v4(), 'manage_areas', 'Administrere områder', 'area'),
    (uuid_generate_v4(), 'edit_areas', 'Redigere områder', 'area'),
    (uuid_generate_v4(), 'view_areas', 'Se områder', 'area'),
    
    -- Category-specific permissions
    (uuid_generate_v4(), 'manage_categories', 'Administrere kategorier', 'category'),
    (uuid_generate_v4(), 'edit_categories', 'Redigere kategorier', 'category'),
    (uuid_generate_v4(), 'view_categories', 'Se kategorier', 'category'),
    
    -- Principle-specific permissions
    (uuid_generate_v4(), 'manage_principles', 'Administrere prinsipper', 'principle'),
    (uuid_generate_v4(), 'edit_principles', 'Redigere prinsipper', 'principle'),
    (uuid_generate_v4(), 'view_principles', 'Se prinsipper', 'principle')
  RETURNING *
),
-- Admin role gets all permissions
admin_permissions AS (
  INSERT INTO role_permissions (role_id, permission_id)
  SELECT r.id, p.id
  FROM inserted_roles r
  CROSS JOIN inserted_permissions p
  WHERE r.name = 'admin'
),
-- Editor role gets edit and view permissions
editor_permissions AS (
  INSERT INTO role_permissions (role_id, permission_id)
  SELECT r.id, p.id
  FROM inserted_roles r
  CROSS JOIN inserted_permissions p
  WHERE r.name = 'editor'
    AND (p.name LIKE 'edit_%' 
      OR p.name LIKE 'view_%'
      OR p.name = 'manage_content')
),
-- Viewer role gets only view permissions
viewer_permissions AS (
  INSERT INTO role_permissions (role_id, permission_id)
  SELECT r.id, p.id
  FROM inserted_roles r
  CROSS JOIN inserted_permissions p
  WHERE r.name = 'viewer'
    AND p.name LIKE 'view_%'
),
-- Insert test tenant
inserted_tenant AS (
  INSERT INTO tenants (id, name, domain, settings, status)
  VALUES (
    uuid_generate_v4(),
    'Nordre Follo Kommune',
    'nordrefollo.kommune.no',
    '{"theme": "light", "language": "nb-NO"}'::jsonb,
    'active'
  )
  RETURNING *
),
-- Create test tenant users
inserted_tenant_users AS (
  INSERT INTO tenant_users (tenant_id, user_id, role)
  SELECT 
    t.id,
    '00000000-0000-0000-0000-000000000000'::uuid, -- Placeholder, replace with real user ID
    CASE r.name
      WHEN 'admin' THEN 'owner'
      WHEN 'editor' THEN 'editor'
      WHEN 'viewer' THEN 'viewer'
    END
  FROM inserted_tenant t
  CROSS JOIN inserted_roles r
  WHERE r.name IN ('admin', 'editor', 'viewer')
)
-- Map placeholder user to admin role
INSERT INTO user_roles (user_id, role_id)
SELECT 
  '00000000-0000-0000-0000-000000000000'::uuid, -- Placeholder, replace with real user ID
  r.id
FROM inserted_roles r
WHERE r.name = 'admin';

-- Re-enable triggers
SET session_replication_role = DEFAULT;

/*
Test Users for the Application:

1. Admin User
   Email: admin@nordrefollo.kommune.no
   Password: Admin123!
   Role: admin
   Can: Manage all aspects of the system

2. Editor User
   Email: editor@nordrefollo.kommune.no
   Password: Editor123!
   Role: editor
   Can: Edit content but not manage users/roles

3. Viewer User
   Email: viewer@nordrefollo.kommune.no
   Password: Viewer123!
   Role: viewer
   Can: Only view content

Note: Create these users through the Supabase Auth UI or API before running this seed.
Then update the user_id values in tenant_users and user_roles tables with the real UUIDs.
*/