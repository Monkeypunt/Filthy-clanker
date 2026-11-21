import React from 'react';
import { ServiceItem } from '../types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'coaching',
    name: 'Coaching in Marvel Rivals or Valorant',
    description: '1-on-1 coaching session for Marvel Rivals or Valorant.',
    price: '$1.23',
  },
];

interface ServicesSectionProps {
  onOrderService: (serviceName: string) => void;
  isCompact?: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOrderService,
  isCompact = false,
}) => {
  return (
    <section id="services" className="space-y-6 scroll-mt-20">
      <h2 className="text-2xl font-bold tracking-tight text-white">
        Services
      </h2>

      <div
        className={`grid grid-cols-1 ${
          isCompact ? 'sm:grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3'
        } gap-4 md:gap-5`}
      >
        {SERVICES.map((service) => (
          <div
            key={service.id}
            className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 flex flex-col justify-between gap-5 hover:border-neutral-700 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-semibold text-white">
                  {service.name}
                </h3>
                <span className="text-base font-semibold text-amber-400 tabular-nums shrink-0">
                  {service.price}
                </span>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {service.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOrderService(service.name)}
              className="w-full py-2 px-4 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium border border-neutral-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              Order
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
