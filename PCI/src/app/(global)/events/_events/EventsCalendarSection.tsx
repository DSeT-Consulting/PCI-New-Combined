'use client';

import React, { useState } from 'react';
import { FEATURED_EVENTS } from '~/lib/data';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const QUICK_FILTERS = [
  { label: 'This Month', value: 'this-month', color: 'bg-paralympic-blue' },
  { label: 'Next Month', value: 'next-month', color: 'bg-paralympic-green' },
  { label: 'This Year', value: 'this-year', color: 'bg-paralympic-red' },
  { label: 'Paralympic Games', value: 'paralympic', color: 'bg-paralympic-yellow text-paralympic-navy' },
];

const EventsCalendarSection: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [activeFilter, setActiveFilter] = useState('this-year');

  const currentDate = new Date();
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1);
  const lastDayOfMonth = new Date(selectedYear, selectedMonth + 1, 0);
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Get events for the selected month
  const monthEvents = FEATURED_EVENTS.filter(event => {
    const eventDate = new Date(event.dateStart);
    return eventDate.getMonth() === selectedMonth && eventDate.getFullYear() === selectedYear;
  });

  // Create calendar days
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayEvents = monthEvents.filter(event => {
      const eventDate = new Date(event.dateStart);
      return eventDate.getDate() === day;
    });
    
    calendarDays.push({
      day,
      events: dayEvents,
      isToday: day === currentDate.getDate() && 
               selectedMonth === currentDate.getMonth() && 
               selectedYear === currentDate.getFullYear()
    });
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (selectedMonth === 0) {
        setSelectedMonth(11);
        setSelectedYear(selectedYear - 1);
      } else {
        setSelectedMonth(selectedMonth - 1);
      }
    } else {
      if (selectedMonth === 11) {
        setSelectedMonth(0);
        setSelectedYear(selectedYear + 1);
      } else {
        setSelectedMonth(selectedMonth + 1);
      }
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-paralympic-green to-paralympic-blue px-6 py-2 rounded-full mb-6">
            <span className="text-white font-bold">📅 EVENT CALENDAR</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-paralympic-navy mb-4">
            Plan Your Paralympic Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with upcoming Paralympic events, championships, and competitions happening around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Calendar Header */}
              <div className="bg-gradient-to-r from-paralympic-blue to-paralympic-green p-6">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <h3 className="text-2xl font-bold text-white">
                    {MONTHS[selectedMonth]} {selectedYear}
                  </h3>
                  
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 bg-paralympic-gray/30">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-3 text-center font-semibold text-gray-700 border-r border-gray-200 last:border-r-0">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7">
                {calendarDays.map((dayData, index) => (
                  <div
                    key={index}
                    className={`min-h-[80px] p-2 border-r border-b border-gray-200 last:border-r-0 ${
                      dayData ? 'bg-white hover:bg-gray-50' : 'bg-gray-50'
                    } transition-colors`}
                  >
                    {dayData && (
                      <>
                        <div className={`text-sm font-medium mb-1 ${
                          dayData.isToday ? 'text-white bg-paralympic-blue rounded-full w-6 h-6 flex items-center justify-center' : 'text-gray-900'
                        }`}>
                          {dayData.day}
                        </div>
                        {dayData.events.length > 0 && (
                          <div className="space-y-1">
                            {dayData.events.slice(0, 2).map((event, eventIndex) => (
                              <div
                                key={eventIndex}
                                className="text-xs p-1 rounded bg-paralympic-blue/10 text-paralympic-blue border-l-2 border-paralympic-blue truncate"
                                title={event.title}
                              >
                                {event.title}
                              </div>
                            ))}
                            {dayData.events.length > 2 && (
                              <div className="text-xs text-gray-500">
                                +{dayData.events.length - 2} more
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Filters */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h4 className="text-lg font-bold text-paralympic-navy mb-4">Quick Filters</h4>
              <div className="space-y-2">
                {QUICK_FILTERS.map(filter => (
                  <button
                    key={filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                      activeFilter === filter.value
                        ? `${filter.color} text-white transform scale-105`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Upcoming Events List */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h4 className="text-lg font-bold text-paralympic-navy mb-4">Upcoming This Month</h4>
              {monthEvents.length > 0 ? (
                <div className="space-y-4">
                  {monthEvents.slice(0, 4).map((event, index) => (
                    <div key={index} className="border-l-4 border-paralympic-blue pl-4 py-2">
                      <div className="text-sm font-semibold text-paralympic-navy mb-1">
                        {event.title}
                      </div>
                      <div className="text-xs text-gray-600 mb-1">
                        {new Date(event.dateStart).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="text-xs text-gray-500">
                        {event.location}
                      </div>
                    </div>
                  ))}
                  {monthEvents.length > 4 && (
                    <button className="text-paralympic-blue hover:text-paralympic-navy font-medium text-sm transition-colors">
                      View all {monthEvents.length} events →
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">📅</div>
                  <p className="text-gray-500 text-sm">No events this month</p>
                </div>
              )}
            </div>

            {/* Event Categories */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h4 className="text-lg font-bold text-paralympic-navy mb-4">Event Categories</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-paralympic-blue rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">Paralympic Games</span>
                  </div>
                  <span className="text-xs bg-paralympic-blue/10 text-paralympic-blue px-2 py-1 rounded-full">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-paralympic-green rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">World Championships</span>
                  </div>
                  <span className="text-xs bg-paralympic-green/10 text-paralympic-green px-2 py-1 rounded-full">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-paralympic-red rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">Grand Prix</span>
                  </div>
                  <span className="text-xs bg-paralympic-red/10 text-paralympic-red px-2 py-1 rounded-full">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-paralympic-yellow rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">National Events</span>
                  </div>
                  <span className="text-xs bg-paralympic-yellow/20 text-paralympic-navy px-2 py-1 rounded-full">8</span>
                </div>
              </div>
            </div>

            {/* Subscribe to Calendar */}
            <div className="bg-gradient-to-br from-paralympic-blue to-paralympic-green rounded-2xl p-6 text-white">
              <h4 className="text-lg font-bold mb-3">Never Miss an Event</h4>
              <p className="text-sm mb-4 text-white/90">
                Subscribe to get reminders about upcoming Paralympic events directly in your calendar.
              </p>
              <button className="w-full bg-white text-paralympic-blue px-4 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe to Calendar
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Legend */}
        <div className="mt-8 bg-paralympic-gray/30 rounded-xl p-6">
          <h4 className="text-lg font-bold text-paralympic-navy mb-4">Calendar Legend</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-paralympic-blue rounded mr-3"></div>
              <span className="text-sm text-gray-700">Paralympic Games</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-paralympic-green rounded mr-3"></div>
              <span className="text-sm text-gray-700">World Championships</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-paralympic-red rounded mr-3"></div>
              <span className="text-sm text-gray-700">Continental Events</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-paralympic-yellow rounded mr-3"></div>
              <span className="text-sm text-gray-700">National Events</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsCalendarSection;