import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

declare var M: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ ProductService ]
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }
  addProduct(form?: NgForm) {
    this.productService.selectedProduct.name = form.controls['name'].value;
    this.productService.selectedProduct.cost = form.controls['cost'].value;
    console.log(this.productService.selectedProduct);
    if (form.value._id) {
      this.productService.putProduct(this.productService.selectedProduct)
        .subscribe(res => {
          this.resetForm(form);
          this.getProducts();
          M.toast({html: 'Actualizado satisfactoriamente'});
        });
    } else {
      this.productService.postProduct(this.productService.selectedProduct)
      .subscribe(res => {
        this.getProducts();
        this.resetForm(form);
        M.toast({html: 'Guardado satisfactoriamente'});
      });
    }
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe(res => {
        this.productService.products = res as Product[];
      });
  }

  editProduct(product: Product) {
    this.productService.selectedProduct = product;
  }

  deleteProduct(_id: string, form: NgForm) {
    if (confirm('¿Está seguro de eliminar el producto?')) {
      this.productService.deleteProduct(_id)
        .subscribe(res => {
          this.getProducts();
          this.resetForm(form);
          M.toast({html: 'Eliminado Satisfactoriamente'});
        });
    }
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.productService.selectedProduct.img = reader.result;
      };
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.productService.selectedProduct = new Product();
    }
  }

}
