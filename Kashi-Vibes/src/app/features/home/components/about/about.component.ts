import { Component } from '@angular/core';
import { Award, Globe, Heart, LucideAngularModule, Users } from 'lucide-angular';

@Component({
  selector: 'app-about',
  imports: [LucideAngularModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  readonly Globe = Globe;
  readonly Award = Award;
  readonly Heart = Heart;
  readonly Users = Users;
}
