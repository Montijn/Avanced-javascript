import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar/navbar.component";
import { ListCategoryComponent } from "../../components/category/list-category/list-category.component";
import { CreateCategoryComponent } from "../../components/category/create-category/create-category.component";
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-category-overview-page',
    standalone: true,
    templateUrl: './category-overview-page.component.html',
    styleUrl: './category-overview-page.component.scss',
    imports: [NavbarComponent, ListCategoryComponent, CreateCategoryComponent]
})
export class CategoryOverviewPageComponent {
  categories: Category []
  huishoudboekjeId: string

  constructor(categoryService: CategoryService, route: ActivatedRoute ){
    this.huishoudboekjeId = route.snapshot.paramMap.get('id') ?? '';
    categoryService.getCategories(this.huishoudboekjeId).subscribe((categories: Category[]) => {
      if(categories){
        this.categories = categories
        console.log(this.categories)
      }
    })
  }
}
