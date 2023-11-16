-- TEST USERS
INSERT INTO users (id, pronoun_id, username, display_name, biography, image_url) VALUES
    ("user_id_1", 1, "username1", "User 1", "", ""),
    ("user_id_2", 2, "username2", "User 2", "", ""),
    ("user_id_3", 3, "username3", "User 3", "", ""),
    ("user_id_4", 4, "username4", "User 4", "", "");

-- Password for all accounts is "1234567890"
INSERT INTO user_key (id, user_id, hashed_password) VALUES
    ("username:username1", "user_id_1", "s2:vgg8bxajlmqr6s3w:e078a14e656b9de8e25d4a6fd39e895ca5d58a989ee42b993e924f7baa41b7c5435f47067a53aa9d85432bf6bda099b5bed6697ade6d5c10f382e32fec6f751d"),
    ("username:username2", "user_id_2", "s2:vgg8bxajlmqr6s3w:e078a14e656b9de8e25d4a6fd39e895ca5d58a989ee42b993e924f7baa41b7c5435f47067a53aa9d85432bf6bda099b5bed6697ade6d5c10f382e32fec6f751d"),
    ("username:username3", "user_id_3", "s2:vgg8bxajlmqr6s3w:e078a14e656b9de8e25d4a6fd39e895ca5d58a989ee42b993e924f7baa41b7c5435f47067a53aa9d85432bf6bda099b5bed6697ade6d5c10f382e32fec6f751d"),
    ("username:username4", "user_id_4", "s2:vgg8bxajlmqr6s3w:e078a14e656b9de8e25d4a6fd39e895ca5d58a989ee42b993e924f7baa41b7c5435f47067a53aa9d85432bf6bda099b5bed6697ade6d5c10f382e32fec6f751d");

-- Creating some example posts and recipes
INSERT INTO posts (id, user_id, upload_date, likes, type) VALUES
    ("post_recipe_id_1", "user_id_1", 86400, 10, 0),
    ("post_recipe_id_2", "user_id_1", 98500, 20, 0),
    ("post_recipe_id_3", "user_id_1", 99000, 25, 0),
    ("post_recipe_id_4", "user_id_1", 98500, 28, 0),
    ("post_recipe_id_5", "user_id_1", 98500, 28, 0),
    ("post_recipe_id_6", "user_id_1", 86450, 12, 0),
    ("post_recipe_id_7", "user_id_1", 95000, 18, 0),
    ("post_recipe_id_8", "user_id_2", 90000, 15, 0),
    ("post_recipe_id_9", "user_id_2", 97500, 30, 0),
    ("post_recipe_id_10", "user_id_2", 98000, 22, 0),
    ("post_recipe_id_11", "user_id_3", 101000, 15, 0),
    ("post_recipe_id_12", "user_id_3", 95000, 20, 0),
    ("post_recipe_id_13", "user_id_3", 100500, 22, 0),
    ("post_recipe_id_14", "user_id_4", 100000, 8, 0),
    ("post_recipe_id_15", "user_id_4", 102500, 12, 0);

INSERT INTO comments (post_id, user_id, parent_id, root, content) VALUES 
    ("post_recipe_id_1", "user_id_1", NULL, 1, "Example Root Comment"),
        ("post_recipe_id_1", "user_id_2", 1, 0, "Example First Comment"),
            ("post_recipe_id_1", "user_id_3", 2, 0, "Example Second Comment"),
        ("post_recipe_id_1", "user_id_3", 1, 0, "Example First Comment"),
    ("post_recipe_id_1", "user_id_4", NULL, 1, "Example Root Comment");

INSERT INTO recipes (id, post_id, skill_level_id, title, description, image_url, serving_size, cooking_time) VALUES
    ("recipe_id_1", "post_recipe_id_1", 1, "Recipe 1", "Test description for Recipe 1", "", 4, 30),
    ("recipe_id_2", "post_recipe_id_2", 2, "Recipe 2", "Test description for Recipe 2", "", 6, 45),
    ("recipe_id_3", "post_recipe_id_3", 3, "Recipe 3", "Test description for Recipe 3", "", 8, 60),
    ("recipe_id_4", "post_recipe_id_4", 1, "Recipe 4", "Test description for Recipe 4", "", 5, 40),
    ("recipe_id_5", "post_recipe_id_5", 2, "Recipe 5", "Test description for Recipe 5", "", 4, 35),
    ("recipe_id_6", "post_recipe_id_6", 3, "Recipe 6", "Test description for Recipe 6", "", 3, 25),
    ("recipe_id_7", "post_recipe_id_7", 1, "Recipe 7", "Test description for Recipe 7", "", 5, 35),
    ("recipe_id_8", "post_recipe_id_8", 2, "Recipe 8", "Test description for Recipe 8", "", 6, 40),
    ("recipe_id_9", "post_recipe_id_9", 1, "Recipe 9", "Test description for Recipe 9", "", 4, 30),
    ("recipe_id_10", "post_recipe_id_10", 3, "Recipe 10", "Test description for Recipe 10", "", 3, 25),
    ("recipe_id_11", "post_recipe_id_11", 2, "Recipe 11", "Test description for Recipe 11", "", 4, 30),
    ("recipe_id_12", "post_recipe_id_12", 3, "Recipe 12", "Test description for Recipe 12", "", 6, 45),
    ("recipe_id_13", "post_recipe_id_13", 1, "Recipe 13", "Test description for Recipe 13", "", 5, 40),
    ("recipe_id_14", "post_recipe_id_14", 2, "Recipe 14", "Test description for Recipe 14", "", 8, 60),
    ("recipe_id_15", "post_recipe_id_15", 3, "Recipe 15", "Test description for Recipe 15", "", 3, 25);

