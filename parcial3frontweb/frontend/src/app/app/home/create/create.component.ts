import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  public nombreRestaurante: string = "";
  public puntuacionRestaurante: number = 0;
  public comentarioRestaurante: string = "";

  constructor(private http: HttpClient, private router: Router) {
    // Desactiva la reutilización de rutas para que se actualice correctamente al navegar
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  public createCourse() {

    // Obtén el token desde el almacenamiento de la sesión
    var token = sessionStorage.getItem('session_token');

    if (!token) {
      console.error("Token no encontrado. No se puede realizar la solicitud.");
      return;
    }

    var url = "http://localhost:9898/api/resenas";

    // Establece los encabezados con el token de autorización
    var headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`) // Prefijo 'Bearer' necesario
      .set('Content-Type', 'application/json'); // Establece el tipo de contenido

    // Cuerpo de la solicitud con los datos de la reseña
    var body = {
      restaurante: this.nombreRestaurante,
      puntuacion: this.puntuacionRestaurante,
      comentario: this.comentarioRestaurante
    };

    // Realiza la solicitud HTTP POST
    this.http.post(url, body, { headers }).subscribe({
      next: resp => {
        console.log("Reseña publicada exitosamente:", resp);
        this.router.navigate(['/home']); // Navega a la página principal
      },
      error: err => {
        console.error("Error al publicar la reseña:", err);
      }
    });
  }

}
