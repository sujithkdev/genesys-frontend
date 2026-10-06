'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Users, Clock, BookOpen } from 'lucide-react';
import { Course } from '@/types';
import { clsx } from 'clsx';

interface CourseCardProps {
  course: Course;
  className?: string;
}

const LEVEL_STYLES: Record<string, string> = {
  beginner:     'badge-green',
  intermediate: 'badge-amber',
  advanced:     'badge-red',
};

export function CourseCard({ course, className }: CourseCardProps) {
  const effectivePrice = course.discount_price ?? course.price;
  const hasDiscount    = !!course.discount_price && Number(course.discount_price) < Number(course.price);
  const discountPct    = hasDiscount
    ? Math.round((1 - Number(effectivePrice) / Number(course.price)) * 100) : 0;

  return (
    <Link href={`/courses/${course.slug}`}>
      <div className={clsx(
        'group flex flex-col overflow-hidden cursor-pointer',
        'bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800',
        'hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-xl',
        'transition-all duration-250',
        className
      )}>
        {/* ── Thumbnail */}
        <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800" style={{ aspectRatio: '16/9' }}>
          {course.thumbnail_url ? (
            <Image
              src={course.thumbnail_url}
              alt={course.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-400"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/30 dark:to-brand-800/30">
              <BookOpen className="w-10 h-10 text-brand-400 dark:text-brand-500" />
            </div>
          )}
          {/* Badges overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {course.is_free && (
              <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">FREE</span>
            )}
            {hasDiscount && (
              <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                -{discountPct}%
              </span>
            )}
          </div>
          <div className="absolute top-3 right-3">
            <span className={clsx('badge text-xs capitalize', LEVEL_STYLES[course.level] || 'badge-gray')}>
              {course.level}
            </span>
          </div>
        </div>

        {/* ── Body */}
        <div className="flex flex-col flex-1 p-4 gap-2.5">
          {/* Category */}
          {course.category_name && (
            <p className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wide">
              {course.category_name}
            </p>
          )}

          {/* Title */}
          <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {course.title}
          </h3>

          {/* Instructor */}
          <p className="text-xs text-gray-500 dark:text-gray-400">by {course.instructor_name}</p>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[1,2,3,4,5].map(s => (
                <Star key={s} className={clsx('w-3.5 h-3.5',
                  s <= Math.round(Number(course.avg_rating))
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-gray-300 dark:text-gray-600'
                )} />
              ))}
            </div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
              {Number(course.avg_rating).toFixed(1)}
            </span>
            <span className="text-xs text-gray-400">
              ({course.total_reviews.toLocaleString()})
            </span>
          </div>

          {/* Meta chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {course.total_students.toLocaleString()} students
            </span>
            {course.total_lessons > 0 && (
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                {course.total_lessons} lessons
              </span>
            )}
            {course.duration_hours && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {course.duration_hours}h
              </span>
            )}
          </div>

          {/* ── Price */}
          <div className="flex items-center gap-2 mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
            {course.is_free ? (
              <span className="text-base font-extrabold text-green-600 dark:text-green-400">Free</span>
            ) : (
              <>
                <span className="text-base font-extrabold text-gray-900 dark:text-white">
                  ₹{Number(effectivePrice).toLocaleString('en-IN')}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-gray-400 line-through">
                    ₹{Number(course.price).toLocaleString('en-IN')}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
