import React, { useState, useMemo } from 'react';
import { MOCK_EVENTS } from '../data/mockData';
import { SchoolEvent, EventCategory } from '../types';
import {
  Calendar as CalendarIcon,
  Search,
  Filter,
  MapPin,
  Clock,
  User,
  Bell,
  Download,
  Check,
  ChevronLeft,
  ChevronRight,
  ListFilter,
  Grid,
  Sparkles,
  X,
  Share2,
} from 'lucide-react';

export const EventsCalendar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedEvent, setSelectedEvent] = useState<SchoolEvent | null>(null);
  const [reminders, setReminders] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Base month navigation starting from October 2026 (first school term event)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 1)); // October 2026

  const categories: { id: string; label: string; count: number }[] = [
    { id: 'all', label: 'All Events', count: MOCK_EVENTS.length },
    { id: 'academic', label: 'Academic & Exams', count: MOCK_EVENTS.filter((e) => e.category === 'academic').length },
    { id: 'spiritual', label: 'Spiritual & Chapel', count: MOCK_EVENTS.filter((e) => e.category === 'spiritual').length },
    { id: 'sports', label: 'Sports & Clubs', count: MOCK_EVENTS.filter((e) => e.category === 'sports').length },
    { id: 'parent', label: 'Parent & PTA', count: MOCK_EVENTS.filter((e) => e.category === 'parent').length },
    { id: 'holiday', label: 'Holidays', count: MOCK_EVENTS.filter((e) => e.category === 'holiday').length },
  ];

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter((evt) => {
      const matchesCategory = selectedCategory === 'all' || evt.category === selectedCategory;
      const matchesSearch =
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.organizer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => a.date.localeCompare(b.date));
  }, [selectedCategory, searchQuery]);

  const handleToggleReminder = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setReminders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShareEvent = (evt: SchoolEvent, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard?.writeText(
      `${evt.title} on ${evt.date} at ${evt.location} - Katingawan SDA Elementary School`
    );
    setCopiedId(evt.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const downloadIcsFile = (evt: SchoolEvent) => {
    // Generate .ics calendar payload
    const startDateClean = evt.date.replace(/-/g, '');
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Katingawan SDA Elementary School//Event Calendar//EN',
      'BEGIN:VEVENT',
      `UID:ksda-${evt.id}@katingawansda.edu.ph`,
      `DTSTAMP:${startDateClean}T080000Z`,
      `DTSTART;VALUE=DATE:${startDateClean}`,
      `SUMMARY:${evt.title}`,
      `DESCRIPTION:${evt.description.replace(/\n/g, ' ')}`,
      `LOCATION:${evt.location}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${evt.title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDisplayDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getCategoryColor = (cat: EventCategory) => {
    switch (cat) {
      case 'academic':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'spiritual':
        return 'text-amber-800 bg-amber-50 border-amber-200';
      case 'sports':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'parent':
        return 'text-purple-700 bg-purple-50 border-purple-200';
      case 'holiday':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      default:
        return 'text-stone-700 bg-stone-100 border-stone-200';
    }
  };

  return (
    <section id="events" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2">
              <span>School Calendar & Activities</span>
              <span aria-hidden="true">·</span>
              <span>School Year 2026–2027</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
              Calendar of Events
            </h2>
            <p className="mt-2 text-stone-600 text-sm max-w-xl">
              Stay synchronized with academic examinations, spiritual revivals, Adventurer club outdoor camps, and parent-teacher assemblies.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-stone-200/80 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-stone-900 shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>List View</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-stone-900 shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Card Grid</span>
            </button>
          </div>
        </div>

        {/* Filter Bar & Search Controls */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm mb-8 space-y-4">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Category Segmented Control (Interactive Filter Buttons) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedCategory === c.id
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200/70'
                  }`}
                >
                  {c.label} ({c.count})
                </button>
              ))}
            </div>

            {/* Keyword Search */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search events, chapel, exams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Results Count & Active Status */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-6 px-1">
          <div>
            Showing <span className="font-semibold text-stone-800 tabular-nums">{filteredEvents.length}</span> upcoming school events
            {selectedCategory !== 'all' && <span> in “{categories.find((c) => c.id === selectedCategory)?.label}”</span>}
          </div>
          {copiedId && (
            <span className="text-emerald-700 font-medium">✓ Event details copied to clipboard!</span>
          )}
        </div>

        {/* EVENTS LIST / GRID VIEW */}
        {filteredEvents.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-stone-200">
            <CalendarIcon className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h4 className="font-serif text-lg font-bold text-stone-800">No events matched your search</h4>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              Try adjusting your keyword filter or select “All Events” to see the complete calendar.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-3">
            {filteredEvents.map((evt) => {
              const isReminded = reminders[evt.id];
              return (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEvent(evt)}
                  className="group bg-white p-5 rounded-xl border border-stone-200 hover:border-amber-500/50 hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* Left: Date Block & Basic Info */}
                  <div className="flex items-start gap-4">
                    {/* Date Badge (Clean editorial column) */}
                    <div className="w-16 h-16 rounded-xl bg-stone-100 border border-stone-200 flex flex-col items-center justify-center text-center shrink-0 group-hover:bg-amber-50 group-hover:border-amber-200 transition-colors">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800">
                        {new Date(evt.date).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className="font-serif text-2xl font-bold text-stone-900 tabular-nums leading-none">
                        {new Date(evt.date).getDate()}
                      </span>
                    </div>

                    {/* Event Body */}
                    <div className="space-y-1">
                      {/* Zero-Pill Unboxed Metadata */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                        <span className="capitalize font-medium text-amber-900">{evt.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-400" />
                          <span>{evt.time}</span>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-stone-400" />
                          <span>{evt.location}</span>
                        </span>
                      </div>

                      <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                        {evt.title}
                      </h3>

                      <p className="text-xs text-stone-600 line-clamp-1 max-w-2xl">
                        {evt.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Quick Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <button
                      onClick={(e) => handleToggleReminder(evt.id, e)}
                      title={isReminded ? 'Reminder active' : 'Set reminder'}
                      className={`p-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        isReminded
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                      }`}
                    >
                      <Bell className={`w-3.5 h-3.5 ${isReminded ? 'fill-amber-600 text-amber-600' : ''}`} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadIcsFile(evt);
                      }}
                      title="Download to iCal / Google Calendar"
                      className="p-2 rounded-lg text-xs font-medium bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={(e) => handleShareEvent(evt, e)}
                      title="Copy event details"
                      className="p-2 rounded-lg text-xs font-medium bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setSelectedEvent(evt)}
                      className="px-3 py-1.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((evt) => {
              const isReminded = reminders[evt.id];
              return (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEvent(evt)}
                  className="group bg-white p-6 rounded-xl border border-stone-200 hover:border-amber-500/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="font-semibold uppercase text-amber-800 tracking-wider">
                        {evt.category}
                      </span>
                      <span className="tabular-nums font-medium text-stone-600">
                        {formatDisplayDate(evt.date)}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                      {evt.title}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                      {evt.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-stone-100 text-xs text-stone-600">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>{evt.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="truncate">{evt.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-stone-100">
                    <button
                      onClick={(e) => handleToggleReminder(evt.id, e)}
                      className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-md transition-colors ${
                        isReminded
                          ? 'bg-amber-100 text-amber-900 font-medium'
                          : 'text-stone-500 hover:bg-stone-100'
                      }`}
                    >
                      <Bell className={`w-3 h-3 ${isReminded ? 'fill-amber-600 text-amber-600' : ''}`} />
                      <span>{isReminded ? 'Reminded' : 'Remind Me'}</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadIcsFile(evt);
                      }}
                      className="text-xs text-amber-900 font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>Add to iCal</span>
                      <Download className="w-3 h-3" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* EVENT DETAIL MODAL */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full border border-stone-200 shadow-2xl overflow-hidden animate-in fade-in duration-200">
              
              {/* Modal Header */}
              <div className="bg-stone-900 text-white p-6 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
                    <span>{selectedEvent.category} event</span>
                    <span>·</span>
                    <span>School Year 2026–2027</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {selectedEvent.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5 text-stone-700">
                
                {/* Meta details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                  <div>
                    <span className="text-stone-400 uppercase font-semibold block text-[10px]">Date & Time</span>
                    <span className="font-medium text-stone-900">
                      {formatDisplayDate(selectedEvent.date)}
                      {selectedEvent.endDate && ` – ${formatDisplayDate(selectedEvent.endDate)}`}
                    </span>
                    <p className="text-stone-600 mt-0.5">{selectedEvent.time}</p>
                  </div>

                  <div>
                    <span className="text-stone-400 uppercase font-semibold block text-[10px]">Location</span>
                    <span className="font-medium text-stone-900">{selectedEvent.location}</span>
                  </div>

                  <div>
                    <span className="text-stone-400 uppercase font-semibold block text-[10px]">Organizer</span>
                    <span className="font-medium text-stone-900">{selectedEvent.organizer}</span>
                  </div>

                  <div>
                    <span className="text-stone-400 uppercase font-semibold block text-[10px]">Target Audience</span>
                    <span className="font-medium text-stone-900">{selectedEvent.targetAudience}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-500 mb-1">
                    Event Overview & Guidelines
                  </h4>
                  <p className="text-sm text-stone-800 leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Modal Actions */}
                <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleReminder(selectedEvent.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                        reminders[selectedEvent.id]
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>{reminders[selectedEvent.id] ? 'Reminder Set' : 'Set Reminder'}</span>
                    </button>

                    <button
                      onClick={() => handleShareEvent(selectedEvent)}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Copy Info</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => downloadIcsFile(selectedEvent)}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export to Calendar (.ics)</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
