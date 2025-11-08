CREATE TABLE IF NOT EXISTS expenses (
        id SERIAL PRIMARY KEY NOT NULL,
        amount INT NOT NULL,
        user_id INT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_updated_at() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER set_updated_at BEFORE
UPDATE ON expenses FOR EACH ROW EXECUTE PROCEDURE update_updated_at();