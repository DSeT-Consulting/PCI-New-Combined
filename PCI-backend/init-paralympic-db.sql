-- Paralympic Committee of India Database Initialization
-- This creates the database schema and inserts sample data

-- Create Categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create News table
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    summary TEXT,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category_id INTEGER REFERENCES categories(id),
    featured_image VARCHAR(500),
    status VARCHAR(50) DEFAULT 'published',
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Tags table
CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create News-Tags junction table
CREATE TABLE IF NOT EXISTS news_tags (
    id SERIAL PRIMARY KEY,
    news_id INTEGER REFERENCES news(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    UNIQUE(news_id, tag_id)
);

-- Insert Categories
INSERT INTO categories (name, description) VALUES
('Paralympic Sports', 'News about Paralympic sports and competitions'),
('Athletes', 'News about Paralympic athletes and their achievements'),
('Events', 'Information about Paralympic events and competitions'),
('Training', 'Training programs and facilities for Paralympic athletes'),
('Awards', 'Awards and recognition for Paralympic achievements'),
('Announcements', 'Official announcements from Paralympic Committee of India')
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

-- Insert Sample News Articles
INSERT INTO news (title, content, summary, slug, category_id, featured_image, status) VALUES
(
    'Paralympic Committee of India Announces Training Program for Paris 2024',
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
    'PCI announces comprehensive training program for Paris 2024 Paralympic Games with world-class facilities and expert support.',
    'training-program-paris-2024',
    (SELECT id FROM categories WHERE name = 'Training'),
    '/images/training-program.jpg',
    'published'
),
(
    'Indian Paralympic Athletes Excel in International Championships',
    'Indian Paralympic athletes have made the nation proud with their outstanding performances in recent international championships. Our athletes have secured multiple medals across various sports categories, showcasing the strength and determination of Indian Paralympic sports.

The achievements include:
- Gold medals in shooting and javelin throw
- Silver medals in powerlifting and swimming
- Bronze medals in archery and badminton

These victories are a testament to the hard work and dedication of our athletes, as well as the support provided by the Paralympic Committee of India. The success at international level builds confidence for upcoming Paralympic Games and demonstrates Indias growing prowess in Paralympic sports.

The Paralympic Committee of India congratulates all the medal winners and extends support for their continued excellence in their respective sports.',
    'Indian Paralympic athletes win multiple medals at international championships, showcasing excellence in various sports.',
    'athletes-excel-international-championships',
    (SELECT id FROM categories WHERE name = 'Athletes'),
    '/images/medal-winners.jpg',
    'published'
),
(
    'New Paralympic Training Facility Inaugurated in Delhi',
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
    'New state-of-the-art Paralympic training facility opens in Delhi with modern equipment and comprehensive support services.',
    'new-training-facility-delhi',
    (SELECT id FROM categories WHERE name = 'Events'),
    '/images/facility-inauguration.jpg',
    'published'
),
(
    'Paralympic Committee of India Recognition Awards 2024',
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
    'PCI holds annual Recognition Awards ceremony celebrating achievements in Paralympic sports and honoring contributors.',
    'recognition-awards-2024',
    (SELECT id FROM categories WHERE name = 'Awards'),
    '/images/awards-ceremony.jpg',
    'published'
)
ON CONFLICT (slug) DO NOTHING;

-- Link news articles with tags
INSERT INTO news_tags (news_id, tag_id) VALUES
((SELECT id FROM news WHERE slug = 'training-program-paris-2024'), (SELECT id FROM tags WHERE name = 'Paris 2024')),
((SELECT id FROM news WHERE slug = 'training-program-paris-2024'), (SELECT id FROM tags WHERE name = 'Training')),
((SELECT id FROM news WHERE slug = 'training-program-paris-2024'), (SELECT id FROM tags WHERE name = 'Paralympics')),
((SELECT id FROM news WHERE slug = 'athletes-excel-international-championships'), (SELECT id FROM tags WHERE name = 'Athletes')),
((SELECT id FROM news WHERE slug = 'athletes-excel-international-championships'), (SELECT id FROM tags WHERE name = 'Medal')),
((SELECT id FROM news WHERE slug = 'athletes-excel-international-championships'), (SELECT id FROM tags WHERE name = 'Achievement')),
((SELECT id FROM news WHERE slug = 'new-training-facility-delhi'), (SELECT id FROM tags WHERE name = 'Training')),
((SELECT id FROM news WHERE slug = 'new-training-facility-delhi'), (SELECT id FROM tags WHERE name = 'Sports')),
((SELECT id FROM news WHERE slug = 'recognition-awards-2024'), (SELECT id FROM tags WHERE name = 'Awards')),
((SELECT id FROM news WHERE slug = 'recognition-awards-2024'), (SELECT id FROM tags WHERE name = 'Achievement'))
ON CONFLICT (news_id, tag_id) DO NOTHING;

-- Display summary
SELECT 'Paralympic Committee of India Database Initialized Successfully!' as status;
SELECT COUNT(*) as total_categories FROM categories;
SELECT COUNT(*) as total_news FROM news;
SELECT COUNT(*) as total_tags FROM tags;
