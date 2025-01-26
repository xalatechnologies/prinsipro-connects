/*
  # Feedback Schema Setup

  1. New Tables
    - comments
      - id (uuid)
      - principle_id (uuid, references principles)
      - user_id (uuid, references auth.users)
      - content (text)
      - created_at (timestamptz)
    - ratings
      - id (uuid)
      - principle_id (uuid, references principles)
      - user_id (uuid, references auth.users)
      - value (integer)
      - created_at (timestamptz)
    - reactions
      - id (uuid)
      - comment_id (uuid, references comments)
      - user_id (uuid, references auth.users)
      - type (text)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create comments table
CREATE TABLE comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  principle_id uuid REFERENCES principles ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  content text NOT NULL,
  parent_id uuid REFERENCES comments(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create ratings table
CREATE TABLE ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  principle_id uuid REFERENCES principles ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  value integer CHECK (value BETWEEN 1 AND 5) NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(principle_id, user_id)
);

-- Create reactions table
CREATE TABLE reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id uuid REFERENCES comments ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  type text CHECK (type IN ('like', 'dislike')) NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(comment_id, user_id)
);

-- Enable RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for comments
CREATE POLICY "Comments viewable by all users"
  ON comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for ratings
CREATE POLICY "Ratings viewable by all users"
  ON ratings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own ratings"
  ON ratings FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for reactions
CREATE POLICY "Reactions viewable by all users"
  ON reactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own reactions"
  ON reactions FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);