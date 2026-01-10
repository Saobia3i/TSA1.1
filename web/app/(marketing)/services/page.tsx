// app/marketing/services/page.tsx - FIXED WITH SERVICE CARD & LEARN MORE BUTTONS
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { ServiceCard } from '@/features/services/components/ServiceCard';
import { getAllServices } from '@/features/services/data/services';

const ITEMS_PER_PAGE = 6;

export default function ServicesPage() {
  const allServices = getAllServices();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredServices = allServices.filter((service) =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedServices = filteredServices.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '90px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 24px' }}>
        
        <Link href="/" style={{ textDecoration: 'none' }}>
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(17, 24, 39, 0.7)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '10px',
              padding: '10px 20px',
              color: 'white',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: '40px',
              fontFamily: 'var(--font-space-mono)',
            }}
          >
            <ArrowLeft style={{ width: '18px', height: '18px' }} />
            Back to Home
          </motion.button>
        </Link>

        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              background: 'linear-gradient(to right, #22d3ee, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '16px',
              fontFamily: 'var(--font-space-mono)',
            }}
          >
            Our Services
          </h1>
          <p style={{ fontSize: '16px', color: '#9ca3af', maxWidth: '700px', margin: '0 auto' }}>
            Professional cybersecurity and tech solutions for businesses
          </p>
        </div>

        <div style={{ maxWidth: '600px', margin: '0 auto 50px' }}>
          <div
            style={{
              position: 'relative',
              backgroundColor: 'rgba(17, 24, 39, 0.7)',
              borderRadius: '12px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              overflow: 'hidden',
            }}
          >
            <Search
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '20px',
                height: '20px',
                color: '#22d3ee',
              }}
            />
            <input
              type="text"
              placeholder="Search services by name or description..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: '100%',
                padding: '16px 16px 16px 48px',
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '15px',
                outline: 'none',
                fontFamily: 'var(--font-space-mono)',
              }}
            />
          </div>
          {searchQuery && (
            <p style={{ marginTop: '12px', fontSize: '14px', color: '#9ca3af', textAlign: 'center' }}>
              Found {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {displayedServices.length > 0 ? (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '28px',
                marginBottom: '50px',
                justifyContent: 'center',
                justifyItems: 'center',
              }}
            >
              {displayedServices.map((service, index) => (
                <ServiceCard
                  key={service.slug}
                  title={service.title}
                  shortDescription={service.shortDescription}
                  icon={service.icon}
                  slug={service.slug}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    background: currentPage === 1 ? 'rgba(17, 24, 39, 0.5)' : 'rgba(17, 24, 39, 0.7)',
                    color: currentPage === 1 ? '#6b7280' : 'white',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ChevronLeft style={{ width: '20px', height: '20px' }} />
                </motion.button>

                <span style={{ fontSize: '14px', color: '#9ca3af', fontFamily: 'var(--font-space-mono)' }}>
                  Page {currentPage} of {totalPages}
                </span>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    background: currentPage === totalPages ? 'rgba(17, 24, 39, 0.5)' : 'rgba(17, 24, 39, 0.7)',
                    color: currentPage === totalPages ? '#6b7280' : 'white',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ChevronRight style={{ width: '20px', height: '20px' }} />
                </motion.button>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '18px', color: '#9ca3af' }}>No services found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
