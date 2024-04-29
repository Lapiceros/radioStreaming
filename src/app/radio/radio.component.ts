import { Component, OnInit } from '@angular/core';
import { Radios } from './radios';
import radios from '../../data/radios.json'
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss'
})
export class RadioComponent implements OnInit{
  title= 'Radio Singular';
  radioStations: Radios[] = [];
  inputValue!: string;
  filterArray!: Radios[];
  ngOnInit(): void {
    this.radioStations = radios;
  }
  searchRadio(){
    this.filterArray = this.radioStations.filter((radio: Radios) =>{
     return radio.name.includes(this.inputValue);
    })

    }
  }
