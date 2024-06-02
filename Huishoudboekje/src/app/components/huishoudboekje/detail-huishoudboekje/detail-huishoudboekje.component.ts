import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { HuishoudboekjeService } from '../../../services/huishoudboekje/huishoudboekje.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Huishoudboekje } from '../../../models/huishoudboekje.model';

@Component({
  selector: 'app-detail-huishoudboekje',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule],
  templateUrl: './detail-huishoudboekje.component.html',
  styleUrl: './detail-huishoudboekje.component.scss'
})
export class DetailHuishoudboekjeComponent {
  selected_id: string = "";

  subscription: Subscription | undefined;

  huishoudboekjeForm: FormGroup;

  constructor(private huishoudboekjeService: HuishoudboekjeService, private route: ActivatedRoute, private formBuilder: UntypedFormBuilder) {
    this.selected_id = this.route.snapshot.paramMap.get('id') ?? "";

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.huishoudboekjeService.getHuishoudboekje(this.selected_id).subscribe((huishoudboekje: any) => {
      if (huishoudboekje) {
        this.huishoudboekjeForm = this.formBuilder.group(huishoudboekje);
      }
    });
  }

  onSave() {
    this.huishoudboekjeService.updateHuishoudboekje(this.huishoudboekjeForm.value)
  }
}
