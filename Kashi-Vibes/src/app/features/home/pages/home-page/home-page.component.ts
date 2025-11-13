import { Component } from '@angular/core';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { WhyChooseSectionComponent } from '../../components/why-choose-section/why-choose-section.component';
import { FeaturedToursComponent } from '../../components/featured-tours/featured-tours.component';
import { BoatSectionComponent } from '../../components/boat-section/boat-section.component';
import { ServicesComponent } from '../../components/services/services.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { AboutComponent } from '../../components/about/about.component';
import { FAQComponent } from '../../components/faq/faq.component';
import { CtaComponent } from '../../components/cta/cta.component';
import { ThingToDoComponent } from '../../components/thing-to-do/thing-to-do.component';
import { ServiceproviderComponent } from '../../components/serviceprovider/serviceprovider.component';
import { FleetSectionComponent } from '../../components/fleet-section/fleet-section.component';
import { KashivibesComponent } from '../../components/kashivibes/kashivibes.component';

@Component({
  selector: 'app-home-page',
  imports: [
    HeroSectionComponent,
    FeaturedToursComponent,
    BoatSectionComponent,
    ServicesComponent,
    TestimonialsComponent,
    AboutComponent,
    FAQComponent,
    CtaComponent,
    ThingToDoComponent,
    ServiceproviderComponent,
    FleetSectionComponent,
    KashivibesComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