INSERT INTO ingredients (recipe_id, content) VALUES
    ('recipe_id_1', 'Ingredient 1 for Recipe 1'),
    ('recipe_id_1', 'Ingredient 2 for Recipe 1'),
    ('recipe_id_2', 'Ingredient 1 for Recipe 2'),
    ('recipe_id_2', 'Ingredient 2 for Recipe 2'),
    ('recipe_id_3', 'Ingredient 1 for Recipe 3'),
    ('recipe_id_3', 'Ingredient 2 for Recipe 3'),
    ('recipe_id_4', 'Ingredient 1 for Recipe 4'),
    ('recipe_id_4', 'Ingredient 2 for Recipe 4'),
    ('recipe_id_5', 'Ingredient 1 for Recipe 5'),
    ('recipe_id_5', 'Ingredient 2 for Recipe 5'),
    ('recipe_id_6', 'Ingredient 1 for Recipe 6'),
    ('recipe_id_6', 'Ingredient 2 for Recipe 6'),
    ('recipe_id_7', 'Ingredient 1 for Recipe 7'),
    ('recipe_id_7', 'Ingredient 2 for Recipe 7'),
    ('recipe_id_8', 'Ingredient 1 for Recipe 8'),
    ('recipe_id_8', 'Ingredient 2 for Recipe 8'),
    ('recipe_id_9', 'Ingredient 1 for Recipe 9'),
    ('recipe_id_9', 'Ingredient 2 for Recipe 9'),
    ('recipe_id_10', 'Ingredient 1 for Recipe 10'),
    ('recipe_id_10', 'Ingredient 2 for Recipe 10'),
    ('recipe_id_11', 'Ingredient 1 for Recipe 11'),
    ('recipe_id_11', 'Ingredient 2 for Recipe 11'),
    ('recipe_id_12', 'Ingredient 1 for Recipe 12'),
    ('recipe_id_12', 'Ingredient 2 for Recipe 12'),
    ('recipe_id_13', 'Ingredient 1 for Recipe 13'),
    ('recipe_id_13', 'Ingredient 2 for Recipe 13'),
    ('recipe_id_14', 'Ingredient 1 for Recipe 14'),
    ('recipe_id_14', 'Ingredient 2 for Recipe 14'),
    ('recipe_id_15', 'Ingredient 1 for Recipe 15'),
    ('recipe_id_15', 'Ingredient 2 for Recipe 15');

INSERT INTO instructions (recipe_id, content) VALUES
    ('recipe_id_1', 'Instruction 1 for Recipe 1'),
    ('recipe_id_1', 'Instruction 2 for Recipe 1'),
    ('recipe_id_2', 'Instruction 1 for Recipe 2'),
    ('recipe_id_2', 'Instruction 2 for Recipe 2'),
    ('recipe_id_3', 'Instruction 1 for Recipe 3'),
    ('recipe_id_3', 'Instruction 2 for Recipe 3'),
    ('recipe_id_4', 'Instruction 1 for Recipe 4'),
    ('recipe_id_4', 'Instruction 2 for Recipe 4'),
    ('recipe_id_5', 'Instruction 1 for Recipe 5'),
    ('recipe_id_5', 'Instruction 2 for Recipe 5'),
    ('recipe_id_6', 'Instruction 1 for Recipe 6'),
    ('recipe_id_6', 'Instruction 2 for Recipe 6'),
    ('recipe_id_7', 'Instruction 1 for Recipe 7'),
    ('recipe_id_7', 'Instruction 2 for Recipe 7'),
    ('recipe_id_8', 'Instruction 1 for Recipe 8'),
    ('recipe_id_8', 'Instruction 2 for Recipe 8'),
    ('recipe_id_9', 'Instruction 1 for Recipe 9'),
    ('recipe_id_9', 'Instruction 2 for Recipe 9'),
    ('recipe_id_10', 'Instruction 1 for Recipe 10'),
    ('recipe_id_10', 'Instruction 2 for Recipe 10'),
    ('recipe_id_11', 'Instruction 1 for Recipe 11'),
    ('recipe_id_11', 'Instruction 2 for Recipe 11'),
    ('recipe_id_12', 'Instruction 1 for Recipe 12'),
    ('recipe_id_12', 'Instruction 2 for Recipe 12'),
    ('recipe_id_13', 'Instruction 1 for Recipe 13'),
    ('recipe_id_13', 'Instruction 2 for Recipe 13'),
    ('recipe_id_14', 'Instruction 1 for Recipe 14'),
    ('recipe_id_14', 'Instruction 2 for Recipe 14'),
    ('recipe_id_15', 'Instruction 1 for Recipe 15'),
    ('recipe_id_15', 'Instruction 2 for Recipe 15');

