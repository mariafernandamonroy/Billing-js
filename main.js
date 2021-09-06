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
  Nevera(consumo, procedencia, capacidad){
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
