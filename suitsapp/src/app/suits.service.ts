import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { CHARACTERS } from './mock-data';

@Injectable()

export class SuitsService {

  constructor() { }

  getCharacters(): Observable<any[]>{
    var url = "http://localhost:8080/cast/";
    var that = this;
    var ret;

    $.ajax({
      url : url,
      type: "GET", //or POST?
      async: false,
      contentType : "application/json",
      dataType: "text",
      success: function(data){
          ret = JSON.parse(data);
      },
      error: function(xhr, status, error){
          alert(xhr + status + error);
          ret = CHARACTERS;
      }
    });

    return Observable.of(ret).delay(100);
  }
  getColumns(): string[]{
    return ["id","name", "job"]
  };

}
