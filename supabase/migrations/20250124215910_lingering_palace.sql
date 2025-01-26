/*
  # Initial Roles and Permissions Setup

  1. Creates roles and permissions
  2. Maps permissions to roles
  3. Creates initial tenant
  4. Sets up placeholder for user mappings
*/

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
TRUNCATE TABLE tenant_users CASCADE;
TRUNCATE TABLE tenants CASCADE;

---------------------------------------------------------------------------
-- Insert Roles
---------------------------------------------------------------------------
INSERT INTO roles (id, name, description)
VALUES 
  (uuid_generate_v4(), 'admin', 'Full tilgang til alle funksjoner og data'),
  (uuid_generate_v4(), 'editor', 'Kan redigere innhold, men ikke administrere brukere eller roller'),
  (uuid_generate_v4(), 'viewer', 'Kan kun lese innhold');

---------------------------------------------------------------------------
-- Insert Permissions
---------------------------------------------------------------------------
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
  (uuid_generate_v4(), 'view_principles', 'Se prinsipper', 'principle');

---------------------------------------------------------------------------
-- Map Permissions to Roles
---------------------------------------------------------------------------
-- Admin role gets all permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'admin';

-- Editor role gets edit and view permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'editor'
  AND (p.name LIKE 'edit_%' 
    OR p.name LIKE 'view_%'
    OR p.name = 'manage_content');

-- Viewer role gets only view permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'viewer'
  AND p.name LIKE 'view_%';

---------------------------------------------------------------------------
-- Insert Initial Tenant
---------------------------------------------------------------------------
INSERT INTO tenants (id, name, domain, settings, status)
VALUES (
  uuid_generate_v4(),
  'Nordre Follo Kommune',
  'nordrefollo.kommune.no',
  '{"theme": "light", "language": "nb-NO"}'::jsonb,
  'active'
);

-- Re-enable triggers
SET session_replication_role = DEFAULT;

/*
Note: After this migration, you need to:

1. Create users through Supabase Auth UI or API:
   - admin@nordrefollo.kommune.no
   - editor@nordrefollo.kommune.no
   - viewer@nordrefollo.kommune.no

2. Then run a separate migration to map the users:
   - Map users to roles in user_roles table
   - Map users to tenant in tenant_users table
   
This separation ensures we don't try to reference auth.users
before they exist.
*/