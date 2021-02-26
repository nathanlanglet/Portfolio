function bombe()
	{
		var b = document.getElementById('bombe');
		var nbb = b.value;
		if (nbb < 50 || nbb >=312)
			{
				alert("Veuillez saisir un nombre de bombe entre 50 et 311");
			}
		else
			{
				start(nbb);
				b.disabled = true;
			}
	}

function start(bombe)
	{
		//Board
	 var c = document.getElementById('contenant');
	 //play button
	 document.getElementsByTagName('button')[0].style.display = 'none';
	 c.innerHTML = '';
	 var r = document.getElementById('result').innerHTML = '';
	 var i = 0;
	 while (i<312)
	 	{
			var div = document.createElement('div');
			div.classList.add("cases");
			div.setAttribute("onclick", "cases("+i+")");
			div.setAttribute("oncontextmenu", "drapeau("+i+")");
			i++;
			c.appendChild(div);
	 	}
		//Array of Cells
	 var cellule = c.getElementsByTagName('div');
	 //Create Bombes
	 for (var j = 0; j<bombe; j++)
	 	{
	 		var hasard = Math.floor(Math.random() * i);
	 		if (cellule[hasard].innerHTML != '*')
	 			{
	 				cellule[hasard].innerHTML = '*';
	 			}
	 		else
	 			{
					j--
	 			}
	 	}

	 for (var k = 0; k<312; k++)
	 	{
			//makes val for bombe
	 		if (cellule[k].innerHTML == '*')
	 			{
					var val = '*';
	 			}
	 		else
	 			{
					var val = 0; //default value
	 			}
				// top left corner
			if (k == 0)
				{
					if (cellule[k].innerHTML != '*')
						{
							var cased = new Array(k+1,k+13,k+14);
							for (var i = 0; i<3; i++)
								{
									if (cellule[cased[i]].innerHTML == '*')
										{
											val = parseInt(val)+parseInt(1);
										}
								}
						}
				}
				//top right corner
			if (k == 12)
				{
					if (cellule[k].innerHTML != '*')
						{
							var cased = new Array(k-1,k+12,k+13);
							for (var i = 0; i<3; i++)
								{
									if (cellule[cased[i]].innerHTML == '*')
										{
											val = parseInt(val)+parseInt(1);
										}
								}
						}
				}
				//bot left corner
			if (k == 299)
				{
					if (cellule[k].innerHTML != '*')
						{
							var cased = new Array(k+1,k-12,k-13);
							for (var i = 0; i<3; i++)
								{
									if (cellule[cased[i]].innerHTML == '*')
										{
											val = parseInt(val)+parseInt(1);
										}
								}
						}
				}
				//bot right corner
			if (k == 311)
				{
					if (cellule[k].innerHTML != '*')
						{
							var cased = new Array(k-1,k-13,k-14);
							for (var i = 0; i<3; i++)
								{
									if (cellule[cased[i]].innerHTML == '*')
										{
											val = parseInt(val)+parseInt(1);
										}
								}
						}
				}
				//first row
			if (k > 0 && k < 12)
				{
					if (cellule[k].innerHTML != '*')
						{
							var cased = new Array(k-1,k+1,k+12,k+13,k+14);
							for (var i = 0; i<5; i++)
								{
									if (cellule[cased[i]].innerHTML == '*')
										{
											val = parseInt(val)+parseInt(1);
										}
								}
						}
				}
				//last row
			if (k > 299 && k < 311)
				{
					if (cellule[k].innerHTML != '*')
						{
							var cased = new Array(k-1,k+1,k-12,k-13,k-14);
							for (var i = 0; i<5; i++)
								{
									if (cellule[cased[i]].innerHTML == '*')
										{
											val = parseInt(val)+parseInt(1);
										}
								}
						}
				}
				//first column
			if (k % 13 == 0 && k !=299 && k != 0)
				{
					if (cellule[k].innerHTML != '*')
						{
							var cased = new Array(k-13,k+13,k-12,k+1,k+14);
							for (var i = 0; i<5; i++)
								{
									if (cellule[cased[i]].innerHTML == '*')
										{
											val = parseInt(val)+parseInt(1);
										}
								}
						}
				}
				//last column
			if (k % 13 == 12 && k != 12 && k != 311)
				{
					if (cellule[k].innerHTML != '*')
						{
							var cased = new Array(k-13,k+13,k+12,k-1,k-14);
							for (var i = 0; i<5; i++)
								{
									if (cellule[cased[i]].innerHTML == '*')
										{
											val = parseInt(val)+parseInt(1);
										}
								}
						}
				}
				// core of the array
			if (k % 13 != 12 && k % 13 != 0 && k > 13 && k < 299)
				{
					if (cellule[k].innerHTML != '*')
						{
							//cells surrounding
							var cased = new Array(k+1,k-1,k+12,k+13,k+14,k-12,k-13,k-14);
							for (var i = 0; i<8; i++)
								{
									if (cellule[cased[i]].innerHTML == '*')
										{
											val = parseInt(val)+parseInt(1);
										}
								}
						}
				}
			cellule[k].setAttribute('value', val);
	 	}

 		for (var l = 0; l<312; l++)
 			{
				cellule[l].innerHTML = ' ';
 			}
	}

