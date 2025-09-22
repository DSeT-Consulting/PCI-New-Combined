-- Paralympic Committee of India Database - Complete Schema
-- This matches the backend schema exactly

-- Create enum for news status
CREATE TYPE news_status AS ENUM ('draft', 'published', 'archived');

-- Create Categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create Tags table
CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create News Classifications table
CREATE TABLE IF NOT EXISTS news_classifications (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    priority INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create News table
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    featured_image VARCHAR(500),
    other_images TEXT[],
    category_id INTEGER NOT NULL REFERENCES categories(id),
    status news_status NOT NULL DEFAULT 'draft',
    view_count INTEGER NOT NULL DEFAULT 0,
    read_time INTEGER,
    meta_description VARCHAR(160),
    meta_keywords VARCHAR(255),
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create News Tags junction table
CREATE TABLE IF NOT EXISTS news_tags (
    id SERIAL PRIMARY KEY,
    news_id INTEGER NOT NULL REFERENCES news(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UNIQUE(news_id, tag_id)
);

-- Create News Classification Assignments junction table
CREATE TABLE IF NOT EXISTS news_classification_assignments (
    id SERIAL PRIMARY KEY,
    news_id INTEGER NOT NULL REFERENCES news(id) ON DELETE CASCADE,
    classification_id INTEGER NOT NULL REFERENCES news_classifications(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UNIQUE(news_id, classification_id)
);

-- Insert Categories
INSERT INTO categories (name, description, is_active) VALUES
('Paralympic Sports', 'News about Paralympic sports and competitions', true),
('Athletes', 'News about Paralympic athletes and their achievements', true),
('Events', 'Information about Paralympic events and competitions', true),
('Training', 'Training programs and facilities for Paralympic athletes', true),
('Awards', 'Awards and recognition for Paralympic achievements', true),
('Announcements', 'Official announcements from Paralympic Committee of India', true)
ON CONFLICT (name) DO NOTHING;

-- Insert Tags
INSERT INTO tags (name) VALUES
('Paralympics'),
('Tokyo 2024'),
('Paris 2024'),
('Training'),
('Medal'),
('Competition'),
('Achievement'),
('Sports'),
('Athlete'),
('India')
ON CONFLICT (name) DO NOTHING;

-- Insert News Classifications
INSERT INTO news_classifications (name, priority, is_active) VALUES
('Featured', 10, true),
('Breaking', 20, true),
('Latest', 5, true),
('Popular', 3, true)
ON CONFLICT (name) DO NOTHING;

-- Insert Sample News Articles
INSERT INTO news (title, slug, excerpt, content, category_id, status, published_at) VALUES
(
    'Paralympic Committee of India Announces Training Program for Paris 2024',
    'training-program-paris-2024',
    'PCI announces comprehensive training program for Paris 2024 Paralympic Games with world-class facilities and expert support.',
    'The Paralympic Committee of India has announced a comprehensive training program for athletes preparing for the Paris 2024 Paralympic Games. The program includes state-of-the-art facilities, expert coaching, and nutritional support for our Paralympic hopefuls.

This initiative represents our commitment to excellence in Paralympic sports and our dedication to supporting athletes in their journey to represent India on the world stage. The training program will be conducted at multiple centers across the country, ensuring accessibility for athletes from all regions.

Key features of the program include:
- World-class coaching staff
- Modern training equipment
- Sports science support
- Medical and physiotherapy services
- Nutritional guidance
- Mental health support

The Paralympic Committee of India continues to work towards creating an environment where our athletes can excel and bring glory to the nation.',
    (SELECT id FROM categories WHERE name = 'Training'),
    'published',
    CURRENT_TIMESTAMP
),
(
    'Indian Paralympic Athletes Excel in International Championships',
    'athletes-excel-international-championships',
    'Indian Paralympic athletes win multiple medals at international championships, showcasing excellence in various sports.',
    'Indian Paralympic athletes have made the nation proud with their outstanding performances in recent international championships. Our athletes have secured multiple medals across various sports categories, showcasing the strength and determination of Indian Paralympic sports.

The achievements include:
- Gold medals in shooting and javelin throw
- Silver medals in powerlifting and swimming
- Bronze medals in archery and badminton

These victories are a testament to the hard work and dedication of our athletes, as well as the support provided by the Paralympic Committee of India. The success at international level builds confidence for upcoming Paralympic Games and demonstrates Indias growing prowess in Paralympic sports.

The Paralympic Committee of India congratulates all the medal winners and extends support for their continued excellence in their respective sports.',
    (SELECT id FROM categories WHERE name = 'Athletes'),
    'published',
    CURRENT_TIMESTAMP - INTERVAL '1 day'
),
(
    'New Paralympic Training Facility Inaugurated in Delhi',
    'new-training-facility-delhi',
    'New state-of-the-art Paralympic training facility opens in Delhi with modern equipment and comprehensive support services.',
    'A state-of-the-art Paralympic training facility was inaugurated in Delhi today, marking a significant milestone in Indias Paralympic sports infrastructure. The facility features modern equipment specifically designed for Paralympic athletes and will serve as a hub for training and development.

The facility includes:
- Specialized training halls for various Paralympic sports
- Swimming pool with accessibility features
- Gymnasium with adaptive equipment
- Medical and rehabilitation center
- Accommodation facilities for athletes
- Research and development wing

This new facility represents the Paralympic Committee of Indias commitment to providing world-class infrastructure for our athletes. The facility will not only serve elite athletes but also help in grassroots development of Paralympic sports across the country.

The inauguration ceremony was attended by prominent Paralympic athletes, officials, and dignitaries who praised the initiative and its potential impact on Indian Paralympic sports.',
    (SELECT id FROM categories WHERE name = 'Events'),
    'published',
    CURRENT_TIMESTAMP - INTERVAL '2 days'
),
(
    'Paralympic Committee of India Recognition Awards 2024',
    'recognition-awards-2024',
    'PCI holds annual Recognition Awards ceremony celebrating achievements in Paralympic sports and honoring contributors.',
    'The Paralympic Committee of India held its annual Recognition Awards ceremony to honor the outstanding achievements of Paralympic athletes, coaches, and support staff. The event celebrated excellence in Paralympic sports and recognized contributions to the development of Paralympic movement in India.

Award Categories:
- Lifetime Achievement Award
- Best Paralympic Athlete (Male/Female)
- Best Coach Award
- Rising Star Award
- Best Support Staff Award
- Excellence in Paralympic Sports Development

The ceremony highlighted the journey of our Paralympic champions and their inspiring stories of overcoming challenges to achieve sporting excellence. The awards serve as motivation for current and future Paralympic athletes.

The Paralympic Committee of India remains committed to recognizing and supporting all stakeholders who contribute to the success of Paralympic sports in the country. These awards reinforce our values of excellence, determination, and inclusivity.',
    (SELECT id FROM categories WHERE name = 'Awards'),
    'published',
    CURRENT_TIMESTAMP - INTERVAL '3 days'
)
ON CONFLICT (slug) DO NOTHING;

-- Link news articles with tags
WITH news_article AS (SELECT id FROM news WHERE slug = 'training-program-paris-2024'),
     tag_paris AS (SELECT id FROM tags WHERE name = 'Paris 2024'),
     tag_training AS (SELECT id FROM tags WHERE name = 'Training'),
     tag_paralympics AS (SELECT id FROM tags WHERE name = 'Paralympics')
INSERT INTO news_tags (news_id, tag_id) 
SELECT news_article.id, tag_paris.id FROM news_article, tag_paris
UNION ALL
SELECT news_article.id, tag_training.id FROM news_article, tag_training
UNION ALL
SELECT news_article.id, tag_paralympics.id FROM news_article, tag_paralympics
ON CONFLICT (news_id, tag_id) DO NOTHING;

WITH news_article AS (SELECT id FROM news WHERE slug = 'athletes-excel-international-championships'),
     tag_athlete AS (SELECT id FROM tags WHERE name = 'Athlete'),
     tag_medal AS (SELECT id FROM tags WHERE name = 'Medal'),
     tag_achievement AS (SELECT id FROM tags WHERE name = 'Achievement')
INSERT INTO news_tags (news_id, tag_id) 
SELECT news_article.id, tag_athlete.id FROM news_article, tag_athlete
UNION ALL
SELECT news_article.id, tag_medal.id FROM news_article, tag_medal
UNION ALL
SELECT news_article.id, tag_achievement.id FROM news_article, tag_achievement
ON CONFLICT (news_id, tag_id) DO NOTHING;

-- Link featured articles with classifications
WITH news_article AS (SELECT id FROM news WHERE slug IN ('training-program-paris-2024', 'athletes-excel-international-championships')),
     classification_featured AS (SELECT id FROM news_classifications WHERE name = 'Featured')
INSERT INTO news_classification_assignments (news_id, classification_id)
SELECT news_article.id, classification_featured.id FROM news_article, classification_featured
ON CONFLICT (news_id, classification_id) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_categories_active ON categories(is_active);
CREATE INDEX IF NOT EXISTS idx_news_status_published ON news(status, published_at);
CREATE INDEX IF NOT EXISTS idx_news_category_status ON news(category_id, status);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON news(published_at);
CREATE INDEX IF NOT EXISTS idx_news_tags_news_id ON news_tags(news_id);
CREATE INDEX IF NOT EXISTS idx_news_tags_tag_id ON news_tags(tag_id);

-- Display summary
SELECT 'Paralympic Committee of India Database Initialized Successfully!' as status;
SELECT COUNT(*) as total_categories FROM categories;
SELECT COUNT(*) as total_news FROM news;
SELECT COUNT(*) as total_tags FROM tags;
SELECT COUNT(*) as total_classifications FROM news_classifications;
SELECT COUNT(*) as total_published_news FROM news WHERE status = 'published';
