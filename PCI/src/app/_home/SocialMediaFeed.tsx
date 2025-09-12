'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SOCIAL_POSTS = [
  {
    id: 1,
    platform: 'twitter',
    username: '@Paralympics',
    handle: 'Paralympics',
    time: '2h',
    content: 'Breaking barriers and setting new standards! 🏆 Our athletes continue to inspire the world with their incredible achievements. #Paralympics2024 #Inspiration',
    likes: 1240,
    retweets: 567,
    imageUrl: '/api/placeholder/400/300',
    verified: true,
  },
  {
    id: 2,
    platform: 'instagram',
    username: 'paralympics',
    handle: 'Paralympics',
    time: '4h',
    content: 'Behind the scenes with our amazing swimming team preparing for the upcoming championships! 🏊‍♀️💪',
    likes: 2850,
    comments: 123,
    imageUrl: '/api/placeholder/400/400',
    verified: true,
  },
  {
    id: 3,
    platform: 'facebook',
    username: 'Paralympic Games',
    handle: 'Paralympics',
    time: '6h',
    content: "Celebrating the power of sport to transform lives. Join us in supporting athletes who show us what's possible! 🌟",
    likes: 892,
    shares: 234,
    verified: true,
  },
  {
    id: 4,
    platform: 'youtube',
    username: 'Paralympic Games',
    handle: 'Paralympics',
    time: '1d',
    content: '🎥 NEW VIDEO: "Road to Glory" - Follow three athletes on their journey to Paralympic excellence. Watch now!',
    likes: 3420,
    views: 15600,
    imageUrl: '/api/placeholder/400/225',
    verified: true,
  },
];

const platformIcons = {
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  ),
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  youtube: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

export default function SocialMediaFeed() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  const filteredPosts = selectedPlatform === 'all'
    ? SOCIAL_POSTS
    : SOCIAL_POSTS.filter(post => post.platform === selectedPlatform);

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'text-blue-400';
      case 'instagram': return 'text-pink-500';
      case 'facebook': return 'text-blue-600';
      case 'youtube': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <section className="pt-10 py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {
          false && (
            <div>
              {/* Section Header */}
              <div className="text-center mb-12">
                <div className="inline-block bg-paralympic-blue px-4 py-1 rounded-full mb-4">
                  <span className="text-white font-semibold">Stay Connected</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-paralympic-navy mb-4">
                  Follow Us
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Get the latest updates, behind-the-scenes content, and inspiring stories from our social media channels
                </p>
              </div>

              {/* Platform Filter */}
              <div className="flex justify-center mb-8">
                <div className="flex bg-white rounded-full shadow-lg p-2 space-x-2">
                  <button
                    onClick={() => setSelectedPlatform('all')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedPlatform === 'all'
                      ? 'bg-paralympic-blue text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    All Posts
                  </button>
                  {Object.keys(platformIcons).map((platform) => (
                    <button
                      key={platform}
                      onClick={() => setSelectedPlatform(platform)}
                      className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${selectedPlatform === platform
                        ? 'bg-paralympic-blue text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      <span className={`mr-2 ${getPlatformColor(platform)}`}>
                        {platformIcons[platform as keyof typeof platformIcons]}
                      </span>
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              {/* Social Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* Post Header */}
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full bg-gray-100 ${getPlatformColor(post.platform)}`}>
                            {platformIcons[post.platform as keyof typeof platformIcons]}
                          </div>
                          <div>
                            <div className="flex items-center">
                              <span className="font-semibold text-gray-900">{post.username}</span>
                              {post.verified && (
                                <svg className="w-4 h-4 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <span className="text-sm text-gray-500">{post.handle} • {post.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-4">
                      <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>

                      {post.imageUrl && (
                        <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={post.imageUrl}
                            alt="Social media post"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      {/* Post Stats */}
                      <div className="flex items-center justify-between text-gray-500 text-sm">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            {post.likes.toLocaleString()}
                          </span>

                          {post.retweets && (
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              {post.retweets.toLocaleString()}
                            </span>
                          )}

                          {post.comments && (
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              {post.comments.toLocaleString()}
                            </span>
                          )}

                          {post.shares && (
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                              </svg>
                              {post.shares.toLocaleString()}
                            </span>
                          )}

                          {post.views && (
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              {post.views.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        }

        {/* Follow Us CTA */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-paralympic-navy mb-4">
              Follow the Paralympic Movement
            </h3>
            <p className="text-gray-600 mb-6">
              Stay up to date with the latest news, athlete stories, and behind-the-scenes content
            </p>
            <div className="flex justify-center space-x-4">
              {Object.entries(platformIcons).map(([platform, icon]) => (
                <Link
                  key={platform}
                  href={`https://${platform}.com/paralympics`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-paralympic-blue hover:text-white transition-all transform hover:scale-110 ${getPlatformColor(platform)}`}
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}