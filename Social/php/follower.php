INSERT INTO followers (follower_id, following_id) VALUES (2021, 2020);
-- Get followers for user 2020
SELECT * FROM followers WHERE following_id = 2020;

-- Get users that user 2020 is following
SELECT * FROM followers WHERE follower_id = 2020;
