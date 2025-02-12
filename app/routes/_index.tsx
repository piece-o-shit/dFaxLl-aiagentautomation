import {
  LandingContainer,
  LandingCTA,
  LandingFAQ,
  LandingFeatures,
  LandingHero,
  LandingHowItWorks,
  LandingPainPoints,
  LandingPricing,
  LandingSocialProof,
  LandingSocialRating,
  LandingTestimonials,
} from '~/designSystem'

export default function LandingPage() {
  const features = [
    {
      heading: `Intelligent Task Automation`,
      description: `Create AI agents that handle repetitive tasks with human-like intelligence, freeing your team to focus on strategic work.`,
      icon: <i className="las la-robot"></i>,
    },
    {
      heading: `Drag-and-Drop Workflow Builder`,
      description: `Design complex automation workflows visually without writing code using our intuitive interface.`,
      icon: <i className="las la-project-diagram"></i>,
    },
    {
      heading: `Pre-built Agent Templates`,
      description: `Get started quickly with our library of industry-specific agent templates optimized for common use cases.`,
      icon: <i className="las la-copy"></i>,
    },
    {
      heading: `Advanced AI Capabilities`,
      description: `Leverage natural language processing and machine learning for human-like task execution and decision making.`,
      icon: <i className="las la-brain"></i>,
    },
    {
      heading: `Seamless Integration`,
      description: `Connect with your existing tools and systems through our extensive API and integration marketplace.`,
      icon: <i className="las la-plug"></i>,
    },
    {
      heading: `Real-time Monitoring`,
      description: `Track agent performance, receive alerts, and optimize workflows with comprehensive analytics.`,
      icon: <i className="las la-chart-line"></i>,
    },
  ]

  const testimonials = [
    {
      name: `Michael Chen`,
      designation: `CTO, TechFlow Solutions`,
      content: `We reduced our operational costs by 52% within 3 months of implementing the AI Agent Automation System. Our development team is now focused on innovation instead of maintenance.`,
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      name: `Sarah Johnson`,
      designation: `Head of Operations, DataCraft`,
      content: `The platform's ability to coordinate multiple AI agents has transformed our customer service. We're handling 3x the volume with better satisfaction scores.`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `David Martinez`,
      designation: `Engineering Manager, CloudScale`,
      content: `Setting up automated workflows used to take weeks. Now we can deploy sophisticated AI agents in hours. The ROI has been incredible.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Starter`,
      description: `Perfect for small teams getting started with automation`,
      monthly: 99,
      yearly: 990,
      features: [`5 AI Agents`, `Basic Templates`, `Email Support`],
    },
    {
      title: `Professional`,
      description: `Ideal for growing businesses with complex needs`,
      monthly: 299,
      yearly: 2990,
      features: [
        `Unlimited AI Agents`,
        `Advanced Templates`,
        `Priority Support`,
        `Custom Integrations`,
      ],
      highlight: true,
    },
    {
      title: `Enterprise`,
      description: `Custom solutions for large organizations`,
      monthly: 999,
      yearly: 9990,
      features: [
        `Dedicated Support`,
        `Custom Development`,
        `SLA Guarantee`,
        `On-premise Option`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `How quickly can I deploy my first AI agent?`,
      answer: `With our pre-built templates and intuitive interface, you can have your first AI agent up and running in less than 30 minutes.`,
    },
    {
      question: `Do I need coding experience to use the platform?`,
      answer: `No coding required! Our visual workflow builder and templates allow anyone to create sophisticated automation workflows.`,
    },
    {
      question: `What kind of support do you provide?`,
      answer: `We offer comprehensive documentation, email support, and priority support for Professional and Enterprise plans.`,
    },
    {
      question: `Can I integrate with my existing tools?`,
      answer: `Yes! We support integration with most popular business tools and provide an API for custom integrations.`,
    },
  ]

  const steps = [
    {
      heading: `Choose Your Template`,
      description: `Select from our library of pre-built AI agent templates or start from scratch.`,
    },
    {
      heading: `Customize Your Workflow`,
      description: `Use our visual builder to define your automation logic and business rules.`,
    },
    {
      heading: `Connect Your Tools`,
      description: `Integrate with your existing systems through our extensive marketplace.`,
    },
    {
      heading: `Monitor & Optimize`,
      description: `Track performance and fine-tune your automation with real-time analytics.`,
    },
  ]

  const painPoints = [
    {
      emoji: `😫`,
      title: `Drowning in repetitive tasks`,
    },
    {
      emoji: `💸`,
      title: `Wasting resources on manual work`,
    },
    {
      emoji: `🤯`,
      title: `Struggling with complex systems`,
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Transform Your Business with Intelligent Automation`}
        subtitle={`Create powerful AI agents that automate your workflows, reduce costs, and scale your operations - no coding required.`}
        buttonText={`Start Automating Now`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/dFaxLl-aiagentautomation-SnOk`}
        socialProof={
          <LandingSocialRating
            numberOfUsers={1000}
            suffixText={`from happy developers`}
          />
        }
      />
      <LandingSocialProof title={`Trusted By Industry Leaders`} />
      <LandingPainPoints
        title={`Businesses lose $5 trillion annually to inefficient processes. Don't be one of them.`}
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title={`Automate in Minutes, Not Months`}
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title={`Everything You Need to Scale Your Operations`}
        subtitle={`Powerful features that transform how you work`}
        features={features}
      />
      <LandingTestimonials
        title={`Join 1000+ Companies Already Saving Time and Money`}
        subtitle={`See how businesses like yours achieve more with AI automation`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Start Saving 40-60% on Operational Costs`}
        subtitle={`Choose the perfect plan for your automation needs`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Common Questions About AI Automation`}
        subtitle={`Everything you need to know to get started`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Ready to Transform Your Business?`}
        subtitle={`Join the automation revolution today and stay ahead of the competition`}
        buttonText={`Start Your Free Trial`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
