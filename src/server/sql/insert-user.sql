INSERT INTO users (
	name,
	email,
	user_id,
	password
) VALUES (
	{{ name }},
	{{ email }},
	{{ userID }},
	{{ password }}
) RETURNING
	{{ columnNames }};