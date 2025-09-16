import Image from "next/image";
import { type PropsWithChildren } from "react";
import { type NewsItemComplete } from "./types";

function NewsImage({ src, alt }: { src: string; alt: string }) {
    return (
        <div className="news-image mx-auto w-full max-w-[600px] my-6">
            <Image
                src={src}
                alt={alt}
                width="800"
                height="600"
                className="w-full h-auto object-cover rounded-2xl"
            />
        </div>
    );
}

/**
 * Wrap any single image or a series of images.
 * Automatically inserts a visual "break" above and below the block.
 */
export function ImagesGroup({ children }: PropsWithChildren) {
    return (
        <>
            <br />
            <div className="space-y-6">{children}</div>
            <br />
        </>
    );
}

export const NEWS_ARTICLES: NewsItemComplete[] = [
    {
        id: "honoured-visit-by-shri-prasad-mahaanakar-ji-to-pci-headquarters",
        title: "Honoured Visit by Shri Prasad Mahaanakar Ji to PCI Headquarters",
        slug: "honoured-visit-by-shri-prasad-mahaanakar-ji-to-pci-headquarters",
        date: "2025-07-24",
        category: "Para Sports",
        author: "PCI",
        authorImage: "/assets/logo-square.png",
        tags: [
            "Prasad Mahaanakar",
            "PCI",
            "Akhil Bharatiya Kreeda Bharati",
            "World Championships 2025",
            "Para Sports",
            "India",
            "South Asia Para Sports Federation",
            "Satya Babu"
        ],
        imageUrl: "/assets/news/Prasad-Mahaanakar-PCI-Meet-1.png",
        excerpt: "Shri Prasad Mahaanakar ji visited the PCI Headquarters for a strategic discussion on the 2025 World Championships, event planning, athlete development, and India’s growing impact in global para-sports.",
        content: (
            <>
                <p className="mb-4">
                    Honoured to welcome <strong>Shri Prasad Mahaanakar ji</strong>, Sangathan Mantri of Akhil Bharatiya Kreeda Bharati, to the Paralympic Committee of India office in New Delhi. 🙏 <br />
                    He was invited for a briefing and update on the upcoming <strong>World Championships 2025</strong> and other major national and international events.
                </p>

                <ImagesGroup>
                    <NewsImage src="/assets/news/Prasad-Mahaanakar-PCI-Meet-2.png" alt="Prasad Mahaanakar meeting at PCI" />
                </ImagesGroup>

                <p className="mb-4">
                    An engaging and interactive session was held with the President and Director, PCI, focusing on event planning, athlete development, and India’s growing impact in global para-sports. 🇮🇳🏅
                </p>

                <ImagesGroup>
                    <NewsImage src="/assets/news/Prasad-Mahaanakar-PCI-Meet-3.png" alt="Interactive session with PCI leadership" />
                    <NewsImage src="/assets/news/Prasad-Mahaanakar-PCI-Meet-4.png" alt="PCI leadership meeting" />
                </ImagesGroup>

                <p className="mb-4">
                    During the visit, Shri Prasad Mahaanakar ji also extended his heartfelt congratulations to Director PCI, Shri Satya Babu ji, on being elected as the{" "}
                    <strong>First President of the South Asia Para Sports Federation</strong> – a proud and historic moment for Indian para-sports. 🌍👏
                </p>

                <ImagesGroup>
                    <NewsImage src="/assets/news/Prasad-Mahaanakar-PCI-Meet-5.png" alt="Shri Satya Babu congratulated" />
                    <NewsImage src="/assets/news/Prasad-Mahaanakar-PCI-Meet-6.png" alt="PCI visit group photo" />
                </ImagesGroup>
            </>
        ),
        isBreaking: false,
        isFeatured: true
    },
    {
        id: "south-asia-unites-for-para-sports-excellence-formation-of-sapsf",
        title: "South Asia Unites for Para Sports Excellence: Formation of SAPSF Marks New Era of Inclusion and Collaboration",
        slug: "south-asia-unites-for-para-sports-excellence-formation-of-sapsf",
        date: "2025-07-14",
        category: "Para Sports",
        author: "PCI",
        authorImage: "/assets/logo-square.png",
        tags: [
            "SAPSF",
            "Satya Babu",
            "Ahmed Mohamed",
            "Jaywant Gundu Hammannavar",
            "Thushan Ralalage",
            "Om Nath Shiwakoti",
            "Deepa Malik",
            "Manish Rana",
            "Chencho",
            "South Asian Para Games",
            "India",
            "Sri Lanka",
            "Nepal",
            "Bhutan",
            "Maldives"
        ],
        imageUrl: "/assets/news/South-Asia-Para-Olympics-Meet.png",
        excerpt: "South Asian nations unite with the formation of the South Asian Para Sports Federation (SAPSF), marking a historic step for regional collaboration, athlete development, and the launch of the South Asian Para Games.",
        content: (
            <>
                <p className="mb-4">
                    Paralympic Committee of India Director <strong>K.R. Satyanarayan (Satya Babu)</strong> elected as President, South Asian Para Sports Federation; Maldives’ <strong>Ahmed Mohamed</strong> named Secretary General.
                </p>

                <p className="mb-4">
                    • India’s <strong>Jaywant Gundu Hammannavar</strong> appointed Treasurer, Sri Lanka’s <strong>Thushan Ralalage</strong> and Nepal’s <strong>Om Nath Shiwakoti</strong> appointed Vice Presidents; <br />
                    • <strong>Dr. Deepa Malik</strong> appointed through her position as APC Representative; <strong>Dr. Manish Rana</strong> as Joint Secretary; <strong>Chencho</strong> of NPC Bhutan joins as Committee Member; Mr. Satyanarayana named Senior Chief Advisor <br />
                    • Bhutan, Sri Lanka, Nepal, India & Maldives unite to boost regional para sports <br />
                    • Federation to focus on infrastructure, athlete development, and the launch of South Asian Para Games
                </p>

                <p className="mb-4">
                    In a historic move to strengthen and unify the para sports movement across South Asia, the <strong>South Asian Para Sports Federation (SAPSF)</strong> has been officially formed. The Federation will be led by Satya Babu of India, Director of the Paralympic Committee of India, who has been elected as President, while Ahmed Mohamed of Maldives, Secretary General of NPC Maldives, will serve as Secretary General.
                </p>

                <p className="mb-4">
                    Jaywant Gundu Hammannavar, Secretary General of PCI, has been appointed as Treasurer. Vice Presidents include Thushan Deepal Hearth Lekam Ralalage of Sri Lanka, President of the Sri Lanka Paralympic Committee, and Om Nath Shiwakoti of Nepal, Treasurer of NPC Nepal. Representing the athletes, <strong>Rajitha Ampemotti</strong> from Sri Lanka has been appointed as Athlete Representative.
                </p>

                <p className="mb-4">
                    Expanding the leadership structure, <strong>Chencho</strong> of NPC Bhutan has been appointed as a Committee Member, <strong>Dr. Deepa Malik</strong>, Padma Shri and Paralympic medallist, has been appointed by default through her position as the Asian Paralympic Committee (APC) Representative. <strong>Mr. Satyanarayana</strong> from NPC India has also been appointed as the Senior Chief Advisor and <strong>Dr. Manish Rana</strong> of NPC India will serve as the Joint Secretary, to SAPSF, in recognition of his pivotal role in shaping the federation’s formation and future vision.
                </p>

                <p className="mb-4">
                    The formation of SAPSF took place in the presence of official representatives from India, Bhutan, Sri Lanka, Nepal, and the Maldives, marking the beginning of a new chapter in regional collaboration. <strong>Devendra Jhajharia</strong>, the President of Paralympic Committee of India, also attended the meeting. The Federation aims to build a structured and united front for para athletes—focusing on infrastructure development, athlete support systems, resource pooling, and ultimately, the launch of the <strong>South Asian Para Games</strong>.
                </p>

                <p className="mb-4">
                    Expressing his delight on being elected as the inaugural President, Satya Babu said, <em>“It is an honour to be entrusted with this responsibility at such a pivotal moment for para sports in our region.”</em> He further added, <em>“Our vision is to replicate the spirit of the South Asian Games, but exclusively for Para athletes. This is a major step in creating world-class training and competition platforms across the region. With SAPSF, we aim to unlock new pathways for athletes to compete and grow.”</em>
                </p>

                <p className="mb-4">
                    Ahmed Mohamed, Secretary General of SAPSF, stressed the importance of inclusivity and expanded access. <em>“Many athletes in South Asia have had limited access to international competition. This initiative opens doors—for classification, training, and exposure. We are grateful to the Paralympic Committee of India for driving this forward.”</em>
                </p>

                <p className="mb-4">
                    Vice President Thushan Ralalage of Sri Lanka emphasized the need for long-term athlete development. <em>“This isn’t just about medals—it’s about building an ecosystem that supports para athletes at every level through education, training, and classification programs.”</em>
                </p>

                <p className="mb-4">
                    Om Nath Shiwakoti of Nepal, also serving as Vice President, spoke about the critical need for shared resources. <em>“Countries like Nepal lack the infrastructure that India possesses. Through SAPSF, we can bridge that gap and build regional strength by leveraging one another’s capacities.”</em>
                </p>

                <p className="mb-4">
                    Sonam Karma Tshering, Secretary General of the Bhutan Paralympic Committee, welcomed the move, stating, <em>“We’ve never had the chance to truly work together as a region. With SAPSF, we can now create a common event calendar, share knowledge, and help each other rise.”</em>
                </p>

                <p className="mb-4">
                    With the establishment of SAPSF, South Asia takes a bold and unified step forward—toward becoming a global leader in para sports. The Federation promises a future where para athletes are empowered by opportunity, united by purpose, and supported by a regional system committed to excellence and equity.
                </p>
            </>
        ),
        isBreaking: false,
        isFeatured: true
    },
    {
        id: "gearing-up-for-greatness",
        title: "Gearing Up for Greatness!",
        slug: "gearing-up-for-greatness",
        date: "2025-06-19",
        category: "Para Athletics",
        author: "PCI",
        authorImage: "/assets/logo-square.png",
        tags: [
            "Delhi 2025",
            "World Para Athletics Championships",
            "PCI",
            "Devendra Jhajharia",
            "Jayawant Gundu Hamanawar",
            "Rahul Swami",
            "Sunil Pradhan",
            "Dr. Satyapal Singh",
            "World Para Athletics",
            "International Paralympic Committee",
            "India",
            "Venue Inspection"
        ],
        imageUrl: "/assets/news/Venue-Visit-5.png",
        excerpt: "A high-level PCI delegation inspected the Delhi 2025 World Para Athletics Championships venue, reviewing accessibility, infrastructure upgrades, and readiness to host a world-class, inclusive event.",
        content: (
            <>
                <p className="mb-4">
                    <strong>Venue Visit Sets the Tone for a Historic Delhi 2025 World Para Athletics Championships</strong>
                </p>

                <p className="mb-4">
                    The road to the <strong>Delhi 2025 World Para Athletics Championships</strong> is paved with commitment, vision, and tireless preparation. As India prepares to host one of the largest and most prestigious para athletics events in the world, a high-level delegation from the <strong>Paralympic Committee of India (PCI)</strong> conducted a detailed inspection of the championship venue in New Delhi.
                </p>

                <ImagesGroup>
                    <NewsImage src="/assets/news/Venue-Visit-7.png" alt="Venue inspection in progress" />
                </ImagesGroup>

                <p className="mb-4">
                    This crucial site visit signals not only the beginning of final-stage preparations but also a unified commitment to deliver a global event that upholds the highest standards of accessibility, performance, and inclusivity.
                </p>

                <p className="mb-4"><strong>🔍 Key Officials Lead the Inspection</strong></p>

                <p className="mb-4">
                    Present at the venue were some of the most respected and visionary leaders in Indian para sports:
                </p>

                <ul className="list-disc ml-6 mb-4">
                    <li><p className="mb-1"><strong>Devendra Jhajharia</strong> – <em>President, PCI &amp; Padma Bhushan Awardee</em></p></li>
                    <li><p className="mb-1"><strong>Jayawant Gundu Hamanawar</strong> – <em>Secretary General, PCI</em></p></li>
                    <li><p className="mb-1"><strong>Rahul Swami</strong> – <em>CEO, PCI</em></p></li>
                    <li><p className="mb-1"><strong>Sunil Pradhan</strong> – <em>Treasurer, PCI</em></p></li>
                    <li><p className="mb-1"><strong>Dr. Satyapal Singh</strong> – <em>Head Coach, Indian Para Athletics Team</em></p></li>
                </ul>

                <ImagesGroup>
                    <NewsImage src="/assets/news/Venue-Visit-4.png" alt="Officials review stadium areas" />
                </ImagesGroup>

                <p className="mb-4">
                    Together, these individuals represent the backbone of para sports administration and coaching in India. Their collective expertise, leadership, and on-ground involvement reflect PCI’s unwavering dedication to excellence in all aspects of the championship.
                </p>

                <ImagesGroup>
                    <NewsImage src="/assets/news/Venue-Visit-6.png" alt="Track and field facilities overview" />
                </ImagesGroup>

                <p className="mb-4"><strong>🏗️ Venue Transformation in Full Swing</strong></p>

                <p className="mb-4">
                    During the visit, the delegation conducted a comprehensive walkthrough of the stadium and adjoining facilities. The inspection focused on key infrastructure upgrades, such as:
                </p>

                <ul className="list-disc ml-6 mb-4">
                    <li><p className="mb-1">Renovation and resurfacing of athletics tracks</p></li>
                    <li><p className="mb-1">Upgraded athlete changing rooms and recovery zones</p></li>
                    <li><p className="mb-1">Barrier-free access and improved mobility paths for para-athletes</p></li>
                    <li><p className="mb-1">Enhanced technical zones for equipment, classification, and warm-up</p></li>
                    <li><p className="mb-1">Media and broadcast infrastructure revamp</p></li>
                    <li><p className="mb-1">Spectator-friendly seating, signage, and emergency exits</p></li>
                </ul>

                <ImagesGroup>
                    <NewsImage src="/assets/news/Venue-Visit-1.png" alt="Upgrades to stadium track and seating" />
                </ImagesGroup>

                <p className="mb-4">
                    This ongoing civil work and modernisation aim to transform the venue into a <strong>world-class arena</strong> that meets international standards set by <strong>World Para Athletics (WPA)</strong> and the <strong>International Paralympic Committee (IPC)</strong>.
                </p>

                <ImagesGroup>
                    <NewsImage src="/assets/news/Venue-Visit-2.png" alt="Accessibility and mobility path improvements" />
                </ImagesGroup>

                <p className="mb-4"><strong>💬 Voices of Leadership</strong></p>

                <p className="mb-4"><strong>President Devendra Jhajharia</strong>, a two-time Paralympic gold medallist and national icon, remarked:</p>
                <p className="mb-4">
                    <em>“This championship is not just about competition—it’s about rewriting perceptions, inspiring a generation, and showing the world what India’s para-athletes are truly capable of. Every detail matters, and we are committed to ensuring an unforgettable experience for all participants.”</em>
                </p>

                <p className="mb-4"><strong>Secretary General Jayawant Gundu Hamanawar</strong> highlighted the importance of collaboration:</p>
                <p className="mb-4">
                    <em>“This event is a milestone for India. We’re coordinating closely with state authorities, international bodies, and accessibility experts to ensure seamless execution.”</em>
                </p>

                <p className="mb-4"><strong>Dr. Satyapal Singh</strong>, India’s Head Coach for Para Athletics, added:</p>
                <p className="mb-4">
                    <em>“Our athletes have worked incredibly hard, and they deserve the best environment to perform at their peak. This venue will reflect our respect for their efforts.”</em>
                </p>

                <ImagesGroup>
                    <NewsImage src="/assets/news/Venue-Visit-3.png" alt="Leaders reviewing technical zones" />
                </ImagesGroup>

                <p className="mb-4"><strong>🏅 Delhi 2025 – A Championship for All</strong></p>

                <p className="mb-4">
                    Scheduled for 2025, this edition of the <strong>World Para Athletics Championships</strong> is expected to welcome <strong>over 130 countries</strong>, thousands of athletes, coaches, officials, and international delegates. For many, it will be the final qualification opportunity for the <strong>2026 Paralympic Games</strong>.
                </p>

                <p className="mb-4">
                    The Delhi championship is set to make history—not only for its scale—but also for its <strong>strong message of inclusion, accessibility, and equality</strong>. It is India’s moment to shine on the global stage and redefine what it means to host a truly inclusive international sporting event.
                </p>

                <p className="mb-4"><strong>🇮🇳 India’s Commitment to Para Sports Excellence</strong></p>

                <p className="mb-4">
                    The venue visit reinforces India’s growing leadership in the global para sports movement. The Paralympic Committee of India is ensuring that every aspect of the championship—from athlete accommodations to competition logistics—is built on the pillars of <strong>integrity, empathy, innovation, and professionalism</strong>.
                </p>

                <p className="mb-4">
                    This is more than a championship. It’s a celebration of <strong>strength over struggle</strong>, <strong>resilience over limits</strong>, and the <strong>spirit of sportsmanship that unites the world</strong>.
                </p>

                <ImagesGroup>
                    <NewsImage src="/assets/news/Venue-Visit-8.png" alt="Final venue readiness checks" />
                </ImagesGroup>

                <p className="mb-4"><strong>📢 What’s Next?</strong></p>

                <p className="mb-4">
                    With civil works progressing steadily and operational plans taking shape, the organizing team is set to enter the next phase of detailed coordination, test events, volunteer training, and awareness campaigns.
                </p>

                <p className="mb-4">
                    Stay tuned to our official channels for exclusive behind-the-scenes glimpses, athlete stories, and important updates as we march toward <strong>Delhi 2025</strong> — an event that promises to <strong>inspire, unite, and empower</strong>.
                </p>

                <p className="mb-2">👉 <strong>Follow us</strong> on social media and be part of this incredible journey!</p>

                <p className="mb-2"><em>📍 Location: New Delhi, India</em></p>
                <p className="mb-2"><em>📅 Event Year: 2025</em></p>
                <p className="mb-2"><em>🎯 Theme: Strength. Unity. Possibility.</em></p>
            </>
        ),
        isBreaking: false,
        isFeatured: false
    },
    {
        id: "india-shines-on-the-global-stage-of-para-sport",
        title: "India Shines on the Global Stage of Para Sport!",
        slug: "india-shines-on-the-global-stage-of-para-sport",
        date: "2025-06-03",
        category: "International Officiating & Recognition",
        author: "PCI",
        authorImage: "/assets/logo-square.png",
        tags: [
            "WSPS",
            "Changwon 2025",
            "World Shooting Para Sport",
            "Officiating",
            "Vivek Saini",
            "Sanjana Baruah",
            "PCI",
            "South Korea"
        ],
        imageUrl: "/assets/news/Proud-Moment-Mr.-Vivek-Saini-Ms.-Sanjana-Baruah-Changwon-2025-WSPS-World-Cup_.png",
        excerpt: "PCI’s Vivek Saini and Sanjana Baruah have been invited by World Shooting Para Sport to officiate at the Changwon 2025 WSPS World Cup—an international recognition of India’s rising leadership in para sport governance.",
        content: (
            <>
                <p className="mb-4">
                    We are delighted to share a proud moment for the Paralympic Committee of India (PCI) and the nation as a whole.
                </p>

                <ImagesGroup>
                    <NewsImage
                        src="/assets/news/Proud-Moment-Mr.-Vivek-Saini-Changwon-2025-WSPS-World-Cup.png"
                        alt="Mr. Vivek Saini invited to officiate at Changwon 2025 WSPS World Cup"
                    />
                </ImagesGroup>

                <p className="mb-4">
                    <strong>Mr. Vivek Saini</strong>, Director of Sports (Operations and Management) at PCI, and{" "}
                    <strong>Ms. Sanjana Baruah</strong>, India’s <strong>first-ever Paralympic Games Jury Member</strong>, have received
                    official invitations from <strong>World Shooting Para Sport (WSPS)</strong> to officiate at the prestigious{" "}
                    <strong>Changwon 2025 WSPS World Cup</strong> in South Korea.
                </p>

                <p className="mb-4">
                    This is not just an individual achievement, but a testament to India’s rising stature and deep commitment to para
                    sports at the international level. Their selection recognizes years of dedication, expertise, and contribution to
                    building an inclusive and competitive sports ecosystem for para-athletes in India.
                </p>

                <ImagesGroup>
                    <NewsImage
                        src="/assets/news/Proud-Moment-Ms.-Sanjana-Baruah-Changwon-2025-WSPS-World-Cup.png"
                        alt="Ms. Sanjana Baruah invited to officiate at Changwon 2025 WSPS World Cup"
                    />
                </ImagesGroup>

                <p className="mb-4">
                    Ms. Sanjana Baruah continues to make history as a trailblazer in Indian para sport officiating, having already set a
                    national benchmark by serving as a Jury Member at the Paralympic Games. Mr. Vivek Saini’s ongoing efforts to elevate
                    para sport operations and management are now being acknowledged on the global stage.
                </p>

                <p className="mb-4">
                    This milestone reflects <strong>India’s growing influence and credibility in global para sport governance and operations</strong>,
                    and it is a moment of immense pride for the entire country.
                </p>

                <p className="mb-4">
                    We extend our heartfelt congratulations to Mr. Saini and Ms. Baruah for this well-deserved recognition and wish them
                    the very best for their roles at the <strong>WSPS World Cup 2025 in Changwon</strong>.
                </p>

                <p className="mb-4">
                    Let this achievement inspire many more to strive for excellence and contribute to the growth of para sports in India and beyond.
                </p>

                <p className="mb-2"><strong>Jai Hind!</strong> 🇮🇳</p>
            </>
        ),
        isBreaking: false,
        isFeatured: false
    },
    {
        id: "pci-meets-australian-high-commissioner",
        title: "Strengthening Global Partnerships for Inclusive Sports: PCI Meets Australian High Commissioner",
        slug: "pci-meets-australian-high-commissioner",
        date: "2025-05-15",
        category: "International Partnerships",
        author: "PCI",
        authorImage: "/assets/logo-square.png",
        tags: [
            "PCI",
            "Australia",
            "High Commissioner Philip Green",
            "Devendra Jhajharia",
            "Rahul Swami",
            "Sports Diplomacy",
            "Inclusive Sports",
            "Global Collaboration"
        ],
        imageUrl: "/assets/news/PCI-AU-meet3.png",
        excerpt: "PCI leadership met with Australia’s High Commissioner Philip Green to strengthen bilateral collaboration in para sports, focusing on joint strategies and athlete development.",
        content: (
            <>
                <p className="mb-4">
                    In a pivotal move to enhance international collaboration in para sports,{" "}
                    <strong>Devendra Jhajharia</strong>, President of the Paralympic Committee of India (PCI), and{" "}
                    <strong>Rahul Swami</strong>, CEO of PCI, met with{" "}
                    <strong>His Excellency Philip Green OAM</strong>, Australia’s High Commissioner to India.
                </p>

                <ImagesGroup>
                    <NewsImage src="/assets/news/PCI-AU-meet5.png" alt="PCI and Australian High Commissioner meeting" />
                </ImagesGroup>

                <p className="mb-4">The meeting focused on two major objectives:</p>

                <p className="mb-2">✅ <strong>Fostering long-term collaboration</strong> between India and Australia in the field of para sports</p>
                <p className="mb-4">✅ <strong>Strategizing joint efforts</strong> to promote, develop, and support para-athletes across both nations</p>

                <ImagesGroup>
                    <NewsImage src="/assets/news/PCI-AU-meet1.png" alt="PCI and Australian delegation discussions" />
                </ImagesGroup>

                <p className="mb-4">
                    This high-level discussion marks a significant step toward creating a more inclusive global sports ecosystem, where
                    para-athletes receive the recognition, support, and opportunities they truly deserve.
                </p>

                <ImagesGroup>
                    <NewsImage src="/assets/news/PCI-AU-meet4.png" alt="PCI and Australian officials joint discussion" />
                </ImagesGroup>

                <p className="mb-4">
                    By working together, PCI and the Australian High Commission aim to <strong>break barriers</strong>,{" "}
                    <strong>encourage cross-cultural exchange</strong>, and <strong>build stronger infrastructures</strong> for para
                    sports that benefit athletes at all levels.
                </p>

                <p className="mb-4">
                    Such partnerships play a crucial role in shaping a future where sports are accessible, inclusive, and empowering for everyone.
                </p>

                <ImagesGroup>
                    <NewsImage src="/assets/news/PCI-AU-meet2.png" alt="Delegation exchange between PCI and Australian High Commission" />
                </ImagesGroup>
            </>
        ),
        isBreaking: false,
        isFeatured: false
    },
    {
        id: "pci-delegation-meets-delhi-cm",
        title: "Paralympic Committee of India Delegation Meets Delhi Chief Minister Smt. Rekha Gupta to Discuss About New Delhi 2025 World Para Athletics Championship",
        slug: "pci-delegation-meets-delhi-cm",
        date: "2025-05-12",
        category: "Event Preparations",
        author: "PCI",
        authorImage: "/assets/logo-square.png",
        tags: [
            "Delhi Government",
            "Rekha Gupta",
            "Vanathi Srinivasan",
            "Devendra Jhajharia",
            "Satyanarayana",
            "Satyababu",
            "Kirubakarar Raju",
            "New Delhi 2025",
            "World Para Athletics Championship",
            "Inclusive Sports"
        ],
        imageUrl: "/assets/news/pci_delhi_cm-1.jpeg",
        excerpt: "A PCI delegation led by Smt. Vanathi Srinivasan met Delhi CM Smt. Rekha Gupta to review preparations for the New Delhi 2025 World Para Athletics Championships.",
        content: (
            <>
                <p className="mb-4">
                    A delegation from the Paralympic Committee of India (PCI), led by <strong>Smt. Vanathi Srinivasan</strong>—National President of BJP Mahila Morcha, MLA from Coimbatore, and Chief Patron of PCI—met with the Hon’ble Chief Minister of Delhi, <strong>Smt. Rekha Gupta</strong>, at the Delhi Secretariat to review preparations for the <strong>New Delhi 2025 World Para Athletics Championships</strong>, scheduled to be held in September–October 2025.
                </p>

                <ImagesGroup>
                    <NewsImage src="/assets/news/pci_delhi_cm-2.jpeg" alt="PCI delegation with Delhi CM Rekha Gupta" />
                </ImagesGroup>

                <p className="mb-4">
                    <strong>Smt. Vanathi Srinivasan</strong> was accompanied by <strong>Shri Devendra Jhajharia</strong>, President of PCI; <strong>Shri Satyanarayana</strong>, Head Coach; <strong>Shri Satyababu</strong>, Director, PCI; and <strong>Shri Kirubakarar Raju</strong>, Joint Secretary of the New Delhi 2025 World Para Athletics Championships.
                </p>

                <ImagesGroup>
                    <NewsImage src="/assets/news/pci_delhi_cm-3.jpeg" alt="PCI officials and CM discussing preparations" />
                </ImagesGroup>

                <p className="mb-4">
                    The Chief Minister assured full cooperation from the Delhi Government and reiterated the city’s commitment to ensuring all necessary facilities and support for the successful conduct of the Championships.
                </p>

                <p className="mb-4">
                    This marks the first time New Delhi will host the prestigious event, expected to welcome athletes from over 100 countries. The meeting focused on key planning areas, including <strong>venue infrastructure</strong>, <strong>accessibility</strong>, <strong>logistics</strong>, <strong>athlete accommodation</strong>, and coordination with volunteers and cultural programs.
                </p>

                <ImagesGroup>
                    <NewsImage src="/assets/news/pci_delhi_cm-4.jpeg" alt="Delhi Government and PCI team in discussion" />
                </ImagesGroup>

                <p className="mb-4">
                    Speaking after the meeting, <strong>Smt. Vanathi Srinivasan</strong> commended the Delhi administration’s readiness and highlighted the importance of the event in promoting para–athletics and providing a global platform for athletes with disabilities. She emphasized that the Championships would reflect India’s growing stature in international sports and its commitment to inclusivity.
                </p>

                <p className="mb-4">
                    The Paralympic Committee of India is working in coordination with various government departments to ensure smooth execution and meaningful participation, aiming to make the <strong>New Delhi 2025 World Para Athletics Championship</strong> a milestone for para sport in India.
                </p>

                <ImagesGroup>
                    <NewsImage src="/assets/news/pci_delhi_cm-5.jpeg" alt="Delegation group photo with Delhi CM" />
                </ImagesGroup>
            </>
        ),
        isBreaking: false,
        isFeatured: false
    },
    {
        id: "wpa-nto-training-india-2025",
        title: "WPA Conducts NTO Training in India for Better Conduct and Preparation of New Delhi World Championship 2025",
        slug: "wpa-nto-training-india-2025",
        date: "2025-05-06",
        category: "Technical Training & Development",
        author: "PCI",
        authorImage: "/assets/logo-square.png",
        tags: [
            "WPA",
            "NTO Training",
            "Jawaharlal Nehru Stadium",
            "MYAS",
            "SAI",
            "HRD Scheme",
            "New Delhi 2025",
            "Officials Capacity Building",
            "Para Athletics Preparation"
        ],
        imageUrl: "/assets/news/IMG_1434.png",
        excerpt: "The World Para Athletics delegation conducted a three-day National Technical Official training in New Delhi, enhancing the readiness of Indian officials for the upcoming World Para Athletics Championship 2025.",
        content: (
            <>
                <p className="mb-4">
                    In preparation for the upcoming <strong>World Para Athletics Championship 2025</strong>, the World Para Athletics (WPA) delegation successfully conducted a three-day <strong>National Technical Official (NTO)</strong> training program in <strong>New Delhi from May 2 to May 4, 2025</strong>. The sessions were held at the <strong>Jawaharlal Nehru Stadium</strong>, which will also host the Championship later this year.
                </p>

                <ImagesGroup>
                    <NewsImage src="/assets/news/IMG_1439.png" alt="Officials attending NTO training session" />
                </ImagesGroup>

                <p className="mb-4">
                    Organized with the support of the <strong>Ministry of Youth Affairs and Sports (MYAS)</strong>, the <strong>Sports Authority of India (SAI)</strong>, and under the <strong>HRD Scheme</strong>, the training aimed to enhance the technical capabilities of Indian officials to ensure smooth and rule-compliant conduct of the global event.
                </p>

                <ImagesGroup>
                    <NewsImage src="/assets/news/IMG_1432.png" alt="Delegates at Jawaharlal Nehru Stadium" />
                </ImagesGroup>

                <p className="mb-4">
                    A total of 60 participants from across the country took part in the intensive training. Led by experienced WPA officials, the sessions covered critical aspects such as <strong>technical regulations</strong>, <strong>classification systems</strong>, <strong>event management</strong>, <strong>rule enforcement</strong>, and the core principles of <strong>fair play</strong> and <strong>inclusion</strong>.
                </p>

                <ImagesGroup>
                    <NewsImage src="/assets/news/IMG_1448.png" alt="Interactive classroom training session" />
                    <NewsImage src="/assets/news/IMG_1441.png" alt="Participants in technical training" />
                </ImagesGroup>

                <p className="mb-4">
                    Over three days, attendees engaged in detailed classroom instruction, case studies, and interactive sessions to build real-time understanding. The program concluded with an official examination on the final day to evaluate the participants’ grasp of <strong>WPA standards</strong> and readiness to serve as NTOs during the World Championship.
                </p>

                <ImagesGroup>
                    <NewsImage src="/assets/news/IMG_1425.png" alt="Final day assessment during training" />
                </ImagesGroup>

                <p className="mb-4">
                    This initiative marks a significant milestone in India’s preparation to host a world-class para athletics event and reflects the country’s growing commitment to <strong>excellence</strong>, <strong>professionalism</strong>, and <strong>global collaboration</strong> in para sports.
                </p>

                <ImagesGroup>
                    <NewsImage src="/assets/news/IMG_1430.png" alt="Group photo from the training program" />
                    <NewsImage src="/assets/news/IMG_1445.png" alt="WPA trainers and Indian officials together" />
                </ImagesGroup>
            </>
        ),
        isBreaking: false,
        isFeatured: false
    },
    {
        id: "india-shines-new-delhi-2025-grand-prix",
        title: "India Shines at the Inaugural New Delhi 2025 World Para Athletics Grand Prix",
        slug: "india-shines-new-delhi-2025-grand-prix",
        date: "2025-03-17",
        category: "International Para Athletics",
        author: "PCI",
        authorImage: "/assets/logo-square.png",
        tags: [
            "World Para Athletics",
            "Grand Prix 2025",
            "New Delhi",
            "India Medal Tally",
            "Preeti Pal",
            "Rinku Hooda",
            "Vanessa Low",
            "Brazil Para Athletes",
            "Jawaharlal Nehru Stadium",
            "Test Event for World Championships"
        ],
        imageUrl: "/assets/news/WPA-Grand-Prix-Logo-Landscape_LOC.png",
        excerpt: "India dominated the inaugural New Delhi 2025 World Para Athletics Grand Prix, finishing atop the medal tally with 134 medals while hosting athletes from 20 nations in a successful prelude to the World Championships.",
        content: (
            <>
                <p className="mb-4">
                    <em>New Delhi, March 14, 2025</em> – The Jawaharlal Nehru Stadium recently hosted the first-ever <strong>World Para Athletics Grand Prix in India</strong>, marking a significant milestone in the nation’s para-athletics journey. The three-day event, held from March 11 to 13, 2025, witnessed remarkable performances from athletes across the globe, with India emerging as a dominant force.
                </p>

                <h4 className="mt-6 mb-2 font-semibold">India’s Stellar Performance</h4>
                <p className="mb-4">
                    Indian para-athletes showcased exceptional talent and determination, finishing atop the medal tally with a total of <strong>134 medals</strong>: 45 gold, 40 silver, and 49 bronze. This outstanding achievement underscores India’s growing prominence in the realm of para-athletics.
                </p>

                <h4 className="mt-6 mb-2 font-semibold">Notable Highlights</h4>
                <ul className="list-disc pl-6 mb-4">
                    <li><strong>Preeti Pal’s Dual Triumphs</strong>: Silver in women’s 100m T35 and bronze in 200m T35–T38.</li>
                    <li><strong>Rinku Hooda’s Gold in Javelin</strong>: Clinched gold in men’s javelin F46.</li>
                    <li><strong>Podium Sweeps</strong>: India dominated in men’s shot put F11–F20 and women’s discus throw F56–F57.</li>
                </ul>

                <h4 className="mt-6 mb-2 font-semibold">International Participation</h4>
                <p className="mb-4">
                    The event attracted <strong>283 athletes from 20 nations</strong>, including Australia’s <strong>Vanessa Low</strong>, a three-time Paralympic champion, who secured gold in women’s long jump T61. Brazilian athletes <strong>Joeferson Marinho de Oliveira</strong> and <strong>Bartolomeu Chaves</strong>, both Paris 2024 medallists, also won their respective events.
                </p>

                <h4 className="mt-6 mb-2 font-semibold">A Prelude to the World Championships</h4>
                <p className="mb-4">
                    Serving as a <strong>test event</strong>, the Grand Prix set the stage for the upcoming <strong>World Para Athletics Championships</strong> scheduled at the same venue in September 2025. The successful execution has bolstered confidence in India’s capability to host mega events.
                </p>

                <h4 className="mt-6 mb-2 font-semibold">Looking Ahead</h4>
                <p className="mb-4">
                    Following the New Delhi Grand Prix, the WPA circuit will move to <strong>Marrakech, Morocco</strong>, from April 24–26, 2025. The inaugural event not only highlighted athletic excellence but also reinforced India’s commitment to para-sports on the global stage.
                </p>
            </>
        ),
        isBreaking: false,
        isFeatured: false
    },
    {
        id: "seminar-on-posh-act-2013-pci",
        title: "Seminar on POSH Act 2013 Organized by the Paralympic Committee of India",
        slug: "seminar-on-posh-act-2013-pci",
        date: "2025-02-20",
        category: "Workplace Safety & Awareness",
        author: "PCI",
        authorImage: "/assets/logo-square.png",
        tags: [
            "POSH Act 2013",
            "Workplace Safety",
            "Prevention of Sexual Harassment",
            "Sports Law",
            "Women in Sports",
            "Legal Awareness",
            "Internal Complaints Committee",
            "Athlete Protection",
            "Chennai Seminar",
            "Kumudavalli Seetharaman"
        ],
        imageUrl: "/assets/news/Seminar-On-POSH-Act-2013-Prevention-of-Sexual-Harassment-of-Women-at-Workplace-by-the-Paralympic-Committee-of-India-PCI-7.png",
        excerpt: "The Paralympic Committee of India organized a seminar on the POSH Act 2013 in Chennai to raise awareness about workplace safety for women in sports, led by legal expert Ms. Kumudavalli Seetharaman.",
        content: (
            <>
                <p className="mb-4">
                    The <strong>Paralympic Committee of India (PCI)</strong> successfully conducted a seminar on the <strong>Prevention of Sexual Harassment of Women at Workplace (POSH) Act, 2013</strong> on <strong>19th February 2025</strong> at the <strong>Conference Hall, JLN Stadium, Chennai</strong>. The session aimed to spread awareness about workplace safety and legal protections for women in sports and administrative settings.
                </p>

                <NewsImage src="/assets/news/Seminar-On-POSH-Act-2013-Prevention-of-Sexual-Harassment-of-Women-at-Workplace-by-the-Paralympic-Committee-of-India-PCI-5-819x1024.png" alt="Seminar session visual" />
                <br />

                <h4 className="mt-6 mb-2 font-semibold">Speaker and Instructor</h4>
                <p className="mb-4">
                    The seminar was conducted by <strong>Ms. Kumudavalli Seetharaman</strong>, a distinguished advocate specializing in sports law. With vast experience in athlete-related legal matters, she provided deep insights into the POSH Act and its significance for the sporting community.
                </p>

                <NewsImage src="/assets/news/Seminar-On-POSH-Act-2013-Prevention-of-Sexual-Harassment-of-Women-at-Workplace-by-the-Paralympic-Committee-of-India-PCI-9-819x1024.png" alt="Speaker addressing participants" />
                <br />

                <h4 className="mt-6 mb-2 font-semibold">Key Highlights of the Seminar</h4>
                <ol className="list-decimal pl-6 mb-4 space-y-2">
                    <li><strong>Understanding the POSH Act, 2013</strong>: Comprehensive overview of the Act’s objectives and workplace safety measures.</li>
                    <li><strong>Applicability in Sports Organizations</strong>: Emphasis on federations, camps, tournaments, and administration offices.</li>
                    <li><strong>Role of the Internal Complaints Committee (ICC)</strong>: Requirements, composition, and responsibilities.</li>
                    <li><strong>Recognizing and Reporting Harassment</strong>: Guidance on identifying harassment and filing complaints correctly.</li>
                    <li><strong>Case Studies and Legal Precedents</strong>: Discussions on landmark judgments and real-world examples.</li>
                    <li><strong>Interactive Q&A Session</strong>: Open discussion for attendees to clarify doubts and raise concerns.</li>
                </ol>

                <NewsImage src="/assets/news/Seminar-On-POSH-Act-2013-Prevention-of-Sexual-Harassment-of-Women-at-Workplace-by-the-Paralympic-Committee-of-India-PCI-2-819x1024.png" alt="Group of attendees at the seminar" />
                <br />

                <h4 className="mt-6 mb-2 font-semibold">Audience and Participation</h4>
                <p className="mb-4">
                    The seminar witnessed active participation from athletes, coaches, administrators, and PCI officials. The interactive sessions encouraged meaningful dialogue, equipping attendees with a better understanding of their rights and responsibilities under the law.
                </p>
            </>
        ),
        isBreaking: false,
        isFeatured: false
    },
    {
        id: "anti-doping-workshop-nada-23rd-npac-2025",
        title: "Anti-Doping Workshop by NADA at the 23rd National Para Athletics Championship 2025, Chennai",
        slug: "anti-doping-workshop-nada-23rd-npac-2025",
        date: "2025-02-19",
        category: "Fair Play & Integrity",
        author: "PCI",
        authorImage: "/assets/logo-square.png",
        tags: [
            "Anti-Doping",
            "NADA",
            "Clean Sports",
            "Fair Competition",
            "Athlete Awareness",
            "Therapeutic Use Exemptions",
            "WADA Guidelines",
            "Doping Control",
            "Chennai 2025",
            "Para Athletics Championship"
        ],
        imageUrl: "/assets/news/NADA-Session-23rd-NPAC-4-.png",
        excerpt: "NADA conducted an Anti-Doping Workshop at the 23rd National Para Athletics Championship in Chennai, educating athletes and coaches on clean sports, WADA rules, and doping prevention.",
        content: (
            <>
                <p className="mb-4">
                    <strong>Promoting Clean and Fair Sports!</strong>
                </p>

                <p className="mb-4">
                    The <strong>National Anti-Doping Agency (NADA)</strong> conducted a significant <strong>Anti-Doping Workshop</strong> at the <strong>23rd National Para Athletics Championship 2025</strong>, held in <strong>Chennai, Tamil Nadu</strong>. This initiative aimed to educate para-athletes, coaches, and support staff about the importance of <strong>clean and fair sports</strong>, ensuring a level playing field for all competitors.
                </p>

                <NewsImage src="/assets/news/NADA-Session-23rd-NPAC-2-1-1-819x1024.png" alt="Participants attending anti-doping awareness session" />
                <br />

                <h4 className="mt-6 mb-2 font-semibold">Spreading Awareness on Anti-Doping Regulations</h4>
                <p className="mb-4">
                    The workshop provided insights into <strong>anti-doping rules, prohibited substances, testing procedures, and athletes’ rights and responsibilities</strong>. NADA experts explained the significance of <strong>WADA guidelines</strong>, the <strong>consequences of doping violations</strong>, and how athletes can safeguard themselves from unintentional doping.
                </p>

                <NewsImage src="/assets/news/NADA-Session-23rd-NPAC-3-1-1-819x1024.png" alt="NADA experts briefing athletes" />
                <br />

                <h4 className="mt-6 mb-2 font-semibold">Empowering Para-Athletes</h4>
                <p className="mb-4">
                    Special attention was given to <strong>therapeutic use exemptions (TUEs)</strong> and the risks linked with <strong>supplements and medications</strong>. Officials emphasized <strong>integrity, awareness, and ethical sportsmanship</strong>, encouraging athletes to uphold honesty and dedication in competition.
                </p>

                <h4 className="mt-6 mb-2 font-semibold">Interactive Sessions and Athlete Engagement</h4>
                <p className="mb-4">
                    The workshop featured <strong>interactive discussions, Q&A sessions, and real-life case studies</strong>. Athletes and coaches actively participated, raising queries on <strong>sample collection, the role of doping control officers, and confidential reporting mechanisms</strong>.
                </p>

                <h4 className="mt-6 mb-2 font-semibold">Commitment to a Doping-Free Future</h4>
                <p className="mb-4">
                    NADA’s presence at the championship reinforced its commitment to <strong>eradicating doping</strong> and nurturing a culture of <strong>fair competition</strong>. By equipping athletes with awareness and resources, NADA strengthens India’s stand for <strong>clean sports</strong>.
                </p>
            </>
        ),
        isBreaking: false,
        isFeatured: false
    },
    {
        id: "national-technical-official-training-wpa-chennai-2025",
        title: "National Technical Official Training by World Para Athletics Instructor at Chennai, Tamil Nadu",
        slug: "national-technical-official-training-wpa-chennai-2025",
        date: "2025-02-18",
        category: "Sports Governance & Training",
        author: "PCI",
        authorImage: "/assets/logo-square.png",
        tags: [
            "National Technical Officials",
            "World Para Athletics",
            "NTO Training",
            "Chennai 2025",
            "Para Athletics Officiating",
            "Technical Manpower Development",
            "Sports Authority of India",
            "Ministry of Youth Affairs and Sports",
            "Tarek Souei",
            "23rd National Para Athletics Championship"
        ],
        imageUrl: "/assets/news/Mr.-Tarek-Souei-National-Technical-Official-NTO-Training-Instructor-by-World-Para-Athletics-3.png",
        excerpt: "World Para Athletics conducted an NTO training in Chennai during the 23rd National Para Athletics Championship 2025, certifying 30 new officials to strengthen technical manpower in para sports.",
        content: (
            <>
                <p className="mb-4">
                    <strong>Chennai, India</strong> – The <strong>World Para Athletics (WPA) National Technical Officials (NTO) Training</strong> was held in <strong>Chennai, Tamil Nadu</strong>, from <strong>15 to 17 February 2025</strong> during the <strong>23rd National Para Athletics Championship</strong>. The program was led by <strong>Mr. Tarek Souei (UAE)</strong>, a distinguished WPA Instructor, and witnessed active participation from officials across India.
                </p>

                <NewsImage src="/assets/news/Mr.-Tarek-Souei-National-Technical-Official-NTO-Training-Instructor-by-World-Para-Athletics-1-819x1024.png" alt="Participants of WPA NTO Training in Chennai" />
                <br />

                <p className="mb-4">
                    A total of <strong>30 participants</strong> successfully completed the certification and were accredited as <strong>National Technical Officials (NTOs)</strong>. These newly certified officials were immediately deployed at the championship, ensuring smooth and professional execution of the competition.
                </p>

                <NewsImage src="/assets/news/Mr.-Tarek-Souei-National-Technical-Official-NTO-Training-Instructor-by-World-Para-Athletics-2-819x1024.png" alt="Mr. Tarek Souei leading the training program" />
                <br />

                <h4 className="mt-6 mb-2 font-semibold">Strengthening Technical Manpower</h4>
                <p className="mb-4">
                    The primary objective of the training was to <strong>develop technical manpower in Para Athletics</strong>, enabling certified NTOs to officiate at <strong>National, State, and District-level championships</strong>. This expansion of qualified officials is a step towards raising officiating standards in India.
                </p>

                <h4 className="mt-6 mb-2 font-semibold">Institutional Support</h4>
                <p className="mb-4">
                    The training was <strong>supported by the Sports Authority of India (SAI)</strong> under the mandate of the <strong>Ministry of Youth Affairs and Sports (MYAS)</strong>. The initiative aligns with national goals of enhancing technical officiating capabilities and creating a more structured and professional ecosystem in Para Athletics.
                </p>

                <h4 className="mt-6 mb-2 font-semibold">Impact on Championships</h4>
                <p className="mb-4">
                    The <strong>23rd National Para Athletics Championship</strong> benefited from the expertise of these newly certified officials, ensuring <strong>fair, transparent, and high-quality competition</strong>. This successful certification program represents a significant step in India’s commitment to developing world-class technical officials in Para Athletics.
                </p>
            </>
        ),
        isBreaking: false,
        isFeatured: false
    }
]

