import InfoPageLayout from '../components/InfoPageLayout';

export default function Pricing() {
  return (
    <InfoPageLayout
      title="Pricing"
      intro="Our pricing is designed to stay practical for construction businesses that want professional project management software without unnecessary complexity."
      paragraphs={[
        'ZENTIVORA offers plans that scale from smaller project teams to larger operations managing multiple active sites. Each plan is structured around the features teams use every day, including project organization, shared documents, task tracking, and collaboration tools.',
        'As teams grow, they can unlock more storage, broader user access, and advanced operational support without rebuilding their workflow from scratch. This helps businesses expand their use of the platform in a controlled and cost-effective way.',
        'If your company needs a more tailored rollout, we can support a custom setup that aligns with your reporting needs, team size, and implementation timeline. The goal is simple pricing that matches real operational value.',
      ]}
    />
  );
}
