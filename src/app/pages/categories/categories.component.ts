import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CategoriesService } from 'src/app/core/services/CategoriesService/categories.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule, FormsModule, NgFor, RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  public showModalCreate: boolean = false;
  public showModalModify: boolean = false;
  public formCategory : FormGroup = this._initForm();
  public formCategoryCreate : FormGroup = this._initForm();
  public spinnerLoader: boolean = false;
  private _categoriesSelected: any;
  public users: any[] = [];


  categories: any = [];
  

  constructor( 
    private categoriesService : CategoriesService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this._getAllCategories();
  }

  private _initForm() : FormGroup<any> {
    return this.formBuilder.group({
      cat_name: ['', Validators.required],
      cat_id: [''],
      // cat_color: [''] // Valor por defecto para el color de la categoría

    });
  }

  public returnUserName(usu_id: number): string {
    const name = this.users.find((usu: any) => usu.usu_id === usu_id);
    return name ? name.usu_name : 'Unknown';
  }

  public async submitForm() {

    this.spinnerLoader = true;

    if (this.formCategory.valid === false)  return this.spinnerLoader = false, this._alert(2, 'Error', 'Faltan campos por rellenar') ;

    const usu_id = Number(localStorage.getItem('usu_id'));

    const categorys = {
      cat_name: this.formCategory.value.cat_name,
      // cat_color: this.formCategory.value.cat_color
    }

    const result = (await this.categoriesService.updateCategory(categorys,this._categoriesSelected, usu_id)).subscribe({
      next: (data) => { 
        this._alert(1, 'Categoria actualizada', 'Se actualizo la categoria correctamente');
        this._getAllCategories();
        this.showModalModify = false;
        this.spinnerLoader = false;
      },
      error: (err) => {
        this._alert(2, 'Error', 'No se pudo crear la categoria');
        console.log(err);
        this.spinnerLoader = false;
      }
    });
  }

  public async submitFormCreate() {

    this.spinnerLoader = true;

    if (this.formCategoryCreate.valid === false)  return this.spinnerLoader = false, this._alert(2, 'Error', 'Faltan campos por rellenar') ;

    const usu_id = Number(localStorage.getItem('usu_id'));

    const categorys2 = {
      cat_name: this.formCategoryCreate.value.cat_name,
      usu_id: usu_id,
      // cat_color: this.formCategoryCreate.value.cat_color
    }
    
    const result2 = (await this.categoriesService.createCategories(categorys2)).subscribe({
      next: (data) => {
        this._alert(1, 'Categoria creada', 'Se creo la categoria correctamente');
        this._getAllCategories();
        this.showModalCreate = false;
        this.spinnerLoader = false;
      },
      error: (err) => {
        this._alert(2, 'Error', 'No se pudo crear la categoria');
        console.log(err);
        this.spinnerLoader = false;
      }
    });
    
  }

  private _getAllCategories = async () => {
    (await this.categoriesService.getAllCategories()).subscribe({
      next: (data) => {
        this.categories = data.categories;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.categories = [];
      }
    });
  }

  onClickCategory() {
    
  }
  
  onClickDelete(cat_id: number, cat_name: string){
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Estás por eliminar la categoría ${cat_name}`,
      icon: "warning",
      background: 'var(--secondary-color)',
      color: 'var(--light-color)',
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: 'var(--main-color)',
      cancelButtonText: "Cancel",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = (await this.categoriesService.deleteCategory(cat_id)).subscribe({
          next: (data) => {
            this._getAllCategories();
            this._alert(1, "Eliminado", "La categoría ha sido eliminada.");
          },
          error: (err) => {
            console.error('Error al eliminar la categoría: ', err);
            this._alert(2, "Error", "Error al intentar eliminar la categoría, intente más tarde");
          }
        })
      }
    });
  }

  onClickModify(cat_id: number){
    this.showModalModify = true;
    this._categoriesSelected = cat_id;
    const categorys = this.categories.find((cat: any) => cat.cat_id === cat_id);
    this.formCategory.patchValue({
      cat_id: categorys.cat_id,
      cat_name: categorys.cat_name,
      // cat_color: categorys.cat_color

    });

  }

  onClickAddCategory(){
    this.showModalCreate = true;
    this.formCategoryCreate.reset();
    this._categoriesSelected = null
  }

  onClickCancel(){
    this.showModalModify = false;
    this.showModalCreate = false;
    this.formCategory.reset();
    this.formCategoryCreate.reset();
  }

  private _alert = (type: number, title: string, text: string) => {
    Swal.fire({
      icon: type === 1 ? "success" : "error",
      title: title,
      text: text,
      color: "var(--main-color)",
      background: "var(--secondary-color)",
      confirmButtonColor: "var(--main-color)",
    });
  }
}


