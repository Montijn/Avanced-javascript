import { Component } from '@angular/core';
import { EditCategoryComponent } from "../../components/category/edit-category/edit-category.component";
import { NavbarComponent } from "../../components/navbar/navbar/navbar.component";

@Component({
    selector: 'app-category-edit-page',
    standalone: true,
    templateUrl: './category-edit-page.component.html',
    styleUrl: './category-edit-page.component.scss',
    imports: [EditCategoryComponent, NavbarComponent]
})
export class CategoryEditPageComponent {

}
