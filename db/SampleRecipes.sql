-- Recipe 1
INSERT INTO recipes (recipe_id, name, description, serving_size, cooking_time, image_url, skill_level_id) 
VALUES ('9d4a943a-6ab4-44c3-8c78-1e28f1172d7d', 'Spaghetti Carbonara', 'Classic Italian pasta dish', 2, 20, 'https://images.squarespace-cdn.com/content/v1/5330501fe4b00cf211b72a3c/1635740896347-NS09J5ZO63U1J41NYIJ8/Italian-enough-pasta-carbonara-2.jpeg', 2);

INSERT INTO ingredients (name, recipe_id) 
VALUES ('Spaghetti', '9d4a943a-6ab4-44c3-8c78-1e28f1172d7d'),
       ('Eggs', '9d4a943a-6ab4-44c3-8c78-1e28f1172d7d'),
       ('Parmesan Cheese', '9d4a943a-6ab4-44c3-8c78-1e28f1172d7d'),
       ('Pancetta', '9d4a943a-6ab4-44c3-8c78-1e28f1172d7d');

INSERT INTO instructions (name, recipe_id) 
VALUES ('Boil water and cook spaghetti according to package instructions.', '9d4a943a-6ab4-44c3-8c78-1e28f1172d7d'),
       ('Fry pancetta in a pan until crispy, then set aside.', '9d4a943a-6ab4-44c3-8c78-1e28f1172d7d'),
       ('In a bowl, whisk together eggs and grated Parmesan cheese.', '9d4a943a-6ab4-44c3-8c78-1e28f1172d7d'),
       ('Drain cooked spaghetti and add to the pan with pancetta. Remove from heat.', '9d4a943a-6ab4-44c3-8c78-1e28f1172d7d'),
       ('Pour egg and cheese mixture over spaghetti, tossing quickly to coat. Serve immediately.', '9d4a943a-6ab4-44c3-8c78-1e28f1172d7d');

-- Recipe 2
INSERT INTO recipes (recipe_id, name, description, serving_size, cooking_time, image_url, skill_level_id) 
VALUES ('a2c6a7f5-98e2-4c92-9f1e-84e950b2f08f', 'Chicken Stir-Fry', 'Quick and easy stir-fry with chicken and vegetables', 4, 25, 'https://www.alphafoodie.com/wp-content/uploads/2023/05/Chicken-Stir-Fry-Main-1.jpeg', 2);

INSERT INTO ingredients (name, recipe_id) 
VALUES ('Chicken Breast', 'a2c6a7f5-98e2-4c92-9f1e-84e950b2f08f'),
       ('Bell Pepper', 'a2c6a7f5-98e2-4c92-9f1e-84e950b2f08f'),
       ('Broccoli', 'a2c6a7f5-98e2-4c92-9f1e-84e950b2f08f'),
       ('Soy Sauce', 'a2c6a7f5-98e2-4c92-9f1e-84e950b2f08f');

INSERT INTO instructions (name, recipe_id) 
VALUES ('Slice chicken breast into thin strips.', 'a2c6a7f5-98e2-4c92-9f1e-84e950b2f08f'),
       ('Heat oil in a large pan or wok over high heat.', 'a2c6a7f5-98e2-4c92-9f1e-84e950b2f08f'),
       ('Add chicken and cook until no longer pink. Remove from pan.', 'a2c6a7f5-98e2-4c92-9f1e-84e950b2f08f'),
       ('Stir-fry bell pepper and broccoli until tender-crisp.', 'a2c6a7f5-98e2-4c92-9f1e-84e950b2f08f'),
       ('Return chicken to the pan, add soy sauce, and toss to combine. Serve hot.', 'a2c6a7f5-98e2-4c92-9f1e-84e950b2f08f');

-- Recipe 3
INSERT INTO recipes (recipe_id, name, description, serving_size, cooking_time, image_url, skill_level_id) 
VALUES ('e0e9f078-ec2a-4a2a-a07c-aa4c97e9e128', 'Vegetable Stir-Fry', 'Healthy stir-fry with assorted vegetables', 4, 20, 'https://www.mealgarden.com/media/recipe/2020/10/bigstock-Pad-Pak-Ruam-Or-Veg-Thai-Stir--365228395.jpeg', 1);

