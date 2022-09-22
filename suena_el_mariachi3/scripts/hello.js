swal({
	title: "¡Bienvenido a Suena el mariachi!",
	text: "Se le dará una breve introducción de cómo usar éste juego patrio",
	icon: "./img/icon.png",
	buttons: {
		cancel: "Ya lo he jugado",
		next:{
			text: "¡Vamos allá!",
			value: "go"
		}
	}
})
.then((value) => {
		switch(value){
			case "go":
				step1();
				break;
		}
	}
);

function step1(){
	swal({
		title: "Paso 1",
		text: "El juego consiste en hacer que los mariachis toquen su múcisa lo más rápido posible.",
		icon: "./img/cantando.png",
		buttons: {
			cancel: "Ya lo he jugado",
			next:{
				text: "Siguiente",
				value: "go"
			}
		}
	}).then((value) => {
		switch(value){
			case "go":
				step2();
				break
		}
	}
	);
}

function step2(){
	swal({
		title: "Paso 2",
		text: "Para hacer que toquen su música, se debe tocar al mariachi, que aparecerá en una casilla aleatoria del escenario.",
		icon: "./img/time.png",
		buttons: {
			cancel: "Ya lo he jugado",
			next:{
				text: "Siguiente",
				value: "go"
			}
		}
	}).then((value) => {
		switch(value){
			case "go":
				step4();
				break
		}
	}
	);
}

function step4(){
	swal({
		title: "Paso 4",
		text: "Dependiendo de lo rápido que el mariachi sea tocado, se acumularán puntos de la manera explicada en la tabla de puntuaje",
		icon: "./img/puntuacion.png",
		buttons: {
			cancel: "Ya lo he jugado",
			point: {
				text: "Tabla de puntuaje",
				value: "points"
			},
			next:{
				text: "Siguiente",
				value: "go"
			}
		}
	}).then((value) => {
		switch(value){
			case "go":
				step5();
				break
			case "points":
				point_table();
				break
		}
	}
	);
}
function point_table(){
	var tabla_html = `<table>
			<thead>
				<tr>
					<th>
						Tiempo a tocar al mariachi
					</th>
					<th>
						Puntos asignados
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>
						Menos a 0.5 segundos
					</th>
					<th>
						X 2.0
					</th>
				</tr>
				<tr>
					<th>
						Entre 0.5 y 1 segundos
					</th>
					<th>
						X 1.0
					</th>
				</tr>
				<tr>
					<th>
						Entre 1 y 1.5 segundos
					</th>
					<th>
						X 0.5
					</th>
				</tr>
				<tr>
					<th>
						Mayor a 1.5 segundos
					</th>
					<th>
						X 0.1
					</th>
				</tr>
			</tbody>
		</table>`;
	var table = document.createElement("table")
	table.setAttribute("class", "table table-bordered");
	table.innerHTML = tabla_html;
	swal({
		title: "Tabla de puntuaje",
		text: "Los puntos se asignarán:",
		content: table,
		buttons: {
			cancel: "Ya lo he jugado",
			next:{
				text: "Siguiente",
				value: "go"
			}
		}
	}).then((value) => {
		switch(value){
			case "go":
				step5();
				break
		}
	}
	);
}
function step5(){
	swal({
		title: "Paso 5",
		text: "Los puntos se verán reflejados en una barra de progreso, que irá de 0 a la mayor puntuación por canción, que estará ubicada en la parte superior de la pantalla, sobre el tablero",
		buttons: {
			cancel: "Ya lo he jugado",
			next:{
				text: "Siguiente",
				value: "go"
			}
		}
	}).then((value) => {
		switch(value){
			case "go":
				step6();
				break
		}
	}
	);
}

function step6(){
	swal({
		title: "Paso 6",
		text: "Al finalizar, aparecerá un botón de reinicio, si se presiona, se pederán los puntos de la partida anterior.",
		buttons: {
			next:{
				text: "¡A jugar!",
				value: "go"
			}
		}
	}).then((value) => {
	}
	);
}
