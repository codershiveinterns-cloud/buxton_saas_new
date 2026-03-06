import { Check } from 'lucide-react';

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export default function PricingCard({
  name,
  price,
  description,
  features,
  popular = false,
}: PricingCardProps) {
  return (
    <div
      className={`relative p-8 bg-white rounded-xl border-2 transition-all ${
        popular
          ? 'border-gray-900 shadow-xl'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gray-900 text-white px-4 py-1 rounded-full text-xs font-semibold">
            POPULAR
          </span>
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
        <div className="flex items-baseline mb-2">
          <span className="text-4xl font-bold text-gray-900">{price}</span>
          {price !== 'Custom' && (
            <span className="text-gray-600 ml-2">/month</span>
          )}
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      <button
        className={`w-full py-3 px-6 rounded-lg font-medium transition-colors mb-6 ${
          popular
            ? 'bg-gray-900 text-white hover:bg-gray-800'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
      >
        Get Started
      </button>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
