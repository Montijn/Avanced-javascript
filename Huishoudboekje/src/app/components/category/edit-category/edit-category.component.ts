import { Component } from '@angular/core';
import { Category } from '../../../models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category/category.service';
import { Timestamp } from 'firebase/firestore';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [NgIf, FormsModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent {
  categoryId: string = '';
  category: Category;
  endDate: Date;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private router: Router) {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId') ?? '';

   
  }

  ngOnInit(){
    this.categoryService.getCategory(this.categoryId).subscribe((category: Category) => {
      if (category) {
        this.category = category;
        if (this.category.endDate) {
          if (this.category.endDate instanceof Timestamp) {
            this.endDate = this.category.endDate.toDate();
          } else {
            this.endDate = new Date(this.category.endDate);
          }
        }
      }
    });
  }
  onSave(): void {
    this.category.endDate = Timestamp.fromDate(this.endDate);
    this.categoryService.updateCategory(this.category).then(() => {
      this.router.navigate(['/huishoudboekje', this.category.huishoudboekjeId, 'categories']);
    });
  }
}
