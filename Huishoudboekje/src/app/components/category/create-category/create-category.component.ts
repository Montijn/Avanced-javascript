import { Component } from '@angular/core';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category/category.service';
import { ActivatedRoute } from '@angular/router';
import { Timestamp } from 'firebase/firestore';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent {
  private huishoudboekjeId: string;
  endDate: Date;

  category: Category = {
    id: '',
    huishoudboekjeId: '',
    maxBudget: 0,
    name: '',
  }
  constructor(private categoryService: CategoryService,  private route: ActivatedRoute) {
    this.huishoudboekjeId = this.route.snapshot.paramMap.get("id") ?? "";
    console.log(this.huishoudboekjeId);
  }

  onAdd() {
    if (this.category.maxBudget > 0) {
      this.category.huishoudboekjeId = this.huishoudboekjeId;
      if(this.category.endDate){
        this.category.endDate = Timestamp.fromDate(this.endDate)
      }
      this.categoryService.addCategory(this.category);
    }
    this.category = {  
      id: '',
      huishoudboekjeId: '',
      maxBudget: 0,
      name: '',
      endDate: null
    };
  }
}
