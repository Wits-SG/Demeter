CREATE TABLE IF NOT EXISTS users (
    id text PRIMARY KEY NOT NULL,
    pronoun_id integer,
    username text,
    display_name text,
    biography text,
    image_url text,
    UNIQUE (username),
    FOREIGN KEY (pronoun_id) REFERENCES user_pronouns(id)
);

-- USER SUB TABLES
    CREATE TABLE IF NOT EXISTS user_pronouns (
        id integer PRIMARY KEY NOT NULL,
        pronouns text
    );

    CREATE TABLE IF NOT EXISTS user_key (
        id text PRIMARY KEY NOT NULL,
        user_id text,
        hashed_password text,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS user_session (
        id text PRIMARY KEY NOT NULL,
        user_id text,
        active_expires integer, -- TIMESTAMP MILLISECONDS
        idle_expires integer, -- TIMESTAMP MILLISECONDS
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

CREATE TABLE IF NOT EXISTS posts (
    id text PRIMARY KEY NOT NULL,
    user_id text,
    upload_date integer, -- TIMESTAMP SECONDS
    likes integer,
    type integer -- RECIPE = 0, PICTURE = 1
);

-- POST SUB TABLES
    CREATE TABLE IF NOT EXISTS comments (
        id integer PRIMARY KEY NOT NULL,
        post_id text,
        user_id text,
        parent_id text,
        root integer,
        content text,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
    );

CREATE TABLE IF NOT EXISTS recipes (
    id text PRIMARY KEY NOT NULL,
    post_id text,
    skill_level_id integer,
    title text,
    description text,
    image_url text,
    serving_size integer,
    cooking_time integer,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_level_id) REFERENCES skill_levels(id) ON DELETE CASCADE
);

-- RECIPE SUB TABLES
    CREATE TABLE IF NOT EXISTS ingredients (
        id integer PRIMARY KEY NOT NULL,
        recipe_id text,
        content text,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS instructions (
        id integer PRIMARY KEY NOT NULL,
        recipe_id text,
        content text,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS skill_levels (
        id integer PRIMARY KEY NOT NULL,
        content text
    );

CREATE TABLE IF NOT EXISTS pictures (
    id text PRIMARY KEY NOT NULL,
    post_id text,
    title text,
    description text,
    image_url text,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cookbooks (
    id text PRIMARY KEY NOT NULL,
    user_id text,
    title text,
    description text,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- COOKBOOK SUB TABLES
    CREATE TABLE IF NOT EXISTS cookbook_recipes (
        id integer PRIMARY KEY NOT NULL,
        cookbook_id text,
        recipe_id text,
        FOREIGN KEY (cookbook_id) REFERENCES cookbooks(id) ON DELETE CASCADE,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
    );

CREATE TABLE IF NOT EXISTS menus (
    id text PRIMARY KEY NOT NULL,
    user_id text,
    title text,
    description text,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


-- MENU SUB TABLES

    CREATE TABLE IF NOT EXISTS menu_sections (
        id integer PRIMARY KEY NOT NULL,
        menu_id text,
        name text,
        FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS menu_recipes (
        id integer PRIMARY KEY NOT NULL,
        menu_id text,
        recipe_id text,
        section_id integer,
        FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE CASCADE,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
        FOREIGN KEY (section_id) REFERENCES menu_sections(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS menu_cookbooks (
        id integer PRIMARY KEY NOT NULL,
        menu_id text,
        cookbook_id text,
        FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE CASCADE,
        FOREIGN KEY (cookbook_id) REFERENCES cookbooks(id) ON DELETE CASCADE
    );


-- ENUM INSERTION

INSERT INTO skill_levels (content) VALUES 
    ("Beginner"),
    ("Intermediate"),
    ("Advanced");

INSERT INTO user_pronouns (pronouns) VALUES
    ("She / Her"),
    ("He / Him"),
    ("They / Them"),
    ("Other");
