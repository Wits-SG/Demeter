-- TEST USERS
INSERT INTO users (id, pronoun_id, username, display_name, biography, image_url) VALUES
    ("aaaaaaaaaaaaaaa", 1, "username1", "User 1", "", ""),
    ("bbbbbbbbbbbbbbb", 2, "username2", "User 2", "", ""),
    ("ccccccccccccccc", 3, "username3", "User 3", "", ""),
    ("ddddddddddddddd", 4, "username4", "User 4", "", "");

-- Password for all accounts is "1234567890"
INSERT INTO user_key (id, user_id, hashed_password) VALUES
    ("username:username1", "aaaaaaaaaaaaaaa", "s2:vgg8bxajlmqr6s3w:e078a14e656b9de8e25d4a6fd39e895ca5d58a989ee42b993e924f7baa41b7c5435f47067a53aa9d85432bf6bda099b5bed6697ade6d5c10f382e32fec6f751d"),
    ("username:username2", "bbbbbbbbbbbbbbb", "s2:vgg8bxajlmqr6s3w:e078a14e656b9de8e25d4a6fd39e895ca5d58a989ee42b993e924f7baa41b7c5435f47067a53aa9d85432bf6bda099b5bed6697ade6d5c10f382e32fec6f751d"),
    ("username:username3", "ccccccccccccccc", "s2:vgg8bxajlmqr6s3w:e078a14e656b9de8e25d4a6fd39e895ca5d58a989ee42b993e924f7baa41b7c5435f47067a53aa9d85432bf6bda099b5bed6697ade6d5c10f382e32fec6f751d"),
    ("username:username4", "ddddddddddddddd", "s2:vgg8bxajlmqr6s3w:e078a14e656b9de8e25d4a6fd39e895ca5d58a989ee42b993e924f7baa41b7c5435f47067a53aa9d85432bf6bda099b5bed6697ade6d5c10f382e32fec6f751d");
