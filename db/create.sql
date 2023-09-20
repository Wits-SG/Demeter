-- User tables

CREATE TABLE IF NOT EXISTS users (
    user_id text primary key unique not null,
    pronoun_id integer not null,
    display_name text not null,
    user_name text unique not null,
    biography text
);

CREATE TABLE IF NOT EXISTS user_pronouns (
    pronoun_id integer primary key autoincrement,
    pronouns text
);

-- CREATE TABLE IF NOT EXISTS user_follows (
    -- user_id text not null,
    -- following_id text not null
-- );

-- =============================================================================
-- Post tables

CREATE TABLE IF NOT EXISTS (
    post_id text primary key unique not null,
    user_id text not null,
    upload_date integer not null,
    likes integer
);

-- CREATE TABLE IF NOT EXISTS pictures (
    -- picture_id text primary key unique not null,
    -- post_id text unique not null ,
    -- url text not null,
    -- title text not null,
    -- description text
-- );

-- CREATE TABLE IF NOT EXISTS blogs (
    -- blog_id text primary key unique not null,
    -- post_id text unique not null,
    -- url text not null,
    -- title text not null
-- );

CREATE TABLE IF NOT EXISTS recipes (
    recipe_id text primary key unique not null,
    post_id text unique not null,
    name text not null,
    description text,
    serving_size integer,
    cooking_time integer,
    skill_level_id integer
);

CREATE TABLE IF NOT EXISTS comments (
    comment_id integer primary key autoincrement,
    post_id text not null,
    user_id text not null,
    parent_id integer,
    root integer not null -- BOOLEAN
);

-- =============================================================================

-- Recipe tables

CREATE TABLE IF NOT EXISTS skill_levels (
    skill_level_id integer primary key autoincrement,
    name text
);

CREATE TABLE IF NOT EXISTS ingredients (
    ingredient_id integer primary key autoincrement,
    recipe_id text not null,
    name text not null
);

CREATE TABLE IF NOT EXISTS instructions (
    instruction_id integer primary key autoincrement,
    recipe_id text not null,
    name text not null
);

-- =============================================================================

-- Cookbook tables

CREATE TABLE IF NOT EXISTS cookbooks (
    cookbook_id text primary key unique not null,
    user_id text not null,
    name text not null
);

CREATE TABLE IF NOT EXISTS cookbook_recipes (
    cookbook_id text not null,
    recipe_id text not null
);

-- =============================================================================

-- Menu tables

CREATE TABLE IF NOT EXISTS menus (
    menu_id text primary key unique not null,
    user_id text not null,
    name text not null
);

CREATE TABLE IF NOT EXISTS menu_sections (
    section_id integer not null,
    menu_id text not null,
    name text
);

CREATE TABLE IF NOT EXISTS menu_recipes (
    menu_id text not null,
    recipe_id text not null,
    section_id integer not null
);

