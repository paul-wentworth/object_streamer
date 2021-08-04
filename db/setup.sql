-- \c object_streamer;

CREATE TABLE objects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(256) NOT NULL,
    x FLOAT NOT NULL,
    y FLOAT NOT NULL,
    velocity_x FLOAT NOT NULL,
    velocity_y FLOAT NOT NULL,
    last_updated TIMESTAMP NOT NULL,
    properties JSON NOT NULL
);

