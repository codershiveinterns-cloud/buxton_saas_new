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

export default function Home() {
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
    },
    {
      quote:
        'The safety compliance features alone make this worth it. We can track everything in one place and stay compliant with ease.',
      author: 'Sarah Thompson',
      role: 'Safety Officer',
      company: 'Apex Scaffolding',
    },
    {
      quote:
        'Amazing platform! Our team productivity has increased significantly since we started using BUXTON.',
      author: 'Michael Chen',
      role: 'Operations Director',
      company: 'Summit Projects',
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$29',
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
      price: '$79',
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
      description: 'For large organizations',
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
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            Scaffolding Management
            <br />
            <span className="text-gray-600">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            The modern platform for construction teams to manage scaffolding
            projects, ensure safety compliance, and collaborate seamlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors group"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12">
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <p className="text-gray-600 font-medium">Product Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by teams worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for your team. All plans include
              a 14-day free trial.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of teams managing their scaffolding projects with
            BUXTON.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-gray-900 bg-white rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
