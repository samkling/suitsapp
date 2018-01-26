import { Component, OnInit, Input } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import {MatDialog, MatDialogRef} from '@angular/material';
import {PopupComponent} from '../popup/popup.component';



@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {

  @Input() id: any;
  @Input() character: any;
  @Input() columns: string[];

  dialogRef: MatDialogRef<PopupComponent>;

  constructor(public dialog: MatDialog) { }

  update(result) {
    var url = "http://localhost:8080/cast/update";
    var name1 = this.character.name;
    var job1 = this.character.job;

    if (result.name.length > 0){
      name1 = result.name;
    }
    if (result.job.length > 0) {
      job1 = result.job;
    }
    var d = {
      "id": this.character.id,
      "name": name1,
      "job": job1
    };

    $.ajax({
      url : url,
      type: "PUT",
      data: JSON.stringify(d), 
      async: false,
      contentType : "application/json",
      dataType: "text",
      success: function(data){
        console.log("success");
      },
      error: function(xhr, status, error){
          alert("Not");
      }
    });
    location.reload();
  }

  openDialog(name,job) {
    var r = "fbz";
    this.dialogRef = this.dialog.open(PopupComponent);
    this.dialogRef.afterClosed().subscribe((result) => {
      this.update(result);
      console.log(result);
    });
  }

  editPress(event) {
    console.log(this.character.id);
    console.log(this.character.name);
    console.log(this.character.job);


    //open popup
    this.openDialog(this.character.name,this.character.job);
  }

  deletePress(event) {
    var url = "http://localhost:8080/cast/remove/" + this.character.id;

    $.ajax({
      url : url,
      type: "DELETE", //or POST?
      async: false,
      contentType : "application/json",
      dataType: "text",
      success: function(data){
          console.log("success");
      },
      error: function(xhr, status, error){
          alert(xhr + status + error);
      }
    });

    //change this
    location.reload();
    
  }

  ngOnInit() {
  }

}

