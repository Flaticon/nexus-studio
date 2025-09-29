import { Injectable } from '@nestjs/common';
import { TenantService } from '../tenant/tenant.service';
import { CreateTenantDto } from '../tenant/dto/tenant.dto';

@Injectable()
export class OnboardingService {
  constructor(private readonly tenantService: TenantService) {}

  async createTenantWithOnboarding(createTenantDto: CreateTenantDto) {
    // Create the tenant
    const tenant = await this.tenantService.create(createTenantDto);

    // Send welcome email (implement later)
    // await this.sendWelcomeEmail(tenant);

    // Log analytics event (implement later)
    // await this.analyticsService.track('tenant_created', { tenantId: tenant._id });

    return {
      tenant,
      onboardingSteps: this.getOnboardingSteps(),
      accessInfo: {
        dashboardUrl: `https://${tenant.subdomain}.yourdomain.com`,
        trialEndsAt: tenant.trialEndsAt,
        plan: tenant.plan
      }
    };
  }

  private getOnboardingSteps() {
    return [
      {
        id: 'welcome',
        title: 'Welcome to Venture Studio OS',
        description: 'Get familiar with your new venture management platform',
        completed: false,
        order: 1
      },
      {
        id: 'setup-profile',
        title: 'Complete your studio profile',
        description: 'Add your company information and branding',
        completed: false,
        order: 2
      },
      {
        id: 'create-first-venture',
        title: 'Create your first venture',
        description: 'Add your first startup or project to track',
        completed: false,
        order: 3
      },
      {
        id: 'invite-team',
        title: 'Invite your team',
        description: 'Add team members to collaborate on ventures',
        completed: false,
        order: 4
      },
      {
        id: 'explore-features',
        title: 'Explore key features',
        description: 'Learn about analytics, reporting, and automation',
        completed: false,
        order: 5
      }
    ];
  }

  async validateSubdomain(subdomain: string): Promise<{
    valid: boolean;
    available: boolean;
    suggestions?: string[];
    message?: string;
  }> {
    // Basic validation
    const subdomainRegex = /^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$/;

    if (!subdomainRegex.test(subdomain)) {
      return {
        valid: false,
        available: false,
        message: 'Subdomain must contain only lowercase letters, numbers, and hyphens'
      };
    }

    // Reserved words
    const reserved = [
      'www', 'api', 'admin', 'support', 'help', 'blog', 'docs', 'mail',
      'ftp', 'localhost', 'staging', 'test', 'dev', 'app', 'dashboard'
    ];

    if (reserved.includes(subdomain)) {
      return {
        valid: false,
        available: false,
        message: 'This subdomain is reserved',
        suggestions: this.generateSubdomainSuggestions(subdomain)
      };
    }

    // Check availability
    const available = await this.tenantService.checkSubdomainAvailable(subdomain);

    if (!available) {
      return {
        valid: true,
        available: false,
        message: 'This subdomain is already taken',
        suggestions: this.generateSubdomainSuggestions(subdomain)
      };
    }

    return {
      valid: true,
      available: true,
      message: 'Great! This subdomain is available'
    };
  }

  private generateSubdomainSuggestions(subdomain: string): string[] {
    const suggestions: string[] = [];
    const year = new Date().getFullYear();

    suggestions.push(`${subdomain}${year}`);
    suggestions.push(`${subdomain}-studio`);
    suggestions.push(`${subdomain}vc`);
    suggestions.push(`${subdomain}-ventures`);

    // Add random suffix
    for (let i = 0; i < 2; i++) {
      const randomSuffix = Math.floor(Math.random() * 999) + 100;
      suggestions.push(`${subdomain}${randomSuffix}`);
    }

    return suggestions.slice(0, 4);
  }

  getPricingPlans() {
    return [
      {
        id: 'starter',
        name: 'Starter',
        price: 299,
        currency: 'USD',
        interval: 'month',
        description: 'Perfect for new venture studios',
        features: [
          'Up to 5 active ventures',
          'Basic analytics dashboard',
          'Team collaboration tools',
          'Email support',
          '10GB storage'
        ],
        limits: {
          ventures: 5,
          users: 10,
          storage: 10240 // MB
        },
        popular: false
      },
      {
        id: 'professional',
        name: 'Professional',
        price: 799,
        currency: 'USD',
        interval: 'month',
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
        limits: {
          ventures: -1, // unlimited
          users: 50,
          storage: 51200 // MB
        },
        popular: true
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 1999,
        currency: 'USD',
        interval: 'month',
        description: 'For large venture studios',
        features: [
          'Everything in Professional',
          'Custom development',
          'Dedicated account manager',
          '24/7 phone support',
          'SLA guarantee',
          'Unlimited storage',
          'On-premise deployment option'
        ],
        limits: {
          ventures: -1,
          users: -1,
          storage: -1
        },
        popular: false
      }
    ];
  }
}