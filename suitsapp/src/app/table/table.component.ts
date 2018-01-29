import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SuitsService } from '../suits.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  characters: Observable<any[]>;
  columns: string[];
  //initializing p to one
  p: number = 1;
  constructor(private atService: SuitsService) { }

  ngOnInit() {
    this.columns = this.atService.getColumns();
    //["name", "age", "species", "occupation"]

    this.characters = this.atService.getCharacters();
    //all data in mock-data.ts
  }

}
