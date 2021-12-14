import { isNgTemplate } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: any[], texto:string=''){
    
    if(texto === ''){
      return value;
    }
    if(!value){
      return value;
    }

    texto=texto.toLocaleLowerCase();
    
    return value.filter(
      item=> item.title.toLowerCase().includes(texto)||item.description.toLowerCase().includes(texto)
    ) 
    
    return null;
  }

}