export const SAMPLE_NEWS_ARTICLES: NewsItemComplete = {
    id: "honoured-visit-by-shri-prasad-mahaanakar-ji-to-pci-headquarters",
    title: "Honoured Visit by Shri Prasad Mahaanakar Ji to PCI Headquarters",
    slug: "honoured-visit-by-shri-prasad-mahaanakar-ji-to-pci-headquarters",
    date: "2025-07-24",
    category: "Para Sports",
    author: "PCI",
    authorImage: "/assets/logo-square.png",
    tags: [
        "Prasad Mahaanakar",
        "PCI",
        "Akhil Bharatiya Kreeda Bharati",
        "World Championships 2025",
        "Para Sports",
        "India",
        "South Asia Para Sports Federation",
        "Satya Babu"
    ],
    imageUrl: "/assets/news/Prasad-Mahaanakar-PCI-Meet-1.png",
    excerpt: "Shri Prasad Mahaanakar ji visited the PCI Headquarters for a strategic discussion on the 2025 World Championships, event planning, athlete development, and India’s growing impact in global para-sports.",
    content: (
        <>
            <p className="mb-4">
                Honoured to welcome <strong>Shri Prasad Mahaanakar ji</strong>, Sangathan Mantri of Akhil Bharatiya Kreeda Bharati, to the Paralympic Committee of India office in New Delhi. 🙏 <br />
                He was invited for a briefing and update on the upcoming <strong>World Championships 2025</strong> and other major national and international events.
            </p>

            <ImagesGroup>
                <NewsImage src="/assets/news/Prasad-Mahaanakar-PCI-Meet-2.png" alt="Prasad Mahaanakar meeting at PCI" />
            </ImagesGroup>

            <p className="mb-4">
                An engaging and interactive session was held with the President and Director, PCI, focusing on event planning, athlete development, and India’s growing impact in global para-sports. 🇮🇳🏅
            </p>

            <ImagesGroup>
                <NewsImage src="/assets/news/Prasad-Mahaanakar-PCI-Meet-3.png" alt="Interactive session with PCI leadership" />
                <NewsImage src="/assets/news/Prasad-Mahaanakar-PCI-Meet-4.png" alt="PCI leadership meeting" />
            </ImagesGroup>

            <p className="mb-4">
                During the visit, Shri Prasad Mahaanakar ji also extended his heartfelt congratulations to Director PCI, Shri Satya Babu ji, on being elected as the{" "}
                <strong>First President of the South Asia Para Sports Federation</strong> – a proud and historic moment for Indian para-sports. 🌍👏
            </p>

            <ImagesGroup>
                <NewsImage src="/assets/news/Prasad-Mahaanakar-PCI-Meet-5.png" alt="Shri Satya Babu congratulated" />
                <NewsImage src="/assets/news/Prasad-Mahaanakar-PCI-Meet-6.png" alt="PCI visit group photo" />
            </ImagesGroup>
        </>
    ),
    isBreaking: false,
    isFeatured: true
}