INSERT INTO ingredients (name, recipe_id) 
VALUES ('Broccoli', 'e0e9f078-ec2a-4a2a-a07c-aa4c97e9e128'),
       ('Carrots', 'e0e9f078-ec2a-4a2a-a07c-aa4c97e9e128'),
       ('Snap Peas', 'e0e9f078-ec2a-4a2a-a07c-aa4c97e9e128'),
       ('Mushrooms', 'e0e9f078-ec2a-4a2a-a07c-aa4c97e9e128');

INSERT INTO instructions (name, recipe_id) 
VALUES ('Heat oil in a large pan or wok over high heat.', 'e0e9f078-ec2a-4a2a-a07c-aa4c97e9e128'),
       ('Add vegetables and stir-fry until tender-crisp.', 'e0e9f078-ec2a-4a2a-a07c-aa4c97e9e128'),
       ('Season with soy sauce and other desired seasonings.', 'e0e9f078-ec2a-4a2a-a07c-aa4c97e9e128'),
       ('Serve hot over rice or noodles.', 'e0e9f078-ec2a-4a2a-a07c-aa4c97e9e128');

-- Recipe 4
INSERT INTO recipes (recipe_id, name, description, serving_size, cooking_time, image_url, skill_level_id) 
VALUES ('7d9b74d5-d19e-4a57-8210-6be4d65b1652', 'Grilled Salmon with Lemon Butter', 'Delicious grilled salmon with a zesty lemon butter sauce', 2, 15, 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_730,h_913/k%2Farchive%2F7d7b4bc09164d58ab7b68945d989b4817a61cbb4', 2);

INSERT INTO ingredients (name, recipe_id) 
VALUES ('Salmon Fillet', '7d9b74d5-d19e-4a57-8210-6be4d65b1652'),
       ('Lemon', '7d9b74d5-d19e-4a57-8210-6be4d65b1652'),
       ('Butter', '7d9b74d5-d19e-4a57-8210-6be4d65b1652'),
       ('Dill', '7d9b74d5-d19e-4a57-8210-6be4d65b1652');

INSERT INTO instructions (name, recipe_id) 
VALUES ('Preheat grill to medium-high heat.', '7d9b74d5-d19e-4a57-8210-6be4d65b1652'),
       ('Season salmon fillet with salt, pepper, and dill.', '7d9b74d5-d19e-4a57-8210-6be4d65b1652'),
       ('Grill salmon for 4-5 minutes per side, or until cooked through.', '7d9b74d5-d19e-4a57-8210-6be4d65b1652'),
       ('In a small saucepan, melt butter and stir in lemon juice.', '7d9b74d5-d19e-4a57-8210-6be4d65b1652'),
       ('Pour lemon butter sauce over grilled salmon and serve.', '7d9b74d5-d19e-4a57-8210-6be4d65b1652');

-- Recipe 5
INSERT INTO recipes (recipe_id, name, description, serving_size, cooking_time, image_url, skill_level_id) 
VALUES ('3f7a7bc0-13c2-4b80-b349-0ea2bbd1db7b', 'Caprese Salad', 'Simple and refreshing Italian salad', 2, 10, 'https://allourway.com/wp-content/uploads/2021/06/Caprese-Salad-10.png', 1);

INSERT INTO ingredients (name, recipe_id) 
VALUES ('Tomatoes', '3f7a7bc0-13c2-4b80-b349-0ea2bbd1db7b'),
       ('Fresh Mozzarella', '3f7a7bc0-13c2-4b80-b349-0ea2bbd1db7b'),
       ('Fresh Basil Leaves', '3f7a7bc0-13c2-4b80-b349-0ea2bbd1db7b'),
       ('Balsamic Glaze', '3f7a7bc0-13c2-4b80-b349-0ea2bbd1db7b');

INSERT INTO instructions (name, recipe_id) 
VALUES ('Slice tomatoes and mozzarella into rounds.', '3f7a7bc0-13c2-4b80-b349-0ea2bbd1db7b'),
       ('Arrange tomato, mozzarella, and basil leaves on a plate.', '3f7a7bc0-13c2-4b80-b349-0ea2bbd1db7b'),
       ('Drizzle with balsamic glaze.', '3f7a7bc0-13c2-4b80-b349-0ea2bbd1db7b'),
       ('Season with salt and pepper to taste.', '3f7a7bc0-13c2-4b80-b349-0ea2bbd1db7b');

-- Recipe 6
INSERT INTO recipes (recipe_id, name, description, serving_size, cooking_time, image_url, skill_level_id) 
VALUES ('f171b1dd-2c5d-426f-bf9f-1882f34c5e5b', 'Mushroom Risotto', 'Creamy Italian rice dish with mushrooms', 4, 30, 'https://www.alphafoodie.com/wp-content/uploads/2022/06/mushroom-risotto-Main1.jpeg', 2);

INSERT INTO ingredients (name, recipe_id) 
VALUES ('Arborio Rice', 'f171b1dd-2c5d-426f-bf9f-1882f34c5e5b'),
       ('Mushrooms', 'f171b1dd-2c5d-426f-bf9f-1882f34c5e5b'),
       ('Onion', 'f171b1dd-2c5d-426f-bf9f-1882f34c5e5b'),
       ('Parmesan Cheese', 'f171b1dd-2c5d-426f-bf9f-1882f34c5e5b');

INSERT INTO instructions (name, recipe_id) 
VALUES ('Sauté chopped onions and mushrooms in butter until tender.', 'f171b1dd-2c5d-426f-bf9f-1882f34c5e5b'),
       ('Add arborio rice and cook for 2 minutes.', 'f171b1dd-2c5d-426f-bf9f-1882f34c5e5b'),
       ('Gradually add chicken or vegetable broth, stirring constantly, until absorbed.', 'f171b1dd-2c5d-426f-bf9f-1882f34c5e5b'),
       ('Continue adding broth and stirring until rice is creamy and cooked.', 'f171b1dd-2c5d-426f-bf9f-1882f34c5e5b'),
       ('Stir in grated Parmesan cheese. Serve hot.', 'f171b1dd-2c5d-426f-bf9f-1882f34c5e5b');

-- Recipe 7
INSERT INTO recipes (recipe_id, name, description, serving_size, cooking_time, image_url, skill_level_id) 
VALUES ('32c2041b-40d5-4c35-9dbd-72e2d5f208b3', 'Garlic Butter Shrimp Pasta', 'Creamy pasta with succulent garlic butter shrimp', 4, 25, 'https://cravingtasty.com/wp-content/uploads/2019/12/Garlic-butter-shrimp-pasta-1.jpg', 2);

INSERT INTO ingredients (name, recipe_id) 
VALUES ('Shrimp', '32c2041b-40d5-4c35-9dbd-72e2d5f208b3'),
       ('Pasta', '32c2041b-40d5-4c35-9dbd-72e2d5f208b3'),
       ('Butter', '32c2041b-40d5-4c35-9dbd-72e2d5f208b3'),
       ('Garlic', '32c2041b-40d5-4c35-9dbd-72e2d5f208b3');

INSERT INTO instructions (name, recipe_id) 
VALUES ('Cook pasta according to package instructions.', '32c2041b-40d5-4c35-9dbd-72e2d5f208b3'),
       ('In a large pan, melt butter and sauté minced garlic until fragrant.', '32c2041b-40d5-4c35-9dbd-72e2d5f208b3'),
       ('Add shrimp and cook until pink and cooked through.', '32c2041b-40d5-4c35-9dbd-72e2d5f208b3'),
       ('Toss cooked pasta with garlic butter shrimp. Serve hot.', '32c2041b-40d5-4c35-9dbd-72e2d5f208b3');

-- Recipe 8
INSERT INTO recipes (recipe_id, name, description, serving_size, cooking_time, image_url, skill_level_id) 
VALUES ('865d2e3e-34a2-4c42-ae3f-0c2e0a929611', 'Greek Salad', 'Healthy salad with fresh vegetables and feta cheese', 2, 15, 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/10/7/0/FNK_Greek-Salad_s4x3.jpg.rend.hgtvcom.826.620.suffix/1383814482359.jpeg', 1);

INSERT INTO ingredients (name, recipe_id) 
VALUES ('Cucumber', '865d2e3e-34a2-4c42-ae3f-0c2e0a929611'),
       ('Tomatoes', '865d2e3e-34a2-4c42-ae3f-0c2e0a929611'),
       ('Red Onion', '865d2e3e-34a2-4c42-ae3f-0c2e0a929611'),
       ('Feta Cheese', '865d2e3e-34a2-4c42-ae3f-0c2e0a929611');

INSERT INTO instructions (name, recipe_id) 
VALUES ('Chop cucumber, tomatoes, and red onion.', '865d2e3e-34a2-4c42-ae3f-0c2e0a929611'),
       ('Combine in a bowl with crumbled feta cheese.', '865d2e3e-34a2-4c42-ae3f-0c2e0a929611'),
       ('Drizzle with olive oil and sprinkle with oregano.', '865d2e3e-34a2-4c42-ae3f-0c2e0a929611'),
       ('Season with salt and pepper to taste.', '865d2e3e-34a2-4c42-ae3f-0c2e0a929611');

-- Recipe 9
INSERT INTO recipes (recipe_id, name, description, serving_size, cooking_time, image_url, skill_level_id) 
VALUES ('b53ef7d2-d49b-4ee5-9c42-fd96e1d13346', 'Beef Tacos', 'Classic Mexican tacos with seasoned beef', 4, 30, 'https://img.taste.com.au/Vr7AOXkR/w643-h428-cfill-q90/taste/2016/11/beef-tacos-98153-1.jpeg', 2);

INSERT INTO ingredients (name, recipe_id) 
VALUES ('Ground Beef', 'b53ef7d2-d49b-4ee5-9c42-fd96e1d13346'),
       ('Taco Shells', 'b53ef7d2-d49b-4ee5-9c42-fd96e1d13346'),
       ('Lettuce', 'b53ef7d2-d49b-4ee5-9c42-fd96e1d13346'),
       ('Tomato', 'b53ef7d2-d49b-4ee5-9c42-fd96e1d13346');

INSERT INTO instructions (name, recipe_id) 
VALUES ('Brown ground beef in a skillet over medium heat.', 'b53ef7d2-d49b-4ee5-9c42-fd96e1d13346'),
       ('Add taco seasoning and water. Simmer until thickened.', 'b53ef7d2-d49b-4ee5-9c42-fd96e1d13346'),
       ('Warm taco shells in the oven.', 'b53ef7d2-d49b-4ee5-9c42-fd96e1d13346'),
       ('Assemble tacos with beef, lettuce, and diced tomatoes.', 'b53ef7d2-d49b-4ee5-9c42-fd96e1d13346');

-- Recipe 10
INSERT INTO recipes (recipe_id, name, description, serving_size, cooking_time, image_url, skill_level_id) 
VALUES ('4a4c5f85-6b04-478a-bd7c-63b3f6796c2a', 'Spinach and Feta Stuffed Chicken', 'Tender chicken breasts stuffed with spinach and feta', 2, 35, 'https://www.eatingwell.com/thmb/GWkEHXd_JdXDGqQyKK01yO7s5Ek=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/1501p130-spinach-feta-stuffed-chicken-breasts-8030825-66b09a00be4340c6a6af32fda656319c.jpg', 3);

INSERT INTO ingredients (name, recipe_id) 
VALUES ('Chicken Breasts', '4a4c5f85-6b04-478a-bd7c-63b3f6796c2a'),
       ('Spinach', '4a4c5f85-6b04-478a-bd7c-63b3f6796c2a'),
       ('Feta Cheese', '4a4c5f85-6b04-478a-bd7c-63b3f6796c2a'),
       ('Olive Oil', '4a4c5f85-6b04-478a-bd7c-63b3f6796c2a');

INSERT INTO instructions (name, recipe_id) 
VALUES ('Preheat oven to 375°F (190°C).', '4a4c5f85-6b04-478a-bd7c-63b3f6796c2a'),
       ('Butterfly chicken breasts and stuff with spinach and crumbled feta.', '4a4c5f85-6b04-478a-bd7c-63b3f6796c2a'),
       ('Secure with toothpicks and brush with olive oil.', '4a4c5f85-6b04-478a-bd7c-63b3f6796c2a'),
       ('Bake for 25-30 minutes, or until chicken is cooked through.', '4a4c5f85-6b04-478a-bd7c-63b3f6796c2a');

-- Recipe 11
INSERT INTO recipes (recipe_id, name, description, serving_size, cooking_time, image_url, skill_level_id) 
VALUES ('9e2e2e3b-54b6-49ca-9f19-4d2373cb12a5', 'Tomato Basil Pasta', 'Simple pasta dish with fresh tomato and basil sauce', 4, 20, 'https://www.allrecipes.com/thmb/NWy0rPQhVIGNc1uf_MO2YOmDWQ8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/23265-Tomato-Basil-Pasta-DDMFS-4x3-7728a390ea3b4e2db7a4e7347cd96e78.jpg', 1);

INSERT INTO ingredients (name, recipe_id) 
VALUES ('Pasta', '9e2e2e3b-54b6-49ca-9f19-4d2373cb12a5'),
       ('Tomatoes', '9e2e2e3b-54b6-49ca-9f19-4d2373cb12a5'),
       ('Fresh Basil', '9e2e2e3b-54b6-49ca-9f19-4d2373cb12a5'),
       ('Garlic', '9e2e2e3b-54b6-49ca-9f19-4d2373cb12a5');

INSERT INTO instructions (name, recipe_id) 
VALUES ('Cook pasta according to package instructions.', '9e2e2e3b-54b6-49ca-9f19-4d2373cb12a5'),
       ('In a pan, sauté minced garlic in olive oil until fragrant.', '9e2e2e3b-54b6-49ca-9f19-4d2373cb12a5'),
       ('Add chopped tomatoes and cook until softened.', '9e2e2e3b-54b6-49ca-9f19-4d2373cb12a5'),
       ('Toss cooked pasta with tomato mixture and fresh basil. Serve hot.', '9e2e2e3b-54b6-49ca-9f19-4d2373cb12a5');

-- Recipe 12
INSERT INTO recipes (recipe_id, name, description, serving_size, cooking_time, image_url, skill_level_id) 
VALUES ('d0d620b6-9ef5-4eb5-93b5-1ec9460e430d', 'Crispy Baked Chicken Tenders', 'Golden and crunchy chicken tenders baked to perfection', 4, 30, 'https://recipes.net/wp-content/uploads/portal_files/recipes_net_posts/2021-08/crispy-baked-chicken-tenders-recipe.png', 2);

INSERT INTO ingredients (name, recipe_id) 
VALUES ('Chicken Tenders', 'd0d620b6-9ef5-4eb5-93b5-1ec9460e430d'),
       ('Bread Crumbs', 'd0d620b6-9ef5-4eb5-93b5-1ec9460e430d'),
       ('Egg', 'd0d620b6-9ef5-4eb5-93b5-1ec9460e430d'),
       ('Flour', 'd0d620b6-9ef5-4eb5-93b5-1ec9460e430d');

INSERT INTO instructions (name, recipe_id) 
VALUES ('Preheat oven to 400°F (200°C).', 'd0d620b6-9ef5-4eb5-93b5-1ec9460e430d'),
       ('Dip chicken tenders in flour, then egg, and coat with breadcrumbs.', 'd0d620b6-9ef5-4eb5-93b5-1ec9460e430d'),
       ('Place on a baking sheet and bake for 20-25 minutes, or until golden and cooked through.', 'd0d620b6-9ef5-4eb5-93b5-1ec9460e430d');

-- Recipe 13
INSERT INTO recipes (recipe_id, name, description, serving_size, cooking_time, image_url, skill_level_id) 
VALUES ('7a69c3bf-791a-44bf-80c5-f9df22bfc083', 'Vegetarian Curry', 'Flavorful and aromatic curry with mixed vegetables', 4, 35, 'https://greenbowl2soul.com/wp-content/uploads/2021/06/Indian-vegetable-curry_2.jpg', 2);

INSERT INTO ingredients (name, recipe_id) 
VALUES ('Potatoes', '7a69c3bf-791a-44bf-80c5-f9df22bfc083'),
       ('Carrots', '7a69c3bf-791a-44bf-80c5-f9df22bfc083'),
       ('Bell Pepper', '7a69c3bf-791a-44bf-80c5-f9df22bfc083'),
       ('Coconut Milk', '7a69c3bf-791a-44bf-80c5-f9df22bfc083');

INSERT INTO instructions (name, recipe_id) 
VALUES ('Peel and chop potatoes and carrots.', '7a69c3bf-791a-44bf-80c5-f9df22bfc083'),
       ('In a large pot, combine vegetables, coconut milk, and curry spices.', '7a69c3bf-791a-44bf-80c5-f9df22bfc083'),
       ('Simmer until vegetables are tender.', '7a69c3bf-791a-44bf-80c5-f9df22bfc083'),
       ('Serve over rice or with naan bread.', '7a69c3bf-791a-44bf-80c5-f9df22bfc083');

-- Recipe 14
INSERT INTO recipes (recipe_id, name, description, serving_size, cooking_time, image_url, skill_level_id) 
VALUES ('fce36094-8b06-45d2-a7ad-7d15c38a14a7', 'BBQ Pulled Pork Sandwiches', 'Tender pulled pork smothered in barbecue sauce', 4, 8*60, 'https://www.thespruceeats.com/thmb/UE1PVPqxZOBlp-P5g1f-3PLsgxQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/pulled-pork-and-slaw-on-plate-18-56a8b9625f9b58b7d0f49e73.jpg', 2);

INSERT INTO ingredients (name, recipe_id) 
VALUES ('Pork Shoulder', 'fce36094-8b06-45d2-a7ad-7d15c38a14a7'),
       ('BBQ Sauce', 'fce36094-8b06-45d2-a7ad-7d15c38a14a7'),
       ('Buns', 'fce36094-8b06-45d2-a7ad-7d15c38a14a7'),
       ('Coleslaw', 'fce36094-8b06-45d2-a7ad-7d15c38a14a7');

INSERT INTO instructions (name, recipe_id) 
VALUES ('Rub pork shoulder with your choice of seasoning and slow cook for 8 hours.', 'fce36094-8b06-45d2-a7ad-7d15c38a14a7'),
       ('Shred pork and mix with barbecue sauce.', 'fce36094-8b06-45d2-a7ad-7d15c38a14a7'),
       ('Serve on buns with coleslaw.', 'fce36094-8b06-45d2-a7ad-7d15c38a14a7');


-- Recipe 15
INSERT INTO recipes (recipe_id, name, description, serving_size, cooking_time, image_url, skill_level_id) 
VALUES ('29838f90-89a7-4de7-9f72-97c45a9b97f8', 'Caesar Salad', 'Classic salad with crisp romaine lettuce and Caesar dressing', 2, 10, 'https://natashaskitchen.com/wp-content/uploads/2019/01/Caesar-Salad-Recipe-3.jpg', 1);

INSERT INTO ingredients (name, recipe_id) 
VALUES ('Romaine Lettuce', '29838f90-89a7-4de7-9f72-97c45a9b97f8'),
       ('Croutons', '29838f90-89a7-4de7-9f72-97c45a9b97f8'),
       ('Parmesan Cheese', '29838f90-89a7-4de7-9f72-97c45a9b97f8'),
       ('Caesar Dressing', '29838f90-89a7-4de7-9f72-97c45a9b97f8');

INSERT INTO instructions (name, recipe_id) 
VALUES ('Tear lettuce into bite-sized pieces and place in a bowl.', '29838f90-89a7-4de7-9f72-97c45a9b97f8'),
       ('Add croutons and grated Parmesan cheese.', '29838f90-89a7-4de7-9f72-97c45a9b97f8'),
       ('Drizzle with Caesar dressing and toss to coat.', '29838f90-89a7-4de7-9f72-97c45a9b97f8');

-- Recipe 16
INSERT INTO recipes (recipe_id, name, description, serving_size, cooking_time, image_url, skill_level_id) 
VALUES ('6db5d2f4-ebff-4c36-b8f1-205b24e8f885', 'Lemon Garlic Roast Chicken', 'Juicy roast chicken with zesty lemon and garlic flavors', 4, 120, 'https://healthyfitnessmeals.com/wp-content/uploads/2020/09/LEMON-AND-GARLIC-CHICKEN-ROAST_-4-819x1024.jpg', 3);

INSERT INTO ingredients (name, recipe_id) 
VALUES ('Whole Chicken', '6db5d2f4-ebff-4c36-b8f1-205b24e8f885'),
       ('Lemon', '6db5d2f4-ebff-4c36-b8f1-205b24e8f885'),
       ('Garlic', '6db5d2f4-ebff-4c36-b8f1-205b24e8f885'),
       ('Rosemary', '6db5d2f4-ebff-4c36-b8f1-205b24e8f885');

INSERT INTO instructions (name, recipe_id) 
VALUES ('Preheat oven to 350°F (175°C).', '6db5d2f4-ebff-4c36-b8f1-205b24e8f885'),
       ('Rub chicken with minced garlic, lemon zest, and rosemary.', '6db5d2f4-ebff-4c36-b8f1-205b24e8f885'),
       ('Place lemon halves and garlic cloves inside the cavity.', '6db5d2f4-ebff-4c36-b8f1-205b24e8f885'),
       ('Roast for 1 hour and 30 minutes, or until juices run clear.', '6db5d2f4-ebff-4c36-b8f1-205b24e8f885');


-- Recipe 17
INSERT INTO recipes (recipe_id, name, description, serving_size, cooking_time, image_url, skill_level_id) 
VALUES ('a909b12f-4bce-4fe1-89f4-0d1f3d70e758', 'Pancakes with Maple Syrup', 'Fluffy pancakes drizzled with sweet maple syrup', 4, 25, 'https://images.squarespace-cdn.com/content/v1/5ed666a6924cd0017d343b01/1592794990088-WWZQRHQCABICSZUM9SK7/bite-me-more-brown-sugar-pancakes-recipe.jpg?format=1000w', 1);

INSERT INTO ingredients (name, recipe_id) 
VALUES ('Flour', 'a909b12f-4bce-4fe1-89f4-0d1f3d70e758'),
       ('Eggs', 'a909b12f-4bce-4fe1-89f4-0d1f3d70e758'),
       ('Milk', 'a909b12f-4bce-4fe1-89f4-0d1f3d70e758'),
       ('Maple Syrup', 'a909b12f-4bce-4fe1-89f4-0d1f3d70e758');

INSERT INTO instructions (name, recipe_id) 
VALUES ('In a bowl, whisk together flour, eggs, and milk until smooth.', 'a909b12f-4bce-4fe1-89f4-0d1f3d70e758'),
       ('Heat a griddle or skillet over medium heat and grease lightly.', 'a909b12f-4bce-4fe1-89f4-0d1f3d70e758'),
       ('Pour batter onto griddle, flip when bubbles form, and cook until golden.', 'a909b12f-4bce-4fe1-89f4-0d1f3d70e758'),
       ('Serve with a generous drizzle of maple syrup.', 'a909b12f-4bce-4fe1-89f4-0d1f3d70e758');

-- Recipe 18
INSERT INTO recipes (recipe_id, name, description, serving_size, cooking_time, image_url, skill_level_id) 
VALUES ('cedb79d7-032f-4e7d-b3f4-7f07c7d8c10b', 'Vegetable and Chickpea Curry', 'Hearty curry with chickpeas and a medley of vegetables', 4, 40, 'https://www.killingthyme.net/wp-content/uploads/2018/11/Vegetarian-Chickpea-Curry-2-949x1600.jpg', 2);

INSERT INTO ingredients (name, recipe_id) 
VALUES ('Chickpeas', 'cedb79d7-032f-4e7d-b3f4-7f07c7d8c10b'),
       ('Tomatoes', 'cedb79d7-032f-4e7d-b3f4-7f07c7d8c10b'),
       ('Bell Pepper', 'cedb79d7-032f-4e7d-b3f4-7f07c7d8c10b'),
       ('Spinach', 'cedb79d7-032f-4e7d-b3f4-7f07c7d8c10b');

INSERT INTO instructions (name, recipe_id) 
VALUES ('In a large pot, combine chickpeas, chopped tomatoes, and chopped bell pepper.', 'cedb79d7-032f-4e7d-b3f4-7f07c7d8c10b'),
       ('Simmer until vegetables are tender and flavors meld.', 'cedb79d7-032f-4e7d-b3f4-7f07c7d8c10b'),
       ('Stir in fresh spinach until wilted.', 'cedb79d7-032f-4e7d-b3f4-7f07c7d8c10b'),
       ('Serve over rice or with naan bread.', 'cedb79d7-032f-4e7d-b3f4-7f07c7d8c10b');

-- Recipe 19
INSERT INTO recipes (recipe_id, name, description, serving_size, cooking_time, image_url, skill_level_id) 
VALUES ('3a02c768-98a0-4729-a123-61e8d200e58d', 'Homemade Pizza', 'Customize your own pizza with fresh ingredients', 4, 30, 'https://www.simplyrecipes.com/thmb/CWzxvl8dpC_zkjjRqEE6fBCS6DQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1c-c2b1885d27d4481c9cfe6f6286a64342.jpg', 2);

INSERT INTO ingredients (name, recipe_id) 
VALUES ('Pizza Dough', '3a02c768-98a0-4729-a123-61e8d200e58d'),
       ('Tomato Sauce', '3a02c768-98a0-4729-a123-61e8d200e58d'),
       ('Mozzarella Cheese', '3a02c768-98a0-4729-a123-61e8d200e58d'),
       ('Pepperoni', '3a02c768-98a0-4729-a123-61e8d200e58d');

INSERT INTO instructions (name, recipe_id) 
VALUES ('Roll out pizza dough and spread with tomato sauce.', '3a02c768-98a0-4729-a123-61e8d200e58d'),
       ('Cover with shredded mozzarella cheese and add desired toppings.', '3a02c768-98a0-4729-a123-61e8d200e58d'),
       ('Bake in a preheated oven at 475°F (245°C) for about 12-15 minutes, or until crust is golden.', '3a02c768-98a0-4729-a123-61e8d200e58d');

-- Recipe 20
INSERT INTO recipes (recipe_id, name, description, serving_size, cooking_time, image_url, skill_level_id) 
VALUES ('b6ef2f97-2ee3-4b79-93c5-18b8f92854e2', 'Avocado Toast', 'Simple and nutritious breakfast or snack', 2, 10, 'https://www.eatingwell.com/thmb/YwNw19g19tS31P21KvIBFo1mVFk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/1807w-avocado-toast-recipe-8029771-2000-aefaa92c11e74e80b0bfc15788a61465.jpg', 1);

INSERT INTO ingredients (name, recipe_id) 
VALUES ('Bread', 'b6ef2f97-2ee3-4b79-93c5-18b8f92854e2'),
       ('Avocado', 'b6ef2f97-2ee3-4b79-93c5-18b8f92854e2'),
       ('Cherry Tomatoes', 'b6ef2f97-2ee3-4b79-93c5-18b8f92854e2'),
       ('Red Pepper Flakes', 'b6ef2f97-2ee3-4b79-93c5-18b8f92854e2');

INSERT INTO instructions (name, recipe_id) 
VALUES ('Toast bread until golden and crispy.', 'b6ef2f97-2ee3-4b79-93c5-18b8f92854e2'),
       ('Mash avocado and spread it on the toast.', 'b6ef2f97-2ee3-4b79-93c5-18b8f92854e2'),
       ('Top with sliced cherry tomatoes and a sprinkle of red pepper flakes.', 'b6ef2f97-2ee3-4b79-93c5-18b8f92854e2');
