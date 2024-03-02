let montoDeInversion;
let tiempoDeInversion;
let interesEfectivoAnual;
let mejorTasa;
let diasTasaMasAlta;
let continuarSimulando;

class Cdt{
    constructor(monto, dias, fechaInicio){
        this.monto = monto;
        this.dias = dias;
        this.fechaInicio = fechaInicio;
        //this.fechaFin = fechaFin;
    }
}

let tablaTasas = [
    [9.4, 9.5, 10.4, 10.5, 10.6, 10.75, 10.65, 10.25, 9.5, 9.2, 9.2, 9.2],
    [9.4, 9.5, 10.4, 10.5, 10.6, 10.75, 10.65, 10.25, 9.6, 9.3, 9.3, 9.3],
    [9.5, 9.6, 10.5, 10.6, 10.7, 10.85, 10.75, 10.35, 9.7, 9.4, 9.4, 9.4],
    [9.6, 9.7, 10.6, 10.65, 10.75, 10.9, 10.8, 10.45, 9.8, 9.5, 9.5, 9.5],
    [9.6, 9.7, 10.6, 10.65, 10.75, 10.9, 10.8, 10.45, 9.8, 9.5, 9.5, 9.5],
    [9.7, 9.8, 10.7, 10.75, 10.85, 11.00, 10.9, 10.55, 9.9, 9.6, 9.6, 9.6],
    [9.7, 9.8, 10.7, 10.75, 10.85, 11.00, 10.9, 10.55, 9.9, 9.6, 9.6, 9.6],
    [9.3, 9.4, 10.2, 10.25, 10.35, 10.45, 10.4, 10.4, 9.6, 9.3, 9.3, 9.3],
];
let rangoDias = [30, 60, 90, 120, 150, 180, 240, 360, 540, 720, 1080, 1440, 1799];
let rangoMontos = [500, 5000, 20000, 50000, 200000, 500000, 1000000, 5000000];

function asignarTexto (elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function buscarFilaTasas(monto){
    const filaTablaTasas = (elemento) => elemento <= monto 
    return rangoMontos.findLastIndex(filaTablaTasas);
}

function buscarColumnaTasas(dias){
    const columnaTablaTasas = (elemento) => elemento <= dias 
    return rangoDias.findLastIndex(columnaTablaTasas);
}

function buscarTasa (dias, monto){
    return tablaTasas[buscarFilaTasas(monto)][buscarColumnaTasas(dias)];
}

function buscarMejorTasa(monto){
    tasasrespectivasMonto = tablaTasas.at(buscarFilaTasas(monto));
    mejorTasa = Math.max(...tasasrespectivasMonto);
    diasTasaMasAlta = tasasrespectivasMonto.indexOf(mejorTasa);
    console.log(`La mejor tasa es de ${mejorTasa} entre ${rangoDias[diasTasaMasAlta]} y ${rangoDias[diasTasaMasAlta+1]-1} días`);
}

function calcularRendimiento(monto, dias){
    let interes = buscarTasa(dias, monto);
    let rendimientos = Math.round(((monto*interes)/100)*((dias*30)/360));
    console.log(`Si inviertes ${monto} por ${dias} días`);
    console.log(`Tu rendimiento será de ${rendimientos}`);

    if(interes < mejorTasa){
        buscarMejorTasa(monto);
    }else if (interes == mejorTasa){
        console.log("Puedes obtener la mayor tasa de interes con el tiempo escogido")
    }
}

function mensajesAlCliente(){
    montoDeInversion =parseInt(prompt('Por favor ingrese el valor que quiere invertir (minimo 500)'));
    tiempoDeInversion = parseInt(prompt('Por favor indique a cuantos días quiere su CDT (minimo 30 maximo 1799)'));
    if(montoDeInversion < 500 || tiempoDeInversion <30) { 
        alert("Ingresa valores validos");
        mensajesAlCliente();
    }    
}

function volverASimular(){
    let respuesta = prompt("Deseas volver a simular si/no").toLowerCase();
    return respuesta;
}

function fechaInicio(){
    const  fechaInicio = new Date();
    return fechaInicio.getDate() + "-"+ (fechaInicio.getMonth()+1) + "-" +fechaInicio.getFullYear();;
}

// function fechaFin(tiempo){
//     const fechaFin = fechaInicio().getDatetiempo.getMonth()+mpo;
//     console.log(fechaFin);
// }




asignarTexto('#title-cdt','Simulador Rendimientos CDT');
asignarTexto('#text-description-cdt', 'Por favor ingrese el valor y los meses a los cuales quiere abrir tu CDT');

do{
    mensajesAlCliente();
    interesEfectivoAnual = buscarTasa(tiempoDeInversion, montoDeInversion);
    console.log(interesEfectivoAnual);
    buscarMejorTasa(montoDeInversion);
    calcularRendimiento(montoDeInversion, tiempoDeInversion); 
    console.log(`Fecha de Inicio CDT ${fechaInicio()}`);
    let cdt = new Cdt(montoDeInversion, tiempoDeInversion, fechaInicio());
    console.log(cdt);
    continuarSimulando = volverASimular();  
}while(continuarSimulando == "si");



