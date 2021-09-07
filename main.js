'use strict';
class Electrodomesticos {
  constructor(consumo,procedencia){
    this.consumo = consumo;
    this.procedencia = procedencia;
    this.precio = 0.0;
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
    this.pulgadas = pulgadas;
    this.TDT = TDT;
  }

  getPulgadas(){
    return this.pulgadas;
  }

  isTDT() {
    return this.TDT;
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
      this.capacidad = capacidad;
  }

  getCapacidad() {
      return this.capacidad;
  }

  setCapacidad(capacidad) {
      this.capacidad = capacidad;
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

}

class Inventario{
  constructor(electrodomestico,televisor,nevera,cantidad){
    this.electrodomestico = electrodomestico;
    this.televisor = televisor;
    this.nevera = nevera;
    this.cantidad = cantidad;
    this.inventario = {
      cantidad: this.cantidad,
      consumo: electrodomestico.consumo,
      procedencia: electrodomestico.procedencia,
      tipoElectro: tipoElectro,
      pulgadas: televisor.pulgadas,
      tdt: televisor.tdt,
      cantidad: nevera.cantidad
    }
    console.log(inventario);
  }
  agregarInventario(){
    
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
    console.log("Precio general: " + precio);
    return precio;
  }
  seleccionTelevisor(consumo,procedencia,pulgadas,esTDT) {
      var tdt = esTDT == "si"? true : false;
      var televisor = new Televisor(consumo, procedencia, pulgadas, tdt);
      var precio = televisor.calcularPrecio();
      console.log("Precio televisor: " + precio);
      return precio;
  }
  seleccionNevera(consumo, procedencia,capacidad){
    var nevera = new Nevera(consumo, procedencia, capacidad);
    var precio = nevera.calcularPrecio();
    console.log("Precio nevera: " + precio);
    return precio;
  }
}


self.addEventListener("load",main);

function main() {
  var precioTotal = 0.0;
  var precioItem = 0;
  var controlador = new Controlador();
  // var inventario = new Inventario();

  document.querySelector("button").addEventListener("click",function(){
    var cantidad = document.getElementById("cantidad").value;
    var tipoElectro = document.getElementById("tipo_electrodomestico").value;
    var consumo = document.getElementById("consumo").value;
    var procedencia = document.getElementById("procedencia").value;
    var pulgadas = document.getElementById("pulgadas").value;
    var tdt = document.getElementById("tdt").value;
    var capacidad = document.getElementById("capacidad").value;

    if (tipoElectro == "general"){
      controlador.seleccionElectrodomesticos(consumo, procedencia);
    } else if (tipoElectro == "televisor"){
      controlador.seleccionTelevisor(consumo,procedencia,pulgadas,tdt);
    } else if (tipoElectro == "nevera"){    
      controlador.seleccionNevera(consumo, procedencia,capacidad);
    }
    // inventario.agregarInventario(cantidad,tipoElectro,consumo,procedencia,pulgadas,tdt,capacidad);
  })
}