'use strict';
// import { randomUUID } from "crypto";
import fs from "fs-extra"; 

class Electrodomesticos {
  constructor(consumo,procedencia){
    this.nombre = "General";
    this.consumo = consumo;
    this.procedencia = procedencia;
    this.precio = 0.0;
  }

  setPrecio(precio){
      this.precio = precio;
  }

  calcularPrecio(){
    switch (this.consumo){
        case 'A': {
            this.precio += 450000;
            break;
        }
        case 'B': {
            this.precio += 350000;
            break;
        }
        case 'C': {
            this.precio += 250000;
            break;
        }
    }
    switch (this.procedencia){
        case "nacional":{
            this.precio += 250000;
            break;
        }
        case "importado":{
            this.precio += 350000;
            break;
        }
    }
    return this.precio;
  }
}

class Televisor extends Electrodomesticos {
  constructor(consumo, procedencia, pulgadas, TDT) {
    super(consumo, procedencia);
    this.nombre = "Televisor";
    this.pulgadas = pulgadas;
    this.TDT = TDT;
    this.precio = this.precio;
  }

  getPulgadas(){
    return this.pulgadas;
  }

  isTDT() {
    return this.TDT;
  }

  setPrecio(precio){
    this.precio = precio;
  }

  calcularPrecio() {
    var precio = super.calcularPrecio();
    var tamanoPulgadas = this.getPulgadas();
    var esTDT = this.isTDT();
    if(tamanoPulgadas > 40){
        precio += this.precio * 0.3;
        console.log("Se adiciona el 30% = " + precio);
    }
    if(esTDT == true){
        precio += 250000;
        console.log("Se adiciona 250.000");
    }
    return precio;
  }
}

class Nevera extends Electrodomesticos {
  constructor(consumo, procedencia, capacidad){
      super(consumo, procedencia);
      this.nombre = "Nevera";
      this.capacidad = capacidad;
      this.precio = this.precio;
  }

  getCapacidad() {
      return this.capacidad;
  }

  setCapacidad(capacidad) {
      this.capacidad = capacidad;
  }

  setPrecio(precio){
    this.precio = precio;
  }

  calcularPrecio(){
    var precio = super.calcularPrecio();
    var resultado = 0 ;
    this.capacidad = parseInt(this.capacidad);
    
    if (this.capacidad > 120){
      var extra = (this.capacidad - 120) / 10;
      resultado = precio * 0.05 * extra;
      console.log("valor añadido: "+ extra);
    }
    else{resultado = 0.00;}
    
    console.log("extra: " + resultado);

    return precio + resultado;
  }
}

class Facturación {
  constructor(inventario){
    this.inventario = inventario;
  }
  filtro = numeros.filter(function(inventario){return x});
}

class Inventario{
  constructor(producto){
    this.producto = producto;
    this.key = this.key;
    this.value = this.value;
  }
  agregarInventario(){
    // var inventario = {
    //   key: this.producto.nombre,
    //   value: this.producto
    // };
    // var object = JSON.stringify(this.producto);
    // window.localStorage.setItem(uuid.v1(),object);
    // console.log(inventario);

    var arrayJson = this.fs.readJSON(".\database.json").then((data) => console.log(data));
    this.fs.writeJSON(".\database.json",[...arrayJson, this.producto]);
    
  }
}

class Facturacion{
  constructor(){

  }
}

class Controlador {
  seleccionElectrodomesticos(consumo, procedencia){
    var electrodomestico = new Electrodomesticos(consumo,procedencia);
    var precio = electrodomestico.calcularPrecio();
    electrodomestico.precio;
    console.log("Precio general: " + electrodomestico.precio);
    return electrodomestico;
  }
  seleccionTelevisor(consumo,procedencia,pulgadas,esTDT) {
      var tdt = esTDT == "si"? true : false;
      var televisor = new Televisor(consumo, procedencia, pulgadas, tdt);
      var precio = televisor.calcularPrecio();
      televisor.setPrecio(precio);
      console.log("Precio televisor: " + televisor.precio);
      return televisor;
  }
  seleccionNevera(consumo, procedencia,capacidad){
    var nevera = new Nevera(consumo, procedencia, capacidad);
    var precio = nevera.calcularPrecio();
    nevera.setPrecio(precio);
    console.log("Precio nevera: " + nevera.precio);
    return nevera;
  }
}


self.addEventListener("load",main);

function main() {
  var precioTotal = 0.0;
  var producto = 0;
  var controlador = new Controlador();
  

  document.querySelector("button").addEventListener("click",function(){
    var cantidad = document.getElementById("cantidad").value;
    var tipoElectro = document.getElementById("tipo_electrodomestico").value;
    var consumo = document.getElementById("consumo").value;
    var procedencia = document.getElementById("procedencia").value;
    var pulgadas = document.getElementById("pulgadas").value;
    var tdt = document.getElementById("tdt").value;
    var capacidad = document.getElementById("capacidad").value;

    if (tipoElectro == "general"){
      producto = controlador.seleccionElectrodomesticos(consumo, procedencia);
    } else if (tipoElectro == "televisor"){
      producto = controlador.seleccionTelevisor(consumo,procedencia,pulgadas,tdt);
    } else if (tipoElectro == "nevera"){    
      producto = controlador.seleccionNevera(consumo, procedencia,capacidad);
    }
    var inventario = new Inventario(producto);
    inventario.agregarInventario();
        
  })
}