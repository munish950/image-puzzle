var min_trial = [];
var min_time = [];
var time_trial = [];

function init(){
	
	$('#trial').text('0');
	$("#timer").html("00:00");
	
	modal = document.getElementById('myModal');
	
	// Get the <span> element that closes the modal
	span = document.getElementsByClassName("close")[0];

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		$(".table").find('tr').each(function(i, obj){
			$(obj).find('td').each(function(j, object){
				$(object).children().attr("src","image/default.png");
			});
			
		})
		clearTimeout(timer_timeout);				
		init();
		modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			$(".table").find('tr').each(function(i, obj){
				$(obj).find('td').each(function(j, object){
					$(object).children().attr("src","image/default.png");
				});
				
			})
			clearTimeout(timer_timeout);				
			init();
			modal.style.display = "none";
		}
	}
	
	// Create Default values Array
	puzzle_piece = [
		'p1.png',
		'p2.png',
		'p3.png',
		'p4.png',
		'p5.png',
		'p6.png',
		'p7.png',
		'p8.png',
		'p9.png',
		'p10.png',
		'p11.png',
		'p12.png',
		'p13.png',
		'p14.png',
		'p15.png',
		'p16.png',
		'p17.png',
		'p18.png',
		'p1.png',
		'p2.png',
		'p3.png',
		'p4.png',
		'p5.png',
		'p6.png',
		'p7.png',
		'p8.png',
		'p9.png',
		'p10.png',
		'p11.png',
		'p12.png',
		'p13.png',
		'p14.png',
		'p15.png',
		'p16.png',
		'p17.png',
		'p18.png',
	];


	Array.prototype.shuffle = function(){
		for (var i = 0; i < this.length; i++){
			var a = this[i];
			var b = Math.floor(Math.random() * this.length);
			this[i] = this[b];
			this[b] = a;
		}
	}

	// Shuffle Puzzle images
	puzzle_piece.shuffle();	

	i=0;
	puzzlePiece = 0;
	first_src = null;
	first_elem = '';
	sec_src = null;
	sec_elem = '';
	default_src = 'default.png';
	click_count = 0;
	timer_timeout = null;
	myWindow = null;
	count_last=0;
	$worked = $("#timer");
	display_click = 0;	
		
	function update() {
		var myTime = $worked.html();
		var ss = myTime.split(":");
		var dt = new Date();
		dt.setHours(0);
		dt.setMinutes(ss[0]);
		dt.setSeconds(ss[1]);
		
		var dt2 = new Date(dt.valueOf() + 1000);
		var temp = dt2.toTimeString().split(" ");
		var ts = temp[0].split(":");
		
		$worked.html(ts[1]+":"+ts[2]);
		timer_timeout = setTimeout(update, 1000);
	}
	
		
	$('table td').on('click', function(e){
		var cellId = $(this).attr("data-id");
		var getImg = puzzle_piece[cellId];
		var curr_src = $(this).children().attr("src");
		var break_src = curr_src.split('/');
		
		if(break_src[1] != default_src){
			return true;
		}
		
		if(click_count == 0){
			timer_timeout = setTimeout(update, 1000);
		}		

		if(i == 2){
			if(first_src != sec_src){
				// var tempsrc = sec_src;
				first_elem.attr("src","image/"+default_src); 
				first_src = null;
				first_elem = '';
				
				sec_elem.attr("src","image/"+default_src); 
				sec_src = null;
				sec_elem = '';				
			}else{
				puzzlePiece++;
			}

			$(this).children().attr("src","image/"+getImg);
			first_elem = $(this).children();
			first_src = getImg;

			i=0;
		}else if(i == 1){
				sec_elem = $(this).children();	
				sec_src = getImg;
				$(this).children().attr("src","image/"+getImg);
		}else{
			first_src = getImg;
			first_elem = $(this).children();
			$(this).children().attr("src","image/"+getImg);
		}
		
		click_count +=1;
		if(click_count%2 == 0){
			display_click +=1;
			$('#trial').text(display_click);
			
		}

		if(puzzlePiece == 17){
			if(count_last){
				clearTimeout(timer_timeout);
				var puzzle_time = $('#timer').text();
				var puzzle_trial = parseInt($('#trial').text());
				var li_html = '';
								
				if( time_trial.length < 3){					
					time_trial.push({puzzle_time: puzzle_time, puzzle_trial:puzzle_trial});
					
					//li_html += "<li>Trial = "+puzzle_trial+" &nbsp;&nbsp; Time = "+puzzle_time+" </li>";
					$('#time_trial_score').append(li_html);
				}else{
					var replace_key;					
					var trial_val = puzzle_trial;
					for (var k in time_trial){
						if(k != 'shuffle'){							
							if( time_trial[k]['puzzle_trial'] > trial_val ){
								trial_val = time_trial[k]['puzzle_trial'];
								replace_key = k;
							}
						}
												
					}
					
					if( replace_key >= 0 ){
						time_trial[replace_key]['puzzle_time'] = puzzle_time;
						time_trial[replace_key]['puzzle_trial'] = puzzle_trial;
					}
					
					
					for (var m in time_trial){					
						if(m != 'shuffle'){							
							//li_html += "<li>Trial = "+time_trial[m]['puzzle_trial']+" &nbsp;&nbsp; Time = "+time_trial[m]['puzzle_time']+" </li>";
						}						
					}
					
					//$('#time_trial_score').html(li_html);
				}
				
				var modal_text = "<p class='modal_head'>Congratulations to you!</p><p>Your Time = <b>"+puzzle_time+"</b></p>Your Trial = <b>"+puzzle_trial+"</b></p>";
				$('.final_text').html(modal_text);
				modal.style.display = "block";
				
				return true;
			}else{
				count_last++;
			}
		}
		
		i++;
		
	});
	
	
	$('#new_game').on('click', function(){
		//$('#trial').text('0');
		//$("#timer").html("00:00");
		clearTimeout(timer_timeout);
				
		$(".table").find('tr').each(function(i, obj){
			$(obj).find('td').each(function(j, object){	
				$(object).children().attr("src","image/"+default_src);
			});
			
		})
		
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
		init();
				
	});
	
	$('.container-fluid').on('click', function(event){
		if(myWindow){
			if(event.target.id != 'check_solution') {
				myWindow.close();
				//clearTimeout(timer_timeout);				
				//init();
			}			
		}
		
	});
}

$(document).ready(function(){
	init();
	var default_src = 'default.png';
	//$('.high_score_div').css('display', 'block');
	
});

