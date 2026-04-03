import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PlanSelectionCard from '../components/PlanSelectionCard';
import { usePlan } from '../context/PlanContext';
import { savePendingPlanSelection } from '../services/planService';
import type { BillingCycle, PlanName } from '../types/plan';
import { PLAN_DEFINITIONS, formatPrice, getPlanLabel } from '../utils/planUtils';
import { isManagerRole } from '../utils/roleUtils';

export default function Pricing() {
  const navigate = useNavigate();
  const { planSnapshot, selectPlan, isSaving } = usePlan();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [selectedPlanName, setSelectedPlanName] = useState<PlanName>('starter');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
  const isAuthenticatedNonManager = Boolean(user) && !isManagerRole(user?.role);

  useEffect(() => {
    if (isAuthenticatedNonManager) {
      navigate('/dashboard', { replace: true });
      return;
    }

    if (planSnapshot?.plan) {
      setBillingCycle(planSnapshot.plan.billingCycle);
      setSelectedPlanName(planSnapshot.plan.name);
    }
  }, [isAuthenticatedNonManager, navigate, planSnapshot]);

  const handlePlanSelection = async (planName: PlanName) => {
    setSelectedPlanName(planName);

    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      savePendingPlanSelection({ planName, billingCycle });
      toast.success('Plan selected. Create your account to continue.');
      navigate('/signup');
      return;
    }

    try {
      await selectPlan(planName, billingCycle);
      toast.success(`${getPlanLabel(planName)} plan activated`);
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to activate the selected plan');
    }
  };

  const pricingPlans: PlanName[] = ['starter', 'professional', 'premium_plus'];

  return (
    <div className="min-h-screen bg-[#F6F3EE]">
      <Navbar />

      <main className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="rounded-[32px] border border-[#E5DED6] bg-gradient-to-br from-white via-[#F9F6F1] to-[#EFE9E1] p-8 shadow-sm sm:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#2563EB]">
                Pricing Plans
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-[#1F2937] sm:text-5xl">
                Pick the workspace plan that fits your team today
              </h1>
              <p className="mt-5 text-base leading-7 text-[#6B7280] sm:text-lg">
                Choose a plan, enter the app immediately, and unlock features based on that plan.
                The yearly switch is visual only for now and shows a 20% discount.
              </p>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-4">
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-[#1F2937]' : 'text-[#6B7280]'}`}>
                  Monthly
                </span>
                <button
                  type="button"
                  onClick={() => setBillingCycle((current) => (current === 'monthly' ? 'yearly' : 'monthly'))}
                  className="relative inline-flex h-7 w-12 items-center rounded-full bg-[#2563EB] transition-colors"
                  aria-label="Toggle billing cycle"
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                      billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-[#1F2937]' : 'text-[#6B7280]'}`}>
                    Yearly
                  </span>
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-[#1F2937] ring-1 ring-[#E5DED6]">
                    Save 20%
                  </span>
                </div>
              </div>

              {planSnapshot?.plan && (
                <div className="rounded-full bg-white px-4 py-2 text-sm text-[#6B7280] ring-1 ring-[#E5DED6]">
                  Current plan: <span className="font-semibold text-[#1F2937]">{planSnapshot.plan.label}</span>
                </div>
              )}
            </div>
          </section>

          <section className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-3">
            {pricingPlans.map((planName) => {
              const planDefinition = PLAN_DEFINITIONS[planName];
              const price = formatPrice(planName, billingCycle);
              const isCurrent = planSnapshot?.plan?.name === planName;
              const isSelected = selectedPlanName === planName;

              return (
                <PlanSelectionCard
                  key={planName}
                  name={planDefinition.label}
                  price={price.value}
                  originalPrice={price.original}
                  period={price.period}
                  description={planDefinition.description}
                  features={planDefinition.featureHighlights}
                  popular={planName === 'professional'}
                  isCurrent={isCurrent}
                  isSelected={isSelected}
                  isLoading={isSaving}
                  ctaLabel={isCurrent ? 'Current Plan' : 'Get Started'}
                  onSelect={() => handlePlanSelection(planName)}
                />
              );
            })}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
