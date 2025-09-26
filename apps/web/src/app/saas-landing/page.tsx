'use client';

import React, { useState } from 'react';
import {
  Rocket,
  BarChart3,
  Users,
  Globe,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Headphones,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';

export default function SaaSLandingPage() {
  const [selectedPlan, setSelectedPlan] = useState('professional');

  const pricingPlans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 299,
      description: 'Perfect for new venture studios',
      features: [
        'Up to 5 active ventures',
        'Basic analytics dashboard',
        'Team collaboration tools',
        'Email support',
        '10GB storage'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 799,
      description: 'For growing venture studios',
      features: [
        'Unlimited ventures',
        'Advanced analytics & insights',
        'White-label branding',
        'Priority support',
        'API access',
        '50GB storage',
        'Custom integrations'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 1999,
      description: 'For large venture studios',
      features: [
        'Everything in Professional',
        'Custom development',
        'Dedicated account manager',
        '24/7 phone support',
        'SLA guarantee',
        'Unlimited storage'
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Managing Partner at InnoVentures',
      image: '/api/placeholder/64/64',
      quote: 'This platform transformed how we manage our portfolio. The insights are incredible.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Founder of TechStudio Labs',
      image: '/api/placeholder/64/64',
      quote: 'Finally, a tool built specifically for venture studios. Game changer for our operations.'
    },
    {
      name: 'Elena Petrov',
      role: 'Head of Operations at BuildCo',
      image: '/api/placeholder/64/64',
      quote: 'The automation features saved us 20+ hours per week. Amazing ROI.'
    }
  ];

  return (
    <div className=\"min-h-screen bg-gradient-to-b from-gray-50 to-white\">
      {/* Header */}
      <header className=\"bg-white shadow-sm\">
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
          <div className=\"flex justify-between items-center py-6 md:justify-start md:space-x-10\">
            <div className=\"flex justify-start lg:w-0 lg:flex-1\">
              <span className=\"text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent\">
                VentureOS
              </span>
            </div>
            <nav className=\"hidden md:flex space-x-10\">
              <a href=\"#features\" className=\"text-gray-600 hover:text-gray-900\">Features</a>
              <a href=\"#pricing\" className=\"text-gray-600 hover:text-gray-900\">Pricing</a>
              <a href=\"#testimonials\" className=\"text-gray-600 hover:text-gray-900\">Testimonials</a>
            </nav>
            <div className=\"hidden md:flex items-center justify-end md:flex-1 lg:w-0\">
              <Link href=\"/login\" className=\"text-gray-600 hover:text-gray-900 mr-4\">
                Sign in
              </Link>
              <Link
                href=\"/onboarding\"
                className=\"bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors\"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className=\"relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-20\">
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
          <div className=\"text-center\">
            <h1 className=\"text-4xl md:text-6xl font-extrabold mb-6\">
              The Operating System for
              <span className=\"block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent\">
                Venture Studios
              </span>
            </h1>
            <p className=\"text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100\">
              Manage your entire portfolio, track performance, and scale your venture studio with the most comprehensive platform built specifically for studio operators.
            </p>
            <div className=\"flex flex-col sm:flex-row gap-4 justify-center items-center\">
              <Link
                href=\"/onboarding\"
                className=\"bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2\"
              >
                <Rocket className=\"w-5 h-5\" />
                Start Free 30-Day Trial
              </Link>
              <Link
                href=\"#demo\"
                className=\"border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors\"
              >
                Watch Demo
              </Link>
            </div>
            <p className=\"text-sm text-blue-200 mt-4\">
              No credit card required • Setup in under 5 minutes • 500+ studios worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className=\"py-16 bg-white\">
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
          <div className=\"grid grid-cols-2 md:grid-cols-4 gap-8 text-center\">
            <div>
              <div className=\"text-3xl font-bold text-blue-600 mb-2\">500+</div>
              <div className=\"text-gray-600\">Venture Studios</div>
            </div>
            <div>
              <div className=\"text-3xl font-bold text-blue-600 mb-2\">$2B+</div>
              <div className=\"text-gray-600\">Assets Under Management</div>
            </div>
            <div>
              <div className=\"text-3xl font-bold text-blue-600 mb-2\">10,000+</div>
              <div className=\"text-gray-600\">Ventures Tracked</div>
            </div>
            <div>
              <div className=\"text-3xl font-bold text-blue-600 mb-2\">50+</div>
              <div className=\"text-gray-600\">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id=\"features\" className=\"py-20 bg-gray-50\">
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
          <div className=\"text-center mb-16\">
            <h2 className=\"text-3xl md:text-5xl font-bold text-gray-900 mb-4\">
              Everything You Need to Scale Your Studio
            </h2>
            <p className=\"text-xl text-gray-600 max-w-3xl mx-auto\">
              Built by venture studio operators, for venture studio operators. Every feature is designed to solve real problems you face every day.
            </p>
          </div>

          <div className=\"grid md:grid-cols-2 lg:grid-cols-3 gap-8\">
            {[
              {
                icon: BarChart3,
                title: 'Portfolio Analytics',
                description: 'Real-time insights across your entire portfolio with predictive analytics and benchmarking.'
              },
              {
                icon: Users,
                title: 'Team Management',
                description: 'Manage talent across ventures, track performance, and optimize team allocation.'
              },
              {
                icon: DollarSign,
                title: 'Financial Control',
                description: 'Budget tracking, burn rate analysis, and automated financial reporting for all ventures.'
              },
              {
                icon: Zap,
                title: 'Automation',
                description: 'Automate repetitive tasks, approvals, and workflows to focus on what matters.'
              },
              {
                icon: Globe,
                title: 'Global Access',
                description: 'Access your data from anywhere with enterprise-grade security and compliance.'
              },
              {
                icon: Shield,
                title: 'Enterprise Security',
                description: 'SOC2 compliant with advanced encryption and role-based access controls.'
              }
            ].map((feature, index) => (
              <div key={index} className=\"bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow\">
                <div className=\"bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6\">
                  <feature.icon className=\"w-6 h-6 text-blue-600\" />
                </div>
                <h3 className=\"text-xl font-bold text-gray-900 mb-4\">{feature.title}</h3>
                <p className=\"text-gray-600\">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id=\"pricing\" className=\"py-20 bg-white\">
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
          <div className=\"text-center mb-16\">
            <h2 className=\"text-3xl md:text-5xl font-bold text-gray-900 mb-4\">
              Simple, Transparent Pricing
            </h2>
            <p className=\"text-xl text-gray-600 max-w-2xl mx-auto\">
              Choose the plan that fits your studio size. All plans include a 30-day free trial.
            </p>
          </div>

          <div className=\"grid md:grid-cols-3 gap-8 max-w-5xl mx-auto\">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-2xl shadow-lg p-8 relative ${
                  plan.popular ? 'ring-2 ring-blue-600 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className=\"absolute -top-4 left-1/2 transform -translate-x-1/2\">
                    <span className=\"bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium\">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className=\"text-center\">
                  <h3 className=\"text-2xl font-bold text-gray-900 mb-2\">{plan.name}</h3>
                  <div className=\"text-4xl font-bold text-gray-900 mb-2\">
                    ${plan.price}
                    <span className=\"text-lg text-gray-500\">/month</span>
                  </div>
                  <p className=\"text-gray-600 mb-8\">{plan.description}</p>

                  <Link
                    href={`/onboarding?plan=${plan.id}`}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-colors inline-block ${
                      plan.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    Start Free Trial
                  </Link>
                </div>

                <div className=\"mt-8\">
                  <ul className=\"space-y-4\">
                    {plan.features.map((feature, index) => (
                      <li key={index} className=\"flex items-start gap-3\">
                        <CheckCircle className=\"w-5 h-5 text-green-500 mt-0.5 flex-shrink-0\" />
                        <span className=\"text-gray-600\">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id=\"testimonials\" className=\"py-20 bg-gray-50\">
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
          <div className=\"text-center mb-16\">
            <h2 className=\"text-3xl md:text-5xl font-bold text-gray-900 mb-4\">
              Trusted by Leading Venture Studios
            </h2>
          </div>

          <div className=\"grid md:grid-cols-3 gap-8\">
            {testimonials.map((testimonial, index) => (
              <div key={index} className=\"bg-white p-8 rounded-2xl shadow-sm\">
                <div className=\"flex mb-4\">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className=\"w-5 h-5 text-yellow-400 fill-current\" />
                  ))}
                </div>
                <blockquote className=\"text-gray-700 mb-6\">
                  \"{testimonial.quote}\"
                </blockquote>
                <div className=\"flex items-center gap-3\">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className=\"w-12 h-12 rounded-full\"
                  />
                  <div>
                    <div className=\"font-semibold text-gray-900\">{testimonial.name}</div>
                    <div className=\"text-gray-600 text-sm\">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className=\"py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white\">
        <div className=\"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center\">
          <h2 className=\"text-3xl md:text-5xl font-bold mb-6\">
            Ready to Transform Your Venture Studio?
          </h2>
          <p className=\"text-xl mb-8 text-blue-100\">
            Join 500+ venture studios worldwide using VentureOS to scale their operations.
          </p>
          <Link
            href=\"/onboarding\"
            className=\"bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2\"
          >
            <Rocket className=\"w-5 h-5\" />
            Start Your Free Trial Today
            <ArrowRight className=\"w-5 h-5\" />
          </Link>
          <p className=\"text-sm text-blue-200 mt-4\">
            30-day free trial • No credit card required • Setup in 5 minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className=\"bg-gray-900 text-white py-12\">
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
          <div className=\"grid md:grid-cols-4 gap-8\">
            <div>
              <div className=\"text-2xl font-bold mb-4\">VentureOS</div>
              <p className=\"text-gray-400\">
                The operating system for venture studios worldwide.
              </p>
            </div>
            <div>
              <h4 className=\"font-semibold mb-4\">Product</h4>
              <ul className=\"space-y-2 text-gray-400\">
                <li><a href=\"#features\" className=\"hover:text-white\">Features</a></li>
                <li><a href=\"#pricing\" className=\"hover:text-white\">Pricing</a></li>
                <li><a href=\"#\" className=\"hover:text-white\">API Docs</a></li>
              </ul>
            </div>
            <div>
              <h4 className=\"font-semibold mb-4\">Company</h4>
              <ul className=\"space-y-2 text-gray-400\">
                <li><a href=\"#\" className=\"hover:text-white\">About</a></li>
                <li><a href=\"#\" className=\"hover:text-white\">Blog</a></li>
                <li><a href=\"#\" className=\"hover:text-white\">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className=\"font-semibold mb-4\">Support</h4>
              <ul className=\"space-y-2 text-gray-400\">
                <li><a href=\"#\" className=\"hover:text-white\">Help Center</a></li>
                <li><a href=\"#\" className=\"hover:text-white\">Contact</a></li>
                <li><a href=\"#\" className=\"hover:text-white\">Status</a></li>
              </ul>
            </div>
          </div>
          <div className=\"border-t border-gray-800 mt-8 pt-8 text-center text-gray-400\">
            <p>&copy; 2024 VentureOS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}