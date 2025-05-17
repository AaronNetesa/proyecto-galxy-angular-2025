import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'std-dashboard-inicio-page',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './inicio-page.component.html',
  styleUrl: './inicio-page.component.scss'
})
export default class InicioPageComponent implements OnInit{

  ngOnInit(): void {

  }


}
