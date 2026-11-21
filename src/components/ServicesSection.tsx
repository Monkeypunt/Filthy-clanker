import React from 'react';
import { PawPrint } from 'lucide-react';
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
      <div className="flex items-center gap-2.5">
        <PawPrint className="w-5 h-5 text-amber-600 shrink-0" aria-hidden="true" />
        <h2 className="text-2xl font-bold tracking-tight text-[#231a14]">
          Services
        </h2>
      </div>

      <div
        className={`grid grid-cols-1 ${
          isCompact ? 'sm:grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3'
        } gap-4 md:gap-5`}
      >
        {SERVICES.map((service) => (
          <div
            key={service.id}
            className="rounded-2xl border border-[#e7dfd5] bg-white p-6 flex flex-col justify-between gap-5 shadow-sm hover:border-amber-400/80 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-semibold text-[#231a14]">
                  {service.name}
                </h3>
                <span className="text-base font-bold text-amber-700 tabular-nums shrink-0">
                  {service.price}
                </span>
              </div>
              <p className="text-sm text-[#66574c] leading-relaxed">
                {service.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOrderService(service.name)}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shadow-xs"
            >
              Order
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
