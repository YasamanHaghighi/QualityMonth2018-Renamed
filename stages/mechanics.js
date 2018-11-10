window.addEventListener("load", function(){

	var currentStage;
	var oldCards = [];
	var slots = {
		"slot0": false,
		"slot1": false,
		"slot2": false,
		"slot3": false,
		"slot4": false,
		"slot5": false
	}
	var cards = {
		"card0": false,
		"card1": false,
		"card2": false,
		"card3": false,
		"card4": false,
		"card5": false
	}
	var stages = [
		{
			"instructions": {"el": null, "content": "You can see the work elements below. Please drag and drop them into the timeline below based on their correct order."},
			"success": {"el": null, "content": "Great Job! Let\'s move to the next step to find the necessary conditions for each of these work elements."},
			"content": [{
				"text": "Check attendee\'s schedule",
				"slot": "slot0",
				"gc": ""
			},
			{
				"text": "Reserve VC room",
				"slot": "slot1",
				"gc": ""
			},
			{
				"text": "Confirm VC date & time",
				"slot": "slot2",
				"gc": ""
			},
			{
				"text": "Ask attendees to submit VC material",
				"slot": "slot3",
				"gc": ""
			},
			{
				"text": "Draft agenda",
				"slot": "slot4",
				"gc": ""
			},
			{
				"text": "Prepare VC room",
				"slot": "slot5",
				"gc": ""
			}]

		},
		{
			"instructions": {"el": null, "content": "In this step, you have to match the necessary conditions with the work elements. Drag the necessary conditions (in yellow) and drop them on the correct work element (in orange)"},
			"success": {"el": null, "content": "Great Job! Let\'s move to the next step to find the judgment criteria for each work element."},
			"content": [{
				"text": "Outlook calendars are viewable",
				"slot": "slot0",
				"gc": ""
			},
			{
				"text": "Room schedules are viewable",
				"slot": "slot1",
				"gc": ""
			},
			{
				"text": "Update VC schedule on Outlook",
				"slot": "slot2",
				"gc": ""
			},
			{
				"text": "Email addresses, request for materials in the email",
				"slot": "slot3",
				"gc": ""
			},
			{
				"text": "Confirmed date & time, topic and attendee list",
				"slot": "slot4",
				"gc": ""
			},
			{
				"text": "Layout plan, furniture and functioning technology",
				"slot": "slot5",
				"gc": ""
			}]
		},
		{
			"instructions": {"el": null, "content": "In this step, you have to match the judgment criteria with the work elements. Drag the judgment criteria (in yellow) and drop them on the correct work element (in orange)."},
			"success": {"el": null, "content": "Great Job! You are almost done. Let’s see what the last step is."},
			"content": [{
				"text": "Attendee’s availability list",
				"slot": "slot0",
				"gc": ""
			},
			{
				"text": "Reserved date & time matches attendees’ schedules",
				"slot": "slot1",
				"gc": ""
			},
			{
				"text": "Selected date matches the date VC room & attendees are available",
				"slot": "slot2",
				"gc": ""
			},
			{
				"text": "All materials are collected from all attendees",
				"slot": "slot3",
				"gc": ""
			},
			{
				"text": "All agenda items are included",
				"slot": "slot4",
				"gc": ""
			},
			{
				"text": "Furniture is arranged, projector & camera set up and functioning",
				"slot": "slot5",
				"gc": ""
			}]
		}]

	function allowDrop(ev) {
	    ev.preventDefault();

		if(stages[currentStage].completed) return false;

			if(ev.target.classList.contains("position-slot")){

				ev.target.parentNode.parentNode.parentNode.classList.add("droppable");
			}

			if(ev.target.classList.contains("slot")){

				ev.target.parentNode.parentNode.classList.add("droppable");
			}


			if(ev.target.classList.contains("gc-p")){

				if(ev.target.parentNode.parentNode.parentNode.classList.contains("upper-slot")){

					ev.target.parentNode.parentNode.parentNode.classList.add("droppable");
				}
				else{

					ev.target.parentNode.parentNode.parentNode.parentNode.parentNode.classList.add("droppable");
				}
			}

			if(ev.target.classList.contains("upper-slot")){

				ev.target.classList.add("droppable");
			}

			if(ev.target.classList.contains("gc-body")){

				if(ev.target.parentNode.parentNode.classList.contains("upper-slot")){

					ev.target.parentNode.parentNode.classList.add("droppable");
				}
				else{
					ev.target.parentNode.parentNode.parentNode.parentNode.classList.add("droppable");
				}

			}

	}

	function unAllowDrop(ev) {
	    ev.preventDefault();

	    if(stages[currentStage].completed) return false;

			if(ev.target.classList.contains("position-slot")){

				ev.target.parentNode.parentNode.parentNode.classList.remove("droppable");
			}

			if(ev.target.classList.contains("slot")){

				ev.target.parentNode.parentNode.classList.remove("droppable");
			}


			if(ev.target.classList.contains("gc-p")){

				if(ev.target.parentNode.parentNode.parentNode.classList.contains("upper-slot")){

					ev.target.parentNode.parentNode.parentNode.classList.remove("droppable");
				}
				else{

					ev.target.parentNode.parentNode.parentNode.parentNode.parentNode.classList.remove("droppable");
				}
			}

			if(ev.target.classList.contains("upper-slot")){

				ev.target.classList.remove("droppable");
			}

			if(ev.target.classList.contains("gc-body")){

				if(ev.target.parentNode.parentNode.classList.contains("upper-slot")){

					ev.target.parentNode.parentNode.classList.remove("droppable");
				}
				else{
					ev.target.parentNode.parentNode.parentNode.parentNode.classList.remove("droppable");
				}

			}
	}

	
	function drag(ev) {

		if(stages[currentStage].completed) return false;
	    ev.dataTransfer.setData("text", ev.target.id);
	}
	
	function drop(ev) {

		ev.preventDefault();
		if(stages[currentStage].completed) return false;

		let slot = null;

			if(ev.target.classList.contains("position-slot")){

				slot = {position: "bottom", el: ev.target.parentNode};
			}

			if(ev.target.classList.contains("slot")){

				slot = {position: "bottom", el: ev.target};
			}

			if(ev.target.classList.contains("upper-slot")){

				slot = {position: "upper", el: ev.target};
			}

			if(ev.target.classList.contains("gc-p")){


				if(ev.target.parentNode.parentNode.parentNode.classList.contains("upper-slot")){

					slot = {position: "upper", el: ev.target.parentNode.parentNode.parentNode};
				}
				else{

					slot = {position: "bottom", el: ev.target.parentNode.parentNode.parentNode};
				}

			}


			if(ev.target.classList.contains("gc-body")){


				if(ev.target.parentNode.parentNode.classList.contains("upper-slot")){

					slot = {position: "upper", el: ev.target.parentNode.parentNode};
				}
				else{

					slot = {position: "bottom", el: ev.target.parentNode.parentNode};
				}

			}

		
		if(!slot) return false;

		if(slot.position == "bottom") slot.el.parentNode.parentNode.classList.remove("droppable");
		if(slot.position == "upper") slot.el.classList.remove("droppable");

		let id = ev.dataTransfer.getData("text");
		let card = document.getElementById(id);

		let exchange = {"valid": false, "cards": []};
		let card2 = slot.el.querySelector(".card");


				if(!card2){
					//IF EMPTY SLOT

					if(card.parentNode.classList.contains("upper-slot")){
						//FROM UPPER

						if(slot.position == "bottom"){
							//TO DOWN

							slots[slot.el.id]=true;

							slot.el.appendChild(card);
							gameRes(slot.el.id, id);
						}
						else{
							//TO NEIGHBOUR
							slot.el.appendChild(card);
						}
					}
					else{
						//FROM DOWN
						card.parentNode.parentNode.parentNode.parentNode.classList.remove("filled");

						if(slot.position == "upper"){
							//TO UPPER
							slot.el.appendChild(card);
						}
						else{
							//TO NEIGHBOUR
							slots[card.parentNode.id] = false;

							slots[slot.el.id]=true;
							slot.el.appendChild(card);
							gameRes(slot.el.id, id);
						}
					}
				}
				else{
					//IF SLOT IS NOT EMPTY

					if(card.parentNode.classList.contains("upper-slot")){
						//FROM UPPER

						if(slot.position == "bottom"){
							//TO DOWN

							card.parentNode.appendChild(card2);
							slot.el.appendChild(card);

							gameRes(slot.el.id, id);
						}
						else{
							//TO NEIGHBOUR
							return false;
						}

					}
					else{
						//FROM DOWN
						card.parentNode.appendChild(card2);
						slot.el.appendChild(card);
						
						if(slot.position == "upper"){
							//TO UPPER
							gameRes(card2.parentNode.id, card2.id);
						}
						else{
							//TO NEIGHBOUR
							exchangeRes(card, card2);
						}
					}
				}
	}

	function allCardsPosition(){

		let cst;
		let allEqual = true;

		for(let i = 0, j = stages[currentStage].content.length; i<j; i++){

		if(stages[currentStage].content[i].slot != stages[currentStage].content[i].final){ i = j; allEqual = false; }
		}

		if(allEqual){

			if(!stages[currentStage].completed){

				stages[currentStage].instructions.el.parentNode.removeChild(stages[currentStage].instructions.el);
	
				cst = document.querySelector(".container.stage");
				cst.appendChild(stages[currentStage].success.el);
				stages[currentStage].completed = true;
			}
		}
		else{

			if(stages[currentStage].completed){

				stages[currentStage].success.el.parentNode.removeChild(stages[currentStage].success.el);
	
				cst = document.querySelector(".container.stage");
				cst.appendChild(stages[currentStage].instructions.el);
				stages[currentStage].completed = false;
			}
		}
	}

	function evaluate(targetid, gcid){

		document.querySelector("."+targetid).classList.add("filled");

		let footer = document.querySelector("."+targetid+" .card-footer");

		let card_i = 0;

		for(let i = 0, j = stages[currentStage].content.length; i<j; i++){

			if(stages[currentStage].content[i].gc == gcid){ card_i = i; i = j; }

		}

		stages[currentStage].content[card_i].final = targetid;

		if(stages[currentStage].content[card_i].slot == targetid){
			//WINNER
			footer.classList.add("text-success");
			footer.classList.remove("text-danger");
			footer.innerHTML = "Correct"
		}
		else{
			//LOSER
			footer.classList.remove("text-success");
			footer.classList.add("text-danger");
			footer.innerHTML = "Incorrect"
		}
	}

	function gameRes(targetid, gcid){

		evaluate(targetid, gcid);
		allCardsPosition();
	}
	
	function exchangeRes(c1, c2){

		evaluate(c1.parentNode.id, c1.id);
		evaluate(c2.parentNode.id, c2.id);
		allCardsPosition();
	}

	function shuffle(stage){

		currentStage = stage;

		stages[stage].instructions.el = document.querySelector(".row.instructions");
		stages[stage].instructions.el.parentNode.removeChild(stages[stage].instructions.el);
		stages[stage].instructions.el.classList.remove("hiddn");

		stages[stage].success.el = document.querySelector(".row.success");
		stages[stage].success.el.parentNode.removeChild(stages[stage].success.el);
		stages[stage].success.el.classList.remove("hiddn");

		stages[stage].success.el.querySelector("#btn-next").addEventListener("click", nextStep);

		stages[stage].instructions.el.querySelector("h6").innerHTML = stages[stage].instructions.content;
		stages[stage].success.el.querySelector("h6").innerHTML = stages[stage].success.content;

			let gameCards = document.querySelectorAll(".container.cards .card.gc");
			let gameSlots = document.querySelectorAll(".container.slots .slot");
			let upperSlots = document.querySelectorAll(".container.cards .col-bscard");

			for(let i = 0; i<6; i++){

				while(stages[stage].content[i].gc == ""){
		
					let number = Math.floor(Math.random() * 6);
					let gcEqCn = false;
					for(let i = 0, j = stages[stage].content.length; i<j; i++){

						if(stages[stage].content[i].gc == "card"+number){ i = j; gcEqCn = true; }
					}
					if(!gcEqCn){

						stages[stage].content[i].gc = "card"+number;
						gameCards[number].querySelector("p").innerHTML = stages[stage].content[i].text;
						gameCards[number].addEventListener("dragstart", drag);

						gameSlots[number].addEventListener("dragover", allowDrop);
						gameSlots[number].addEventListener("dragleave", unAllowDrop);
						gameSlots[number].addEventListener("drop", drop);

						upperSlots[number].addEventListener("dragover", allowDrop);
						upperSlots[number].addEventListener("dragleave", unAllowDrop);
						upperSlots[number].addEventListener("drop", drop);
					}
				}
		
			}


		let cst = document.querySelector(".container.stage");
		cst.appendChild(stages[currentStage].instructions.el);
	}
	
	function nextStep(){

		let stage = currentStage;
		stages[stage].success.el.parentNode.removeChild(stages[stage].success.el);
		window.localStorage["stage"+stage] = JSON.stringify(stages[stage].content);
	}

	shuffle(parseInt(localStorage.currentStage));
});