'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { motion } from 'framer-motion'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#D8DBE9]"
    >
      <Container>
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#0E1435]">SeederWorks</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/why"
              className="text-sm font-medium text-[#0E1435] hover:text-[#3354FF] transition-colors"
            >
              Why
            </Link>
            <Link
              href="/model"
              className="text-sm font-medium text-[#0E1435] hover:text-[#3354FF] transition-colors"
            >
              Model
            </Link>
            <Link
              href="/focus"
              className="text-sm font-medium text-[#0E1435] hover:text-[#3354FF] transition-colors"
            >
              Focus
            </Link>
            <Link
              href="/ventures"
              className="text-sm font-medium text-[#0E1435] hover:text-[#3354FF] transition-colors"
            >
              Ventures
            </Link>
            <Link
              href="/invest"
              className="text-sm font-medium text-[#0E1435] hover:text-[#3354FF] transition-colors"
            >
              Invest
            </Link>
            <Link
              href="/team"
              className="text-sm font-medium text-[#0E1435] hover:text-[#3354FF] transition-colors"
            >
              Team
            </Link>
            <Link
              href="/connect"
              className="text-sm font-medium text-[#0E1435] hover:text-[#3354FF] transition-colors"
            >
              Connect
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="primary" size="default">
              Invest with Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-[#D8DBE9]"
          >
            <div className="flex flex-col space-y-4">
              <Link
                href="/why"
                className="text-sm font-medium text-[#0E1435] hover:text-[#3354FF] transition-colors"
              >
                Why
              </Link>
              <Link
                href="/model"
                className="text-sm font-medium text-[#0E1435] hover:text-[#3354FF] transition-colors"
              >
                Model
              </Link>
              <Link
                href="/focus"
                className="text-sm font-medium text-[#0E1435] hover:text-[#3354FF] transition-colors"
              >
                Focus
              </Link>
              <Link
                href="/ventures"
                className="text-sm font-medium text-[#0E1435] hover:text-[#3354FF] transition-colors"
              >
                Ventures
              </Link>
              <Link
                href="/invest"
                className="text-sm font-medium text-[#0E1435] hover:text-[#3354FF] transition-colors"
              >
                Invest
              </Link>
              <Link
                href="/team"
                className="text-sm font-medium text-[#0E1435] hover:text-[#3354FF] transition-colors"
              >
                Team
              </Link>
              <Link
                href="/connect"
                className="text-sm font-medium text-[#0E1435] hover:text-[#3354FF] transition-colors"
              >
                Connect
              </Link>
              <Button variant="primary" size="default" className="w-full">
                Invest with Us
              </Button>
            </div>
          </motion.div>
        )}
      </Container>
    </motion.header>
  )
}
