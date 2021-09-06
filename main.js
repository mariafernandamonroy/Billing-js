'use strict';
class Electrodomesticos {
  constructor(consumo,procedencia){
    this.consumo;
    this.procedencia;
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
    switch (procedencia){
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
    return TDT;
  }

  calcularPrecio() {
    precio = super.calcularPrecio();
    tamanoPulgadas = getPulgadas();
    esTDT = isTDT();
    if(tamanoPulgadas > 40){
        precio += this.precio * 0.3;
        System.out.println("Se adiciona el 30%");
    }
    if(esTDT == true){
        precio += 250000;
        System.out.println("Se adiciona 250.000");
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
      return capacidad;
  }

  setCapacidad(capacidad) {
      this.capacidad = capacidad;
  }

  valorExtra(precio){
      if (this.capacidad > 120){
          extra = (this.capacidad - 120) / 10;
          return precio * 0.05 * extra;
      }
      else{return 0.00;}
  }

  calcularPrecio(){
      return super.calcularPrecio() + valorExtra(getPrecio());
  }
}

class Controlador {
  seleccionTelevisor(consumo, procedencia) {
      var pulgadas = prompt("Ingrese las pulgadas: ");
      var esTDT = ("¿Tiene sintonizador de TDT? (si/no)");
      var tdt = tieneSintonizador(esTDT);
      var televisor = new Televisor(consumo, procedencia, pulgadas, tdt);
      let precio = televisor.calcularPrecio();

      return precio;
  }

  tieneSintonizador(esTDT){
      var tdt = false;
      if (esTDT == 's') {
          tdt = true;
      } else if (esTDT == 'n') {
          tdt = false;
      }
      return tdt;
  }
    seleccionNevera(consumo, procedencia){
    var capacidad = prompt("Ingrese la capacidad (lt): ");
    var nevera = new Nevera(consumo, procedencia, capacidad);
    precio = nevera.calcularPrecio();
    return precio;
  }
  seleccionElectrodomesticos(consumo, procedencia){
      var electrodomestico = new Electrodomesticos(consumo,procedencia);
      let precio = electrodomestico.calcularPrecio();

      return precio;
  }
}


self.addEventListener("load",main);

function main() {
  var salir = false;
  var precioTotal = 0.0;
  var controlador = new Controlador();

  while (!salir){
      var precioItem = 0;
      var tipoElectro = prompt("Por favor ingrese el tipo de electrodomestico: \n" +
              "1) Televisor \n" +
              "2) Nevera\n" +
              "3) Otros\n" +
              "");
      var consumo = prompt("Ingrese el consumo (A,B,C): ");
      var procedencia = ("Ingrese la procedencia (nacional,importado): ");

      switch (tipoElectro){
          case '1':
              precioItem = controlador.seleccionTelevisor(consumo, procedencia);
              precioTotal += precioItem;
              System.out.print("El precio de este item es de: " + precioItem + "\n");
              break;
          case '2':
              precioItem = controlador.seleccionNevera(consumo,procedencia);
              precioTotal += precioItem;
              System.out.print("El precio de este item es de: " + precioItem + "\n");
              break;
          case '3':
              precioItem = controlador.seleccionElectrodomesticos(consumo,procedencia);
              precioTotal += precioItem;
              System.out.print("El precio de este item es de: " + precioItem + "\n");
              break;
      }

      var decision = prompt("Desea finalizar?:\n" +
              "1) Si \n" +
              "2) No\n" +
              "");
      if (decision == '1'){salir=true;}
  }
  System.out.print("El costo total de su producto es de: " + precioTotal);
}