INSERT INTO posts (id, user_id, upload_date, likes, type) VALUES
    ('post_picture_id_1', 'user_id_1', 86400, 10, 1),
    ('post_picture_id_2', 'user_id_1', 90000, 15, 1),
    ('post_picture_id_3', 'user_id_1', 95000, 20, 1),
    ('post_picture_id_4', 'user_id_2', 100000, 8, 1),
    ('post_picture_id_5', 'user_id_2', 86450, 12, 1),
    ('post_picture_id_6', 'user_id_3', 99000, 25, 1),
    ('post_picture_id_7', 'user_id_3', 97500, 30, 1),
    ('post_picture_id_8', 'user_id_4', 100500, 22, 1),
    ('post_picture_id_9', 'user_id_4', 103000, 18, 1),
    ('post_picture_id_10', 'user_id_4', 98500, 28, 1);

INSERT INTO pictures (id, post_id, title, description, image_url) VALUES
    ('picture_id_1', 'post_picture_id_1', 'Picture 1', 'Description for Picture 1', ''),
    ('picture_id_2', 'post_picture_id_2', 'Picture 2', 'Description for Picture 2', ''),
    ('picture_id_3', 'post_picture_id_3', 'Picture 3', 'Description for Picture 3', ''),
    ('picture_id_4', 'post_picture_id_4', 'Picture 4', 'Description for Picture 4', ''),
    ('picture_id_5', 'post_picture_id_5', 'Picture 5', 'Description for Picture 5', ''),
    ('picture_id_6', 'post_picture_id_6', 'Picture 6', 'Description for Picture 6', ''),
    ('picture_id_7', 'post_picture_id_7', 'Picture 7', 'Description for Picture 7', ''),
    ('picture_id_8', 'post_picture_id_8', 'Picture 8', 'Description for Picture 8', ''),
    ('picture_id_9', 'post_picture_id_9', 'Picture 9', 'Description for Picture 9', ''),
    ('picture_id_10', 'post_picture_id_10', 'Picture 10', 'Description for Picture 10', '');

INSERT INTO cookbooks (id, user_id, title, description) VALUES
    ('cookbook_id_1', 'user_id_1', 'Cookbook 1', 'Description for Cookbook 1'),
    ('cookbook_id_2', 'user_id_1', 'Cookbook 2', 'Description for Cookbook 2'),
    ('cookbook_id_3', 'user_id_1', 'Cookbook 3', 'Description for Cookbook 3');

INSERT INTO cookbook_recipes (cookbook_id, recipe_id) VALUES
    ('cookbook_id_1', 'recipe_id_1'),
    ('cookbook_id_1', 'recipe_id_2'),
    ('cookbook_id_2', 'recipe_id_3'),
    ('cookbook_id_2', 'recipe_id_4'),
    ('cookbook_id_3', 'recipe_id_5'),
    ('cookbook_id_3', 'recipe_id_6');

INSERT INTO menus (id, user_id, title, description) VALUES
    ('menu_id_1', 'user_id_1', 'Menu 1', 'Description for Menu 1'),
    ('menu_id_2', 'user_id_1', 'Menu 2', 'Description for Menu 2'),
    ('menu_id_3', 'user_id_1', 'Menu 3', 'Description for Menu 3');

INSERT INTO menu_sections (menu_id, name) VALUES
    ('menu_id_1', 'Section 1 for Menu 1'),
    ('menu_id_1', 'Section 2 for Menu 1'),
    ('menu_id_2', 'Section 1 for Menu 2'),
    ('menu_id_2', 'Section 2 for Menu 2'),
    ('menu_id_3', 'Section 1 for Menu 3'),
    ('menu_id_3', 'Section 2 for Menu 3');

INSERT INTO menu_cookbooks (menu_id, cookbook_id) VALUES
    ('menu_id_1', 'cookbook_id_1'),
    ('menu_id_2', 'cookbook_id_1'),
    ('menu_id_2', 'cookbook_id_2'),
    ('menu_id_3', 'cookbook_id_1'),
    ('menu_id_3', 'cookbook_id_2'),
    ('menu_id_3', 'cookbook_id_3');
