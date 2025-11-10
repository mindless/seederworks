'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card, CardContent } from '@/components/ui/Card'

const blogArticles = [
  {
    id: '1',
    title: 'How to raise capital: 5 fundraising strategies for your startup',
    excerpt: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    featuredImage: '/images/dYp27i0NTnsb9DAuNpOoOrGVi8.png',
    date: 'Nov 10, 2025',
    slug: 'how-to-raise-capital',
  },
  {
    id: '2',
    title: 'We are leading Series A investment round for BRIX Templates',
    excerpt: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    featuredImage: '/images/cCPZaYBlqmUyBBNHcYowKCA4c.png',
    date: 'Nov 8, 2025',
    slug: 'series-a-brix-templates',
  },
  {
    id: '3',
    title: 'Early Stage Fund details for 2025 are now available',
    excerpt: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    featuredImage: '/images/f7Sp2t4S0ncnuVSBUty6vh9rc.png',
    date: 'Nov 5, 2025',
    slug: 'early-stage-fund-2025',
  },
  {
    id: '4',
    title: "Congratulations on new Webflow's Series D investment round",
    excerpt: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    featuredImage: '/images/BtwzvfLVvHYsiZEmra7L8zB4k.png',
    date: 'Nov 1, 2025',
    slug: 'webflow-series-d',
  },
]

export function BlogSection() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionLabel number="08/" className="justify-center" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0E1435] mb-6">
            News & articles
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative w-full h-64">
                  <Image
                    src={article.featuredImage}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <p className="text-sm text-[#3354FF] font-medium mb-2">{article.date}</p>
                  <h3 className="text-xl font-bold text-[#0E1435] mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <a
                    href={`/blog/${article.slug}`}
                    className="text-[#3354FF] hover:text-[#2844dd] font-medium transition-colors"
                  >
                    Read more →
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
