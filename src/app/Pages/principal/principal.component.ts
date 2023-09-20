import { Component, OnInit } from '@angular/core';
import { GeralService } from 'src/app/Service/geral.service';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  setNome: string = "";
  setCategoria: string = "";
  setPreco: number = 0;
  setImg: string = "";

  listaRoupa: any[] = [];
  listaRoupaOriginal: any[] = []; 

  Objeto: any = {
    nome: this.setNome,
    categoria: this.setCategoria,
    preco: this.setPreco,
    img: this.setImg
  };

  constructor(
    private geralService: GeralService,
    private http: HttpClient // Add HttpClient to the constructor
  ) { }

  ngOnInit() {
    this.loadAllRoupas();
  }

  loadAllRoupas() {
    this.geralService.getAllRoupas().subscribe((result: any) => {
      this.listaRoupa = result;
      this.listaRoupaOriginal = result; // Salve uma cópia não filtrada
    });
  }
  filterCalcas() {
    this.listaRoupa = this.listaRoupaOriginal.filter(item => item.categoria.toLowerCase() === 'calça');
  }
  
  filterCamisa() {
    this.listaRoupa = this.listaRoupaOriginal.filter(item => item.categoria.toLowerCase() === 'camisa');
  }
  
  filterCasaco() {
    this.listaRoupa = this.listaRoupaOriginal.filter(item => item.categoria.toLowerCase() === 'casaco');
  }

  resetFilter() {
    this.listaRoupa = this.listaRoupaOriginal; 
  }

  AddRoupa() {
    // Update the Objeto with the current input values
    this.Objeto.nome = this.setNome;
    this.Objeto.categoria = this.setCategoria;
    this.Objeto.preco = this.setPreco;
    this.Objeto.img = this.setImg;

    // Call the service to add the item
    this.geralService.addRoupa(this.Objeto).subscribe((result: any) => {
      // You can update this.listaRoupa if needed
      // For example, if you want to refresh the list after adding a new item.
    });
  }

  deleteRoupa(id: number) {
    if (confirm("Você tem certeza que quer deletar isso?")) {
      this.geralService.deleteRoupa(id).subscribe(
        () => {
          alert("Deletado com sucesso!");
          // Optionally, you can refresh the list of items after deletion.
          this.loadAllRoupas();
        },
        (error) => {
          console.error("Erro ao deletar:", error);
          alert("Erro ao deletar o item.");
        }
      );
    }
  }
}
