import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { AccordionService } from './accordion.service';


export interface AccordionConfig {
  type ?: 'single' | 'multiple';
  animated ?: boolean;
  animationDuration ?: number;
  className ?: string;
}

export const ACCORDION_CONFIG = new InjectionToken<AccordionConfig>('ACCORDION_CONFIG');

@Injectable()

export class AccordionContextService {
  private config: Required<AccordionConfig>;

  constructor(
    private accordionService: AccordionService,

    @Optional() @Inject(ACCORDION_CONFIG) config: AccordionConfig | null
  ) {
    this.config = {
      type: config?.type || 'single',
      animated: config?.animated ?? true,
      animationDuration: config?.animationDuration ?? 200,
      className: config?.className ?? ''
    };

    // Initialize the AccordionService with the provided config

    this.accordionService.setType(this.config.type);
    this.accordionService.setAnimationConfig(this.config.animated, this.config.animationDuration);
   }

   getAccordionService(): AccordionService {
    return this.accordionService;
   }

   getConfig(): Required<AccordionConfig> {
      return this.config 
   }

   updateConfig(newConfig: Partial<AccordionConfig>): void {
    this.config = { ...this.config, ...newConfig};

    if (newConfig.type) {
      this.accordionService.setType(newConfig.type);
    }
    if (newConfig.animated !== undefined || newConfig.animationDuration) {
      this.accordionService.setAnimationConfig(
        newConfig.animated ?? this.config.animated,
        newConfig.animationDuration ?? this.config.animationDuration
      );
    }
   }


  }
