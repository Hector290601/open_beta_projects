var selected = [];
var data = [];
var goted = [];

function on_load(){
	time_changed();
	build_table();
}

function delay(time){
	return new Promise(resolve => setTimeout(resolve, time));
}

function build_table(){
	var field = document.createDocumentFragment();
	for(var rows = 0; rows < 10; rows++){
		var row = document.createElement("div");
		var selected_row = [];
		for(var col = 0; col < 10; col++){
			var point = document.createElement("div");
			point.id = rows+","+col+"d";
			point.className="col";
			var text = document.createTextNode(rows+""+col);
			var button = document.createElement("button");
			button.id = rows+","+col;
			button.type="button"
			button.className="btn btn-secondary";
			button.appendChild(text);
			point.appendChild(button);
			point.style.width = "auto";
			point.style.height = "auto";
			button.style.width = "100%";
			button.style.height = "100%";
			button.addEventListener('click', function (){
				const id = event.srcElement.id;
				var positions = id.split(",");
				var i = positions[0];
				var j = positions[1];
				current = selected[i][j];
				if(current){
					event.srcElement.className="btn btn-secondary"
				}else{
					event.srcElement.className="btn btn-primary"
				}
				selected[i][j] = !selected[i][j];
			}
			);
			row.appendChild(point);
			selected_row.push(false)
		}
		row.style.width = "auto";
		row.style.height = "auto";
		row.id = rows;
		row.className = "row row-cols-10";
		field.appendChild(row);
		selected.push(selected_row);
	}
	document.getElementById("field").appendChild(field);
	document.getElementById("field").style.width = "100%";
	document.getElementById("field").style.height = "100%";
}

function clean_matrix(){
	for(var i = 0; i < 10; i++){
		for(var j = 0; j < 10; j++){
			var col = document.getElementById(i+","+j+"d");
			var last = document.getElementById(i+","+j);
			if(selected[i][j]){
				var input = document.createElement("input");
				input.style.width = "100%";
				input.style.height = "100%";
				input.id=i+","+j+"i";
				input.type="number";
				input.addEventListener("keypress", function(event){
					if(event.key == "Enter"){
						event.preventDefault();
						document.getElementById("submit").click();
					}
				});
				last.firstChild.data = String("___");
				col.replaceChild(input, last);
			}
		}
	}
	var button = document.createElement("button");
	var text = document.createTextNode("enviar");
	button.id="submit";
	button.appendChild(text);
	button.type="submit"
	button.className="btn btn-primary"
	button.addEventListener('click', function(){
		var progress = document.createElement("div");
		progress.style.width = "100%";
		progress.style.height = "100%";
		var aciertos = 0;
		var total = 0;
		for(var i = 0; i < 10; i++){
			var c = [];
			for(var j = 0; j < 10; j++){
				if(selected[i][j]){
					total += 1;
					var selection = document.getElementById(i+","+j+"i");
					selection.type=""
					var goal = data[i][j];
					var text = document.createTextNode(selection.value);
					var button = document.createElement("button");
					button.id = i+","+j+"r";
					button.appendChild(text);
					button.style.width = "100%";
					button.style.height = "100%";
					c.push(selection.value);
					var col = document.getElementById(i+","+j+"d");
					var last = document.getElementById(i+","+j+"i");
					if(parseInt(selection.value) == goal){
						button.className="btn btn-success";
						aciertos += 1;
						button.addEventListener('click', function (){
							const id = event.srcElement.id;
							var positions = id.split(",");
							var i = positions[0];
							var j = positions[1].split("r")[0];
							current = goted[i][j];
							swal("¡Buen trabajo!", "El resultado es " + data[i][j] + " y mencionaste " + current, "success");
						});
					}else{
						button.className="btn btn-danger";
						button.addEventListener('click', function (){
							const id = event.srcElement.id;
							var positions = id.split(",");
							var i = positions[0];
							var j = positions[1].split("r")[0];
							current = goted[i][j];
							swal("¡Inténtalo de nuevo!", "El resultado es " + data[i][j] + " y mencionaste " + current, "error");
						});
					}
					col.replaceChild(button, last);
				}else{
					c.push(NaN);
				}
			}
			goted.push(c);
		}
		var porcentaje = (aciertos / total) * 100;
		porcentaje = parseInt(porcentaje);
		progress.role="progressbar";
		var button = document.createElement("button");
		if(porcentaje > 80){
			progress.className="progress-bar progress-bar-striped progress-bar-animated bg-success";
			button.className="btn btn-success"
		}else if(porcentaje > 40){
			progress.className="progress-bar progress-bar-striped progress-bar-animated bg-warning";
			button.className="btn btn-warning"
		}else{
			progress.className="progress-bar progress-bar-striped progress-bar-animated bg-danger";
			button.className="btn btn-danger"
		}
		var text = document.createTextNode("reiniciar");
		button.id="reload";
		button.style.width = "100%";
		button.style.height = "100%";
		button.addEventListener('click', function(){
			window.location.reload();
		});
		button.appendChild(text);
		document.body.appendChild(button);
		progress.style="width: "+porcentaje+"%;";
		progress.setAttribute("aria-valuenow", porcentaje);
		progress.setAttribute("aria-valu-min", "0");
		progress.setAttribute("aria-value-max", "100");
		text = document.createTextNode(porcentaje);
		progress.appendChild(text);
		document.getElementById("progress").appendChild(progress);
	});
	button.style.width = "100%";
	button.style.height = "100%";
	document.body.appendChild(button);
}

function generate_numbers(){
	for(var i = 0; i < 10; i++){
		var row = [];
		for(var j = 0; j < 10; j++){
			var col = []
			var last = document.getElementById(i+","+j);
			var number = parseInt(Math.random() * 100);
			if(selected[i][j]){
				last.firstChild.data = number;
				col.push(number);
			}else{
				last.firstChild.data = String("___");
				col.push(NaN);
			}
			row.push(col);
		}
		data.push(row);
	}
	var time = document.getElementById("time");
	setTimeout(clean_matrix,parseFloat(time.value) * 1000);
}

function time_changed(){
	var time = document.getElementById("time");
	document.getElementById("time_out").innerHTML = "Tiempo de visualización = " + time.value;
}
