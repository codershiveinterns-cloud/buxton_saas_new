import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  Zap,
  Users,
  BarChart,
  Clock,
  Globe,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';
import PricingCard from '../components/PricingCard';
import Statistics from '../components/Statistics';
import Workflow from '../components/Workflow';
import ProductPreview from '../components/ProductPreview';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';

export default function Home() {
  const [isYearly, setIsYearly] = useState(false);

  const features = [
    {
      icon: Shield,
      title: 'Safety First',
      description:
        'Ensure compliance with safety regulations and track certifications in real-time.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description:
        'Manage projects efficiently with our optimized workflow tools and automation.',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description:
        'Connect your entire team with seamless communication and task management.',
    },
    {
      icon: BarChart,
      title: 'Analytics & Insights',
      description:
        'Make data-driven decisions with comprehensive project analytics and reports.',
    },
    {
      icon: Clock,
      title: 'Time Tracking',
      description:
        'Track hours, manage schedules, and optimize resource allocation effortlessly.',
    },
    {
      icon: Globe,
      title: 'Accessible Anywhere',
      description:
        'Access your projects from any device, anywhere in the world, anytime.',
    },
  ];

  const testimonials = [
    {
      quote:
        "BUXTON has transformed how we manage our scaffolding projects. The platform is intuitive and has saved us countless hours.",
      author: 'James Mitchell',
      role: 'Project Manager',
      company: 'BuildRight Construction',
      avatar: 'https://i.pravatar.cc/150?u=james',
    },
    {
      quote:
        'The safety compliance features alone make this worth it. We can track everything in one place and stay compliant with ease.',
      author: 'Sarah Thompson',
      role: 'Safety Officer',
      company: 'Apex Scaffolding',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
    },
    {
      quote:
        'Amazing platform! Our team productivity has increased significantly since we started using BUXTON.',
      author: 'Michael Chen',
      role: 'Operations Director',
      company: 'Summit Projects',
      avatar: 'https://i.pravatar.cc/150?u=michael',
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: isYearly ? '$278' : '$29',
      originalPrice: isYearly ? '$348' : undefined,
      period: isYearly ? '/year' : '/month',
      description: 'Perfect for small teams getting started',
      features: [
        'Up to 5 team members',
        'Basic project management',
        '10 GB storage',
        'Email support',
        'Mobile app access',
      ],
    },
    {
      name: 'Professional',
      price: isYearly ? '$758' : '$79',
      originalPrice: isYearly ? '$948' : undefined,
      period: isYearly ? '/year' : '/month',
      description: 'For growing teams with advanced needs',
      features: [
        'Up to 20 team members',
        'Advanced analytics',
        '100 GB storage',
        'Priority support',
        'Custom workflows',
        'API access',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: isYearly ? 'Custom pricing with yearly contract' : 'For large organizations',
      features: [
        'Unlimited team members',
        'Enterprise analytics',
        'Unlimited storage',
        '24/7 dedicated support',
        'Custom integrations',
        'Advanced security',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F3EE]">
      <Navbar />

      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle radial gradients for premium depth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-[#E5DED6] blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1F2937] mb-6 tracking-tight">
            Scaffolding Management
            <br />
            <span className="text-indigo-600">Made Simple</span>
          </h1>
          <p className="text-xl text-[#6B7280] mb-10 max-w-3xl mx-auto leading-relaxed">
            The modern platform for construction teams to manage scaffolding
            projects, ensure safety compliance, and collaborate seamlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-[#2563EB] rounded-lg hover:bg-[#1D4ED8] shadow-sm transition-colors group"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <Statistics />

      <Workflow />

      <ProductPreview />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1F2937] mb-4">
              Everything you need
            </h2>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              Powerful features to streamline your scaffolding operations and
              boost team productivity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#EFE9E1]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1F2937] mb-4">
              Trusted by teams worldwide
            </h2>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              See what our customers have to say about their experience with
              BUXTON.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1F2937] mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto mb-8">
              Choose the plan that works best for your team. All plans include
              a 14-day free trial.
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className={`text-sm font-medium ${!isYearly ? 'text-[#1F2937]' : 'text-[#6B7280]'}`}>Monthly</span>
              <button
                type="button"
                className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-[#2563EB] transition-colors duration-200 ease-in-out focus:outline-none"
                role="switch"
                aria-checked={isYearly}
                onClick={() => setIsYearly(!isYearly)}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isYearly ? 'translate-x-5' : 'translate-x-0'}`}
                />
              </button>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${isYearly ? 'text-[#1F2937]' : 'text-[#6B7280]'}`}>Yearly</span>
                <span className="inline-flex items-center rounded-full bg-[#EFE9E1] px-2 py-0.5 text-xs font-medium text-[#1F2937] ring-1 ring-[#E5DED6]">
                  Save 20%
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>

      <FAQ />

      <Newsletter />

      <Footer />
    </div>
  );
}