//on click cells
function cases(a)
	{
		var cont = document.getElementById('contenant');
		var cellule = cont.getElementsByTagName('div');
		if (cellule[a].getAttribute('value') != '*' && cellule[a].innerHTML != "*")
			{
				cellule[a].innerHTML = 	cellule[a].getAttribute('value');
				cellule[a].style.backgroundColor = 'lightgrey';
				couleur(a);
				deblock(a);
			}
		if (cellule[a].getAttribute('value') == '*' && cellule[a].innerHTML != "*")
			{
        var r = document.getElementById('result');
        if (r.innerHTML != 'Gagné !')
          {
            findepartie();
				    r.innerHTML = 'Bombe ! Perdu !';
				    var button = 	document.getElementsByTagName('button')[0];
				    button.style.display = '';
				    button.innerHTML = "Rejouer !";
          }
			}
	}


//recursive need to be upgraded
function deblock(a)
	{
		var cont = document.getElementById('contenant');
		var cellule = cont.getElementsByTagName('div');

		//reveal surronding cells
		if (cellule[a].getAttribute('value') == 0)
			{
				if (a % 13 != 12 && a % 13 != 0 && a > 13 && a < 299)
					{
						var casedecouvrir = new Array(a-14,a-13,a-12,a-1,a+1,a+12,a+13,a+14);
						for (var i = 0; i<8; i++)
							{
								if (cellule[casedecouvrir[i]].getAttribute('value') != '*')
									{
										if (cellule[casedecouvrir[i]].getAttribute('value') == 0 && cellule[casedecouvrir[i]].innerHTML == " ")
											{
												cellule[casedecouvrir[i]].innerHTML = cellule[casedecouvrir[i]].getAttribute('value');
												cellule[casedecouvrir[i]].style.backgroundColor = 'lightgrey';
												//recursive
												deblock(casedecouvrir[i]);
											}
										if (cellule[casedecouvrir[i]].getAttribute('value') != 0 && cellule[casedecouvrir[i]].getAttribute('value') != '*')
											{
												cellule[casedecouvrir[i]].innerHTML = cellule[casedecouvrir[i]].getAttribute('value');
												cellule[casedecouvrir[i]].style.backgroundColor = 'lightgrey';
												couleur(casedecouvrir[i]);
											}
									}
							}
					}

					//left column
				if (a % 13 == 0 && a !=299 && a != 0)
					{
						var casedecouvrir = new Array(a-13,a-12,a+1,a+13,a+14);
						for (var i = 0; i<5; i++)
							{
								if (cellule[casedecouvrir[i]].getAttribute('value') != '*')
									{
										if (cellule[casedecouvrir[i]].getAttribute('value') == 0 && cellule[casedecouvrir[i]].innerHTML == " ")
											{
												cellule[casedecouvrir[i]].innerHTML = cellule[casedecouvrir[i]].getAttribute('value');
												cellule[casedecouvrir[i]].style.backgroundColor = 'lightgrey';
												//recursive
												deblock(casedecouvrir[i]);
											}
										if (cellule[casedecouvrir[i]].getAttribute('value') != 0 && cellule[casedecouvrir[i]].getAttribute('value') != '*')
											{
												cellule[casedecouvrir[i]].innerHTML = cellule[casedecouvrir[i]].getAttribute('value');
												cellule[casedecouvrir[i]].style.backgroundColor = 'lightgrey';
												couleur(casedecouvrir[i]);
											}
									}
							}
					}

					//right column
				if (a % 13 == 12 && a != 12 && a != 311)
					{
						var casedecouvrir = new Array(a-14,a-13,a-1,a+12,a+13);
						for (var i = 0; i<5; i++)
							{
								if (cellule[casedecouvrir[i]].getAttribute('value') != '*')
									{
										if (cellule[casedecouvrir[i]].getAttribute('value') == 0 && cellule[casedecouvrir[i]].innerHTML == " ")
											{
												cellule[casedecouvrir[i]].innerHTML = cellule[casedecouvrir[i]].getAttribute('value');
												cellule[casedecouvrir[i]].style.backgroundColor = 'lightgrey';
												//recursive
												deblock(casedecouvrir[i]);
											}
										if (cellule[casedecouvrir[i]].getAttribute('value') != 0 && cellule[casedecouvrir[i]].getAttribute('value') != '*')
											{
												cellule[casedecouvrir[i]].innerHTML = cellule[casedecouvrir[i]].getAttribute('value');
												cellule[casedecouvrir[i]].style.backgroundColor = 'lightgrey';
												couleur(casedecouvrir[i]);
											}
									}
							}
					}

					//last row
				if (a > 299 && a < 311)
					{
						var casedecouvrir = new Array(a-14,a-13,a-12,a-1,a+1);
						for (var i = 0; i<5; i++)
							{
								if (cellule[casedecouvrir[i]].getAttribute('value') != '*')
									{
										if (cellule[casedecouvrir[i]].getAttribute('value') == 0 && cellule[casedecouvrir[i]].innerHTML == " ")
											{
												cellule[casedecouvrir[i]].innerHTML = cellule[casedecouvrir[i]].getAttribute('value');
												cellule[casedecouvrir[i]].style.backgroundColor = 'lightgrey';
												//recursive
												deblock(casedecouvrir[i]);
											}
										if (cellule[casedecouvrir[i]].getAttribute('value') != 0 && cellule[casedecouvrir[i]].getAttribute('value') != '*')
											{
												cellule[casedecouvrir[i]].innerHTML = cellule[casedecouvrir[i]].getAttribute('value');
												cellule[casedecouvrir[i]].style.backgroundColor = 'lightgrey';
												couleur(casedecouvrir[i]);
											}
									}
							}
					}

					//first row
				if (a > 0 && a < 12)
					{
						var casedecouvrir = new Array(a-1,a+1,a+12,a+13,a+14);
						for (var i = 0; i<5; i++)
							{
								if (cellule[casedecouvrir[i]].getAttribute('value') != '*')
									{
										if (cellule[casedecouvrir[i]].getAttribute('value') == 0 && cellule[casedecouvrir[i]].innerHTML == " ")
											{
												cellule[casedecouvrir[i]].innerHTML = cellule[casedecouvrir[i]].getAttribute('value');
												cellule[casedecouvrir[i]].style.backgroundColor = 'lightgrey';
												//recursive
												deblock(casedecouvrir[i]);
											}
										if (cellule[casedecouvrir[i]].getAttribute('value') != 0 && cellule[casedecouvrir[i]].getAttribute('value') != '*')
											{
												cellule[casedecouvrir[i]].innerHTML = cellule[casedecouvrir[i]].getAttribute('value');
												cellule[casedecouvrir[i]].style.backgroundColor = 'lightgrey';
												couleur(casedecouvrir[i]);
											}
									}
							}
					}

					//top left corner
				if (a == 0)
					{
						var casedecouvrir = new Array(a+1,a+13,a+14);
						for (var i = 0; i<3; i++)
							{
								if (cellule[casedecouvrir[i]].getAttribute('value') != '*')
									{
										if (cellule[casedecouvrir[i]].getAttribute('value') == 0 && cellule[casedecouvrir[i]].innerHTML == " ")
											{
												cellule[casedecouvrir[i]].innerHTML = cellule[casedecouvrir[i]].getAttribute('value');
												cellule[casedecouvrir[i]].style.backgroundColor = 'lightgrey';
												//recursive
												deblock(casedecouvrir[i]);
											}
										if (cellule[casedecouvrir[i]].getAttribute('value') != 0 && cellule[casedecouvrir[i]].getAttribute('value') != '*')
											{
												cellule[casedecouvrir[i]].innerHTML = cellule[casedecouvrir[i]].getAttribute('value');
												cellule[casedecouvrir[i]].style.backgroundColor = 'lightgrey';
												couleur(casedecouvrir[i]);
											}
									}
							}
					}

					//top right corner
				if (a == 12)
					{
						var casedecouvrir = new Array(a-1,a+12,a+13);
						for (var i = 0; i<3; i++)
							{
								if (cellule[casedecouvrir[i]].getAttribute('value') != '*')
									{
										if (cellule[casedecouvrir[i]].getAttribute('value') == 0 && cellule[casedecouvrir[i]].innerHTML == " ")
											{
												cellule[casedecouvrir[i]].innerHTML = cellule[casedecouvrir[i]].getAttribute('value');
												cellule[casedecouvrir[i]].style.backgroundColor = 'lightgrey';
												//recursive
												deblock(casedecouvrir[i]);
											}
										if (cellule[casedecouvrir[i]].getAttribute('value') != 0 && cellule[casedecouvrir[i]].getAttribute('value') != '*')
											{
												cellule[casedecouvrir[i]].innerHTML = cellule[casedecouvrir[i]].getAttribute('value');
												cellule[casedecouvrir[i]].style.backgroundColor = 'lightgrey';
												couleur(casedecouvrir[i]);
											}
									}
							}
					}

					//bot left corner
				if (a == 299)
					{
						var casedecouvrir = new Array(a+1,a-12,a-13);
						for (var i = 0; i<3; i++)
							{
								if (cellule[casedecouvrir[i]].getAttribute('value') != '*')
									{
										if (cellule[casedecouvrir[i]].getAttribute('value') == 0 && cellule[casedecouvrir[i]].innerHTML == " ")
											{
												cellule[casedecouvrir[i]].innerHTML = cellule[casedecouvrir[i]].getAttribute('value');
												cellule[casedecouvrir[i]].style.backgroundColor = 'lightgrey';
												//recursive
												deblock(casedecouvrir[i]);
											}
										if (cellule[casedecouvrir[i]].getAttribute('value') != 0 && cellule[casedecouvrir[i]].getAttribute('value') != '*')
											{
												cellule[casedecouvrir[i]].innerHTML = cellule[casedecouvrir[i]].getAttribute('value');
												cellule[casedecouvrir[i]].style.backgroundColor = 'lightgrey';
												couleur(casedecouvrir[i]);
											}
									}
							}
					}

					//bot right corner
				if (a == 311)
					{
						var casedecouvrir = new Array(a-1,a-13,a-14);
						for (var i = 0; i<3; i++)
							{
								if (cellule[casedecouvrir[i]].getAttribute('value') != '*')
									{
										if (cellule[casedecouvrir[i]].getAttribute('value') == 0 && cellule[casedecouvrir[i]].innerHTML == " ")
											{
												cellule[casedecouvrir[i]].innerHTML = cellule[casedecouvrir[i]].getAttribute('value');
												cellule[casedecouvrir[i]].style.backgroundColor = 'lightgrey';
												//recursive
												deblock(casedecouvrir[i]);
											}
										if (cellule[casedecouvrir[i]].getAttribute('value') != 0 && cellule[casedecouvrir[i]].getAttribute('value') != '*')
											{
												cellule[casedecouvrir[i]].innerHTML = cellule[casedecouvrir[i]].getAttribute('value');
												cellule[casedecouvrir[i]].style.backgroundColor = 'lightgrey';
												couleur(casedecouvrir[i]);
											}
									}
							}
					}
			}
		gagne();
	}



