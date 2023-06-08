export class Usuario{
    claveUsuario:string;
    emailUsuario:string;
    fechaIngresoUsuario:string;
    nombreUsuario:string;
    constructor(clave:string, email:string, fechaIngreso:string, nombre:string){
        this.claveUsuario=clave;
        this.emailUsuario=email;
        this.fechaIngresoUsuario=fechaIngreso;
        this.nombreUsuario=nombre;
    }
}
