-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user_profiles table
CREATE TABLE user_profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('guest', 'staff', 'admin', 'owner')) DEFAULT 'guest',
    property_access TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create guest_tokens table for property access
CREATE TABLE guest_tokens (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    token TEXT UNIQUE NOT NULL,
    property_slug TEXT NOT NULL,
    guest_email TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    booking_reference TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

-- Create property_access table for granular permissions
CREATE TABLE property_access (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    property_slug TEXT NOT NULL,
    access_level TEXT NOT NULL CHECK (access_level IN ('read', 'write', 'admin')) DEFAULT 'read',
    granted_by UUID REFERENCES auth.users(id) NOT NULL,
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, property_slug)
);

-- Create indexes for performance
CREATE INDEX idx_user_profiles_email ON user_profiles(email);
CREATE INDEX idx_user_profiles_role ON user_profiles(role);
CREATE INDEX idx_guest_tokens_token ON guest_tokens(token);
CREATE INDEX idx_guest_tokens_property_slug ON guest_tokens(property_slug);
CREATE INDEX idx_guest_tokens_expires_at ON guest_tokens(expires_at);
CREATE INDEX idx_property_access_user_property ON property_access(user_id, property_slug);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_access ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view their own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for guest_tokens (admin only)
CREATE POLICY "Admins can manage guest tokens" ON guest_tokens
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'owner')
        )
    );

-- RLS Policies for property_access
CREATE POLICY "Users can view their own property access" ON property_access
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage property access" ON property_access
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'owner')
        )
    );

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, role)
    VALUES (NEW.id, NEW.email, 'guest');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on user_profiles
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate guest access token
CREATE OR REPLACE FUNCTION generate_guest_token(
    property_slug_param TEXT,
    guest_email_param TEXT,
    days_valid INTEGER DEFAULT 30,
    booking_ref TEXT DEFAULT NULL
)
RETURNS TEXT AS $$
DECLARE
    new_token TEXT;
    token_exists BOOLEAN;
BEGIN
    -- Generate unique token
    LOOP
        new_token := encode(gen_random_bytes(32), 'base64url');
        SELECT EXISTS(SELECT 1 FROM guest_tokens WHERE token = new_token) INTO token_exists;
        EXIT WHEN NOT token_exists;
    END LOOP;
    
    -- Insert new token
    INSERT INTO guest_tokens (
        token, 
        property_slug, 
        guest_email, 
        expires_at, 
        booking_reference
    )
    VALUES (
        new_token, 
        property_slug_param, 
        guest_email_param, 
        NOW() + INTERVAL '1 day' * days_valid,
        booking_ref
    );
    
    RETURN new_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;