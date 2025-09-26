import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantService } from '../../tenant/tenant.service';
import { Tenant } from '../../schemas/tenant.schema';

// Extend Request interface to include tenant
declare global {
  namespace Express {
    interface Request {
      tenant?: Tenant;
      subdomain?: string;
    }
  }
}

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly tenantService: TenantService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      // Extract subdomain from request
      const host = req.get('host') || '';
      const subdomain = this.extractSubdomain(host);

      if (!subdomain) {
        // If no subdomain, this might be the main marketing site or API docs
        req.subdomain = null;
        return next();
      }

      // Find tenant by subdomain
      const tenant = await this.tenantService.findBySubdomain(subdomain);

      if (!tenant) {
        throw new NotFoundException('Tenant not found');
      }

      // Check if tenant is active
      if (tenant.status === 'suspended' || tenant.status === 'inactive') {
        return res.status(403).json({
          error: 'Account suspended',
          message: 'Please contact support to reactivate your account.'
        });
      }

      // Check trial expiry
      if (tenant.status === 'trial' && new Date() > tenant.trialEndsAt) {
        return res.status(403).json({
          error: 'Trial expired',
          message: 'Your trial has expired. Please upgrade to continue using the service.'
        });
      }

      // Attach tenant to request
      req.tenant = tenant;
      req.subdomain = subdomain;

      next();
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).json({
          error: 'Tenant not found',
          message: 'The subdomain you are trying to access does not exist.'
        });
      }

      return res.status(500).json({
        error: 'Internal server error',
        message: 'Something went wrong while processing your request.'
      });
    }
  }

  private extractSubdomain(host: string): string | null {
    const parts = host.split('.');

    // For localhost development
    if (host.includes('localhost') || host.includes('127.0.0.1')) {
      // Check for pattern: subdomain.localhost:port
      if (parts.length >= 2 && parts[0] !== 'localhost') {
        return parts[0];
      }
      return null;
    }

    // For production: subdomain.yourdomain.com
    if (parts.length >= 3) {
      return parts[0];
    }

    return null;
  }
}