import Image from 'next/image';
import Link from 'next/link';
import { ABOUT_CONTENT } from '~/lib/data';

// Define content data - in a real application, this could come from a CMS
// const ABOUT_CONTENT = {
//   heading: 'Transforming Lives Through Paralympic Sport',
//   subheading: 'About the Paralympic Movement',
//   description: 'The Paralympic Movement is a global network of individuals and organizations brought together through their commitment to provide sporting opportunities for all para athletes and to contribute to a more inclusive society.',
//   stats: [
//     { value: '180+', label: 'National Paralympic Committees' },
//     { value: '22+', label: 'Paralympic Sports' },
//     { value: '4,400+', label: 'Athletes at Summer Games' },
//     { value: '1960', label: 'First Paralympic Games' },
//   ],
//   buttonText: 'Learn More About Us',
//   buttonLink: '/about',
//   imageUrl: '/images/about/paralympic-athletes.jpg',
// };

export default function AboutSection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="lg:max-w-xl">
            <div className="inline-block bg-paralympic-yellow px-4 py-1 rounded-full mb-4">
              <span className="text-paralympic-navy font-semibold">
                {ABOUT_CONTENT.subheading}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-paralympic-navy mb-6 leading-tight">
              {ABOUT_CONTENT.heading}
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-justify">
              {ABOUT_CONTENT.description}
            </p>
            
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              {ABOUT_CONTENT.stats.map((stat, index) => (
                <div 
                  key={index}
                  className="group"
                >
                  <div className="text-3xl md:text-4xl font-bold text-paralympic-blue group-hover:text-paralympic-green transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            
            <Link 
              href={ABOUT_CONTENT.buttonLink}
              className="inline-block bg-paralympic-navy text-white font-bold py-3 px-8 rounded-full hover:bg-paralympic-blue transition-colors duration-300"
            >
              {ABOUT_CONTENT.buttonText}
            </Link>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="relative h-[500px] w-full overflow-hidden rounded-lg shadow-xl transform transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src={ABOUT_CONTENT.imageUrl}
                alt="Paralympic Athletes in action"
                fill
                className="object-cover"
              />
              
              {/* Image decorative elements */}
              <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-paralympic-yellow rounded-full opacity-80"></div>
              <div className="absolute -top-6 -left-6 h-24 w-24 bg-paralympic-blue rounded-full opacity-70"></div>
              
              {/* Paralympic logo watermark */}
              <div className="absolute bottom-2 right-2 h-20 w-20 opacity-80">
                <Image
                  src="/assets/logo.png"
                  alt="Paralympic Symbol"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}