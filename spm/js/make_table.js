var selected = [];
var data = [];
var goted = [];
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
		row.className = "row";
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
				input.id=i+","+j+"i";
				input.type="password";
				last.firstChild.data = String("___");
				col.replaceChild(input, last);
			}
		}
	}
	var button = document.createElement("button");
	var text = document.createTextNode("submit");
	button.id="submit";
	button.appendChild(text);
	button.addEventListener('click', function(){
		var button = document.createElement("button");
		var text = document.createTextNode("reiniciar");
		button.id="reload";
		button.addEventListener('click', function(){
			window.location.reload();
		});
		document.body.appendChild(button);
		button.appendChild(text);
		var aciertos = 0;
		for(var i = 0; i < 10; i++){
			for(var j = 0; j < 10; j++){
				if(selected[i][j]){
					var selection = document.getElementById(i+","+j+"i");
					selection.type=""
					var goal = data[i][j];
					var text = document.createTextNode(goal);
					var button = document.createElement("button");
					button.id = i+","+j+"r";
					button.appendChild(text);
					/*
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
						alert();
					});
					*/
					var col = document.getElementById(i+","+j+"d");
					var last = document.getElementById(i+","+j+"i");
					if(parseInt(selection.value) == goal){
						button.className="btn btn-success";
						aciertos += 1;
					}else{
						button.className="btn btn-danger";
					}
					col.replaceChild(button, last);
				}
			}
		}
	});
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
				console.log("Aquí no");
			}
			row.push(col);
		}
		data.push(row);
	}
	setTimeout(clean_matrix,1000);
}