//spot bombe
function drapeau(a)
	{
		var cont = document.getElementById('contenant');
		var cellule = cont.getElementsByTagName('div');
		if (cellule[a].innerHTML == ' ')
			{
				if (cellule[a].style.backgroundColor != "red")
				{
					cellule[a].innerHTML = '*';
					cellule[a].style.backgroundColor = "red";
				}
			}
		else
			{
				if (cellule[a].style.backgroundColor == "red")
				{
					cellule[a].innerHTML = ' ';
					cellule[a].style.backgroundColor = "white";
				}
			}
	}

function gagne()
	{
		var b = document.getElementById('bombe');
		var nbb = b.value;
		var point = 0;
		var cont = document.getElementById('contenant');
		var cellule = cont.getElementsByTagName('div');
    var r = document.getElementById('result');
		for (var p = 0; p<312; p++)
			{
				if (cellule[p].innerHTML != ' ' && cellule[p].innerHTML != '*')
					{
						point++;
					}
				if (point == 312-nbb && r.innerHTML != 'Bombe ! Perdu !')
					{
						r.innerHTML = 'Gagné !';
						var button = 	document.getElementsByTagName('button')[0];
						button.style.display = '';
						button.innerHTML = "Rejouer !";
            findepartie();
					}
			}
	}

function findepartie()
    {
				var b = document.getElementById('bombe');
				b.disabled = false;
        var cont = document.getElementById('contenant');
				var cellule = cont.getElementsByTagName('div');
		    for (var l = 0; l<312; l++)
				{
					cellule[l].innerHTML = 	cellule[l].getAttribute('value');
					if (cellule[l].getAttribute('value') == '*')
						{
							cellule[l].style.backgroundColor = 'red';
						}
					else
						{
							cellule[l].style.backgroundColor = 'lightgrey';
						}
						couleur(l);
				}
    }

function couleur(l)
	{
		var cont = document.getElementById('contenant');
		var cellule = cont.getElementsByTagName('div');
		switch(cellule[l].innerHTML)
		{
			case "1" :
				cellule[l].style.color = 'blue';
				break;
			case "2" :
				cellule[l].style.color = 'green';
				break;
			case "3" :
				cellule[l].style.color = 'red';
				break;
			default :
				cellule[l].style.color = 'black';
				break;
		}
	}
